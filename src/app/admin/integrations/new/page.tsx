import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { IntegrationForm } from '@/components/IntegrationForm'

export default function NewIntegrationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link href="/admin/integrations" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
            <ArrowLeft size={16} /> Integrácie
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-sm text-slate-300">Nová integrácia</span>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-black mb-10">Pridať integráciu</h1>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
          <IntegrationForm />
        </div>
      </main>
    </div>
  )
}
