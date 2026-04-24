'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/integrations'

interface IntegrationData {
  id?: string
  name: string
  category: string
  isActive: boolean
  displayOrder: number
}

export function IntegrationForm({ initial }: { initial?: IntegrationData }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<IntegrationData>(initial ?? {
    name: '', category: 'identity', isActive: true, displayOrder: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = isEdit ? `/api/integrations/${initial!.id}` : '/api/integrations'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(await res.text())
      router.push('/admin/integrations')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chyba')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-slate-300 mb-2 block">Názov</Label>
        <Input
          id="name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          placeholder="napr. LDAP"
          className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
        />
      </div>

      <div>
        <Label htmlFor="category" className="text-slate-300 mb-2 block">Kategória</Label>
        <select
          id="category"
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {CATEGORY_ORDER.map(id => (
            <option key={id} value={id}>{CATEGORY_META[id].label}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="displayOrder" className="text-slate-300 mb-2 block">Poradie</Label>
        <Input
          id="displayOrder"
          type="number"
          value={form.displayOrder}
          onChange={e => setForm(f => ({ ...f, displayOrder: Number(e.target.value) }))}
          className="bg-slate-800 border-slate-700 text-slate-100 w-32"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isActive"
          type="checkbox"
          checked={form.isActive}
          onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))}
          className="h-4 w-4 rounded border-slate-700 accent-indigo-500"
        />
        <Label htmlFor="isActive" className="text-slate-300 cursor-pointer">Aktívna</Label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white">
          {loading ? 'Ukladám...' : isEdit ? 'Uložiť zmeny' : 'Pridať integráciu'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/integrations')}
          className="border-slate-700 text-slate-400 hover:bg-slate-800">
          Zrušiť
        </Button>
      </div>
    </form>
  )
}
