'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

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
    // Replace current locale segment in pathname
    const segments = pathname.split('/')
    // segments[1] is the locale (e.g. 'sk', 'en', 'uk')
    if (['sk', 'en', 'uk'].includes(segments[1])) {
      segments[1] = locale
    } else {
      segments.splice(1, 0, locale)
    }
    router.push(segments.join('/') || '/')
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
            currentLocale === l.code
              ? 'bg-indigo-600 text-white'
              : 'border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
