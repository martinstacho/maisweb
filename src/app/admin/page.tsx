import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { signOut } from '@/auth'
import { Users, Building2, Plus, UserPlus, Plug } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const session = await auth()
  const [partnerCount, userCount, integrationCount] = await Promise.all([
    prisma.partner.count(),
    prisma.user.count(),
    prisma.integration.count(),
  ])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MAIS</span>
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <Link href="/admin/partners" className="text-slate-400 hover:text-slate-100 transition-colors">Partneri</Link>
              <Link href="/admin/integrations" className="text-slate-400 hover:text-slate-100 transition-colors">Integrácie</Link>
              <Link href="/admin/users" className="text-slate-400 hover:text-slate-100 transition-colors">Správcovia</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 hidden sm:block">{session?.user?.email}</span>
            <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
              <Button variant="outline" size="sm" type="submit" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                Odhlásiť
              </Button>
            </form>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-black mb-10">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/admin/partners" className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors block">
            <div className="flex items-center gap-3 mb-4">
              <Building2 size={20} className="text-indigo-400" />
              <span className="text-sm text-slate-400 font-medium">Partneri</span>
            </div>
            <div className="text-4xl font-black text-slate-100">{partnerCount}</div>
          </Link>
          <Link href="/admin/integrations" className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors block">
            <div className="flex items-center gap-3 mb-4">
              <Plug size={20} className="text-indigo-400" />
              <span className="text-sm text-slate-400 font-medium">Integrácie</span>
            </div>
            <div className="text-4xl font-black text-slate-100">{integrationCount}</div>
          </Link>
          <Link href="/admin/users" className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors block">
            <div className="flex items-center gap-3 mb-4">
              <Users size={20} className="text-indigo-400" />
              <span className="text-sm text-slate-400 font-medium">Správcovia</span>
            </div>
            <div className="text-4xl font-black text-slate-100">{userCount}</div>
          </Link>
        </div>

        <h2 className="text-xl font-bold mb-6">Rýchle akcie</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/partners">
            <Button className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700">
              <Building2 size={16} className="mr-2" /> Spravovať partnerov
            </Button>
          </Link>
          <Link href="/admin/partners/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Plus size={16} className="mr-2" /> Pridať partnera
            </Button>
          </Link>
          <Link href="/admin/integrations">
            <Button className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700">
              <Plug size={16} className="mr-2" /> Spravovať integrácie
            </Button>
          </Link>
          <Link href="/admin/integrations/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
              <Plus size={16} className="mr-2" /> Pridať integráciu
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700">
              <Users size={16} className="mr-2" /> Spravovať správcov
            </Button>
          </Link>
          <Link href="/admin/users/new">
            <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
              <UserPlus size={16} className="mr-2" /> Pridať správcu
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
              Zobraziť web
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
