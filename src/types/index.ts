export type BlockType = 'text' | 'quote' | 'image' | 'video' | 'exercise' | 'pdf'

export interface Category {
  id: string
  slug: string
  label: string
  icon?: string
  sort_order: number
  subjects?: Subject[]
}

export interface Subject {
  id: string
  category_id: string
  slug: string
  label: string
  year?: number
  author?: string
  description?: string
  sort_order: number
  modules?: Module[]
}

export interface Module {
  id: string
  subject_id: string
  slug: string
  title: string
  sort_order: number
  blocks?: Block[]
}

export interface Block {
  id: string
  module_id?: string
  parent_id?: string
  type: BlockType
  sort_order: number
  content: BlockContent
  children?: Block[]
  exercise_options?: ExerciseOption[]
}

export interface ExerciseOption {
  id: string
  block_id: string
  text: string
  is_correct: boolean
  sort_order: number
}

// Content shapes per block type
export type BlockContent =
  | TextContent
  | QuoteContent
  | ImageContent
  | VideoContent
  | ExerciseContent
  | PdfContent

export interface TextContent {
  body: string
}

export interface QuoteContent {
  text: string
  author: string
  source?: string
}

export interface ImageContent {
  url: string
  alt?: string
  caption?: string
}

export interface VideoContent {
  embed_url: string
  title: string
  description?: string
  duration_minutes?: number
}

export interface ExerciseContent {
  question: string
}

export interface PdfContent {
  url: string
  title: string
  description?: string
}
