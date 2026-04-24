'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Partner { id: string; shortName: string; name: string }

interface TestimonialData {
  id?: string
  title: string
  text: string
  author: string
  partnerId: string
  isActive: boolean
}

export function TestimonialForm({
  initial,
  partners,
}: {
  initial?: TestimonialData
  partners: Partner[]
}) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<TestimonialData>(
    initial ?? { title: '', text: '', author: '', partnerId: partners[0]?.id ?? '', isActive: true }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = isEdit ? `/api/testimonials/${initial!.id}` : '/api/testimonials'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      router.push('/admin/testimonials')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chyba')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title" className="text-slate-300 mb-2 block">Nadpis</Label>
        <Input id="title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          required placeholder="napr. Digitalizácia prijímacieho konania"
          className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500" />
      </div>

      <div>
        <Label htmlFor="text" className="text-slate-300 mb-2 block">Text referencie</Label>
        <textarea
          id="text"
          value={form.text}
          onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
          required
          rows={4}
          placeholder="Citát alebo referencia..."
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      <div>
        <Label htmlFor="author" className="text-slate-300 mb-2 block">Od koho</Label>
        <Input id="author" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
          required placeholder="napr. IT oddelenie"
          className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500" />
      </div>

      <div>
        <Label htmlFor="partnerId" className="text-slate-300 mb-2 block">Partner</Label>
        <select
          id="partnerId"
          value={form.partnerId}
          onChange={e => setForm(f => ({ ...f, partnerId: e.target.value }))}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {partners.map(p => (
            <option key={p.id} value={p.id}>{p.shortName} — {p.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <input id="isActive" type="checkbox" checked={form.isActive}
          onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
          className="h-4 w-4 rounded border-slate-700 accent-indigo-500" />
        <Label htmlFor="isActive" className="text-slate-300 cursor-pointer">Aktívna</Label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white">
          {loading ? 'Ukladám...' : isEdit ? 'Uložiť zmeny' : 'Pridať referenciu'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/testimonials')}
          className="border-slate-700 text-slate-400 hover:bg-slate-800">
          Zrušiť
        </Button>
      </div>
    </form>
  )
}
