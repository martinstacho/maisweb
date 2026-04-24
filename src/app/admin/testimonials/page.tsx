import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { signOut, auth } from '@/auth'
import { Plus, Pencil, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DeleteTestimonialButton } from './DeleteTestimonialButton'

export const dynamic = 'force-dynamic'

export default async function TestimonialsAdminPage() {
  await auth()
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
    include: { partner: { select: { shortName: true } } },
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
            <span className="text-sm text-slate-300">Referencie</span>
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
          <h1 className="text-3xl font-black">Referencie</h1>
          <Link href="/admin/testimonials/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Plus size={16} className="mr-2" /> Pridať referenciu
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-400">Nadpis</TableHead>
                <TableHead className="text-slate-400 max-w-xs">Text</TableHead>
                <TableHead className="text-slate-400">Autor</TableHead>
                <TableHead className="text-slate-400">Partner</TableHead>
                <TableHead className="text-slate-400">Stav</TableHead>
                <TableHead className="text-slate-400 text-right">Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map(t => (
                <TableRow key={t.id} className="border-slate-800 hover:bg-slate-900/50">
                  <TableCell className="text-slate-200 font-medium">{t.title}</TableCell>
                  <TableCell className="text-slate-400 text-sm max-w-xs truncate">{t.text}</TableCell>
                  <TableCell className="text-slate-400 text-sm">{t.author}</TableCell>
                  <TableCell className="text-slate-400 font-mono text-sm">{t.partner.shortName}</TableCell>
                  <TableCell>
                    <Badge variant={t.isActive ? 'default' : 'secondary'}
                      className={t.isActive ? 'bg-green-900/50 text-green-400 border-green-800' : 'bg-slate-800 text-slate-400'}>
                      {t.isActive ? 'Aktívna' : 'Neaktívna'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/testimonials/${t.id}`}>
                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                          <Pencil size={14} />
                        </Button>
                      </Link>
                      <DeleteTestimonialButton id={t.id} title={t.title} />
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
