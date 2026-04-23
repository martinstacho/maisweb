'use client'
import { PARTNERS_STATIC } from '@/lib/partners-data'

const track = [...PARTNERS_STATIC, ...PARTNERS_STATIC]

export function LogoStrip() {
  return (
    <section
      className="relative border-y overflow-hidden"
      style={{ borderColor: 'var(--line)', background: 'oklch(0.11 0.012 40 / 0.6)' }}
    >
      <div
        className="absolute inset-y-0 left-0 w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--bg), transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, var(--bg), transparent)' }}
      />
      <div className="py-8">
        <div className="mb-6 text-center mono text-[11px] tracking-[0.25em] uppercase" style={{ color: 'var(--fg-4)' }}>
          <span className="inline-flex items-center gap-3">
            <span className="h-px w-10 inline-block" style={{ background: 'var(--line-strong)' }} />
            Dôverujú nám · 4 univerzity + 5 VŠ · 30 000+ študentov
            <span className="h-px w-10 inline-block" style={{ background: 'var(--line-strong)' }} />
          </span>
        </div>
        <div className="flex overflow-hidden">
          <div className="marquee-track flex gap-12 shrink-0 pr-12 items-center">
            {track.map((p, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0 group cursor-default">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                  style={{ background: p.accent, boxShadow: `0 0 14px ${p.accent}` }}
                />
                <span
                  className="font-display text-[22px] md:text-[26px] tracking-tight whitespace-nowrap transition-colors"
                  style={{ color: 'oklch(0.68 0.01 40)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'oklch(0.68 0.01 40)')}
                >
                  {p.short}
                </span>
                <span className="mono text-[10px] tracking-[0.18em] uppercase whitespace-nowrap" style={{ color: 'var(--fg-4)' }}>
                  {p.city}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
