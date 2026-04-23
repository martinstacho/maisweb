import Link from 'next/link'
import Image from 'next/image'

interface MaisFooterProps {
  locale: string
  labels: {
    tagline: string
    navigation: string
    rights: string
    schools: string
    forInstitutions: string
    support: string
    contact: string
  }
}

export function MaisFooter({ locale, labels }: MaisFooterProps) {
  const year = new Date().getFullYear()
  const build = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  return (
    <footer className="border-t relative" style={{ borderColor: 'var(--line)' }}>
      {/* Giant wordmark */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div
            className="font-display tracking-tighter leading-none text-[14vw] md:text-[11vw] text-center select-none"
            style={{
              background: 'linear-gradient(180deg, oklch(0.35 0.06 40 / 0.5), oklch(0.14 0.012 40 / 0))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', color: 'transparent',
            }}
          >
            MAIS
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-[13.5px]" style={{ color: 'var(--fg-3)' }}>
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden" style={{ filter: 'drop-shadow(0 4px 14px oklch(0.65 0.22 40 / 0.4))' }}>
              <Image src="/logo-mais.png" alt="MAIS" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <span className="font-display text-white text-[17px]">MAIS</span>
          </div>
          <p className="mt-4 max-w-sm" style={{ textWrap: 'pretty' } as React.CSSProperties}>{labels.tagline}</p>
          <div className="mt-6">
            <div className="chip-mono inline-flex items-center gap-1.5">
              <span className="live-dot" style={{ width: 6, height: 6 }} /> Všetky systémy online
            </div>
          </div>
        </div>

        <div>
          <div className="mono text-[10.5px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>{labels.navigation}</div>
          <div className="flex flex-col gap-2.5">
            {[
              { href: `/${locale}#schools`, label: labels.schools },
              { href: `/${locale}/pre-institucie`, label: labels.forInstitutions },
              { href: `/${locale}/podpora`, label: labels.support },
              { href: `/${locale}#contact`, label: labels.contact },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <div className="mono text-[10.5px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>ITernal s.r.o.</div>
          <div className="text-white/90">Sládkovičova 533/20</div>
          <div>018 41 Dubnica nad Váhom</div>
          <a href="tel:+421915724757" className="mt-3 block hover:text-white transition-colors mono">+421 915 724 757</a>
          <a href="mailto:podpora@mais.sk" className="hover:text-white transition-colors mono">podpora@mais.sk</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px]" style={{ color: 'var(--fg-4)' }}>
          <div>© {year} ITernal s.r.o. · {labels.rights}</div>
          <div className="flex items-center gap-4 mono">
            <span>v2026.4.1</span>
            <span>·</span>
            <span>Build {build}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
