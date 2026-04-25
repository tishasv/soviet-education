import ReactMarkdown from 'react-markdown'
import type { TextContent } from '@/types'

interface Props {
  content: TextContent
}

export default function TextBlock({ content }: Props) {
  return (
    <div
      className="rounded-sm px-6 py-5 border-l-4 prose-soviet"
      style={{
        background: 'var(--parchment)',
        border: '1px solid var(--border)',
        borderLeftColor: 'var(--navy)',
        borderLeftWidth: '4px',
      }}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="text-sm leading-relaxed mb-3 last:mb-0" style={{ color: 'var(--ink)' }}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong style={{ color: 'var(--navy)' }}>{children}</strong>
          ),
          em: ({ children }) => <em>{children}</em>,
        }}
      >
        {content.body}
      </ReactMarkdown>
    </div>
  )
}
