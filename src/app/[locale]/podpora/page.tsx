'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { PARTNERS_STATIC, monoLetterSize, type PartnerStatic } from '@/lib/partners-data'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

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
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
)
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
  </svg>
)
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 14h6"/><path d="M9 18h6"/>
  </svg>
)
const ExtLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)
const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
)

function LoginLink({ loginUrl }: { loginUrl: string }) {
  const isMail = loginUrl.startsWith('mailto:')
  const isPdf = loginUrl.endsWith('.pdf')
  const icon = isPdf ? <FileIcon /> : isMail ? <MailIcon /> : <LockIcon />
  const target = isMail ? undefined : '_blank'
  const rel = isMail ? undefined : 'noopener noreferrer'
  return (
    <a href={loginUrl} target={target} rel={rel} className="action-row primary w-full text-left">
      <span className="leading flex items-center gap-2.5">{icon} Neviem sa prihlásiť do MAIS</span>
      <ArrowIcon />
    </a>
  )
}

function SchoolCard({ p, i }: { p: PartnerStatic; i: number }) {
  return (
    <Reveal delay={Math.min(i * 40, 240)}>
      <div className="school-card relative glass rounded-2xl p-6 h-full overflow-hidden transition-all duration-300">
        <div className="beam rounded-2xl" />
        <div className="flex items-center justify-between mb-5">
          <span className="chip-mono">/{String(i + 1).padStart(2, '0')}</span>
          <span className="mono text-[10px] tracking-widest" style={{ color: 'var(--fg-4)' }}>EST {p.est}</span>
        </div>
        <div className="flex justify-center mb-5">
          <div style={{ width: 104, height: 104 }}>
            <div className="mono-tile">
              <span className="letters" style={{ fontSize: monoLetterSize(p.mono) }}>{p.mono}</span>
              <span className="accent-bar" style={{ background: `linear-gradient(90deg, ${p.accent}, var(--amber))` }} />
            </div>
          </div>
        </div>
        <div className="text-center mb-2">
          <div className="font-display text-[15.5px] text-white leading-snug min-h-[48px] flex items-center justify-center" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {p.name}
          </div>
          <div className="mt-1 mono text-[10.5px] tracking-[0.22em] inline-flex items-center gap-1.5 justify-center" style={{ color: 'var(--fg-3)' }}>
            <span style={{ color: p.accent }}>●</span> {p.short}
            <span style={{ color: 'var(--fg-4)' }}>·</span>
            <span className="inline-flex items-center gap-1"><PinIcon /> {p.city}</span>
          </div>
        </div>
        <div className="my-5 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}40 50%, transparent)` }} />
        <div className="flex flex-col gap-2">
          <a href={p.web} target="_blank" rel="noopener noreferrer" className="action-row">
            <span className="leading flex items-center gap-2.5"><GlobeIcon /> Oficiálny web</span>
            <ExtLinkIcon />
          </a>
          <LoginLink loginUrl={p.loginUrl} />
          <a href={p.apply} target="_blank" rel="noopener noreferrer" className="action-row">
            <span className="leading flex items-center gap-2.5"><FileIcon /> Podať e-prihlášku</span>
            <ExtLinkIcon />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

function SupportModal({ school, onClose }: { school: PartnerStatic | null; onClose: () => void }) {
  useEffect(() => {
    if (!school) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [school, onClose])

  if (!school) return null

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      style={{ background: 'oklch(0.08 0.01 40 / 0.72)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="modal-panel relative w-full max-w-lg glass rounded-2xl p-7 md:p-9 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${school.accent}, var(--amber), ${school.accent})` }} />
        <div
          className="absolute -top-28 -right-28 w-64 h-64 rounded-full pointer-events-none opacity-70"
          style={{ background: `radial-gradient(circle, ${school.accent}33, transparent 70%)`, filter: 'blur(30px)' }}
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center transition-all"
          style={{ color: 'var(--fg-3)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'oklch(0.25 0.02 40 / 0.6)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-3)'; e.currentTarget.style.background = '' }}
        >
          <XIcon />
        </button>
        <div className="flex items-center gap-4 mb-6 pr-8">
          <div style={{ width: 64, height: 64, flexShrink: 0 }}>
            <div className="mono-tile">
              <span className="letters" style={{ fontSize: school.mono.length >= 5 ? '14px' : school.mono.length === 4 ? '18px' : '20px' }}>
                {school.mono}
              </span>
              <span className="accent-bar" style={{ background: `linear-gradient(90deg, ${school.accent}, var(--amber))`, left: 6, right: 6, bottom: 6, height: 2 } as React.CSSProperties} />
            </div>
          </div>
          <div>
            <div className="kicker">Helpdesk</div>
            <div className="font-display text-[20px] md:text-[24px] text-white leading-tight mt-1.5" style={{ textWrap: 'balance' } as React.CSSProperties}>
              Podpora pre {school.short}
            </div>
            <div className="text-[13px] mt-0.5" style={{ color: 'var(--fg-3)' }}>{school.name}</div>
          </div>
        </div>
        <div className="space-y-3">
          <a
            href={`tel:${school.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-4 p-4 rounded-xl border transition-all group"
            style={{ border: '1px solid var(--line)', background: 'oklch(0.18 0.014 40 / 0.5)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.72 0.2 40 / 0.55)'; (e.currentTarget as HTMLElement).style.background = 'oklch(0.22 0.03 40 / 0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLElement).style.background = 'oklch(0.18 0.014 40 / 0.5)' }}
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.72 0.2 40 / 0.18)', color: 'var(--orange)', border: '1px solid oklch(0.72 0.2 40 / 0.3)' }}>
              <PhoneIcon />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mono text-[10.5px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>Telefón IT helpdesku</div>
              <div className="mono text-[15px] text-white mt-0.5">{school.phone}</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            href={`mailto:${school.email}`}
            className="flex items-center gap-4 p-4 rounded-xl border transition-all group"
            style={{ border: '1px solid var(--line)', background: 'oklch(0.18 0.014 40 / 0.5)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.72 0.2 40 / 0.55)'; (e.currentTarget as HTMLElement).style.background = 'oklch(0.22 0.03 40 / 0.5)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLElement).style.background = 'oklch(0.18 0.014 40 / 0.5)' }}
          >
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.72 0.2 40 / 0.18)', color: 'var(--orange)', border: '1px solid oklch(0.72 0.2 40 / 0.3)' }}>
              <MailIcon />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mono text-[10.5px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>Email</div>
              <div className="mono text-[14px] text-white mt-0.5 truncate">{school.email}</div>
            </div>
            <ArrowIcon />
          </a>
          <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ border: '1px solid var(--line)', background: 'oklch(0.18 0.014 40 / 0.35)' }}>
            <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.78 0.13 145 / 0.18)', color: 'var(--mint)', border: '1px solid oklch(0.78 0.13 145 / 0.3)' }}>
              <ClockIcon />
            </div>
            <div className="flex-1">
              <div className="mono text-[10.5px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>Pracovná doba</div>
              <div className="text-[14px] text-white mt-0.5">Pracovné dni <span className="mono">9:00 – 15:00</span></div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 rounded-xl border border-dashed" style={{ borderColor: 'oklch(0.5 0.1 40 / 0.35)', background: 'oklch(0.2 0.03 40 / 0.3)' }}>
          <div className="text-[12.5px] leading-relaxed" style={{ color: 'var(--fg-3)' }}>
            <span className="font-medium" style={{ color: 'var(--orange)' }}>Tip:</span> pred kontaktom helpdesku si pripravte svoje{' '}
            <span className="mono text-white">AISID</span> alebo <span className="mono text-white">rodné číslo</span>, ktoré ste uviedli pri prihláške.
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <a href={school.web} target="_blank" rel="noopener noreferrer" className="text-[12.5px] inline-flex items-center gap-1.5 transition-colors" style={{ color: 'var(--fg-3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-3)')}>
            <GlobeIcon /> Oficiálny web školy <ExtLinkIcon />
          </a>
          <button type="button" onClick={onClose} className="btn-ghost rounded-lg px-5 py-2.5 text-[13px] font-medium">Zavrieť</button>
        </div>
      </div>
    </div>
  )
}

function Navbar({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 12)
    onS(); window.addEventListener('scroll', onS, { passive: true })
    return () => window.removeEventListener('scroll', onS)
  }, [])
  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b backdrop-blur-xl' : 'bg-transparent'}`}
      style={scrolled ? { borderColor: 'var(--line)', background: 'oklch(0.14 0.012 40 / 0.8)' } : undefined}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-9 overflow-hidden transition-transform group-hover:scale-[1.04]" style={{ filter: 'drop-shadow(0 6px 20px oklch(0.65 0.22 40 / 0.45))' }}>
            <Image src="/logo-mais.png" alt="MAIS" width={36} height={36} className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-[17px] tracking-tight" style={{ color: 'var(--fg)' }}>MAIS</span>
          <span className="chip-mono hidden sm:inline-flex">v2026</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-[13.5px]" style={{ color: 'var(--fg-2)' }}>
          <a href={`/${locale}#features`} className="ln hover:text-white transition-colors">Funkcie</a>
          <a href={`/${locale}#schools`} className="ln hover:text-white transition-colors">Školy</a>
          <Link href={`/${locale}/pre-institucie`} className="ln hover:text-white transition-colors">Pre inštitúcie</Link>
          <Link href={`/${locale}/podpora`} className="ln text-white" aria-current="page">Podpora</Link>
          <a href={`/${locale}#contact`} className="ln hover:text-white transition-colors">Kontakt</a>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 chip-mono">
            {(['sk', 'en', 'uk'] as const).map((l) => (
              <span key={l} className="flex items-center gap-1">
                {l === currentLocale && <span className="live-dot" style={{ width: 6, height: 6 }} />}
                <button
                  onClick={() => router.replace(pathname, { locale: l })}
                  className={`transition-colors cursor-pointer ${l === currentLocale ? 'text-white font-medium' : 'hover:text-white'}`}
                  style={l === currentLocale ? {} : { color: 'var(--fg-3)' }}
                >{l.toUpperCase()}</button>
                {l !== 'uk' && <span style={{ color: 'var(--fg-4)' }}>·</span>}
              </span>
            ))}
          </div>
          <a href={`/${locale}#contact`} className="btn-primary rounded-lg px-4 py-2 text-[13px] font-medium inline-flex items-center gap-1.5">
            Mám záujem <ArrowIcon />
          </a>
        </div>
      </div>
    </nav>
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
              { href: `/${locale}#contact`, label: 'Kontakt' },
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
          <a href="mailto:podpora@mais.sk" className="hover:text-white transition-colors mono">podpora@mais.sk</a>
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

export default function PodporaPage({ params }: { params: { locale: string } }) {
  const locale = params.locale

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar locale={locale} />

      {/* Hero */}
      <section className="relative overflow-hidden noise">
        <div className="absolute inset-0 hero-grid pointer-events-none" style={{
          maskImage: 'radial-gradient(ellipse 60% 80% at 50% 30%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 30%, black 20%, transparent 100%)',
        }} />
        <div className="absolute top-[-120px] left-[-140px] w-[460px] h-[460px] rounded-full blob-a pointer-events-none"
          style={{ background: 'radial-gradient(circle at 30% 30%, oklch(0.65 0.24 38 / 0.45), transparent 60%)' }} />
        <div className="absolute top-[-80px] right-[-160px] w-[420px] h-[420px] rounded-full blob-b pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 70%, oklch(0.58 0.22 25 / 0.35), transparent 60%)' }} />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-14 md:pt-28 md:pb-20">
          <Reveal><div className="kicker">Helpdesk · 24/7 na troch úrovniach</div></Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-5 text-[44px] md:text-[72px] leading-[0.95] tracking-tight">
              Podpora <span className="gradient-text">MAIS</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl text-[16px] md:text-[18px]" style={{ color: 'var(--fg-2)' }}>
              Nájdite svoju školu a získajte pomoc priamo pre váš systém. Každá inštitúcia má vlastný IT helpdesk s kontaktom pre študentov a uchádzačov.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <div className="chip-mono flex items-center gap-2">
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                {PARTNERS_STATIC.length} aktívnych inštitúcií
              </div>
              <a href="#schools" className="chip-mono hover:text-white transition-colors">↓ Preskočiť na zoznam</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Schools grid */}
      <section id="schools" className="relative py-16 md:py-24 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <Reveal>
              <div>
                <div className="kicker">Zoznam inštitúcií · {PARTNERS_STATIC.length}</div>
                <h2 className="font-display text-[32px] md:text-[44px] mt-4 text-white leading-[1] max-w-2xl">
                  Vyberte svoju školu
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="chip-mono flex items-center gap-2 self-start">
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                Všetky helpdesky online
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PARTNERS_STATIC.map((p, i) => (
              <SchoolCard key={p.short} p={p} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Fallback banner */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden border p-8 md:p-12" style={{ borderColor: 'var(--line-strong)', background: 'linear-gradient(180deg, oklch(0.19 0.02 40 / 0.9), oklch(0.15 0.014 40 / 0.9))' }}>
              <div className="absolute inset-0 banner-glow pointer-events-none" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="flex-1">
                  <div className="kicker">Nenašli ste svoju školu?</div>
                  <div className="font-display text-[24px] md:text-[32px] text-white leading-tight mt-3" style={{ textWrap: 'balance' } as React.CSSProperties}>
                    Kontaktujte centrálnu podporu MAIS
                  </div>
                  <p className="mt-2 text-[14px] max-w-lg" style={{ color: 'var(--fg-2)' }}>
                    Ak je vaša inštitúcia v procese nasadenia, alebo potrebujete všeobecnú pomoc so systémom, napíšte nám.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                  <a href="mailto:podpora@mais.sk" className="btn-primary rounded-xl px-5 py-3 text-[13.5px] font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap">
                    <MailIcon /> podpora@mais.sk
                  </a>
                  <a href="tel:+421915724757" className="btn-ghost rounded-xl px-5 py-3 text-[13.5px] font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap">
                    <PhoneIcon /> <span className="mono">+421 915 724 757</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  )
}
