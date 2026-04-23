import { getTranslations } from 'next-intl/server'

interface Partner {
  id: string
  name: string
  shortName: string
  logoUrl: string
  websiteUrl: string
  loginUrl?: string | null
  applicationUrl?: string | null
  city?: string | null
  supportPhone?: string | null
  supportEmail?: string | null
  displayOrder?: number
}

function letterSize(s: string): string {
  if (s.length >= 5) return '18px'
  if (s.length === 4) return '22px'
  if (s.length === 3) return '26px'
  return '30px'
}

function padIndex(n: number) {
  return `/${String(n).padStart(2, '0')}`
}

export async function PartnerCard({ partner, locale, index = 0 }: { partner: Partner; locale?: string; index?: number }) {
  const t = await getTranslations('partners')

  return (
    <a
      href={partner.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block glass rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ borderColor: 'var(--mais-line)' }}
    >
      <div className="mais-beam" />

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="chip-mono">{padIndex(partner.displayOrder ?? index + 1)}</span>
        <span className="mono text-[10px] tracking-[0.18em]" style={{ color: 'var(--mais-fg-4)' }}>
          {partner.city ?? partner.shortName}
        </span>
      </div>

      {/* Monogram tile */}
      <div className="flex justify-center mb-4">
        <div
          className="mais-mono-tile relative flex items-center justify-center overflow-hidden"
          style={{ width: 96, height: 96, borderRadius: 14 }}
        >
          <span
            className="mono relative z-10"
            style={{
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#fff',
              fontSize: letterSize(partner.shortName),
            }}
          >
            {partner.shortName}
          </span>
          {/* Accent bar */}
          <div
            className="absolute"
            style={{
              left: 10, right: 10, bottom: 10, height: 3,
              borderRadius: 3,
              background: 'linear-gradient(90deg, var(--mais-orange), var(--mais-amber))',
            }}
          />
        </div>
      </div>

      {/* Name */}
      <div className="font-display text-[14px] text-center text-white leading-snug min-h-[42px] flex items-center justify-center mb-2 px-1">
        {partner.name}
      </div>

      {/* Shortname · city */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--mais-orange)' }} />
        <span className="mono text-[10.5px] tracking-[0.18em]" style={{ color: 'var(--mais-fg-3)' }}>
          {partner.shortName}{partner.city ? ` · ${partner.city}` : ''}
        </span>
      </div>

      {/* Divider */}
      <div className="mb-4" style={{ borderTop: '1px solid var(--mais-line)' }} />

      {/* Bottom row */}
      <div className="flex items-center justify-between text-[12px]" style={{ color: 'var(--mais-fg-3)' }}>
        <span className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          {t('website')}
        </span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--mais-orange)' }}>
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </div>
    </a>
  )
}
