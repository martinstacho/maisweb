interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  desc: string
  code?: string
}

export function FeatureCard({ icon, title, desc, code }: FeatureCardProps) {
  return (
    <div className="bento-card p-6">
      <div className="stripe" />
      <div className="flex items-start justify-between mb-5">
        <div className="ico-box rounded-xl w-11 h-11 flex items-center justify-center" style={{ color: 'var(--orange)' }}>
          {icon}
        </div>
        {code && (
          <span className="mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--fg-4)' }}>
            {code}
          </span>
        )}
      </div>
      <div className="font-semibold text-[15px] mb-2" style={{ color: 'var(--fg)' }}>{title}</div>
      <div className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-3)' }}>{desc}</div>
    </div>
  )
}
