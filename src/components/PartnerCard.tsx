import Link from 'next/link'
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
}

function initials(shortName: string) {
  return shortName.slice(0, 4)
}

export async function PartnerCard({ partner, locale }: { partner: Partner; locale?: string }) {
  const t = await getTranslations('partners')

  return (
    <div className="school-card group relative overflow-hidden flex flex-col rounded-2xl" style={{
      background: 'linear-gradient(180deg, oklch(0.22 0.015 40 / 0.6), oklch(0.17 0.013 40 / 0.45))',
      border: '1px solid var(--mais-line)',
    }}>
      <div className="mais-beam" />

      <div className="p-6 flex flex-col flex-1">
        {/* Monogram tile */}
        <div className="mais-mono-tile mb-5 mx-auto" style={{ width: 80, height: 80 }}>
          <span className="mono font-semibold text-[18px]" style={{ color: 'var(--mais-orange)' }}>{initials(partner.shortName)}</span>
        </div>

        <div className="text-center mb-4">
          <div className="font-semibold text-[14px] leading-snug" style={{ color: 'var(--mais-fg)' }}>{partner.name}</div>
          {partner.city && (
            <div className="mono text-[10px] tracking-wider mt-1" style={{ color: 'var(--mais-fg-4)' }}>{partner.city}</div>
          )}
        </div>

        <div className="border-t my-3" style={{ borderColor: 'var(--mais-line)' }} />

        <div className="flex flex-col gap-1.5">
          <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="mais-action-row text-left">
            <span>{t('website')}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
          {partner.loginUrl && (
            <a href={partner.loginUrl} target="_blank" rel="noopener noreferrer" className="mais-action-row primary text-left">
              <span>{t('login')}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </a>
          )}
          {partner.applicationUrl && (
            <a href={partner.applicationUrl} target="_blank" rel="noopener noreferrer" className="mais-action-row text-left">
              <span>{t('application')}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
