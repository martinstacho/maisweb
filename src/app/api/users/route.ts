import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, isRoot: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json(users)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!session.user.isRoot) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { email, name, password, isRoot } = await req.json()

  if (!password || password.length < 8) {
    return NextResponse.json({ error: 'Heslo musí mať minimálne 8 znakov.' }, { status: 400 })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, name: name || null, passwordHash, isRoot: !!isRoot },
      select: { id: true, email: true, name: true, isRoot: true, createdAt: true },
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
