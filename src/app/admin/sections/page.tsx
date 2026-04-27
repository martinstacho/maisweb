import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CONTENT_SCHEMA } from '@/lib/content-schema'

export const dynamic = 'force-dynamic'

export default async function SectionsAdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-sm text-slate-300">Sekcie</span>
          </div>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
            <Button variant="outline" size="sm" type="submit" className="border-slate-700 text-slate-400 hover:bg-slate-800">
              Odhlásiť
            </Button>
          </form>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Sekcie webu</h1>
          <p className="text-slate-400">Edituj texty na webe – zmeny sa okamžite prejavia na webe vo všetkých 4 jazykoch.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT_SCHEMA.map((page) => {
            const fieldCount = page.groups.reduce((acc, g) => acc + g.fields.length, 0)
            return (
              <Link
                key={page.id}
                href={`/admin/sections/${page.id}`}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-indigo-700 hover:bg-slate-900 transition-all block group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-900/40 group-hover:bg-indigo-900/60 transition-colors">
                    <FileText size={18} className="text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-slate-100 text-lg leading-tight">{page.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {page.groups.length} {page.groups.length === 1 ? 'skupina' : page.groups.length < 5 ? 'skupiny' : 'skupín'} · {fieldCount} {fieldCount === 1 ? 'pole' : fieldCount < 5 ? 'polia' : 'polí'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {page.groups.slice(0, 4).map(g => (
                    <span key={g.id} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {g.title}
                    </span>
                  ))}
                  {page.groups.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-500">
                      +{page.groups.length - 4}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
