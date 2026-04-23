import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { signOut, auth } from '@/auth'
import { Plus, Pencil, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DeletePartnerButton } from './DeletePartnerButton'

export const dynamic = 'force-dynamic'

export default async function PartnersAdminPage() {
  const session = await auth()
  const partners = await prisma.partner.findMany({ orderBy: { displayOrder: 'asc' } })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors">
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-sm text-slate-300">Partneri</span>
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
          <h1 className="text-3xl font-black">Partneri</h1>
          <Link href="/admin/partners/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Plus size={16} className="mr-2" /> Pridať partnera
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Logo</TableHead>
                <TableHead className="text-slate-400">Názov</TableHead>
                <TableHead className="text-slate-400">Skratka</TableHead>
                <TableHead className="text-slate-400">Poradie</TableHead>
                <TableHead className="text-slate-400">Stav</TableHead>
                <TableHead className="text-slate-400 text-right">Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((p) => (
                <TableRow key={p.id} className="border-slate-800 hover:bg-slate-900/50">
                  <TableCell>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logoUrl} alt={p.shortName} className="h-8 w-16 object-contain" />
                  </TableCell>
                  <TableCell className="text-slate-200 font-medium">{p.name}</TableCell>
                  <TableCell className="text-slate-400 font-mono text-sm">{p.shortName}</TableCell>
                  <TableCell className="text-slate-400">{p.displayOrder}</TableCell>
                  <TableCell>
                    <Badge variant={p.isActive ? 'default' : 'secondary'} className={p.isActive ? 'bg-green-900/50 text-green-400 border-green-800' : 'bg-slate-800 text-slate-400'}>
                      {p.isActive ? 'Aktívny' : 'Neaktívny'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/partners/${p.id}`}>
                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                          <Pencil size={14} />
                        </Button>
                      </Link>
                      <DeletePartnerButton id={p.id} name={p.name} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
