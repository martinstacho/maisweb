'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function DeleteUserButton({ id, name, isSelf }: { id: string; name: string; isSelf: boolean }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  if (isSelf) return null

  async function handleDelete() {
    if (!confirm(`Skutočne vymazať správcu "${name}"?`)) return
    setLoading(true)
    setError('')
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Chyba')
      setLoading(false)
      return
    }
    router.refresh()
  }

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        onClick={handleDelete}
        disabled={loading}
        className="border-red-900 text-red-400 hover:bg-red-900/30 hover:border-red-700"
      >
        <Trash2 size={14} />
      </Button>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}
