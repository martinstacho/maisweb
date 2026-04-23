interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  desc: string
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="bento-card p-6">
      <div className="stripe" />
      <div className="ico-box rounded-xl w-11 h-11 flex items-center justify-center mb-5" style={{ color: 'var(--orange)' }}>
        {icon}
      </div>
      <div className="font-semibold text-[15px] mb-2" style={{ color: 'var(--fg)' }}>{title}</div>
      <div className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-3)' }}>{desc}</div>
    </div>
  )
}
