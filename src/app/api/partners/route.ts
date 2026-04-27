import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { logAudit } from '@/lib/audit'

export async function GET(req: Request) {
  const ip = getClientIp(req)
  const limiter = rateLimit(`api:${ip}`, 60, 60 * 1000)
  if (!limiter.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const partners = await prisma.partner.findMany({ orderBy: { displayOrder: 'asc' } })
    return NextResponse.json(partners)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const data = await req.json()
    const { id: _id, ...createData } = data
    const partner = await prisma.partner.create({ data: createData })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'partner.created',
      resource: `partner/${partner.id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json(partner, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
