import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { PARTNER_META } from '@/lib/partners-data'

export async function GET() {
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
    return NextResponse.json(testimonial, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
