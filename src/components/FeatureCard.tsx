import { type ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  desc: string
  code?: string
  accent?: string
  size?: 'lg' | 'md'
  tags?: string[]
}

export function FeatureCard({ icon, title, desc, code, accent = 'var(--orange)', size = 'md', tags }: FeatureCardProps) {
  return (
    <div
      className={`group relative glass rounded-2xl p-7 md:p-8 h-full overflow-hidden transition-all duration-300 hover:-translate-y-1${size === 'lg' ? ' md:col-span-2' : ''}`}
      style={{ borderColor: 'oklch(0.4 0.025 40 / 0.4)' }}
    >
      <div className="beam rounded-2xl" />
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 60%)`, filter: 'blur(40px)' }}
      />
      <div className="flex items-start justify-between mb-8">
        <div className="ico-box rounded-xl w-11 h-11 flex items-center justify-center" style={{ color: accent }}>
          {icon}
        </div>
        {code && (
          <span className="mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>{code}</span>
        )}
      </div>
      <h3 className="font-display text-[22px] md:text-[24px] text-white tracking-tight leading-tight">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed max-w-md" style={{ color: 'var(--fg-2)' }}>
        {desc}
      </p>
      {tags && tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="chip-mono">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
