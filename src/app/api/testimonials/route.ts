import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { PARTNER_META } from '@/lib/partners-data'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { logAudit } from '@/lib/audit'

export async function GET(req: Request) {
  const ip = getClientIp(req)
  const limiter = rateLimit(`api:${ip}`, 60, 60 * 1000)
  if (!limiter.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const all = await prisma.testimonial.findMany({
      where: { isActive: true },
      include: { partner: { select: { shortName: true, name: true, city: true } } },
    })
    const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 3)
    const result = shuffled.map(t => ({
      ...t,
      partner: {
        ...t.partner,
        accent: PARTNER_META[t.partner.shortName]?.accent ?? 'var(--orange)',
      },
    }))
    return NextResponse.json(result)
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
    const testimonial = await prisma.testimonial.create({ data: createData })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'testimonial.created',
      resource: `testimonial/${testimonial.id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json(testimonial, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
