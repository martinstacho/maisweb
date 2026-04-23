'use client'

interface SupportPartner {
  id: string
  name: string
  shortName: string
  websiteUrl: string
  loginUrl?: string | null
  applicationUrl?: string | null
  city?: string | null
  supportPhone?: string | null
  supportEmail?: string | null
  displayOrder?: number
}

function letterSize(s: string): string {
  if (s.length >= 5) return '22px'
  if (s.length === 4) return '26px'
  if (s.length === 3) return '30px'
  return '34px'
}

function padIndex(n: number) {
  return `/${String(n).padStart(2, '0')}`
}

// SVG icons
const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const FileTextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
)
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)
const FileUploadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
)
const ExtLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

function LoginLink({ loginUrl }: { loginUrl: string }) {
  const isPdf = loginUrl.endsWith('.pdf')
  const isMailto = loginUrl.startsWith('mailto:')

  const icon = isPdf ? <FileTextIcon /> : isMailto ? <MailIcon /> : <LockIcon />
  const label = isPdf ? 'Inštrukcie na prihlásenie (PDF)' : isMailto ? 'Neviem sa prihlásiť — napísať' : 'Neviem sa prihlásiť do MAIS'
  const target = isMailto ? undefined : '_blank'
  const rel = isMailto ? undefined : 'noopener noreferrer'

  return (
    <a href={loginUrl} target={target} rel={rel} className="mais-action-row primary">
      <span className="flex items-center gap-2.5">{icon}{label}</span>
      {isPdf || isMailto ? <ExtLinkIcon /> : <ArrowIcon />}
    </a>
  )
}

export function SchoolSupportCard({ partner }: { partner: SupportPartner }) {
  return (
    <div
      className="glass rounded-2xl p-6 flex flex-col gap-4"
      style={{ borderColor: 'var(--mais-line)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="chip-mono">{padIndex(partner.displayOrder ?? 1)}</span>
        <span className="mono text-[10px] tracking-[0.18em]" style={{ color: 'var(--mais-fg-4)' }}>
          {partner.city ?? partner.shortName}
        </span>
      </div>

      {/* Monogram tile */}
      <div className="flex justify-center">
        <div
          className="mais-mono-tile relative flex items-center justify-center overflow-hidden"
          style={{ width: 104, height: 104, borderRadius: 16 }}
        >
          <span
            className="mono relative z-10"
            style={{ fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', fontSize: letterSize(partner.shortName) }}
          >
            {partner.shortName}
          </span>
          <div
            className="absolute"
            style={{ left: 10, right: 10, bottom: 10, height: 3, borderRadius: 3, background: 'linear-gradient(90deg, var(--mais-orange), var(--mais-amber))' }}
          />
        </div>
      </div>

      {/* Name */}
      <div className="font-display text-[14px] text-white text-center leading-snug min-h-[42px] flex items-center justify-center px-1">
        {partner.name}
      </div>

      {/* Shortname · city */}
      <div className="flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--mais-orange)' }} />
        <span className="mono text-[10.5px] tracking-[0.18em]" style={{ color: 'var(--mais-fg-3)' }}>
          {partner.shortName}{partner.city ? ` · ${partner.city}` : ''}
        </span>
      </div>

      {/* Gradient divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, oklch(0.72 0.2 40 / 0.4) 50%, transparent)' }} />

      {/* Action rows */}
      <div className="flex flex-col gap-2">
        <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="mais-action-row">
          <span className="flex items-center gap-2.5"><GlobeIcon />Oficiálny web</span>
          <ExtLinkIcon />
        </a>

        {partner.loginUrl && <LoginLink loginUrl={partner.loginUrl} />}

        {partner.applicationUrl && (
          <a href={partner.applicationUrl} target="_blank" rel="noopener noreferrer" className="mais-action-row">
            <span className="flex items-center gap-2.5"><FileUploadIcon />Podať e-prihlášku</span>
            <ExtLinkIcon />
          </a>
        )}
      </div>
    </div>
  )
}
