import { getPartnerStatic, monoLetterSize } from '@/lib/partners-data'
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

export async function PartnerCard({ partner, index = 0 }: { partner: Partner; locale?: string; index?: number }) {
  const t = await getTranslations('partners')
  const ps = getPartnerStatic(partner.shortName)
  const accent = ps?.accent ?? 'var(--orange)'
  const est = ps?.est

  return (
    <a
      href={partner.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block glass rounded-2xl p-5 h-full overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      <div className="beam rounded-2xl" />

      <div className="flex items-center justify-between mb-4">
        <span className="chip-mono">/{String(index + 1).padStart(2, '0')}</span>
        <span className="mono text-[10px] tracking-widest" style={{ color: 'var(--fg-4)' }}>
          {est ? `EST ${est}` : (partner.city ?? partner.shortName)}
        </span>
      </div>

      <div className="mb-5 flex items-center justify-center">
        <div style={{ width: 96, height: 96 }}>
          <div className="mono-tile" style={{ maxWidth: 96 } as React.CSSProperties}>
            <span
              className="letters"
              style={{ fontSize: monoLetterSize(partner.shortName), letterSpacing: '-0.02em' }}
            >
              {partner.shortName}
            </span>
            <span
              className="accent-bar"
              style={{ background: `linear-gradient(90deg, ${accent}, var(--amber))` }}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-display text-[14px] text-white leading-snug min-h-[42px]" style={{ textWrap: 'balance' } as React.CSSProperties}>
          {partner.name}
        </div>
        <div className="mt-2 mono text-[10.5px] tracking-[0.18em]" style={{ color: 'var(--fg-3)' }}>
          <span style={{ color: accent }}>●</span> {partner.shortName}
          {partner.city ? ` · ${partner.city}` : ''}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t flex items-center justify-between text-[11px] transition-colors" style={{ borderColor: 'var(--line)', color: 'var(--fg-3)' }}>
        <span className="inline-flex items-center gap-1.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
            <path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          </svg>
          {t('website')}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </a>
  )
}
