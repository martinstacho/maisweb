'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
  activePage?: string
}

export function Navbar({ locale, labels, activePage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 12)
    onS()
    window.addEventListener('scroll', onS, { passive: true })
    return () => window.removeEventListener('scroll', onS)
  }, [])

  const navLinks = [
    { href: `/${locale}#features`, label: 'Funkcie' },
    { href: `/${locale}#schools`, label: labels.schools },
    { href: `/${locale}/pre-institucie`, label: labels.forInstitutions },
    { href: `/${locale}/podpora`, label: labels.support },
    { href: `/${locale}#contact`, label: labels.contact },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      style={scrolled ? {
        borderColor: 'var(--line)',
        background: 'oklch(0.14 0.012 40 / 0.8)',
      } : undefined}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div
            className="relative h-9 w-9 overflow-hidden transition-transform group-hover:scale-[1.04]"
            style={{ filter: 'drop-shadow(0 6px 20px oklch(0.65 0.22 40 / 0.45))' }}
          >
            <Image src="/logo-mais.png" alt="MAIS" width={36} height={36} className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-[17px] tracking-tight" style={{ color: 'var(--fg)' }}>MAIS</span>
          <span className="chip-mono hidden sm:inline-flex">v2026</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-[13.5px]" style={{ color: 'var(--fg-2)' }}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="ln hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 chip-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--mint)' }} />
            SK · EN · UK
          </div>
          <Link
            href={`/${locale}#contact`}
            className="btn-primary rounded-lg px-4 py-2 text-[13px] font-medium inline-flex items-center gap-1.5"
          >
            {labels.cta}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  )
}
