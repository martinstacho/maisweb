import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
  })
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(user)
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const { name, email, password } = await req.json()

  const isSelf = (session.user as { id?: string })?.id === id

  const data: Record<string, unknown> = { name: name || null }

  // Email change blocked for self
  if (!isSelf && email) {
    data.email = email
  }

  if (password) {
    if (password.length < 8) {
      return NextResponse.json({ error: 'Heslo musí mať minimálne 8 znakov.' }, { status: 400 })
    }
    data.passwordHash = await bcrypt.hash(password, 12)
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, email: true, name: true, updatedAt: true },
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
  const { id } = await params

  if ((session.user as { id?: string })?.id === id) {
    return NextResponse.json({ error: 'Nemôžete vymazať samého seba.' }, { status: 400 })
  }

  const count = await prisma.user.count()
  if (count <= 1) {
    return NextResponse.json({ error: 'Nemôžete vymazať posledného správcu.' }, { status: 400 })
  }

  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
