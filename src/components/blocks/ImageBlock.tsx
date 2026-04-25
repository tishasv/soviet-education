import type { ImageContent } from '@/types'
import Image from 'next/image'

interface Props {
  content: ImageContent
}

export default function ImageBlock({ content }: Props) {
  return (
    <figure
      className="rounded-sm overflow-hidden"
      style={{ background: 'var(--parchment)', border: '1px solid var(--border)' }}
    >
      {content.url ? (
        <div className="relative w-full" style={{ minHeight: '200px' }}>
          <Image
            src={content.url}
            alt={content.alt ?? ''}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-10"
          style={{ background: '#e8e0d0', minHeight: '140px' }}
        >
          <span className="text-4xl opacity-30 mb-2">🖼</span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            Иллюстрация из учебника
          </span>
        </div>
      )}
      {content.caption && (
        <figcaption
          className="px-4 py-2.5 text-xs italic border-t"
          style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
        >
          {content.caption}
        </figcaption>
      )}
    </figure>
  )
}
