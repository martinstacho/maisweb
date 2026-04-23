import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PartnerCard } from '@/components/PartnerCard'
import { GraduationCap, Shield, Zap, Globe, ArrowRight, CheckCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NumberTicker } from '@/components/ui/number-ticker'
import { AuroraText } from '@/components/ui/aurora-text'
import { getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { FadeIn } from '@/components/FadeIn'
import { FeatureCard } from '@/components/FeatureCard'

export const dynamic = 'force-dynamic'

async function getPartners() {
  return prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    take: 6,
  })
}

const stats = [
  { value: 20, suffix: '+', tKey: 'years', subKey: 'yearsSub' },
  { value: 8, suffix: '', tKey: 'institutions', subKey: 'institutionsSub' },
  { value: 50000, suffix: '+', tKey: 'users', subKey: 'usersSub' },
  { value: 100, suffix: '%', tKey: 'compatible', subKey: 'compatibleSub' },
] as const

const featureKeys = [
  { icon: GraduationCap, key: 'studyAgenda', descKey: 'studyAgendaDesc' },
  { icon: FileText, key: 'eApplication', descKey: 'eApplicationDesc' },
  { icon: Shield, key: 'security', descKey: 'securityDesc' },
  { icon: Zap, key: 'performance', descKey: 'performanceDesc' },
  { icon: Globe, key: 'integrations', descKey: 'integrationsDesc' },
  { icon: CheckCircle, key: 'modular', descKey: 'modularDesc' },
] as const

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [partners, t, tn, tf, tp, tc, tf2, tfoot] = await Promise.all([
    getPartners(),
    getTranslations('nav'),
    getTranslations('hero'),
    getTranslations('stats'),
    getTranslations('partners'),
    getTranslations('cta'),
    getTranslations('features'),
    getTranslations('footer'),
  ])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar locale={locale} labels={{
        schools: t('schools'),
        forInstitutions: t('forInstitutions'),
        support: t('support'),
        contact: t('contact'),
        cta: t('cta'),
      }} />

      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-65px)] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        <FadeIn className="relative z-10 max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            {tn('badge')}
          </div>
          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
            <AuroraText>{tn('title1')}</AuroraText>
            <br />
            <span className="text-slate-100">{tn('title2')}</span>
          </h1>
          <p className="mb-10 text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {tn('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/skoly`}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8">
                {tn('ctaPrimary')} <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link href={`/${locale}/pre-institucie`}>
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8">
                {tn('ctaSecondary')}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={s.tKey} delay={i * 0.1} className="text-center">
                <div className="text-4xl font-black text-slate-100 mb-1">
                  <NumberTicker value={s.value} className="text-slate-100" />{s.suffix}
                </div>
                <div className="text-sm font-medium text-slate-300">{tf(s.tKey)}</div>
                <div className="text-xs text-slate-500 mt-0.5">{tf(s.subKey)}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <FadeIn className="mb-16 text-center">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl mb-4">{tf2('title')}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{tf2('subtitle')}</p>
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((f, i) => (
            <FadeIn key={f.key} delay={i * 0.08}>
              <FeatureCard icon={<f.icon size={24} />} title={tf2(f.key)} desc={tf2(f.descKey)} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-slate-800 bg-slate-900/30 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-12 text-center">
            <h2 className="text-3xl font-black tracking-tight md:text-5xl mb-4">{tp('title')}</h2>
            <p className="text-slate-400">{tp('subtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((p) => <PartnerCard key={p.id} partner={p} locale={locale} />)}
            </div>
          </FadeIn>
          {partners.length >= 6 && (
            <div className="mt-10 text-center">
              <Link href={`/${locale}/skoly`}>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  {tp('showAll')} <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <FadeIn>
          <div className="mx-auto max-w-3xl rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 p-12 text-center">
            <h2 className="mb-4 text-3xl font-black md:text-4xl">{tc('title')}</h2>
            <p className="mb-8 text-slate-400">{tc('subtitle')}</p>
            <Link href={`/${locale}/kontakt`}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10">
                {tc('button')}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <div className="text-lg font-black text-slate-100 mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent w-fit">MAIS</div>
            <p>{tfoot('tagline')}</p>
          </div>
          <div>
            <div className="font-semibold text-slate-300 mb-3">{tfoot('navigation')}</div>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}/skoly`} className="hover:text-slate-100">{t('schools')}</Link>
              <Link href={`/${locale}/pre-institucie`} className="hover:text-slate-100">{t('forInstitutions')}</Link>
              <Link href={`/${locale}/podpora`} className="hover:text-slate-100">{t('support')}</Link>
              <Link href={`/${locale}/kontakt`} className="hover:text-slate-100">{t('contact')}</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-slate-300 mb-3">ITernal s.r.o.</div>
            <p>Sládkovičova 533/20</p>
            <p>018 41 Dubnica nad Váhom</p>
            <p className="mt-2"><a href="tel:+421915724757" className="hover:text-slate-100">+421 915 724 757</a></p>
            <p><a href="mailto:podpora@mais.sk" className="hover:text-slate-100">podpora@mais.sk</a></p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} ITernal s.r.o. · {tfoot('rights')}
        </div>
      </footer>
    </div>
  )
}
