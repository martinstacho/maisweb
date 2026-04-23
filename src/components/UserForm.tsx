'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface UserData {
  id?: string
  email?: string
  name?: string | null
  isSelf?: boolean
}

export function UserForm({ initial }: { initial?: UserData }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!isEdit && password.length < 8) {
      setError('Heslo musí mať minimálne 8 znakov.')
      return
    }
    if (password && password !== confirm) {
      setError('Heslá sa nezhodujú.')
      return
    }
    if (password && password.length < 8) {
      setError('Heslo musí mať minimálne 8 znakov.')
      return
    }

    setLoading(true)
    try {
      const body: Record<string, unknown> = { name }
      if (!isEdit) {
        body.email = email
        body.password = password
      } else {
        if (!initial?.isSelf) body.email = email
        if (password) body.password = password
      }

      const url = isEdit ? `/api/users/${initial!.id}` : '/api/users'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Chyba pri ukladaní.')
        return
      }
      router.push('/admin/users')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">Meno</Label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ján Novák"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label className="text-slate-300">Email *</Label>
          {isEdit && initial?.isSelf ? (
            <div>
              <Input value={email} disabled className={`${fieldClass} opacity-50 cursor-not-allowed`} />
              <p className="text-xs text-slate-500 mt-1">Email vlastného účtu nie je možné zmeniť.</p>
            </div>
          ) : (
            <Input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@mais.sk"
              className={fieldClass}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-slate-300">{isEdit ? 'Nové heslo (nechajte prázdne pre zachovanie)' : 'Heslo *'}</Label>
          <Input
            type="password"
            required={!isEdit}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-slate-300">{isEdit ? 'Potvrdenie nového hesla' : 'Potvrdenie hesla *'}</Label>
          <Input
            type="password"
            required={!isEdit}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="••••••••"
            className={fieldClass}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white">
          {loading ? 'Ukladám...' : isEdit ? 'Uložiť zmeny' : 'Vytvoriť správcu'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/users')} className="border-slate-700 text-slate-400 hover:bg-slate-800">
          Zrušiť
        </Button>
      </div>
    </form>
  )
}
