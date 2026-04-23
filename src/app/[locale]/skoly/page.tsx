import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PartnerCard } from '@/components/PartnerCard'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export const dynamic = 'force-dynamic'

export default async function SkolyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [t, tn] = await Promise.all([
    getTranslations('schools'),
    getTranslations('nav'),
  ])
  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
              <ArrowLeft size={16} /> {t('back')}
            </Link>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MAIS</span>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tight md:text-6xl mb-4">{t('title')}</h1>
          <p className="text-slate-400 text-lg">{partners.length} — {t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {partners.map((p) => <PartnerCard key={p.id} partner={p} locale={locale} />)}
        </div>
      </main>
    </div>
  )
}
