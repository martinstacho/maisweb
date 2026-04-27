import { auth, signOut } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPageById } from '@/lib/content-schema'
import { getAllContentForLocale } from '@/lib/content'
import { ContentEditor } from '@/components/admin/ContentEditor'

export const dynamic = 'force-dynamic'

const LOCALES = ['sk', 'en', 'uk', 'hu'] as const

export default async function SectionDetailPage({ params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params
  const session = await auth()
  if (!session) redirect('/admin/login')

  const page = getPageById(pageId)
  if (!page) notFound()

  // Load all content for all 4 locales in parallel
  const [sk, en, uk, hu] = await Promise.all(
    LOCALES.map(locale => getAllContentForLocale(locale))
  )
  const initialContent = { sk, en, uk, hu }

  // Collect keys that have DB overrides (non-fallback)
  const dbKeys = new Set<string>()
  const { prisma } = await import('@/lib/prisma')
  const allFieldKeys = page.groups.flatMap(g => g.fields.map(f => f.key))
  const dbRecords = await prisma.siteContent.findMany({
    where: { key: { in: allFieldKeys } },
    select: { key: true, locale: true, updatedAt: true, updatedBy: true },
  })
  dbRecords.forEach(r => dbKeys.add(`${r.key}::${r.locale}`))

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/sections" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
              <ArrowLeft size={16} /> Sekcie
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-sm text-slate-300">{page.title}</span>
          </div>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
            <Button variant="outline" size="sm" type="submit" className="border-slate-700 text-slate-400 hover:bg-slate-800">
              Odhlásiť
            </Button>
          </form>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-2">{page.title}</h1>
          <p className="text-slate-400 text-sm">
            Edituj texty vo všetkých 4 jazykoch. Klikni <strong className="text-slate-300">Uložiť</strong> pri každom poli.
            Reset vráti text z <code className="text-indigo-400">messages.json</code>.
          </p>
        </div>

        <ContentEditor
          page={page}
          initialContent={initialContent}
          dbKeys={Array.from(dbKeys)}
        />
      </main>
    </div>
  )
}
