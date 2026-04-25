'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Category } from '@/types'

interface Props {
  navigation: Category[]
}

export default function Sidebar({ navigation }: Props) {
  const pathname = usePathname()
  const [openCats, setOpenCats] = useState<Set<string>>(() => {
    // Pre-open the category that matches current path
    const set = new Set<string>()
    navigation.forEach((cat) => {
      if (pathname.startsWith(`/${cat.slug}`)) set.add(cat.id)
    })
    return set
  })

  function toggleCat(id: string) {
    setOpenCats((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <aside
      className="w-56 flex-shrink-0 hidden md:block overflow-y-auto"
      style={{ background: '#1e2e52', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {navigation.map((cat) => {
        const isOpen = openCats.has(cat.id)
        return (
          <div key={cat.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Category header */}
            <button
              onClick={() => toggleCat(cat.id)}
              className="w-full text-left px-4 py-2.5 flex justify-between items-center transition-colors hover:bg-white/5 font-sans"
              style={{ color: '#8494b0' }}
            >
              <span className="text-xs font-bold uppercase tracking-widest leading-none">
                {cat.label}
              </span>
              <span
                className="text-xs transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                ▶
              </span>
            </button>

            {/* Subjects + modules */}
            {isOpen && (
              <div className="pb-1.5">
                {cat.subjects?.map((sub) =>
                  sub.modules?.map((mod) => {
                    const href = `/${cat.slug}/${sub.slug}/${mod.slug}`
                    const isActive = pathname === href
                    return (
                      <Link
                        key={mod.id}
                        href={href}
                        className="block py-1.5 pl-6 pr-3 text-xs leading-snug transition-all"
                        style={{
                          color: isActive ? '#c8a240' : '#9facc0',
                          borderLeft: isActive
                            ? '2px solid #c8a240'
                            : '2px solid transparent',
                          background: isActive ? 'rgba(200,162,64,0.1)' : 'transparent',
                          fontFamily: "'PT Sans', sans-serif",
                        }}
                      >
                        {mod.title}
                      </Link>
                    )
                  })
                )}
              </div>
            )}
          </div>
        )
      })}
    </aside>
  )
}
