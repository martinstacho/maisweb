import { prisma } from '@/lib/prisma'

interface AuditParams {
  userId?: string
  userEmail?: string
  action: string
  resource?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any
  ip?: string
  userAgent?: string
}

export async function logAudit(params: AuditParams): Promise<void> {
  try {
    await prisma.auditLog.create({ data: params })
  } catch (e) {
    console.error('[audit] Failed to write audit log:', e)
  }
}
