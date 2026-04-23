'use client'
import { motion } from 'motion/react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  desc: string
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors"
    >
      <div className="mb-4 text-indigo-400">{icon}</div>
      <h3 className="mb-2 font-semibold text-slate-100">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  )
}
