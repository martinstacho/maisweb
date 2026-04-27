'use client'
import { useState, useCallback } from 'react'
import { ChevronDown, ChevronRight, Save, RotateCcw, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ContentPage, ContentGroup, ContentField } from '@/lib/content-schema'

type LocaleKey = 'sk' | 'en' | 'uk' | 'hu'
type ContentMap = Record<string, string>

interface Props {
  page: ContentPage
  initialContent: Record<LocaleKey, ContentMap>
  dbKeys: string[] // "key::locale" pairs that have DB overrides
}

const LOCALE_META: { code: LocaleKey; flag: string; label: string }[] = [
  { code: 'sk', flag: '🇸🇰', label: 'SK' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'uk', flag: '🇺🇦', label: 'UK' },
  { code: 'hu', flag: '🇭🇺', label: 'HU' },
]

export function ContentEditor({ page, initialContent, dbKeys }: Props) {
  const [content, setContent] = useState<Record<LocaleKey, ContentMap>>(() => ({
    sk: { ...initialContent.sk },
    en: { ...initialContent.en },
    uk: { ...initialContent.uk },
    hu: { ...initialContent.hu },
  }))

  // Track which (key, locale) combos are modified (unsaved)
  const [modified, setModified] = useState<Set<string>>(new Set())
  // Track which (key, locale) combos have DB overrides
  const [dbOverrides, setDbOverrides] = useState<Set<string>>(new Set(dbKeys))

  const [saving, setSaving] = useState<Set<string>>(new Set()) // fieldKey being saved
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  function handleChange(key: string, locale: LocaleKey, value: string) {
    setContent(prev => ({
      ...prev,
      [locale]: { ...prev[locale], [key]: value },
    }))
    setModified(prev => new Set(prev).add(`${key}::${locale}`))
  }

  async function handleSave(field: ContentField) {
    const key = field.key
    setSaving(prev => new Set(prev).add(key))
    try {
      const modifiedLocales = LOCALE_META.filter(l =>
        modified.has(`${key}::${l.code}`)
      )
      if (modifiedLocales.length === 0) {
        showToast('Žiadne zmeny na uloženie', 'error')
        return
      }

      const results = await Promise.all(
        modifiedLocales.map(l =>
          fetch('/api/site-content', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key, locale: l.code, value: content[l.code][key] ?? '' }),
          })
        )
      )

      const allOk = results.every(r => r.ok)
      if (!allOk) throw new Error('Chyba pri ukladaní')

      // Clear modified flags, mark as DB override
      setModified(prev => {
        const next = new Set(prev)
        modifiedLocales.forEach(l => next.delete(`${key}::${l.code}`))
        return next
      })
      setDbOverrides(prev => {
        const next = new Set(prev)
        modifiedLocales.forEach(l => next.add(`${key}::${l.code}`))
        return next
      })
      showToast('Uložené ✓')
    } catch {
      showToast('Chyba pri ukladaní', 'error')
    } finally {
      setSaving(prev => { const next = new Set(prev); next.delete(key); return next })
    }
  }

  async function handleReset(field: ContentField) {
    if (!confirm(`Naozaj resetovať "${field.label}" na pôvodný text zo všetkých 4 jazykov?`)) return
    const key = field.key
    setSaving(prev => new Set(prev).add(key))
    try {
      const results = await Promise.all(
        LOCALE_META.map(l =>
          fetch(`/api/site-content/${encodeURIComponent(key)}?locale=${l.code}`, { method: 'DELETE' })
        )
      )
      const allOk = results.every(r => r.ok)
      if (!allOk) throw new Error('Chyba pri resete')

      // Refresh values from server
      const refreshed = await Promise.all(
        LOCALE_META.map(async l => {
          const res = await fetch(`/api/site-content?locale=${l.code}`)
          const data: ContentMap = await res.json()
          return [l.code, data] as [LocaleKey, ContentMap]
        })
      )
      setContent(prev => {
        const next = { ...prev }
        refreshed.forEach(([locale, data]) => {
          next[locale] = data
        })
        return next
      })
      setModified(prev => {
        const next = new Set(prev)
        LOCALE_META.forEach(l => next.delete(`${key}::${l.code}`))
        return next
      })
      setDbOverrides(prev => {
        const next = new Set(prev)
        LOCALE_META.forEach(l => next.delete(`${key}::${l.code}`))
        return next
      })
      showToast('Resetované na pôvodný text')
    } catch {
      showToast('Chyba pri resete', 'error')
    } finally {
      setSaving(prev => { const next = new Set(prev); next.delete(key); return next })
    }
  }

  function toggleGroup(id: string) {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const fieldClass = 'w-full bg-slate-800 border border-slate-700 text-slate-100 text-sm rounded-lg px-3 py-2 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none'
  const fieldModifiedClass = 'border-amber-600 focus:border-amber-500 focus:ring-amber-500'

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium transition-all ${
          toast.type === 'success'
            ? 'bg-emerald-900 text-emerald-100 border border-emerald-700'
            : 'bg-red-900 text-red-100 border border-red-700'
        }`}>
          {toast.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

      {page.groups.map((group: ContentGroup) => {
        const isOpen = !collapsed[group.id]
        const groupHasDb = group.fields.some(f =>
          LOCALE_META.some(l => dbOverrides.has(`${f.key}::${l.code}`))
        )
        const groupHasModified = group.fields.some(f =>
          LOCALE_META.some(l => modified.has(`${f.key}::${l.code}`))
        )

        return (
          <div key={group.id} className="rounded-xl border border-slate-800 overflow-hidden">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center justify-between px-6 py-4 bg-slate-900/80 hover:bg-slate-900 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                {isOpen ? <ChevronDown size={16} className="text-slate-400 shrink-0" /> : <ChevronRight size={16} className="text-slate-400 shrink-0" />}
                <span className="font-semibold text-slate-100">{group.title}</span>
                {group.description && (
                  <span className="text-xs text-slate-500 hidden sm:block">{group.description}</span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                {groupHasModified && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-400 border border-amber-800">neuložené</span>
                )}
                {groupHasDb && !groupHasModified && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/40 text-indigo-400 border border-indigo-800">upravené</span>
                )}
                <span className="text-xs text-slate-600">{group.fields.length} polí</span>
              </div>
            </button>

            {isOpen && (
              <div className="divide-y divide-slate-800/60">
                {group.fields.map((field: ContentField) => {
                  const isSaving = saving.has(field.key)
                  const hasModified = LOCALE_META.some(l => modified.has(`${field.key}::${l.code}`))
                  const hasDb = LOCALE_META.some(l => dbOverrides.has(`${field.key}::${l.code}`))

                  return (
                    <div key={field.key} className="px-6 py-5 bg-slate-950/30">
                      {/* Field header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-slate-200">{field.label}</span>
                            {hasModified ? (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-400 border border-amber-800">neuložené</span>
                            ) : hasDb ? (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-900/40 text-indigo-400 border border-indigo-800">upravené v DB</span>
                            ) : (
                              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">pôvodné</span>
                            )}
                          </div>
                          {field.description && (
                            <p className="text-xs text-slate-500 mt-0.5">{field.description}</p>
                          )}
                          <p className="text-xs text-slate-700 mt-0.5 font-mono">{field.key}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => handleSave(field)}
                            disabled={isSaving || !hasModified}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 h-8 px-3 text-xs"
                          >
                            {isSaving ? (
                              <span className="flex items-center gap-1"><span className="animate-spin">⏳</span> Ukladám</span>
                            ) : (
                              <span className="flex items-center gap-1"><Save size={12} /> Uložiť</span>
                            )}
                          </Button>
                          {hasDb && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReset(field)}
                              disabled={isSaving}
                              className="border-slate-700 text-slate-400 hover:bg-red-900/20 hover:border-red-800 hover:text-red-400 h-8 px-3 text-xs"
                            >
                              <RotateCcw size={12} className="mr-1" /> Reset
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Language inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                        {LOCALE_META.map(({ code, flag, label }) => {
                          const isModified = modified.has(`${field.key}::${code}`)
                          const value = content[code]?.[field.key] ?? ''

                          return (
                            <div key={code} className="space-y-1">
                              <label className="flex items-center gap-1.5 text-xs text-slate-400">
                                <span>{flag}</span>
                                <span className="font-medium">{label}</span>
                              </label>
                              {field.type === 'textarea' ? (
                                <textarea
                                  value={value}
                                  onChange={e => handleChange(field.key, code, e.target.value)}
                                  rows={3}
                                  className={`${fieldClass} ${isModified ? fieldModifiedClass : ''}`}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={value}
                                  onChange={e => handleChange(field.key, code, e.target.value)}
                                  className={`${fieldClass} ${isModified ? fieldModifiedClass : ''}`}
                                />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
