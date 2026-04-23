import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PartnerCard } from '@/components/PartnerCard'
import { GraduationCap, Shield, Zap, Globe, CheckCircle, FileText } from 'lucide-react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { FadeIn } from '@/components/FadeIn'
import { FeatureCard } from '@/components/FeatureCard'
import { HeroSection } from '@/components/HeroSection'
import { LogoStrip } from '@/components/LogoStrip'
import { MaisFooter } from '@/components/MaisFooter'
import { ArchitectureSection } from '@/components/ArchitectureSection'

export const dynamic = 'force-dynamic'

async function getPartners() {
  return prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
    take: 9,
  })
}

const stats = [
  { value: 22, suffix: '', label: 'rokov na trhu', sub: 'od roku 2004' },
  { value: 9, suffix: '', label: 'inštitúcií', sub: '3 verejné · 3 štátne · 3 súkromné' },
  { value: 50000, suffix: '+', label: 'aktívnych používateľov', sub: 'každý semester' },
  { value: 100, suffix: '%', label: 'kompatibilný', sub: 's Bolonským procesom' },
] as const

const features = [
  { icon: GraduationCap, title: 'Študijná agenda', desc: 'Kompletná správa štúdia od prijímacieho konania po promociu. Harmonogramy, rozvrhy, zápisné listy.' },
  { icon: FileText, title: 'E-prihláška', desc: 'Online podanie prihlášky na štúdium. Uchádzači môžu sledovať stav prihlášky v reálnom čase.' },
  { icon: Shield, title: 'Bezpečnosť a GDPR', desc: 'Splnenie všetkých zákonných požiadaviek. Audit trail, šifrovanie, zálohovanie a obnova dát.' },
  { icon: Zap, title: 'Výkon a spoľahlivosť', desc: 'Systém zvláda záťažové špičky počas zápisov. SLA 99,9% dostupnosť počas semestra.' },
  { icon: Globe, title: 'Integrácie', desc: 'Napojenie na SIMUS, CVTI, ISSP, ekonomické a knižničné systémy. Open API pre vlastné integrácie.' },
  { icon: CheckCircle, title: 'Modularita', desc: 'Nasaďte len to, čo potrebujete. Systém rastie s vašou inštitúciou — žiadne zbytočné funkcie.' },
] as const

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [partners, tn, t, tfoot] = await Promise.all([
    getPartners(),
    getTranslations('hero'),
    getTranslations('nav'),
    getTranslations('footer'),
  ])

  return (
    <div className="min-h-screen" style={{ background: 'var(--mais-bg)', color: 'var(--mais-fg)' }}>
      <Navbar locale={locale} labels={{
        features: t('features'),
        schools: t('schools'),
        forInstitutions: t('forInstitutions'),
        support: t('support'),
        contact: t('contact'),
        cta: t('cta'),
      }} />

      <HeroSection
        locale={locale}
        badge={tn('badge')}
        title1={tn('title1')}
        title2={tn('title2')}
        subtitle={tn('subtitle')}
        ctaPrimary={tn('ctaPrimary')}
        ctaSecondary={tn('ctaSecondary')}
      />

      <LogoStrip />

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="mais-bento-card p-6 text-center">
                <div className="mais-stripe" style={{ opacity: 1 }} />
                <div className="font-display text-[44px] leading-none mb-1.5" style={{ color: 'var(--mais-fg)' }}>
                  <NumberTicker value={s.value} />{s.suffix}
                </div>
                <div className="text-[13px] font-medium mb-0.5" style={{ color: 'var(--mais-fg-2)' }}>{s.label}</div>
                <div className="mono text-[10px] tracking-wider" style={{ color: 'var(--mais-fg-4)' }}>{s.sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <FadeIn className="mb-12 text-center">
          <div className="mais-kicker mb-4">Čo MAIS ponúka</div>
          <h2 className="font-display text-[36px] md:text-[52px] leading-tight" style={{ color: 'var(--mais-fg)' }}>
            Komplexná správa<br />
            <span className="mais-gradient-text">akademickej agendy</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <FeatureCard icon={<f.icon size={22} />} title={f.title} desc={f.desc} />
            </FadeIn>
          ))}
        </div>
      </section>

      <ArchitectureSection />

      {/* Partners */}
      <section className="border-t py-24 px-6" style={{ borderColor: 'var(--mais-line)', background: 'var(--mais-bg-2)' }}>
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-12 text-center">
            <div className="mais-kicker mb-4">Inštitúcie</div>
            <h2 className="font-display text-[36px] md:text-[52px] leading-tight" style={{ color: 'var(--mais-fg)' }}>
              Inštitúcie <span className="mais-gradient-text">používajúce MAIS</span>
            </h2>
            <p className="mt-4 text-[15px]" style={{ color: 'var(--mais-fg-3)' }}>
              Pridajte sa k špičkovým slovenským univerzitám a vysokým školám
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((p, i) => <PartnerCard key={p.id} partner={p} locale={locale} index={i} />)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <FadeIn>
          <div className="mx-auto max-w-3xl rounded-3xl p-px" style={{ background: 'linear-gradient(135deg, oklch(0.55 0.22 40 / 0.5), oklch(0.4 0.15 40 / 0.2) 50%, oklch(0.55 0.22 40 / 0.5))' }}>
            <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(180deg, oklch(0.22 0.018 40 / 0.95), oklch(0.16 0.014 40 / 0.95))' }}>
              <div className="mais-cta-conic absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 opacity-25 pointer-events-none" />
              <div className="mais-kicker justify-center mb-6">Záujem o MAIS?</div>
              <h2 className="font-display text-[32px] md:text-[44px] leading-tight mb-4" style={{ color: 'var(--mais-fg)' }}>
                Zaujal vás MAIS<br /><span className="mais-gradient-text">pre vašu inštitúciu?</span>
              </h2>
              <p className="mb-8 text-[15px]" style={{ color: 'var(--mais-fg-3)' }}>
                Kontaktujte nás pre demo a individuálnu ponuku nasadenia.
              </p>
              <Link href={`/${locale}/kontakt`}
                className="mais-btn-primary rounded-xl px-8 py-3.5 text-[14px] font-medium inline-flex items-center gap-2">
                Kontaktovať ITernal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <MaisFooter locale={locale} labels={{
        tagline: tfoot('tagline'),
        navigation: tfoot('navigation'),
        rights: tfoot('rights'),
        schools: t('schools'),
        forInstitutions: t('forInstitutions'),
        support: t('support'),
        contact: t('contact'),
      }} />
    </div>
  )
}
