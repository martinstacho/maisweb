import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default async function PreInstituciePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [t, tn] = await Promise.all([
    getTranslations('institutions'),
    getTranslations('contact'),
  ])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-6">
      <nav className="fixed top-0 left-0 right-0 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
            <ArrowLeft size={16} /> {t('back')}
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
      <div className="text-center max-w-2xl">
        <div className="mb-4 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">{t('comingSoon')}</div>
        <h1 className="text-4xl font-black md:text-6xl mb-6">{t('title')}</h1>
        <p className="text-slate-400 text-lg mb-8">{t('subtitle')}</p>
        <Link href={`/${locale}/kontakt`}>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">{t('contactUs')}</Button>
        </Link>
      </div>
    </div>
  )
}
