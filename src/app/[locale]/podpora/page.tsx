import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { FadeIn } from '@/components/FadeIn'
import { MaisFooter } from '@/components/MaisFooter'
import { SchoolSupportCard } from '@/components/SchoolSupportCard'

export const dynamic = 'force-dynamic'

async function getPartners() {
  return prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: 'asc' },
  })
}

export default async function PodporaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const [t, tfoot] = await Promise.all([
    getTranslations('nav'),
    getTranslations('footer'),
  ])
  const partners = await getPartners()

  return (
    <div className="min-h-screen" style={{ background: 'var(--mais-bg)', color: 'var(--mais-fg)' }}>
      <Navbar locale={locale} labels={{
        features: t('features'),
        schools: t('schools'),
        forInstitutions: t('forInstitutions'),
        support: t('support'),
        contact: t('contact'),
        cta: t('cta'),
      }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 mais-hero-grid-sm pointer-events-none opacity-60" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <div className="mais-kicker justify-center mb-6">Podpora MAIS</div>
            <h1 className="font-display text-[48px] md:text-[72px] leading-[0.95] mb-6">
              <span className="mais-gradient-text">Sme tu</span>
              <br />
              <span style={{ color: 'var(--mais-fg)' }}>pre vás</span>
            </h1>
            <p className="text-[17px] leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--mais-fg-2)' }}>
              Technická podpora pre používateľov systému MAIS. Kontaktujte helpdesk vašej inštitúcie.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* General contact */}
      <section className="px-6 pb-16">
        <FadeIn>
          <div className="mx-auto max-w-2xl mais-bento-card p-8">
            <div className="mais-stripe" />
            <div className="mais-kicker mb-5">ITernal s.r.o. — Hlavná podpora</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="mono text-[10px] tracking-wider mb-2" style={{ color: 'var(--mais-fg-4)' }}>TELEFÓN</div>
                <a href="tel:+421915724757" className="mais-action-row">
                  <span className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/>
                    </svg>
                    +421 915 724 757
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
                <div className="mono text-[10px] mt-2" style={{ color: 'var(--mais-fg-4)' }}>Po–Pia 9:00 – 15:00</div>
              </div>
              <div>
                <div className="mono text-[10px] tracking-wider mb-2" style={{ color: 'var(--mais-fg-4)' }}>E-MAIL</div>
                <a href="mailto:podpora@mais.sk" className="mais-action-row primary">
                  <span className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    podpora@mais.sk
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Institution support cards */}
      <section className="border-t px-6 py-20" style={{ borderColor: 'var(--mais-line)', background: 'var(--mais-bg-2)' }}>
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-10 text-center">
            <div className="mais-kicker justify-center mb-3">Kontakty podľa školy</div>
            <h2 className="font-display text-[30px] md:text-[42px]" style={{ color: 'var(--mais-fg)' }}>
              Helpdesk vašej <span className="mais-gradient-text">inštitúcie</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <SchoolSupportCard partner={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <MaisFooter locale={locale} labels={{
        tagline: tfoot('tagline'),
        navigation: tfoot('navigation'),
        rights: tfoot('rights'),
        schools: t('schools'),
        forInstitutions: t('forInstitutions'),
        support: t('support'),
        contact: t('contact'),
      }} />
    </div>
  )
}
