'use client'
import { FadeIn } from '@/components/FadeIn'

const techCards = [
  { label: 'Single sign-on', value: 'LDAP / OAuth2' },
  { label: 'Databáza', value: 'PostgreSQL' },
  { label: 'Integrácie', value: 'SIMUS · CVTI · ISSP' },
  { label: 'Zálohy', value: 'incremental · daily' },
]

const satellites = [
  { label: 'Štúdium', angle: 0 },
  { label: 'E-prihláška', angle: 45 },
  { label: 'Ubytovanie', angle: 90 },
  { label: 'Stravovanie', angle: 135 },
  { label: 'Knižnica', angle: 180 },
  { label: 'Ekonomika', angle: 225 },
  { label: 'Rozvrhy', angle: 270 },
  { label: 'Integrácie', angle: 315 },
]

function polarToPercent(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    left: 50 + r * Math.cos(rad),
    top: 50 + r * Math.sin(rad),
  }
}

export function ArchitectureSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* Left column */}
        <FadeIn>
          <div className="kicker mb-5">Architektúra</div>
          <h2 className="font-display text-[36px] md:text-[52px] leading-[1.0] mb-6" style={{ color: 'var(--fg)' }}>
            Jedno jadro.<br />
            <span className="gradient-text">Osem modulov.</span><br />
            Nekonečné možnosti.
          </h2>
          <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'var(--fg-3)' }}>
            Modulárna architektúra umožňuje nasadiť presne to, čo vaša inštitúcia potrebuje.
            Každý modul komunikuje cez spoločné jadro — bez duplicít, bez silov.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {techCards.map((c) => (
              <div key={c.label} className="glass rounded-xl p-4" style={{ borderColor: 'var(--line)' }}>
                <div className="mono text-[10px] tracking-[0.18em] mb-1.5" style={{ color: 'var(--fg-4)' }}>
                  {c.label.toUpperCase()}
                </div>
                <div className="mono text-[12px] font-semibold" style={{ color: 'var(--orange)' }}>
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Right column — orbit diagram */}
        <FadeIn delay={0.15}>
          <div className="relative mx-auto" style={{ aspectRatio: '1/1', maxWidth: 520 }}>

            {/* Static concentric rings */}
            {[27, 16, 4].map((margin) => (
              <div
                key={margin}
                className="absolute rounded-full"
                style={{
                  inset: `${margin}%`,
                  border: '1px solid var(--line-strong)',
                }}
              />
            ))}

            {/* Dashed orbit ring 1 */}
            <div
              className="orbit-ring absolute rounded-full pointer-events-none"
              style={{
                inset: '16%',
                border: '1px dashed oklch(0.72 0.2 40 / 0.3)',
              }}
            />

            {/* Dashed orbit ring 2 */}
            <div
              className="orbit-ring rev absolute rounded-full pointer-events-none"
              style={{
                inset: '27%',
                border: '1px dashed oklch(0.82 0.17 70 / 0.2)',
              }}
            />

            {/* SVG lines from center to each satellite */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {satellites.map((s) => {
                const pos = polarToPercent(s.angle, 46)
                return (
                  <line
                    key={s.label}
                    x1="50" y1="50"
                    x2={pos.left} y2={pos.top}
                    stroke="oklch(0.72 0.2 40 / 0.15)"
                    strokeWidth="0.4"
                  />
                )
              })}
            </svg>

            {/* Satellite nodes */}
            {satellites.map((s) => {
              const pos = polarToPercent(s.angle, 46)
              return (
                <div
                  key={s.label}
                  className="glass absolute mono text-[12px] rounded-lg px-3 py-1.5 whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    color: 'var(--fg-2)',
                    borderColor: 'var(--line)',
                    fontSize: 11,
                  }}
                >
                  {s.label}
                </div>
              )
            })}

            {/* MAIS core center */}
            <div
              className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col items-center justify-center gap-1"
              style={{
                left: '50%', top: '50%',
                width: '22%', height: '22%',
                borderColor: 'oklch(0.72 0.2 40 / 0.5)',
                background: 'linear-gradient(180deg, oklch(0.25 0.02 40 / 0.9), oklch(0.18 0.016 40 / 0.9))',
              }}
            >
              <div className="font-display text-[13px] gradient-text">MAIS</div>
              <div className="mono text-[9px]" style={{ color: 'var(--fg-4)' }}>core</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
