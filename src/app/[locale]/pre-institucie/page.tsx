'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { PARTNERS_STATIC } from '@/lib/partners-data'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
)

const CapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>
  </svg>
)
const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/>
  </svg>
)
const PuzzleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1a7.03 7.03 0 0 0-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4a.488.488 0 0 0-.49.42l-.38 2.65c-.61.25-1.17.58-1.69.98l-2.49-1a.488.488 0 0 0-.61.22l-2 3.46a.493.493 0 0 0 .12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46a.493.493 0 0 0-.12-.64l-2.11-1.65z"/>
  </svg>
)
const FlagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22V4a2 2 0 0 1 2-2h14l-3 6 3 6H6"/>
  </svg>
)

const whyPoints = [
  {
    icon: <PuzzleIcon />,
    title: 'Systém šitý na mieru',
    desc: 'Nepredávame krabicové riešenie. MAIS prispôsobujeme konkrétnym potrebám každej inštitúcie – od procesov prijímacieho konania až po integráciu s vašimi existujúcimi systémami.',
    tags: ['Vlastné procesy', 'Individuálna konfigurácia', 'Lokálna legislatíva', 'Priama komunikácia'],
    accent: 'var(--orange)',
  },
  {
    icon: <PuzzleIcon />,
    title: 'Modulárny prístup',
    desc: 'Nasaďte len moduly ktoré potrebujete. Systém rozširujete podľa rastu školy.',
    stat: '12 modulov', statLabel: 'nezávisle nasaditeľných',
    accent: 'var(--amber)',
  },
  {
    icon: <FlagIcon />,
    title: 'Slovenská legislatíva',
    desc: 'Plná kompatibilita s požiadavkami MŠVVaŠ SR, Bolonský proces, GDPR.',
    stat: '100%', statLabel: 'kompatibilita s MŠVVaŠ SR',
    accent: 'var(--mint)',
  },
]

const bentoSmall = [
  { title: 'SIMUS integrácia', hint: 'Centrálny register študijných programov' },
  { title: 'CVTI reporting', hint: 'Automatické dávky, výkazy, exporty' },
  { title: 'Knižničné systémy', hint: 'Napojenie na Dawinci / Aleph' },
  { title: 'Ekonomické systémy', hint: 'SAP, Kros, iSpin' },
  { title: 'LDAP / OAuth2', hint: 'SSO, Active Directory, eduID.sk' },
  { title: 'PostgreSQL databáza', hint: 'Open-source, enterprise výkon' },
]

const quotes = [
  { text: 'MAIS nám umožnil digitalizovať celé prijímacie konanie. Počet papierových prihlášok klesol na nulu.', role: 'IT oddelenie', school: 'TUKE' },
  { text: 'Implementácia prebehla hladko, podpora ITernalu bola výborná počas celého procesu.', role: 'Kvestorát', school: 'TRUNI' },
  { text: 'Systém zvládol záťaž zápisného týždňa bez jediného výpadku. 8 000 zápisov za 3 dni.', role: 'Správca systému', school: 'SZU' },
]


function Navbar({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 12)
    onS(); window.addEventListener('scroll', onS, { passive: true })
    return () => window.removeEventListener('scroll', onS)
  }, [])
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b backdrop-blur-xl' : 'bg-transparent'}`}
      style={scrolled ? { borderColor: 'var(--line)', background: 'oklch(0.14 0.012 40 / 0.8)' } : undefined}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-9 overflow-hidden transition-transform group-hover:scale-[1.04]" style={{ filter: 'drop-shadow(0 6px 20px oklch(0.65 0.22 40 / 0.45))' }}>
            <Image src="/logo-mais.png" alt="MAIS" width={36} height={36} className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-[17px] tracking-tight" style={{ color: 'var(--fg)' }}>MAIS</span>
          <span className="chip-mono hidden sm:inline-flex">v2026</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-[13.5px]" style={{ color: 'var(--fg-2)' }}>
          <Link href={`/${locale}#features`} className="ln hover:text-white transition-colors">Funkcie</Link>
          <Link href={`/${locale}#schools`} className="ln hover:text-white transition-colors">Školy</Link>
          <Link href={`/${locale}/pre-institucie`} className="ln text-white" aria-current="page">Pre inštitúcie</Link>
          <Link href={`/${locale}/podpora`} className="ln hover:text-white transition-colors">Podpora</Link>
          <Link href="#contact" className="ln hover:text-white transition-colors">Kontakt</Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 chip-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--mint)' }} />
            SK · EN · UK
          </div>
          <a href="mailto:iternal@iternal.sk?subject=Žiadosť o prezentáciu MAIS" className="btn-primary rounded-lg px-4 py-2 text-[13px] font-medium inline-flex items-center gap-1.5">
            Prezentácia <ArrowIcon />
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero({ locale }: { locale: string }) {
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = heroRef.current; if (!el) return
    const mv = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', mv)
    return () => el.removeEventListener('mousemove', mv)
  }, [])
  const featured = ['TUKE', 'TRUNI', 'SZU', 'UNIPO']
  return (
    <section ref={heroRef} className="relative overflow-hidden noise min-h-[88vh] flex items-center">
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="absolute inset-0 spotlight pointer-events-none" />
      <div className="absolute top-[-120px] left-[-140px] w-[560px] h-[560px] rounded-full blob-a blob-gradient-a pointer-events-none" />
      <div className="absolute bottom-[-160px] right-[-140px] w-[520px] h-[520px] rounded-full blob-b blob-gradient-b pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-20 md:pt-28 md:pb-28 w-full">
        <Reveal><div className="kicker">Pre rektorov, kvestorov a IT riaditeľov</div></Reveal>
        <Reveal delay={80}>
          <h1 className="font-display mt-5 text-[48px] md:text-[88px] leading-[0.92] tracking-tight max-w-5xl">
            Modernizujte správu <br className="hidden md:block" />
            <span className="gradient-text">vašej univerzity</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-[17px] md:text-[19px] leading-relaxed" style={{ color: 'var(--fg-2)' }}>
            Modulárny systém, ktorý rastie s vašou inštitúciou.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="mailto:iternal@iternal.sk?subject=Žiadosť o prezentáciu MAIS" className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-medium inline-flex items-center gap-2">
              Požiadať o prezentáciu <ArrowIcon />
            </a>
            <a href="#brochure" className="btn-ghost rounded-xl px-6 py-3.5 text-[14px] font-medium inline-flex items-center gap-2">
              <DownloadIcon /> Stiahnuť brožúru
            </a>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div className="mono text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--fg-4)' }}>Dôverujú nám</div>
            <div className="flex items-center gap-2 flex-wrap">
              {featured.map(s => {
                const p = PARTNERS_STATIC.find(x => x.short === s)
                if (!p) return null
                return (
                  <span key={s} className="inline-flex items-center gap-1.5 chip-mono" style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: p.accent, boxShadow: `0 0 10px ${p.accent}` }} />
                    <span className="text-white">{p.short}</span>
                  </span>
                )
              })}
              <span className="text-[12.5px] mono" style={{ color: 'var(--fg-3)' }}>· a {PARTNERS_STATIC.length - featured.length} ďalších</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function WhyMAIS() {
  return (
    <section className="relative py-20 md:py-28 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><div className="kicker">Prečo MAIS</div></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-[36px] md:text-[56px] mt-4 text-white leading-[1] max-w-3xl">
            Tri dôvody, prečo si vás MAIS získa
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {whyPoints.map((w, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group relative glass rounded-2xl p-7 md:p-8 h-full overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="beam rounded-2xl" />
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${w.accent}22, transparent 60%)` }} />
                <div className="relative">
                  <div className="ico-box inline-flex h-11 w-11 items-center justify-center rounded-xl mb-5" style={{ color: w.accent }}>
                    {w.icon}
                  </div>
                  <div className="font-display text-[22px] text-white leading-tight">{w.title}</div>
                  <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: 'var(--fg-2)' }}>{w.desc}</p>
                  {w.tags ? (
                    <div className="mt-6 pt-5 border-t flex flex-wrap gap-2" style={{ borderColor: 'var(--line)' }}>
                      {w.tags.map(t => (
                        <span key={t} className="chip-mono" style={{ borderColor: `${w.accent}40` }}>{t}</span>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 pt-5 border-t flex items-baseline gap-2" style={{ borderColor: 'var(--line)' }}>
                      <div className="font-display text-[24px]" style={{ color: w.accent }}>{w.stat}</div>
                      <div className="mono text-[11px] tracking-wider" style={{ color: 'var(--fg-3)' }}>{w.statLabel}</div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function BentoGrid() {
  return (
    <section className="relative py-20 md:py-28 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <Reveal>
            <div>
              <div className="kicker">Čo získate</div>
              <h2 className="font-display text-[36px] md:text-[56px] mt-4 text-white leading-[1] max-w-2xl">
                Kompletný ekosystém pre akademickú agendu
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-2 text-[15px] max-w-sm" style={{ color: 'var(--fg-2)' }}>
              Od prijímacieho konania cez štúdium až po archiváciu — v jednom systéme.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Reveal delay={0} className="md:col-span-3">
            <div className="bento-card big h-full">
              <div className="stripe" />
              <div className="relative h-full flex flex-col">
                <div className="ico-box inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5 self-start" style={{ color: 'var(--orange)' }}><CapIcon /></div>
                <div className="font-display text-[26px] md:text-[30px] text-white leading-tight">Kompletná akademická agenda</div>
                <p className="mt-3 text-[14.5px] max-w-md leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                  Štúdium, rozvrhy, skúšky, zápisné listy, harmonogramy. Všetko, čo potrebuje študijné oddelenie.
                </p>
                <div className="mt-auto pt-6 flex flex-wrap gap-2">
                  {['Rozvrhy', 'Skúšky', 'Zápisy', 'Harmonogramy', 'Štátnice', 'Promócie'].map(t => (
                    <span key={t} className="chip-mono">{t}</span>
                  ))}
                </div>
                <div className="absolute right-5 top-5 w-28 h-28 pointer-events-none opacity-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {Array.from({ length: 5 }).map((_, r) => Array.from({ length: 5 }).map((_, c) => (
                      <rect key={`${r}-${c}`} x={c * 20 + 2} y={r * 20 + 2} width="16" height="16" rx="2"
                        fill={r === 2 && c === 2 ? 'oklch(0.72 0.2 40 / 0.6)' : 'oklch(0.4 0.03 40 / 0.25)'} />
                    )))}
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80} className="md:col-span-3">
            <div className="bento-card big h-full">
              <div className="stripe" />
              <div className="relative h-full flex flex-col">
                <div className="ico-box inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5 self-start" style={{ color: 'var(--amber)' }}><FileIcon /></div>
                <div className="font-display text-[26px] md:text-[30px] text-white leading-tight">E-prihláška a prijímacie konanie</div>
                <p className="mt-3 text-[14.5px] max-w-md leading-relaxed" style={{ color: 'var(--fg-2)' }}>
                  Online prihlášky, sledovanie stavu, automatické notifikácie. Uchádzač vidí všetko v reálnom čase.
                </p>
                <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="live-dot" style={{ width: 6, height: 6 }} />
                    <span className="mono text-[12px]" style={{ color: 'var(--fg-2)' }}>Stav: Prijatý</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--amber)' }} />
                    <span className="mono text-[12px]" style={{ color: 'var(--fg-3)' }}>Notifikácia odoslaná</span>
                  </div>
                </div>
                <div className="absolute right-6 top-5 opacity-40 pointer-events-none">
                  <div className="flex flex-col gap-1.5 items-end">
                    {([80, 64, 44] as number[]).map((w, i) => (
                      <div key={i} className="h-1.5 rounded-full"
                        style={{ width: w, background: `oklch(${0.4 + i * 0.1} 0.1 40 / 0.45)` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          {bentoSmall.map((s, i) => (
            <Reveal key={i} delay={160 + i * 60} className="md:col-span-2">
              <div className="bento-card small h-full">
                <div className="stripe" />
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="tech-dot" />
                    <div className="font-display text-[16px] text-white tracking-tight">{s.title}</div>
                  </div>
                  <div className="mt-3 text-[12.5px] leading-relaxed" style={{ color: 'var(--fg-3)' }}>{s.hint}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function References() {
  return (
    <section className="relative py-20 md:py-28 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><div className="kicker">Referencie</div></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-[36px] md:text-[56px] mt-4 text-white leading-[1] max-w-3xl">
            Čo hovoria inštitúcie, ktoré už MAIS používajú
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q, i) => {
            const p = PARTNERS_STATIC.find(x => x.short === q.school)
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="quote-card h-full">
                  <span className="quote-mark">"</span>
                  <div className="relative">
                    <p className="text-[15.5px] md:text-[16px] leading-relaxed" style={{ color: 'var(--fg)' }}>{q.text}</p>
                    <div className="mt-7 pt-6 border-t flex items-center gap-3" style={{ borderColor: 'var(--line)' }}>
                      {p && (
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: 'linear-gradient(180deg, oklch(0.22 0.015 40 / 0.9), oklch(0.14 0.012 40 / 0.9))', border: `1px solid ${p.accent}50` }}>
                          <span className="font-display text-[11px] text-white tracking-tight">{p.short}</span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[13px] text-white">{q.role}</span>
                        <span className="mono text-[11px] tracking-wider" style={{ color: 'var(--fg-3)' }}>{p ? p.name : q.school}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="contact" className="relative py-24 md:py-32 border-t overflow-hidden" style={{ borderColor: 'var(--line)' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[900px] cta-conic opacity-70 rounded-full" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal><div className="kicker justify-center">Bezplatná konzultácia</div></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-[40px] md:text-[68px] mt-5 text-white leading-[0.95]" style={{ textWrap: 'balance' } as React.CSSProperties}>
            Pripravení <span className="gradient-text">modernizovať</span> vašu inštitúciu?
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 text-[16px] md:text-[18px] max-w-2xl mx-auto" style={{ color: 'var(--fg-2)' }}>
            Kontaktujte nás pre bezplatnú konzultáciu a prezentáciu systému. Odpovedáme do 24 hodín.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:iternal@iternal.sk?subject=Žiadosť o prezentáciu MAIS" className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-medium inline-flex items-center gap-2">
              Požiadať o prezentáciu <ArrowIcon />
            </a>
            <a href="#brochure" className="btn-ghost rounded-xl px-6 py-3.5 text-[14px] font-medium inline-flex items-center gap-2">
              <DownloadIcon /> Stiahnuť brožúru
            </a>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10" style={{ borderColor: 'var(--line)' }}>
            <a href="tel:+421915724757" className="flex items-center gap-3 transition-colors group" style={{ color: 'var(--fg-2)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'oklch(0.72 0.2 40 / 0.15)', color: 'var(--orange)', border: '1px solid oklch(0.72 0.2 40 / 0.3)' }}>
                <PhoneIcon />
              </div>
              <div className="text-left">
                <div className="mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>Telefón</div>
                <div className="mono text-[14px]">+421 915 724 757</div>
              </div>
            </a>
            <a href="mailto:mais@mais.sk" className="flex items-center gap-3 transition-colors group" style={{ color: 'var(--fg-2)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'oklch(0.72 0.2 40 / 0.15)', color: 'var(--orange)', border: '1px solid oklch(0.72 0.2 40 / 0.3)' }}>
                <MailIcon />
              </div>
              <div className="text-left">
                <div className="mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>Email</div>
                <div className="mono text-[14px]">mais@mais.sk</div>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer({ locale }: { locale: string }) {
  const year = new Date().getFullYear()
  const build = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  return (
    <footer className="border-t relative" style={{ borderColor: 'var(--line)' }}>
      <div className="relative overflow-hidden border-b" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="font-display tracking-tighter leading-none text-[14vw] md:text-[11vw] text-center select-none"
            style={{ background: 'linear-gradient(180deg, oklch(0.35 0.06 40 / 0.5), oklch(0.14 0.012 40 / 0))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
            MAIS
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-[13.5px]" style={{ color: 'var(--fg-3)' }}>
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden" style={{ filter: 'drop-shadow(0 4px 14px oklch(0.65 0.22 40 / 0.4))' }}>
              <Image src="/logo-mais.png" alt="MAIS" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <span className="font-display text-white text-[17px]">MAIS</span>
          </div>
          <p className="mt-4 max-w-sm">Modulárny akademický informačný systém od ITernal s.r.o.</p>
          <div className="mt-6"><div className="chip-mono inline-flex items-center gap-1.5"><span className="live-dot" style={{ width: 6, height: 6 }} /> Všetky systémy online</div></div>
        </div>
        <div>
          <div className="mono text-[10.5px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>Navigácia</div>
          <div className="flex flex-col gap-2.5">
            {[
              { href: `/${locale}#schools`, label: 'Školy' },
              { href: `/${locale}/pre-institucie`, label: 'Pre inštitúcie' },
              { href: `/${locale}/podpora`, label: 'Podpora' },
              { href: '#contact', label: 'Kontakt' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mono text-[10.5px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>ITernal s.r.o.</div>
          <div className="text-white/90">Sládkovičova 533/20</div>
          <div>018 41 Dubnica nad Váhom</div>
          <a href="tel:+421915724757" className="mt-3 block hover:text-white transition-colors mono">+421 915 724 757</a>
          <a href="mailto:mais@mais.sk" className="hover:text-white transition-colors mono">mais@mais.sk</a>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px]" style={{ color: 'var(--fg-4)' }}>
          <div>© {year} ITernal s.r.o. · Všetky práva vyhradené</div>
          <div className="flex items-center gap-4 mono"><span>v2026.4.1</span><span>·</span><span>Build {build}</span></div>
        </div>
      </div>
    </footer>
  )
}

export default function PreInstituciePage({ params }: { params: { locale: string } }) {
  const locale = params.locale
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar locale={locale} />
      <Hero locale={locale} />
      <WhyMAIS />
      <BentoGrid />
      <References />
      <CTA />
      <Footer locale={locale} />
    </div>
  )
}
