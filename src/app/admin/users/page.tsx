import { prisma } from '@/lib/prisma'
import { auth, signOut } from '@/auth'
import Link from 'next/link'
import { Plus, Pencil, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DeleteUserButton } from './DeleteUserButton'

export const dynamic = 'force-dynamic'

export default async function UsersAdminPage() {
  const session = await auth()
  const sessionId = (session?.user as { id?: string })?.id
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-sm text-slate-300">Správcovia</span>
          </div>
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
            <Button variant="outline" size="sm" type="submit" className="border-slate-700 text-slate-400 hover:bg-slate-800">
              Odhlásiť
            </Button>
          </form>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black">Správcovia</h1>
          <Link href="/admin/users/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Plus size={16} className="mr-2" /> Pridať správcu
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Meno</TableHead>
                <TableHead className="text-slate-400">Email</TableHead>
                <TableHead className="text-slate-400">Vytvorený</TableHead>
                <TableHead className="text-slate-400 text-right">Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => {
                const isSelf = u.id === sessionId
                return (
                  <TableRow key={u.id} className="border-slate-800 hover:bg-slate-900/50">
                    <TableCell className="font-medium text-slate-200">
                      <div className="flex items-center gap-2">
                        {u.name || <span className="text-slate-500 italic">—</span>}
                        {isSelf && <Badge className="bg-indigo-900/50 text-indigo-400 border-indigo-800 text-xs">vy</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-400">{u.email}</TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {new Date(u.createdAt).toLocaleDateString('sk-SK')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/users/${u.id}`}>
                          <Button size="sm" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                            <Pencil size={14} />
                          </Button>
                        </Link>
                        <DeleteUserButton id={u.id} name={u.name ?? u.email} isSelf={isSelf} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
