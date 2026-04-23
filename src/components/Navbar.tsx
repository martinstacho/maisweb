'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
    <nav
      className={`sticky top-0 z-50 border-b border-slate-800/60 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 shadow-lg shadow-black/20' : 'bg-slate-950/80'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          MAIS
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href={`/${locale}/skoly`} className="hover:text-slate-100 transition-colors">{labels.schools}</Link>
          <Link href={`/${locale}/pre-institucie`} className="hover:text-slate-100 transition-colors">{labels.forInstitutions}</Link>
          <Link href={`/${locale}/podpora`} className="hover:text-slate-100 transition-colors">{labels.support}</Link>
          <Link href={`/${locale}/kontakt`} className="hover:text-slate-100 transition-colors">{labels.contact}</Link>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href={`/${locale}/pre-institucie`}>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">{labels.cta}</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
