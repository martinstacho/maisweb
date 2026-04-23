import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getTranslations } from 'next-intl/server'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [t, tn] = await Promise.all([
    getTranslations('contact'),
    getTranslations('nav'),
  ])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <LanguageSwitcher />
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-black tracking-tight md:text-6xl mb-4">{t('title')}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-6 text-slate-200">ITernal s.r.o.</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-indigo-400" />
                  <div><div>Sládkovičova 533/20</div><div>018 41 Dubnica nad Váhom</div></div>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Phone size={18} className="shrink-0 text-indigo-400" />
                  <a href="tel:+421915724757" className="hover:text-slate-100">+421 915 724 757</a>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail size={18} className="shrink-0 text-indigo-400" />
                  <a href="mailto:podpora@mais.sk" className="hover:text-slate-100">podpora@mais.sk</a>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
            <h2 className="text-xl font-bold mb-6 text-slate-200">{t('send')}</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">{t('name')}</Label>
                  <Input placeholder="Ján Novák" className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">{t('email')}</Label>
                  <Input type="email" placeholder="jan@univerzita.sk" className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">{t('message')}</Label>
                <textarea rows={5} className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
              <Button type="button" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">{t('send')}</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
