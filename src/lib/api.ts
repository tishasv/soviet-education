import { supabase } from './supabase'
import type { Category, Module, Block } from '@/types'

// Fetch all categories with their subjects (for sidebar)
export async function getNavigation(): Promise<Category[]> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select(`
      id, slug, label, icon, sort_order,
      subjects (
        id, slug, label, year, author, sort_order,
        modules ( id, slug, title, sort_order )
      )
    `)
    .order('sort_order')

  if (error) return []

  return (categories ?? []).map((cat) => ({
    ...cat,
    subjects: (cat.subjects ?? [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((sub: any) => ({
        ...sub,
        modules: (sub.modules ?? []).sort(
          (a: any, b: any) => a.sort_order - b.sort_order
        ),
      })),
  }))
}

// Fetch a single module with all its blocks (recursive)
export async function getModule(
  categorySlug: string,
  subjectSlug: string,
  moduleSlug: string
): Promise<Module | null> {
  // Find the module
  const { data: moduleData, error: modError } = await supabase
    .from('modules')
    .select(`
      id, slug, title, sort_order,
      subjects!inner (
        id, slug, label, year, author,
        categories!inner ( id, slug, label )
      )
    `)
    .eq('slug', moduleSlug)
    .eq('subjects.slug', subjectSlug)
    .eq('subjects.categories.slug', categorySlug)
    .single()

  if (modError || !moduleData) return null

  // Fetch top-level blocks with exercise options
  const { data: blocks, error: blocksError } = await supabase
    .from('blocks')
    .select(`
      id, type, sort_order, content,
      exercise_options ( id, block_id, text, is_correct, sort_order )
    `)
    .eq('module_id', moduleData.id)
    .is('parent_id', null)
    .order('sort_order')

  if (blocksError) throw blocksError

  // Recursively fetch children for blocks that need it
  const blocksWithChildren = await Promise.all(
    (blocks ?? []).map(async (block) => {
      const children = await getChildBlocks(block.id)
      return { ...block, children }
    })
  )

  return {
    id: moduleData.id,
    subject_id: (moduleData as any).subjects.id,
    slug: moduleData.slug,
    title: moduleData.title,
    sort_order: moduleData.sort_order,
    blocks: blocksWithChildren,
  }
}

async function getChildBlocks(parentId: string): Promise<Block[]> {
  const { data, error } = await supabase
    .from('blocks')
    .select(`
      id, type, sort_order, content,
      exercise_options ( id, block_id, text, is_correct, sort_order )
    `)
    .eq('parent_id', parentId)
    .order('sort_order')

  if (error || !data || data.length === 0) return []

  return Promise.all(
    data.map(async (block) => ({
      ...block,
      children: await getChildBlocks(block.id),
    }))
  )
}

// Fetch subject metadata (for breadcrumb / page title)
export async function getSubjectMeta(subjectSlug: string) {
  const { data, error } = await supabase
    .from('subjects')
    .select(`id, slug, label, year, author, categories ( slug, label )`)
    .eq('slug', subjectSlug)
    .single()

  if (error) return null
  return data
}

// Search modules by title
export async function searchModules(query: string) {
  const { data, error } = await supabase
    .from('modules')
    .select(`
      id, slug, title,
      subjects ( slug, label, categories ( slug, label ) )
    `)
    .ilike('title', `%${query}%`)
    .limit(20)

  if (error) return []
  return data ?? []
}
