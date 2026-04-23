'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'

interface HeroSectionProps {
  locale: string
  badge: string
  title1: string
  title2: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}

export function HeroSection({ locale, badge, title1, title2, subtitle, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const mv = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', mv)
    return () => el.removeEventListener('mousemove', mv)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden noise" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="absolute inset-0 spotlight pointer-events-none" />
      <div className="absolute -top-32 -left-20 h-[520px] w-[520px] rounded-full blob-a pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 30%, oklch(0.65 0.24 38 / 0.55), transparent 60%)' }} />
      <div className="absolute -bottom-32 -right-20 h-[520px] w-[520px] rounded-full blob-b pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 70%, oklch(0.58 0.22 25 / 0.4), transparent 60%)' }} />

      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--fg-4)' }}>
        <span className="rotate-180" style={{ writingMode: 'vertical-rl' }}>ITERNAL.SK / MAIS / 2004 — 2026</span>
      </div>
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--fg-4)' }}>
        <span style={{ writingMode: 'vertical-rl' }}>SLOVENSKÉ VYSOKÉ ŠKOLSTVO</span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full py-24">
        <FadeIn delay={0} className="flex justify-center">
          <div className="glass rounded-full pl-1 pr-4 py-1 flex items-center gap-2.5 text-[12.5px]">
            <span className="rounded-full px-2.5 py-0.5 mono text-[10px] tracking-wider uppercase"
              style={{ background: 'oklch(0.72 0.2 40 / 0.18)', border: '1px solid oklch(0.72 0.2 40 / 0.4)', color: 'var(--orange)' }}>
              22 rokov
            </span>
            <span style={{ color: 'var(--fg-2)' }}>{badge}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-center mt-8 text-[48px] md:text-[84px] leading-[0.95]">
            <span className="gradient-text">{title1}</span>
            <br />
            <span className="text-white">{title2}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.22}>
          <p className="mt-8 text-center text-[17px] md:text-[19px] leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--fg-2)' }}>
            {subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.34}>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href={`/${locale}/podpora`}
              className="btn-primary rounded-xl px-6 py-3.5 text-[14px] font-medium inline-flex items-center gap-2 transition-all">
              {ctaPrimary}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link href={`/${locale}/pre-institucie`}
              className="btn-ghost rounded-xl px-6 py-3.5 text-[14px] font-medium inline-flex items-center gap-2 backdrop-blur-md transition-all">
              {ctaSecondary}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.46}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12.5px]" style={{ color: 'var(--fg-3)' }}>
            <span className="flex items-center gap-2">
              <span className="live-dot flex-shrink-0" />
              SLA 99,9% uptime
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--mint)' }}><path d="M20 6 9 17l-5-5" /></svg>
              GDPR / NIS2
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--mint)' }}><path d="M20 6 9 17l-5-5" /></svg>
              Bolonský proces
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--mint)' }}><path d="M20 6 9 17l-5-5" /></svg>
              Open API
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.64}>
          <div className="mt-16 flex justify-center">
            <div className="mono text-[10px] tracking-[0.25em] flex flex-col items-center gap-2" style={{ color: 'var(--fg-4)' }}>
              SCROLL
              <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--fg-4), transparent)' }} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
