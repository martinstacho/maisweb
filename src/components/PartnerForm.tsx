'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface Partner {
  id?: string
  name: string
  shortName: string
  logoUrl: string
  websiteUrl: string
  loginUrl?: string | null
  applicationUrl?: string | null
  displayOrder: number
  isActive: boolean
}

export function PartnerForm({ initial }: { initial?: Partner }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<Partner>({
    name: initial?.name ?? '',
    shortName: initial?.shortName ?? '',
    logoUrl: initial?.logoUrl ?? '',
    websiteUrl: initial?.websiteUrl ?? '',
    loginUrl: initial?.loginUrl ?? '',
    applicationUrl: initial?.applicationUrl ?? '',
    displayOrder: initial?.displayOrder ?? 0,
    isActive: initial?.isActive ?? true,
  })

  function set(key: keyof Partner, value: string | number | boolean) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function uploadLogo(): Promise<string | null> {
    const file = fileRef.current?.files?.[0]
    if (!file) return null
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    return data.url ?? null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const logoUrl = (await uploadLogo()) ?? form.logoUrl
      const body = { ...form, logoUrl }
      const url = initial?.id ? `/api/partners/${initial.id}` : '/api/partners'
      const method = initial?.id ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error('Chyba pri ukladaní')
      router.push('/admin/partners')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Chyba')
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">Celý názov *</Label>
          <Input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Prešovská univerzita v Prešove" className={fieldClass} />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Skratka *</Label>
          <Input required value={form.shortName} onChange={e => set('shortName', e.target.value)} placeholder="UNIPO" className={fieldClass} />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Poradie zobrazenia</Label>
          <Input type="number" value={form.displayOrder} onChange={e => set('displayOrder', Number(e.target.value))} className={fieldClass} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">Web školy *</Label>
          <Input required type="url" value={form.websiteUrl} onChange={e => set('websiteUrl', e.target.value)} placeholder="https://www.unipo.sk" className={fieldClass} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">Prihlásenie do MAIS (URL)</Label>
          <Input type="url" value={form.loginUrl ?? ''} onChange={e => set('loginUrl', e.target.value)} placeholder="https://mais.unipo.sk/login" className={fieldClass} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">E-prihláška (URL)</Label>
          <Input type="url" value={form.applicationUrl ?? ''} onChange={e => set('applicationUrl', e.target.value)} placeholder="https://eprihlaska.unipo.sk" className={fieldClass} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">Logo (URL priamo)</Label>
          <Input value={form.logoUrl} onChange={e => set('logoUrl', e.target.value)} placeholder="/logos/unipo.svg" className={fieldClass} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">Logo (nahrať súbor — prepíše URL)</Label>
          <input ref={fileRef} type="file" accept="image/*" className="block text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600 cursor-pointer" />
          {form.logoUrl && (
            <div className="mt-2 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.logoUrl} alt="preview" className="h-12 w-24 object-contain rounded border border-slate-700 bg-slate-800 p-1" />
              <span className="text-xs text-slate-500">{form.logoUrl}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-indigo-500" />
          <Label htmlFor="isActive" className="text-slate-300 cursor-pointer">Aktívny (zobrazovať na webe)</Label>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white">
          {loading ? 'Ukladám...' : initial?.id ? 'Uložiť zmeny' : 'Vytvoriť partnera'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/partners')} className="border-slate-700 text-slate-400 hover:bg-slate-800">
          Zrušiť
        </Button>
      </div>
    </form>
  )
}
