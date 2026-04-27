import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { notFound, redirect } from 'next/navigation'
import { UserForm } from '@/components/UserForm'

export const dynamic = 'force-dynamic'

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.isRoot) redirect('/admin')

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, isRoot: true },
  })
  if (!user) return notFound()

  const isSelf = session.user.id === user.id

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link href="/admin/users" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
            <ArrowLeft size={16} /> Správcovia
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-sm text-slate-300">{user.name ?? user.email}</span>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-black mb-10">Editovať správcu</h1>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
          <UserForm initial={{ ...user, isSelf }} canSetRoot />
        </div>
      </main>
    </div>
  )
}
