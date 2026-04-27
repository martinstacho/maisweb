import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { validatePassword } from '@/lib/password'
import { logAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/rate-limit'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, isRoot: true, mustChangePassword: true, createdAt: true, updatedAt: true },
  })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!session.user.isRoot) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const { name, email, password, isRoot } = await req.json()

  const isSelf = session.user.id === id
  const data: Record<string, unknown> = { name: name || null }

  if (!isSelf && email) data.email = email
  if (!isSelf && typeof isRoot === 'boolean') data.isRoot = isRoot

  if (password) {
    const { valid, errors } = validatePassword(password)
    if (!valid) {
      return NextResponse.json({ error: errors[0] }, { status: 400 })
    }
    data.passwordHash = await bcrypt.hash(password, 12)
    data.mustChangePassword = false
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, isRoot: true, updatedAt: true },
    })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'user.updated',
      resource: `user/${id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json(user)
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'Email už existuje.' }, { status: 400 })
    }
    throw e
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!session.user.isRoot) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params

  if (session.user.id === id) {
    return NextResponse.json({ error: 'Nemôžete vymazať samého seba.' }, { status: 400 })
  }

  const target = await prisma.user.findUnique({ where: { id }, select: { isRoot: true, email: true } })
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (target.isRoot) {
    const rootCount = await prisma.user.count({ where: { isRoot: true } })
    if (rootCount <= 1) {
      return NextResponse.json({ error: 'Nemôžete vymazať posledného root správcu.' }, { status: 400 })
    }
  }

  const total = await prisma.user.count()
  if (total <= 1) {
    return NextResponse.json({ error: 'Nemôžete vymazať posledného správcu.' }, { status: 400 })
  }

  await prisma.user.delete({ where: { id } })
  logAudit({
    userId: session.user.id,
    userEmail: session.user.email ?? undefined,
    action: 'user.deleted',
    resource: `user/${id}`,
    ip: getClientIp(req),
    details: { targetEmail: target.email },
  })
  return NextResponse.json({ success: true })
}
