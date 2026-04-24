import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PartnerCard } from '@/components/PartnerCard'
import { FeatureCard } from '@/components/FeatureCard'
import { getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Reveal } from '@/components/ui/Reveal'
import { Counter } from '@/components/ui/Counter'
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
  { value: 20,    suffix: '+', label: 'rokov na trhu',          sub: 'od roku 2004',            accent: 'var(--indigo)' },
  { value: 9,     suffix: '',  label: 'inštitúcií',             sub: '4 univerzity + 5 VŠ',     accent: 'var(--violet)' },
  { value: 50000, suffix: '+', label: 'aktívnych používateľov', sub: 'každý semester',           accent: 'var(--coral)' },
  { value: 100,   suffix: '%', label: 'kompatibilný',           sub: 's Bolonským procesom',     accent: 'var(--mint)' },
] as const

const capSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>
  </svg>
)
const fileSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/>
  </svg>
)
const shieldSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
)
const zapSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9z"/>
  </svg>
)
const globeSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
    <path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
  </svg>
)
const blocksSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/>
    <rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>
  </svg>
)

const features = [
  { icon: capSvg,    title: 'Študijná agenda',    desc: 'Kompletná správa štúdia od prijímacieho konania po promociu. Harmonogramy, rozvrhy, zápisné listy.', code: '01 / agenda',      accent: 'var(--orange)',  size: 'lg' as const, tags: ['Harmonogramy','Rozvrhy','Zápisné listy','Štátnice','Promócie'] },
  { icon: fileSvg,   title: 'E-prihláška',        desc: 'Online podanie prihlášky na štúdium. Uchádzači môžu sledovať stav prihlášky v reálnom čase.',          code: '02 / e-prihláška', accent: 'var(--amber)',   size: 'md' as const },
  { icon: shieldSvg, title: 'Bezpečnosť a GDPR',  desc: 'Splnenie všetkých zákonných požiadaviek. Audit trail, šifrovanie, zálohovanie a obnova dát.',           code: '03 / gdpr',        accent: 'var(--mint)',    size: 'md' as const },
  { icon: zapSvg,    title: 'Výkon a spoľahlivosť',desc: 'Systém zvláda záťažové špičky počas zápisov. SLA 99,9% dostupnosť počas semestra.',                    code: '04 / sla',         accent: 'var(--violet)',  size: 'md' as const },
  { icon: globeSvg,  title: 'Integrácie',          desc: 'Napojenie na SIMUS, CVTI, ISSP, ekonomické a knižničné systémy. Open API pre vlastné integrácie.',       code: '05 / api',         accent: 'var(--orange)',  size: 'md' as const },
  { icon: blocksSvg, title: 'Modularita',          desc: 'Nasaďte len to, čo potrebujete. Systém rastie s vašou inštitúciou — žiadne zbytočné funkcie.',          code: '06 / moduly',      accent: 'var(--amber)',   size: 'lg' as const, tags: ['Administrátor','Pedagóg','Referent','Študent','E-prihláška','Debata','Verejný portál','E-mobility','ECTS'] },
]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [partners, tn, t, tfoot] = await Promise.all([
    getPartners(),
    getTranslations('hero'),
    getTranslations('nav'),
    getTranslations('footer'),
  ])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />

      <HeroSection
        locale={locale}
        badge={tn('badge')}
        title1={tn('title1')}
        title2={tn('title2')}
        subtitle={tn('subtitle')}
        ctaPrimary={tn('ctaPrimary')}
        ctaSecondary={tn('ctaSecondary')}
      />

      <LogoStrip partners={partners} />

      {/* Stats */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
            style={{ background: 'var(--line)', borderColor: 'var(--line)' }}
          >
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="relative bg-[oklch(0.16_0.014_40)] p-8 md:p-10">
                <div
                  className="absolute top-0 left-0 h-[2px] w-12"
                  style={{ background: s.accent, boxShadow: `0 0 20px ${s.accent}` }}
                />
                <div className="mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--fg-4)' }}>
                  / {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-display text-[44px] md:text-[56px] leading-none text-white num-tick">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-[14px] font-medium" style={{ color: 'var(--fg)' }}>{s.label}</div>
                <div className="mt-1 text-[12.5px]" style={{ color: 'var(--fg-3)' }}>{s.sub}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="kicker">Modules · v2026.4</div>
              <h2 className="font-display text-[40px] md:text-[64px] mt-5 text-white leading-[0.95]">
                Čo{' '}<span className="gradient-text">MAIS ponúka</span>
              </h2>
              <p className="mt-6 text-[17px] max-w-xl" style={{ color: 'var(--fg-2)' }}>
                Komplexné riešenie pre všetky oblasti akademickej správy
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 60} className={f.size === 'lg' ? 'md:col-span-2' : ''}>
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  desc={f.desc}
                  code={f.code}
                  accent={f.accent}
                  size={f.size}
                  tags={f.tags}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ArchitectureSection />

      {/* Partners */}
      <section id="schools" className="relative py-28 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <Reveal>
              <div>
                <div className="kicker">Klienti · 9 aktívnych</div>
                <h2 className="font-display text-[40px] md:text-[64px] mt-5 text-white leading-[0.95] max-w-2xl">
                  Inštitúcie používajúce MAIS
                </h2>
                <p className="mt-5 text-[16px] max-w-lg" style={{ color: 'var(--fg-2)' }}>
                  Pridajte sa k špičkovým slovenským univerzitám a vysokým školám
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Link
                href={`/${locale}/podpora`}
                className="btn-ghost rounded-xl px-5 py-3 text-[13px] inline-flex items-center gap-2 self-start"
              >
                Zobraziť všetky školy
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((p, i) => (
              <Reveal key={p.id} delay={i * 40}>
                <PartnerCard partner={p} locale={locale} index={i} />
              </Reveal>
            ))}
          </div>

          {/* Student follow-up banner */}
          <Reveal delay={200}>
            <div className="mt-14 relative rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 opacity-70 pointer-events-none"
                style={{ background: 'radial-gradient(600px 200px at 20% 50%, oklch(0.78 0.2 45 / 0.14), transparent 70%), radial-gradient(500px 180px at 85% 50%, oklch(0.76 0.18 175 / 0.1), transparent 70%)' }}
              />
              <div className="relative glass rounded-2xl px-6 md:px-10 py-7 md:py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--orange-2)' }}>Pre študentov</span>
                    <span className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(90deg, oklch(0.78 0.2 45 / 0.4), transparent)' }} />
                  </div>
                  <div className="font-display text-white text-[22px] md:text-[26px] leading-[1.15]" style={{ textWrap: 'balance' } as React.CSSProperties}>
                    Nevieš sa prihlásiť alebo hľadáš e-prihlášku?
                  </div>
                  <div className="mt-2 text-[13.5px]" style={{ color: 'var(--fg-2)' }}>
                    Kompletný zoznam inštitúcií s priamymi kontaktmi na študijné oddelenia a linky na e-prihlášky.
                  </div>
                </div>
                <Link
                  href={`/${locale}/podpora`}
                  className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-medium inline-flex items-center gap-2 group self-start md:self-auto shrink-0"
                >
                  Prejsť na podporu
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-28 overflow-hidden">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-[-80px] cta-conic opacity-60 pointer-events-none" />
              <div className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden">
                <div className="beam always rounded-3xl" />
                <div className="absolute inset-0 dots opacity-20 pointer-events-none" />
                <div className="relative">
                  <div className="kicker justify-center inline-flex">MAIS na vašej UNI</div>
                  <h2 className="font-display text-[36px] md:text-[56px] mt-6 text-white leading-[1]" style={{ textWrap: 'balance' } as React.CSSProperties}>
                    Zaujal vás MAIS pre vašu inštitúciu?
                  </h2>
                  <p className="mt-6 text-[16px] md:text-[18px] max-w-xl mx-auto" style={{ color: 'var(--fg-2)' }}>
                    Kontaktujte nás pre demo a individuálnu ponuku nasadenia.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="mailto:podpora@mais.sk"
                      className="btn-primary rounded-xl px-7 py-4 text-[14px] font-medium inline-flex items-center gap-2 group"
                    >
                      Kontaktovať ITernal
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                    <a
                      href="tel:+421915724757"
                      className="btn-ghost rounded-xl px-7 py-4 text-[14px] font-medium inline-flex items-center gap-2"
                    >
                      <span className="mono" style={{ color: 'var(--mint)' }}>+421</span> 915 724 757
                    </a>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px]" style={{ color: 'var(--fg-3)' }}>
                    {['Bez viazanosti', 'Odpoveď do 24h', 'Nasadenie 3–6 mesiacov'].map(item => (
                      <span key={item} className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--mint)' }}><path d="M20 6 9 17l-5-5" /></svg>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
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
