import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { FadeIn } from '@/components/FadeIn'
import { MaisFooter } from '@/components/MaisFooter'

const timeline = [
  { year: '2004', label: 'Vznik systému', desc: 'MAIS nasadený na prvej partnerskej inštitúcii v Dubnici.' },
  { year: '2008', label: 'Bolonský proces', desc: 'Plná kompatibilita s dvojstupňovým systémom štúdia.' },
  { year: '2013', label: 'E-prihláška', desc: 'Online podávanie prihlášok s real-time sledovaním stavu.' },
  { year: '2018', label: 'GDPR modul', desc: 'Plné splnenie nariadení GDPR a NIS2 smernice.' },
  { year: '2024', label: 'Open API', desc: 'RESTful API pre integrácie s externými systémami.' },
  { year: '2026', label: 'MAIS v2026', desc: 'Nová generácia — cloud-native, modularita, performance.' },
]

const whyItems = [
  { title: '22 rokov skúseností', desc: 'Dlhodobé partnerstvá a hĺbková znalosť slovenského vysokoškolského prostredia.' },
  { title: 'Lokálna podpora', desc: 'Tím v SR, slovensky, rýchla odozva. Žiadny call centrum v zahraničí.' },
  { title: 'Šitý na mieru', desc: 'Konfigurácia podľa vašich procesov — nie opačne.' },
  { title: 'Integrácie', desc: 'SIMUS, CVTI, ISSP, ekonomické a knižničné systémy. Open API.' },
  { title: 'Bezpečnosť', desc: 'GDPR, NIS2, audit trail, šifrovanie, zálohy, SLA 99,9%.' },
  { title: 'Modulárny rast', desc: 'Nasaďte základný systém a rozširujte podľa potreby.' },
]

export default async function PreInstituciePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [t, tfoot] = await Promise.all([
    getTranslations('nav'),
    getTranslations('footer'),
  ])

  return (
    <div className="min-h-screen" style={{ background: 'var(--mais-bg)', color: 'var(--mais-fg)' }}>
      <Navbar locale={locale} labels={{
        schools: t('schools'),
        forInstitutions: t('forInstitutions'),
        support: t('support'),
        contact: t('contact'),
        cta: t('cta'),
      }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 noise" style={{ background: 'var(--mais-bg)' }}>
        <div className="absolute inset-0 mais-hero-grid-sm pointer-events-none" />
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, oklch(0.65 0.24 38 / 0.35), transparent 60%)' }} />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <FadeIn>
            <div className="mais-kicker justify-center mb-6">Pre inštitúcie</div>
            <h1 className="font-display text-[52px] md:text-[80px] leading-[0.92] mb-6">
              <span className="mais-gradient-text">Akademický systém,</span>
              <br />
              <span style={{ color: 'var(--mais-fg)' }}>ktorý naozaj funguje</span>
            </h1>
            <p className="text-[17px] md:text-[19px] leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: 'var(--mais-fg-2)' }}>
              MAIS je overený systém pre správu celej akademickej agendy. Nasaďte ho a zabudnite na papierovú byrokraciu.
            </p>
            <Link href={`/${locale}/kontakt`}
              className="mais-btn-primary rounded-xl px-8 py-4 text-[15px] font-medium inline-flex items-center gap-2.5">
              Požiadať o demo
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Why MAIS */}
      <section className="border-t px-6 py-24" style={{ borderColor: 'var(--mais-line)', background: 'var(--mais-bg-2)' }}>
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-12 text-center">
            <div className="mais-kicker justify-center mb-4">Prečo MAIS</div>
            <h2 className="font-display text-[36px] md:text-[52px]" style={{ color: 'var(--mais-fg)' }}>
              Čo nás odlišuje
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.07}>
                <div className="mais-bento-card p-7">
                  <div className="mais-stripe" />
                  <div className="mais-tech-dot mb-4" />
                  <div className="font-semibold text-[15px] mb-2" style={{ color: 'var(--mais-fg)' }}>{item.title}</div>
                  <div className="text-[13px] leading-relaxed" style={{ color: 'var(--mais-fg-3)' }}>{item.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <FadeIn className="mb-14 text-center">
            <div className="mais-kicker justify-center mb-4">História</div>
            <h2 className="font-display text-[36px] md:text-[52px]" style={{ color: 'var(--mais-fg)' }}>
              22 rokov <span className="mais-gradient-text">vývoja</span>
            </h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-px" style={{ background: 'var(--mais-line)' }} />
            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.08}>
                  <div className="flex items-start gap-6">
                    <div className="relative flex-shrink-0" style={{ width: 56 }}>
                      <div className="mais-tl-dot" />
                    </div>
                    <div className="pb-4">
                      <div className="mono text-[11px] tracking-wider mb-1" style={{ color: 'var(--mais-orange)' }}>{item.year}</div>
                      <div className="font-semibold text-[15px] mb-1" style={{ color: 'var(--mais-fg)' }}>{item.label}</div>
                      <div className="text-[13px] leading-relaxed" style={{ color: 'var(--mais-fg-3)' }}>{item.desc}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <FadeIn>
          <div className="mx-auto max-w-3xl rounded-3xl p-px" style={{ background: 'linear-gradient(135deg, oklch(0.55 0.22 40 / 0.5), oklch(0.4 0.15 40 / 0.2) 50%, oklch(0.55 0.22 40 / 0.5))' }}>
            <div className="relative overflow-hidden rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(180deg, oklch(0.22 0.018 40 / 0.95), oklch(0.16 0.014 40 / 0.95))' }}>
              <div className="mais-cta-conic absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 opacity-25 pointer-events-none" />
              <div className="mais-kicker justify-center mb-6">Ste pripravení?</div>
              <h2 className="font-display text-[32px] md:text-[44px] leading-tight mb-4" style={{ color: 'var(--mais-fg)' }}>
                Dohodnime si <span className="mais-gradient-text">prezentáciu</span>
              </h2>
              <p className="mb-8 text-[15px]" style={{ color: 'var(--mais-fg-3)' }}>
                Individuálna demo ukážka, zodpovedáme vaše otázky, pripravíme ponuku.
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
