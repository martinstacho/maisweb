import Link from 'next/link'

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
  return (
    <footer id="contact" className="relative overflow-hidden border-t" style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          <div>
            <div className="font-display text-[28px] gradient-text mb-3 w-fit">MAIS</div>
            <p className="text-[13px] leading-relaxed max-w-[260px]" style={{ color: 'var(--fg-3)' }}>{labels.tagline}</p>
            <div className="mt-5 flex flex-col gap-1.5 text-[13px]" style={{ color: 'var(--fg-3)' }}>
              <span>ITernal s.r.o.</span>
              <span>Sládkovičova 533/20, 018 41 Dubnica nad Váhom</span>
              <a href="tel:+421915724757" className="ln hover:text-white transition-colors w-fit" style={{ color: 'var(--fg-2)' }}>+421 915 724 757</a>
              <a href="mailto:podpora@mais.sk" className="ln hover:text-white transition-colors w-fit" style={{ color: 'var(--fg-2)' }}>podpora@mais.sk</a>
            </div>
          </div>

          <div>
            <div className="mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>{labels.navigation}</div>
            <div className="flex flex-col gap-2.5">
              {[
                { href: `/${locale}/skoly`, label: labels.schools },
                { href: `/${locale}/pre-institucie`, label: labels.forInstitutions },
                { href: `/${locale}/podpora`, label: labels.support },
                { href: `/${locale}/kontakt`, label: labels.contact },
              ].map(({ href, label }) => (
                <Link key={href} href={href}
                  className="ln text-[13px] transition-colors hover:text-white w-fit"
                  style={{ color: 'var(--fg-3)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>MAIS Moduly</div>
            <div className="flex flex-col gap-2.5 text-[13px]" style={{ color: 'var(--fg-3)' }}>
              {['Študijná agenda', 'E-prihláška', 'Harmonogramy', 'SIMUS / CVTI', 'Knižnica', 'Ekonomika'].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'var(--line)' }}>
          <div className="mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--fg-4)' }}>
            © {new Date().getFullYear()} ITERNAL S.R.O.
          </div>
          <div className="mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--fg-4)' }}>
            {labels.rights}
          </div>
        </div>
      </div>
    </footer>
  )
}
