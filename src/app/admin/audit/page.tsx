import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, ShieldAlert } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

const ACTION_VARIANT: Record<string, string> = {
  'login.success': 'text-green-400',
  'login.failed': 'text-red-400',
  'login.blocked': 'text-red-500',
  'password.changed': 'text-blue-400',
  'password.change_failed': 'text-red-400',
  'user.created': 'text-orange-400',
  'user.updated': 'text-yellow-400',
  'user.deleted': 'text-red-400',
  'partner.created': 'text-orange-400',
  'partner.updated': 'text-yellow-400',
  'partner.deleted': 'text-red-400',
  'integration.created': 'text-orange-400',
  'integration.updated': 'text-yellow-400',
  'integration.deleted': 'text-red-400',
  'testimonial.created': 'text-orange-400',
  'testimonial.updated': 'text-yellow-400',
  'testimonial.deleted': 'text-red-400',
  'content.updated': 'text-blue-400',
  'content.reset': 'text-yellow-400',
}

export default async function AuditLogPage() {
  const session = await auth()
  if (!session?.user?.isRoot) redirect('/admin')

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="btn-ghost rounded-lg px-3 py-1.5 text-sm inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Späť
          </Link>
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5" style={{ color: 'var(--orange)' }} />
            <h1 className="font-display text-2xl text-white">Audit Log</h1>
          </div>
          <div className="chip-mono ml-auto">posledných {logs.length} záznamov</div>
        </div>

        <div className="glass rounded-xl border overflow-hidden" style={{ borderColor: 'var(--line)' }}>
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: 'var(--line)' }}>
                <TableHead className="text-xs">Čas</TableHead>
                <TableHead className="text-xs">Používateľ</TableHead>
                <TableHead className="text-xs">Akcia</TableHead>
                <TableHead className="text-xs">Zdroj</TableHead>
                <TableHead className="text-xs">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-sm" style={{ color: 'var(--fg-3)' }}>
                    Žiadne záznamy
                  </TableCell>
                </TableRow>
              )}
              {logs.map(log => (
                <TableRow key={log.id} style={{ borderColor: 'var(--line)' }}>
                  <TableCell className="text-xs mono whitespace-nowrap" style={{ color: 'var(--fg-3)' }}>
                    {log.createdAt.toISOString().replace('T', ' ').slice(0, 19)}
                  </TableCell>
                  <TableCell className="text-xs" style={{ color: 'var(--fg-2)' }}>
                    {log.userEmail ?? <span style={{ color: 'var(--fg-4)' }}>—</span>}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs mono font-medium ${ACTION_VARIANT[log.action] ?? 'text-gray-400'}`}>
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs mono" style={{ color: 'var(--fg-3)' }}>
                    {log.resource ?? '—'}
                  </TableCell>
                  <TableCell className="text-xs mono" style={{ color: 'var(--fg-4)' }}>
                    {log.ip ?? '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
