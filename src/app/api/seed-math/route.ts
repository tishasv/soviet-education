import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const SB_URL = 'https://nvlaewkiihiypfqvssom.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bGFld2tpaWhpeXBmcXZzc29tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzEyMDUwNiwiZXhwIjoyMDkyNjk2NTA2fQ.OQ97yFdj5b0LW57fOAJeWf_yOntaP2CWvbW9f7dZ2j8'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('secret') !== 'seed-math-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = createClient(SB_URL, SB_KEY, {
    auth: { persistSession: false }
  })

  // Step 1: Check existing categories
  const { data: cats, error: catsErr } = await sb.from('categories').select('id, slug')
  if (catsErr) return NextResponse.json({ step: 'select categories', error: catsErr.message, code: catsErr.code })

  // Step 2: Try to insert category
  let catId: string | null = null
  const existingCat = (cats || []).find((c: any) => c.slug === 'tochnye-nauki')
  if (existingCat) {
    catId = existingCat.id
  } else {
    const { data: newCat, error: catErr } = await sb
      .from('categories')
      .insert({ slug: 'tochnye-nauki', label: 'Точные науки', sort_order: 3 })
      .select('id')
      .single()
    if (catErr) return NextResponse.json({ step: 'insert category', error: catErr.message, code: catErr.code, hint: catErr.hint })
    catId = newCat?.id
  }

  // Step 3: Check/create subject
  const { data: subs } = await sb.from('subjects').select('id, slug').eq('slug', 'matematika').maybeSingle()
  let subId: string | null = subs?.id ?? null
  if (!subId) {
    const { data: newSub, error: subErr } = await sb
      .from('subjects')
      .insert({ category_id: catId, slug: 'matematika', label: 'Математика', year: 1954, sort_order: 2 })
      .select('id')
      .single()
    if (subErr) return NextResponse.json({ step: 'insert subject', error: subErr.message, code: subErr.code })
    subId = newSub?.id
  }

  return NextResponse.json({ success: true, catId, subId, cats })
}
