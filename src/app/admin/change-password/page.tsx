'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ShieldCheck } from 'lucide-react'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const rules = [
    { label: 'Aspoň 12 znakov', ok: form.newPassword.length >= 12 },
    { label: 'Veľké písmeno', ok: /[A-Z]/.test(form.newPassword) },
    { label: 'Malé písmeno', ok: /[a-z]/.test(form.newPassword) },
    { label: 'Číslo', ok: /[0-9]/.test(form.newPassword) },
    { label: 'Špeciálny znak', ok: /[^A-Za-z0-9]/.test(form.newPassword) },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Nastala chyba.')
        return
      }
      // Force re-login so JWT picks up mustChangePassword=false
      await signOut({ redirect: true, callbackUrl: '/admin/login' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="w-full max-w-md glass rounded-2xl p-8 border" style={{ borderColor: 'var(--line)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'oklch(0.65 0.22 38 / 0.15)', color: 'var(--orange)' }}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display text-white text-lg">Zmena hesla</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--fg-3)' }}>Pre pokračovanie musíš nastaviť nové heslo</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current">Aktuálne heslo</Label>
            <Input
              id="current"
              type="password"
              autoComplete="current-password"
              value={form.currentPassword}
              onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="new">Nové heslo</Label>
            <Input
              id="new"
              type="password"
              autoComplete="new-password"
              value={form.newPassword}
              onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
              required
            />
            {form.newPassword && (
              <div className="mt-2 grid grid-cols-2 gap-1">
                {rules.map(r => (
                  <div key={r.label} className="flex items-center gap-1.5 text-[11px]" style={{ color: r.ok ? 'var(--orange)' : 'var(--fg-4)' }}>
                    <span>{r.ok ? '✓' : '○'}</span> {r.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm">Potvrdenie nového hesla</Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              required
            />
          </div>

          {error && (
            <div className="text-sm px-3 py-2 rounded-lg" style={{ background: 'oklch(0.4 0.18 25 / 0.15)', color: 'oklch(0.75 0.18 25)' }}>
              {error}
            </div>
          )}

          <Button type="submit" className="w-full btn-primary" disabled={loading}>
            {loading ? 'Ukladám...' : 'Zmeniť heslo'}
          </Button>
        </form>
      </div>
    </div>
  )
}
