'use client'

import { useState } from 'react'
import type { ExerciseContent, ExerciseOption } from '@/types'

interface Props {
  content: ExerciseContent
  options?: ExerciseOption[]
}

export default function ExerciseBlock({ content, options = [] }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const sorted = [...options].sort((a, b) => a.sort_order - b.sort_order)

  function getStyle(opt: ExerciseOption) {
    if (!selected) {
      return {
        background: 'white',
        border: '1px solid var(--border)',
        color: 'var(--ink)',
      }
    }
    if (opt.is_correct) {
      return { background: '#f0f7f0', border: '1px solid #3a7a3a', color: '#2a5a2a' }
    }
    if (opt.id === selected) {
      return { background: '#fdf0f0', border: '1px solid #8b2020', color: '#6a1a1a' }
    }
    return { background: 'white', border: '1px solid var(--border)', color: '#aaa' }
  }

  return (
    <div
      className="rounded-sm px-6 py-5"
      style={{ background: '#f7f0e4', border: '1px solid #d4b896' }}
    >
      <div
        className="text-xs font-bold uppercase tracking-widest mb-3 font-sans"
        style={{ color: 'var(--red)' }}
      >
        Упражнение
      </div>

      <p className="text-sm font-bold mb-4" style={{ color: 'var(--ink)' }}>
        {content.question}
      </p>

      <div className="space-y-2">
        {sorted.map((opt) => (
          <button
            key={opt.id}
            disabled={!!selected}
            onClick={() => setSelected(opt.id)}
            className="w-full text-left px-4 py-2.5 rounded-sm text-sm transition-all font-sans"
            style={getStyle(opt)}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {selected && (
        <p
          className="mt-4 text-xs font-sans"
          style={{ color: options.find((o) => o.id === selected)?.is_correct ? '#2a5a2a' : '#6a1a1a' }}
        >
          {options.find((o) => o.id === selected)?.is_correct
            ? '✓ Верно!'
            : `✗ Неверно. Правильный ответ: «${options.find((o) => o.is_correct)?.text}»`}
        </p>
      )}
    </div>
  )
}
