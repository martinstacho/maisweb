'use client'
import { Reveal } from '@/components/ui/Reveal'

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
  return { left: 50 + r * Math.cos(rad), top: 50 + r * Math.sin(rad) }
}

export function ArchitectureSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 dots opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <Reveal>
            <div>
              <div className="kicker">Architektúra</div>
              <h2 className="font-display text-[40px] md:text-[56px] mt-5 text-white leading-[0.98]">
                Jedno jadro.<br />
                <span className="gradient-text">Osem modulov.</span><br />
                Nekonečné možnosti.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed max-w-lg" style={{ color: 'var(--fg-2)' }}>
                MAIS je postavený modulárne — každá inštitúcia si vyberá len funkcie, ktoré reálne potrebuje. Systém rastie s vami, bez technického dlhu a bez zbytočného kódu.
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
