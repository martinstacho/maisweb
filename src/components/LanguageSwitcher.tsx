'use client'
import { usePathname, useRouter, useParams } from 'next/navigation'

const locales = [
  { code: 'sk', label: 'SK' },
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UK' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = (params?.locale as string) ?? 'sk'

  function switchLocale(locale: string) {
    const segments = pathname.split('/')
    if (['sk', 'en', 'uk'].includes(segments[1])) {
      segments[1] = locale
    } else {
      segments.splice(1, 0, locale)
    }
    router.push(segments.join('/') || '/')
  }

  return (
    <div className="flex items-center gap-0.5">
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => switchLocale(l.code)}
            className="mono text-[11px] px-1.5 py-0.5 rounded transition-all"
            style={{
              color: currentLocale === l.code ? 'var(--fg)' : 'var(--fg-4)',
              fontWeight: currentLocale === l.code ? 600 : 400,
            }}
          >
            {l.label}
          </button>
          {i < locales.length - 1 && (
            <span className="mono text-[11px]" style={{ color: 'var(--fg-4)' }}>·</span>
          )}
        </span>
      ))}
    </div>
  )
}
