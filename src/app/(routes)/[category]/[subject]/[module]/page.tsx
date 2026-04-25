import { notFound } from 'next/navigation'
import { getModule, getSubjectMeta } from '@/lib/api'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import type { Metadata } from 'next'

interface Props {
  params: {
    category: string
    subject: string
    module: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mod = await getModule(params.category, params.subject, params.module)
  if (!mod) return { title: 'Урок не найден' }
  return { title: `${mod.title} — Советское образование` }
}

export default async function LessonPage({ params }: Props) {
  const [mod, subjectMeta] = await Promise.all([
    getModule(params.category, params.subject, params.module),
    getSubjectMeta(params.subject),
  ])

  if (!mod) notFound()

  const subject = subjectMeta as any
  const category = subject?.categories

  return (
    <article className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--muted)' }}>
        <a href="/" className="hover:underline" style={{ color: 'var(--navy)' }}>
          Главная
        </a>
        <span>›</span>
        <span style={{ color: 'var(--navy)' }}>{category?.label}</span>
        <span>›</span>
        <span style={{ color: 'var(--navy)' }}>{subject?.label}</span>
        <span>›</span>
        <span>{mod.title}</span>
      </nav>

      {/* Lesson header */}
      <header className="mb-8 pb-5 border-b-2" style={{ borderColor: 'var(--gold)' }}>
        <span
          className="inline-block text-xs px-2.5 py-0.5 rounded-sm mb-3 font-sans font-bold tracking-widest uppercase"
          style={{ background: 'var(--red)', color: '#f0e6d8' }}
        >
          {subject?.label}
        </span>
        <h1
          className="text-2xl font-bold leading-snug mb-2"
          style={{ color: 'var(--navy)' }}
        >
          {mod.title}
        </h1>
        {(subject?.author || subject?.year) && (
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            {subject.author && <span>{subject.author}</span>}
            {subject.author && subject.year && <span> · </span>}
            {subject.year && <span>{subject.year} г.</span>}
          </p>
        )}
      </header>

      {/* Content blocks */}
      <div className="space-y-5">
        {mod.blocks?.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>

      {/* Footer ornament */}
      <div className="ornament mt-12 mb-2">✦ ✦ ✦</div>
    </article>
  )
}
