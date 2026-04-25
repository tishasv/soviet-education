'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface SearchResult {
  id: string
  slug: string
  title: string
  subjects: {
    slug: string
    label: string
    categories: { slug: string; label: string }
  }
}

export default function Header() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (query.length < 2) { setResults([]); setOpen(false); return }
    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      const res = await fetch(`/api/subjects/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
      setOpen(true)
    }, 250)
  }, [query])

  return (
    <header
      className="flex items-stretch gap-0 border-b-[3px]"
      style={{ background: 'var(--navy)', borderColor: 'var(--gold)' }}
    >
      <div className="flex-1 px-6 py-3.5">
        <Link href="/" className="block">
          <div
            className="text-base font-bold tracking-wider"
            style={{ color: '#e8dfc8', fontFamily: "'PT Serif', serif" }}
          >
            Советское образование
          </div>
          <div
            className="text-xs tracking-widest uppercase mt-0.5"
            style={{ color: '#9a8e7a', fontFamily: "'PT Sans', sans-serif" }}
          >
            Учебные материалы 1930–1955 гг.
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center px-6 relative">
        <input
          type="text"
          placeholder="Поиск по урокам…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="text-sm px-3 py-1.5 rounded-sm w-52 font-sans"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#e8dfc8',
            outline: 'none',
          }}
        />
        {open && results.length > 0 && (
          <div
            className="absolute top-full right-6 w-80 rounded-sm shadow-lg z-50 py-1"
            style={{ background: 'var(--parchment)', border: '1px solid var(--border)' }}
          >
            {results.map((r) => (
              <Link
                key={r.id}
                href={`/${r.subjects.categories.slug}/${r.subjects.slug}/${r.slug}`}
                className="flex flex-col px-4 py-2 hover:bg-amber-50 block"
                onClick={() => { setOpen(false); setQuery('') }}
              >
                <span className="text-sm" style={{ color: 'var(--navy)' }}>{r.title}</span>
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {r.subjects.categories.label} › {r.subjects.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
