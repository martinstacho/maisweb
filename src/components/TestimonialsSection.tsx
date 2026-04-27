'use client'
import { useEffect, useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { useContent } from '@/lib/content-client'
import { monoLetterSize } from '@/lib/partners-data'

interface TestimonialPartner {
  shortName: string
  name: string
  city: string | null
  accent: string
}

interface Testimonial {
  id: string
  title: string
  text: string
  author: string
  partner: TestimonialPartner
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const c = useContent()

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(setTestimonials)
      .catch(console.error)
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section className="relative py-20 md:py-28 border-t" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal><div className="kicker">{c('testimonials.kicker')}</div></Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-[36px] md:text-[56px] mt-4 text-white leading-[1] max-w-3xl">
            {c('testimonials.title')}
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.id} delay={i * 100}>
              <div className="quote-card h-full">
                <span className="quote-mark">"</span>
                <div className="relative">
                  <p className="text-[15.5px] md:text-[16px] leading-relaxed italic" style={{ color: 'var(--fg)' }}>
                    {testimonial.text}
                  </p>
                  <div className="mt-7 pt-6 border-t flex items-center gap-3" style={{ borderColor: 'var(--line)' }}>
                    <div
                      className="shrink-0 flex items-center justify-center rounded-[10px]"
                      style={{
                        width: 48,
                        height: 48,
                        background: `linear-gradient(180deg, ${testimonial.partner.accent}30, ${testimonial.partner.accent}10)`,
                        border: `1px solid ${testimonial.partner.accent}50`,
                      }}
                    >
                      <span
                        className="font-display font-bold text-white leading-none"
                        style={{ fontSize: monoLetterSize(testimonial.partner.shortName) }}
                      >
                        {testimonial.partner.shortName}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] text-white truncate">{testimonial.author}</span>
                      <span className="mono text-[11px] tracking-wider truncate" style={{ color: 'var(--fg-4)' }}>
                        {testimonial.partner.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
