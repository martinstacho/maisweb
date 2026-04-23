import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET() {
  const partners = await prisma.partner.findMany({ orderBy: { displayOrder: 'asc' } })
  return NextResponse.json(partners)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await req.json()
  const partner = await prisma.partner.create({ data })
  return NextResponse.json(partner, { status: 201 })
}
