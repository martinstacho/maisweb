import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { validatePassword } from '@/lib/password'
import { logAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { currentPassword, newPassword, confirmPassword } = await req.json()

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: 'Všetky polia sú povinné.' }, { status: 400 })
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: 'Nové heslá sa nezhodujú.' }, { status: 400 })
  }

  const { valid, errors } = validatePassword(newPassword)
  if (!valid) {
    return NextResponse.json({ error: errors.join(' ') }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true },
  })
  if (!user) return NextResponse.json({ error: 'Používateľ nenájdený.' }, { status: 404 })

  const currentValid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!currentValid) {
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'password.change_failed',
      ip: getClientIp(req),
      details: { reason: 'invalid_current_password' },
    })
    return NextResponse.json({ error: 'Aktuálne heslo je nesprávne.' }, { status: 400 })
  }

  const newHash = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: newHash, mustChangePassword: false },
  })

  logAudit({
    userId: session.user.id,
    userEmail: session.user.email ?? undefined,
    action: 'password.changed',
    ip: getClientIp(req),
  })

  return NextResponse.json({ success: true })
}
