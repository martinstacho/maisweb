'use client'

const INSTITUTIONS = [
  { short: 'TUKE', name: 'Technická univerzita v Košiciach' },
  { short: 'TRUNI', name: 'Trnavská univerzita v Trnave' },
  { short: 'SZU', name: 'Slovenská zdravotnícka univerzita' },
  { short: 'UNIPO', name: 'Prešovská univerzita v Prešove' },
  { short: 'AOS', name: 'Akadémia ozbrojených síl' },
  { short: 'APZ', name: 'Akadémia policajného zboru' },
  { short: 'BISLA', name: 'BISLA Slovak International School of Liberal Arts' },
  { short: 'DTI', name: 'Dubnica Institute of Technology' },
  { short: 'VŠBM', name: 'Vysoká škola bezpečnostného manažérstva' },
]

const items = [...INSTITUTIONS, ...INSTITUTIONS]

export function LogoStrip() {
  return (
    <div className="relative border-y overflow-hidden py-6" style={{ borderColor: 'var(--mais-line)', background: 'var(--mais-bg-2)' }}>
      <div className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, var(--mais-bg-2), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, var(--mais-bg-2), transparent)' }} />
      <div className="mais-marquee flex items-center gap-12 w-max">
        {items.map((inst, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--mais-orange)' }} />
            <div className="mono text-[12px] font-semibold tracking-wider" style={{ color: 'var(--mais-fg)' }}>{inst.short}</div>
            <div className="text-[12px]" style={{ color: 'var(--mais-fg-3)' }}>{inst.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
