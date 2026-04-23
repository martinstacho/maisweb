import { Globe, LogIn, FileText } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { BorderBeam } from '@/components/ui/border-beam'

interface Partner {
  id: string
  name: string
  shortName: string
  logoUrl: string
  websiteUrl: string
  loginUrl?: string | null
  applicationUrl?: string | null
}

export async function PartnerCard({ partner, locale }: { partner: Partner; locale?: string }) {
  const t = await getTranslations('partners')

  return (
    <div className="group relative overflow-hidden flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:border-slate-600 hover:shadow-[0_0_24px_rgba(99,102,241,0.12)]">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <BorderBeam size={80} duration={8} colorFrom="#6366f1" colorTo="#a855f7" />
      </div>
      {/* Logo */}
      <div className="mb-5 flex h-20 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          className="max-h-16 max-w-full object-contain"
        />
      </div>

      {/* Name */}
      <div className="mb-4 text-center">
        <div className="text-base font-semibold text-slate-100 leading-snug">{partner.name}</div>
        <div className="mt-1 text-sm text-slate-500 font-mono">{partner.shortName}</div>
      </div>

      {/* Divider */}
      <div className="mb-4 border-t border-slate-800" />

      {/* Links */}
      <div className="flex flex-col gap-2 text-sm">
        <a
          href={partner.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-200"
        >
          <Globe size={14} className="shrink-0" />
          {t('website')}
        </a>
        {partner.loginUrl && (
          <a
            href={partner.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-200"
          >
            <LogIn size={14} className="shrink-0" />
            {t('login')}
          </a>
        )}
        {partner.applicationUrl && (
          <a
            href={partner.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-200"
          >
            <FileText size={14} className="shrink-0" />
            {t('application')}
          </a>
        )}
      </div>
    </div>
  )
}
