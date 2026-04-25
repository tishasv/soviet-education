import type { Block } from '@/types'
import TextBlock from './TextBlock'
import QuoteBlock from './QuoteBlock'
import ImageBlock from './ImageBlock'
import VideoBlock from './VideoBlock'
import ExerciseBlock from './ExerciseBlock'
import PdfBlock from './PdfBlock'

interface Props {
  block: Block
  depth?: number
}

export default function BlockRenderer({ block, depth = 0 }: Props) {
  const Component = {
    text:     TextBlock,
    quote:    QuoteBlock,
    image:    ImageBlock,
    video:    VideoBlock,
    exercise: ExerciseBlock,
    pdf:      PdfBlock,
  }[block.type]

  if (!Component) return null

  return (
    <div className={depth > 0 ? 'ml-4 border-l-2 pl-4' : ''} style={{ borderColor: 'var(--border)' }}>
      {/* @ts-expect-error union content types */}
      <Component content={block.content} options={block.exercise_options} />

      {/* Render children recursively */}
      {block.children && block.children.length > 0 && (
        <div className="mt-3 space-y-3">
          {block.children.map((child) => (
            <BlockRenderer key={child.id} block={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
