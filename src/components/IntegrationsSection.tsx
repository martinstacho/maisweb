'use client'
import { motion } from 'motion/react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Reveal } from '@/components/ui/Reveal'

const categories = [
  {
    name: 'Identita & Prístup',
    accent: 'var(--indigo)',
    chips: ['LDAP', 'IDM', 'OAuth2', 'Single Sign-On'],
  },
  {
    name: 'Ekonomika & Financie',
    accent: 'var(--amber)',
    chips: ['SAP', 'Štátna pokladnica', 'Omega', 'EM Študent', 'TransCard'],
  },
  {
    name: 'Štúdium & Výskum',
    accent: 'var(--mint)',
    chips: ['CRŠ', 'UIPŠ / CVTI', 'EZP', 'CRZP', 'PLAGOFF', 'ISOIS'],
  },
  {
    name: 'Registratúra & Dokumenty',
    accent: 'var(--coral)',
    chips: ['MEMPHIS', 'ADMIS', 'ESPIS', 'Autogram', 'Podpisuj'],
  },
  {
    name: 'Externé systémy',
    accent: 'var(--orange)',
    chips: ['PrihláškaVŠ', 'aSc Rozvrhy', 'E-learning / LMS', 'Aleph', 'DaVinci'],
  },
  {
    name: 'Mobilné & Notifikácie',
    accent: 'var(--violet)',
    chips: ['Android App', 'iOS App', 'Banner systém', 'Push notifikácie'],
  },
]

export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="relative py-28 border-t overflow-hidden"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="absolute inset-0 dots opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6">

        <Reveal>
          <div className="mb-16">
            <div className="kicker">Integrácie</div>
            <h2 className="font-display text-[40px] md:text-[64px] mt-5 text-white leading-[0.95]">
              Napojený na{' '}
              <span className="gradient-text">celý ekosystém</span>
            </h2>
            <div className="flex items-baseline gap-2 mt-6">
              <NumberTicker
                value={20}
                className="font-display text-[72px] text-white leading-none"
              />
              <span className="font-display text-[48px]" style={{ color: 'var(--orange)' }}>+</span>
              <span className="text-[18px]" style={{ color: 'var(--fg-3)' }}>integrácií</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, catIdx) => (
            <Reveal key={cat.name} delay={catIdx * 70}>
              <div className="glass rounded-2xl p-6 relative overflow-hidden group h-full">
                <div className="beam rounded-2xl" />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${cat.accent}, var(--amber))` }}
                />
                <div
                  className="chip-mono mb-4 self-start"
                  style={{ borderColor: `color-mix(in oklch, ${cat.accent} 50%, transparent)`, color: cat.accent }}
                >
                  {cat.name}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cat.chips.map((chip, chipIdx) => (
                    <motion.span
                      key={chip}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: catIdx * 0.1 + chipIdx * 0.04,
                        duration: 0.28,
                        ease: 'easeOut',
                      }}
                      className="chip-mono cursor-default transition-all duration-200"
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = `color-mix(in oklch, ${cat.accent} 40%, transparent)`
                        el.style.color = '#fff'
                        el.style.background = `color-mix(in oklch, ${cat.accent} 10%, transparent)`
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.borderColor = ''
                        el.style.color = ''
                        el.style.background = ''
                      }}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
