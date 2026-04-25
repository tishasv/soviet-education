import type { QuoteContent } from '@/types'

interface Props {
  content: QuoteContent
}

export default function QuoteBlock({ content }: Props) {
  return (
    <div
      className="rounded-sm px-5 py-4"
      style={{
        background: '#f0ebe0',
        borderLeft: '4px solid var(--gold)',
      }}
    >
      <blockquote
        className="text-sm italic leading-relaxed mb-2"
        style={{ color: 'var(--muted)' }}
      >
        «{content.text}»
      </blockquote>
      <cite
        className="text-xs not-italic block"
        style={{ color: 'var(--navy)' }}
      >
        — {content.author}
        {content.source && (
          <span style={{ color: 'var(--muted)' }}>, {content.source}</span>
        )}
      </cite>
    </div>
  )
}
