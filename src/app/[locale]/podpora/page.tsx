import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { Navbar } from '@/components/Navbar'
import { MaisFooter } from '@/components/MaisFooter'
import { Reveal } from '@/components/ui/Reveal'
import { PARTNER_META, monoLetterSize } from '@/lib/partners-data'

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

interface Partner {
  id: string
  name: string
  shortName: string
  websiteUrl: string
  loginUrl: string | null
  applicationUrl: string | null
  city: string | null
}

interface SchoolLabels {
  website: string
  loginIssue: string
  eApplication: string
}

function LoginLink({ loginUrl, label }: { loginUrl: string; label: string }) {
  const isMail = loginUrl.startsWith('mailto:')
  const isPdf = loginUrl.endsWith('.pdf')
  const icon = isPdf ? <FileIcon /> : isMail ? <MailIcon /> : <LockIcon />
  const target = isMail ? undefined : '_blank'
  const rel = isMail ? undefined : 'noopener noreferrer'
  return (
    <a href={loginUrl} target={target} rel={rel} className="action-row primary w-full text-left">
      <span className="leading flex items-center gap-2.5">{icon} {label}</span>
      <ArrowIcon />
    </a>
  )
}

function SchoolCard({ p, i, labels }: { p: Partner; i: number; labels: SchoolLabels }) {
  const meta = PARTNER_META[p.shortName]
  const accent = meta?.accent ?? 'var(--orange)'
  const est = meta?.est

  return (
    <Reveal delay={Math.min(i * 40, 240)}>
      <div className="school-card relative glass rounded-2xl p-6 h-full overflow-hidden transition-all duration-300">
        <div className="beam rounded-2xl" />
        <div className="flex items-center justify-between mb-5">
          <span className="chip-mono">/{String(i + 1).padStart(2, '0')}</span>
          <span className="mono text-[10px] tracking-widest" style={{ color: 'var(--fg-4)' }}>{est ? `EST ${est}` : ''}</span>
        </div>
        <div className="flex justify-center mb-5">
          <div style={{ width: 104, height: 104 }}>
            <div className="mono-tile">
              <span className="letters" style={{ fontSize: monoLetterSize(p.shortName) }}>{p.shortName}</span>
              <span className="accent-bar" style={{ background: `linear-gradient(90deg, ${accent}, var(--amber))` }} />
            </div>
          </div>
        </div>
        <div className="text-center mb-2">
          <div className="font-display text-[15.5px] text-white leading-snug min-h-[48px] flex items-center justify-center" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {p.name}
          </div>
          <div className="mt-1 mono text-[10.5px] tracking-[0.22em] inline-flex items-center gap-1.5 justify-center" style={{ color: 'var(--fg-3)' }}>
            <span style={{ color: accent }}>●</span> {p.shortName}
            {p.city && (
              <>
                <span style={{ color: 'var(--fg-4)' }}>·</span>
                <span className="inline-flex items-center gap-1"><PinIcon /> {p.city}</span>
              </>
            )}
          </div>
        </div>
        <div className="my-5 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent}40 50%, transparent)` }} />
        <div className="flex flex-col gap-2">
          <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" className="action-row">
            <span className="leading flex items-center gap-2.5"><GlobeIcon /> {labels.website}</span>
            <ExtLinkIcon />
          </a>
          {p.loginUrl && <LoginLink loginUrl={p.loginUrl} label={labels.loginIssue} />}
          {p.applicationUrl && (
            <a href={p.applicationUrl} target="_blank" rel="noopener noreferrer" className="action-row">
              <span className="leading flex items-center gap-2.5"><FileIcon /> {labels.eApplication}</span>
              <ExtLinkIcon />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default async function PodporaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [partners, t, tfoot, ts] = await Promise.all([
    prisma.partner.findMany({ where: { isActive: true }, orderBy: { displayOrder: 'asc' } }),
    getTranslations('nav'),
    getTranslations('footer'),
    getTranslations('support'),
  ])

  const schoolLabels: SchoolLabels = {
    website: ts('officialWeb'),
    loginIssue: ts('loginIssue'),
    eApplication: ts('eApplication'),
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar activePage="podpora" />

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
          <Reveal><div className="kicker">{ts('helpdeskBadge')}</div></Reveal>
          <Reveal delay={80}>
            <h1 className="font-display mt-5 text-[44px] md:text-[72px] leading-[0.95] tracking-tight">
              {ts('title')} <span className="gradient-text">MAIS</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl text-[16px] md:text-[18px]" style={{ color: 'var(--fg-2)' }}>
              {ts('findSchoolDesc')}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <div className="chip-mono flex items-center gap-2">
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                {partners.length} {ts('activeInstitutions')}
              </div>
              <a href="#schools" className="chip-mono hover:text-white transition-colors">{ts('skipToList')}</a>
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
                <div className="kicker">{ts('institutionsList')} · {partners.length}</div>
                <h2 className="font-display text-[32px] md:text-[44px] mt-4 text-white leading-[1] max-w-2xl">
                  {ts('selectSchool')}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="chip-mono flex items-center gap-2 self-start">
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                {ts('allHelpdeskOnline')}
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((p, i) => (
              <SchoolCard key={p.id} p={p} i={i} labels={schoolLabels} />
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
                  <div className="kicker">{ts('notFoundSchool')}</div>
                  <div className="font-display text-[24px] md:text-[32px] text-white leading-tight mt-3" style={{ textWrap: 'balance' } as React.CSSProperties}>
                    {ts('contactCentral')}
                  </div>
                  <p className="mt-2 text-[14px] max-w-lg" style={{ color: 'var(--fg-2)' }}>
                    {ts('contactCentralDesc')}
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
