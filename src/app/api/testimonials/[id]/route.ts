import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { logAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/rate-limit'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const data = await req.json()
    const { id: _id, createdAt: _c, updatedAt: _u, partner: _p, ...updateData } = data
    const testimonial = await prisma.testimonial.update({ where: { id }, data: updateData })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'testimonial.updated',
      resource: `testimonial/${id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json(testimonial)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    await prisma.testimonial.delete({ where: { id } })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'testimonial.deleted',
      resource: `testimonial/${id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
