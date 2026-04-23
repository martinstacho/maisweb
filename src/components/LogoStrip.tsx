'use client'

const INSTITUTIONS = [
  { short: 'TUKE',  city: 'Košice',             accent: 'oklch(0.72 0.2 40)' },
  { short: 'TRUNI', city: 'Trnava',             accent: 'oklch(0.68 0.21 25)' },
  { short: 'SZU',   city: 'Bratislava',         accent: 'oklch(0.82 0.17 70)' },
  { short: 'UNIPO', city: 'Prešov',             accent: 'oklch(0.72 0.2 40)' },
  { short: 'AOS',   city: 'Liptovský Mikuláš', accent: 'oklch(0.68 0.21 25)' },
  { short: 'APZ',   city: 'Bratislava',         accent: 'oklch(0.78 0.13 145)' },
  { short: 'BISLA', city: 'Bratislava',         accent: 'oklch(0.82 0.17 70)' },
  { short: 'DTI',   city: 'Dubnica nad Váhom', accent: 'oklch(0.72 0.2 40)' },
  { short: 'VŠBM',  city: 'Košice',             accent: 'oklch(0.68 0.21 25)' },
]

const items = [...INSTITUTIONS, ...INSTITUTIONS]

export function LogoStrip() {
  return (
    <div
      className="relative overflow-hidden py-8"
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'oklch(0.11 0.012 40 / 0.6)',
      }}
    >
      {/* Header */}
      <div
        className="mono mb-6 text-center"
        style={{ fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--fg-4)' }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ height: '1px', width: '40px', background: 'var(--line-strong)', display: 'inline-block' }} />
          Dôverujú nám · 4 univerzity + 5 VŠ · 30 000+ študentov
          <span style={{ height: '1px', width: '40px', background: 'var(--line-strong)', display: 'inline-block' }} />
        </span>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, oklch(0.11 0.012 40), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, oklch(0.11 0.012 40), transparent)' }} />

      {/* Marquee */}
      <div className="marquee-track flex items-center w-max" style={{ gap: '40px' }}>
        {items.map((inst, i) => (
          <div
            key={i}
            className="group cursor-default"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
          >
            {/* Glow dot */}
            <span
              style={{
                display: 'inline-block',
                width: '10px', height: '10px',
                borderRadius: '9999px',
                background: inst.accent,
                boxShadow: `0 0 14px ${inst.accent}`,
                flexShrink: 0,
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.25)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            {/* Short name */}
            <span
              className="font-display text-[22px] md:text-[26px]"
              style={{
                letterSpacing: '-0.025em',
                whiteSpace: 'nowrap',
                color: 'oklch(0.68 0.01 40)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'oklch(0.68 0.01 40)')}
            >
              {inst.short}
            </span>
            {/* City */}
            <span
              className="mono"
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--fg-4)',
                whiteSpace: 'nowrap',
              }}
            >
              {inst.city}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
