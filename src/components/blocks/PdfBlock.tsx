import type { PdfContent } from '@/types'

interface Props {
  content: PdfContent
}

export default function PdfBlock({ content }: Props) {
  return (
    <a
      href={content.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-sm px-5 py-4 transition-opacity hover:opacity-80"
      style={{
        background: 'var(--parchment)',
        border: '1px solid var(--border)',
        textDecoration: 'none',
      }}
    >
      <div
        className="w-10 h-12 flex items-center justify-center rounded-sm flex-shrink-0 text-xs font-bold"
        style={{ background: 'var(--red)', color: '#f0e6d8' }}
      >
        PDF
      </div>
      <div>
        <div className="text-sm font-bold" style={{ color: 'var(--navy)' }}>
          {content.title}
        </div>
        {content.description && (
          <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            {content.description}
          </div>
        )}
      </div>
    </a>
  )
}
