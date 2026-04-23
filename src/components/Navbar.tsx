'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface NavbarProps {
  locale: string
  labels: {
    features: string
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

  const navLinks = [
    { href: '#features', label: labels.features },
    { href: `/${locale}/skoly`, label: labels.schools },
    { href: `/${locale}/pre-institucie`, label: labels.forInstitutions },
    { href: `/${locale}/podpora`, label: labels.support },
    { href: '#contact', label: labels.contact },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
      style={{
        background: scrolled ? 'oklch(0.14 0.012 40 / 0.97)' : 'oklch(0.14 0.012 40 / 0.82)',
        borderBottom: '1px solid var(--line)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <Image src="/logo-mais.png" alt="MAIS logo" width={32} height={32} className="rounded-lg" />
          <span className="font-display text-[17px] tracking-tight" style={{ color: 'var(--fg)' }}>MAIS</span>
          <span className="chip-mono">v2026</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-[13px]">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="ln transition-colors"
              style={{ color: 'var(--fg-3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-3)')}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="live-dot flex-shrink-0" />
            <LanguageSwitcher />
          </div>
          <Link
            href={`/${locale}/pre-institucie`}
            className="btn-primary rounded-lg px-4 py-2 text-[13px] font-medium inline-flex items-center gap-1.5"
          >
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
