import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { validatePassword } from '@/lib/password'
import { logAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/rate-limit'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, isRoot: true, mustChangePassword: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!session.user.isRoot) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { email, name, password, isRoot } = await req.json()

  const { valid, errors } = validatePassword(password ?? '')
  if (!valid) {
    return NextResponse.json({ error: errors[0] }, { status: 400 })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, name: name || null, passwordHash, isRoot: !!isRoot, mustChangePassword: true },
      select: { id: true, email: true, name: true, isRoot: true, createdAt: true },
    })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'user.created',
      resource: `user/${user.id}`,
      ip: getClientIp(req),
      details: { targetEmail: email },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'Email už existuje.' }, { status: 400 })
    }
    throw e
  }
}
