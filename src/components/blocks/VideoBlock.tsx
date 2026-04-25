import type { VideoContent } from '@/types'

interface Props {
  content: VideoContent
}

export default function VideoBlock({ content }: Props) {
  // Detect YouTube embed
  const isYouTube = content.embed_url?.includes('youtube') || content.embed_url?.includes('youtu.be')

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{ background: 'var(--navy)' }}
    >
      {content.embed_url && isYouTube ? (
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={content.embed_url}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            title={content.title}
          />
        </div>
      ) : (
        <div className="flex items-center gap-4 px-5 py-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--gold)' }}
          >
            <span
              className="text-base ml-0.5"
              style={{ color: 'var(--navy)', lineHeight: 1 }}
            >
              ▶
            </span>
          </div>
          <div>
            <div
              className="text-sm font-bold mb-0.5"
              style={{ color: '#e8dfc8', fontFamily: "'PT Sans', sans-serif" }}
            >
              {content.title}
            </div>
            <div className="text-xs" style={{ color: '#8494b0' }}>
              {content.description}
              {content.duration_minutes && ` • ${content.duration_minutes} мин`}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
