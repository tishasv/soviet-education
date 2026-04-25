import type { Metadata } from 'next'
import './globals.css'
import { getNavigation } from '@/lib/api'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Советское образование',
  description: 'Учебные материалы сталинского периода 1930–1955 гг.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = await getNavigation()

  return (
    <html lang="ru">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar navigation={navigation} />
            <main className="flex-1 min-w-0 p-8 lg:p-10">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
