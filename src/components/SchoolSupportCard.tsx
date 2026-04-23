'use client'
import { useState } from 'react'

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

function Modal({ partner, onClose }: { partner: SupportPartner; onClose: () => void }) {
  return (
    <div
      className="mais-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'oklch(0.1 0.01 40 / 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="mais-modal-panel w-full max-w-md rounded-2xl p-8 relative"
        style={{
          background: 'linear-gradient(180deg, oklch(0.22 0.015 40), oklch(0.16 0.012 40))',
          border: '1px solid oklch(0.4 0.03 40 / 0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'var(--mais-fg-4)', background: 'oklch(0.25 0.015 40 / 0.5)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="mais-mono-tile mx-auto mb-5" style={{ width: 72, height: 72, borderRadius: 12 }}>
          <span className="mono" style={{ fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', fontSize: letterSize(partner.shortName) }}>
            {partner.shortName}
          </span>
          <div className="absolute" style={{ left: 8, right: 8, bottom: 8, height: 2, borderRadius: 2, background: 'linear-gradient(90deg, var(--mais-orange), var(--mais-amber))' }} />
        </div>

        <div className="text-center mb-6">
          <h3 className="font-display text-[18px] text-white mb-1">Neviem sa prihlásiť do MAIS</h3>
          <p className="text-[13px]" style={{ color: 'var(--mais-fg-3)' }}>Kontaktujte helpdesk inštitúcie {partner.shortName}</p>
        </div>

        <div className="flex flex-col gap-3">
          {partner.supportPhone && (
            <a href={`tel:${partner.supportPhone.replace(/\s/g, '')}`} className="mais-action-row">
              <span className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/>
                </svg>
                {partner.supportPhone}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          )}
          {partner.supportEmail && (
            <a href={`mailto:${partner.supportEmail}`} className="mais-action-row primary">
              <span className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                {partner.supportEmail}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          )}
          {partner.loginUrl && (
            <a href={partner.loginUrl} target="_blank" rel="noopener noreferrer" className="mais-action-row">
              <span className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Prihlásenie do MAIS
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
          {!partner.supportPhone && !partner.supportEmail && !partner.loginUrl && (
            <p className="text-[13px] text-center" style={{ color: 'var(--mais-fg-4)' }}>
              Kontaktujte správcu systému priamo na vašej inštitúcii.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export function SchoolSupportCard({ partner }: { partner: SupportPartner }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
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
            <span className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Oficiálny web
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>

          <button onClick={() => setModalOpen(true)} className="mais-action-row primary">
            <span className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Neviem sa prihlásiť do MAIS
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          {partner.applicationUrl && (
            <a href={partner.applicationUrl} target="_blank" rel="noopener noreferrer" className="mais-action-row">
              <span className="flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                Podať e-prihlášku
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          )}
        </div>
      </div>

      {modalOpen && <Modal partner={partner} onClose={() => setModalOpen(false)} />}
    </>
  )
}
