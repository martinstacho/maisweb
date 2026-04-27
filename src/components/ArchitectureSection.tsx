'use client'
import { Reveal } from '@/components/ui/Reveal'
import { useContent } from '@/lib/content-client'

function polarToPercent(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { left: 50 + r * Math.cos(rad), top: 50 + r * Math.sin(rad) }
}

const SATELLITE_ANGLES = [0, 40, 80, 120, 160, 200, 240, 280, 320]

export function ArchitectureSection() {
  const c = useContent()

  const techCards = [
    { label: c('arch.techSSO'), value: 'LDAP / OAuth2' },
    { label: c('arch.techDB'),  value: 'PostgreSQL' },
    { label: c('arch.techInt'), value: 'SIMUS · CVTI · ISSP' },
    { label: c('arch.techBak'), value: 'incremental · daily' },
  ]

  const satellites = c('arch.modules').split(',').map((label, i) => ({
    label: label.trim(),
    angle: SATELLITE_ANGLES[i] ?? i * 40,
  }))

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dots opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <Reveal>
            <div>
              <div className="kicker">{c('arch.kicker')}</div>
              <h2 className="font-display text-[40px] md:text-[56px] mt-5 text-white leading-[0.98]">
                {c('arch.line1')}<br />
                <span className="gradient-text">{c('arch.line2')}</span><br />
                {c('arch.line3')}
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed max-w-lg" style={{ color: 'var(--fg-2)' }}>
                {c('arch.desc')}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
                {techCards.map(({ label, value }) => (
                  <div key={label} className="glass rounded-lg px-4 py-3">
                    <div className="mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>{label}</div>
                    <div className="mt-1 text-[13px] text-white mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative aspect-square max-w-[520px] mx-auto">
              {[0.45, 0.68, 0.92].map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full"
                  style={{ margin: `${(1 - s) * 50}%`, border: '1px solid var(--line-strong)' }}
                />
              ))}
              <div
                className="orbit-ring absolute inset-0 rounded-full border border-dashed pointer-events-none"
                style={{ margin: '6%', borderColor: 'oklch(0.6 0.15 40 / 0.25)' }}
              />
              <div
                className="orbit-ring rev absolute inset-0 rounded-full border border-dashed pointer-events-none"
                style={{ margin: '20%', borderColor: 'oklch(0.7 0.14 70 / 0.2)' }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="relative rounded-2xl node flex flex-col items-center justify-center text-center"
                  style={{ width: '30%', aspectRatio: '1/1' }}
                >
                  <div className="beam always rounded-2xl" />
                  <div className="font-display text-[22px] text-white">MAIS</div>
                  <div className="mono text-[10px] mt-1" style={{ color: 'var(--fg-3)' }}>core engine</div>
                </div>
              </div>

              {satellites.map((m, i) => {
                const pos = polarToPercent(m.angle, 46)
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: 'translate(-50%,-50%)' }}
                  >
                    <div className="node rounded-lg px-3 py-1.5 text-[12px] mono whitespace-nowrap shadow-lg" style={{ color: 'var(--fg)' }}>
                      {m.label}
                    </div>
                  </div>
                )
              })}

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {satellites.map((m, i) => {
                  const pos = polarToPercent(m.angle, 46)
                  return (
                    <line
                      key={i}
                      x1="50" y1="50"
                      x2={pos.left} y2={pos.top}
                      stroke="oklch(0.7 0.12 40 / 0.22)"
                      strokeWidth="0.2"
                      strokeDasharray="0.8 0.6"
                    />
                  )
                })}
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
