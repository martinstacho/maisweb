'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface NavbarProps {
  locale: string
  labels: {
    schools: string
    forInstitutions: string
    support: string
    contact: string
    cta: string
  }
}

export function Navbar({ locale, labels }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
      style={{
        background: scrolled ? 'oklch(0.14 0.012 40 / 0.97)' : 'oklch(0.14 0.012 40 / 0.82)',
        borderBottom: '1px solid var(--mais-line)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <span className="font-display text-[22px] mais-gradient-text">MAIS</span>
          <span className="mais-chip">v2026</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-[13px]">
          {[
            { href: `/${locale}/skoly`, label: labels.schools },
            { href: `/${locale}/pre-institucie`, label: labels.forInstitutions },
            { href: `/${locale}/podpora`, label: labels.support },
            { href: `/${locale}/kontakt`, label: labels.contact },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="mais-ln transition-colors"
              style={{ color: 'var(--mais-fg-3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--mais-fg)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--mais-fg-3)')}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href={`/${locale}/pre-institucie`}
            className="mais-btn-primary rounded-lg px-4 py-2 text-[13px] font-medium inline-flex items-center gap-1.5">
            {labels.cta}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}
