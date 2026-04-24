'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export function DeleteIntegrationButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Skutočne vymazať integráciu "${name}"?`)) return
    setLoading(true)
    await fetch(`/api/integrations/${id}`, { method: 'DELETE' })
    setLoading(false)
    router.refresh()
  }

  return (
    <Button size="sm" variant="outline" onClick={handleDelete} disabled={loading}
      className="border-red-900 text-red-400 hover:bg-red-900/30 hover:border-red-700">
      <Trash2 size={14} />
    </Button>
  )
}
