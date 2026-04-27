import { ImageResponse } from 'next/og'

export const alt = 'MAIS – Akademický informačný systém'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TITLES: Record<string, string> = {
  sk: 'Akademický informačný systém',
  en: 'Academic Information System',
  uk: 'Академічна інформаційна система',
  hu: 'Akadémiai Információs Rendszer',
}

export default function Image({ params }: { params: { locale: string } }) {
  const title = TITLES[params.locale] ?? TITLES.sk

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1410 0%, #1f1812 50%, #241c14 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top accent line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '40px', height: '3px', background: '#e8834a', borderRadius: '2px' }} />
          <span style={{ fontSize: '20px', letterSpacing: '0.25em', color: '#e8834a', fontWeight: 600 }}>
            MAIS
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '36px',
            maxWidth: '900px',
            color: '#ffffff',
          }}
        >
          {title}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <span style={{ fontSize: '28px', color: '#a89070', fontWeight: 400 }}>Od roku 2004</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e8834a' }} />
          <span style={{ fontSize: '28px', color: '#a89070' }}>9 inštitúcií</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e8834a' }} />
          <span style={{ fontSize: '28px', color: '#a89070' }}>50 000+ používateľov</span>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '18px',
            color: '#6b5a48',
            letterSpacing: '0.1em',
          }}
        >
          mais.sk
        </div>
      </div>
    ),
    { ...size }
  )
}
