import { getNavigation } from '@/lib/api'
import Link from 'next/link'

export default async function HomePage() {
  const categories = await getNavigation()
  const totalSubjects = categories.reduce((n, c) => n + (c.subjects?.length ?? 0), 0)
  const totalModules = categories.reduce(
    (n, c) => n + (c.subjects?.reduce((m, s) => m + (s.modules?.length ?? 0), 0) ?? 0), 0
  )

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-14 pt-4">
        <div className="ornament mb-6">✦ ✦ ✦</div>
        <h1
          className="text-4xl font-bold mb-4 leading-tight"
          style={{ color: 'var(--navy)' }}
        >
          Советское образование
        </h1>
        <p
          className="text-base mb-2 italic"
          style={{ color: 'var(--muted)' }}
        >
          Учебные материалы 1930–1955 годов в цифровом формате
        </p>
        <div
          className="inline-block h-0.5 w-24 mt-4 mb-6"
          style={{ background: 'var(--gold)' }}
        />
        <div
          className="flex justify-center gap-8 text-sm"
          style={{ color: 'var(--muted)' }}
        >
          <span><strong style={{ color: 'var(--navy)' }}>{categories.length}</strong> направления</span>
          <span><strong style={{ color: 'var(--navy)' }}>{totalSubjects}</strong> предметов</span>
          <span><strong style={{ color: 'var(--navy)' }}>{totalModules}</strong> уроков</span>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded border p-5"
            style={{
              background: 'var(--parchment)',
              borderColor: 'var(--border)',
            }}
          >
            <h2
              className="text-base font-bold mb-3 pb-2 border-b"
              style={{ color: 'var(--navy)', borderColor: 'var(--gold)' }}
            >
              {cat.label}
            </h2>
            <ul className="space-y-1">
              {cat.subjects?.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/${cat.slug}/${sub.slug}`}
                    className="text-sm flex justify-between items-center group"
                    style={{ color: 'var(--ink)' }}
                  >
                    <span className="group-hover:underline">{sub.label}</span>
                    {sub.year && (
                      <span
                        className="text-xs tabular-nums"
                        style={{ color: 'var(--muted)' }}
                      >
                        {sub.year} г.
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="ornament mt-12 mb-4">✦</div>
    </div>
  )
}
