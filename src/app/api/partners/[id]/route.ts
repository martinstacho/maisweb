import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { logAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/rate-limit'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params
    const partner = await prisma.partner.findUnique({ where: { id } })
    if (!partner) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(partner)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    const data = await req.json()
    const { id: _id, createdAt: _c, updatedAt: _u, ...updateData } = data
    const partner = await prisma.partner.update({ where: { id }, data: updateData })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'partner.updated',
      resource: `partner/${id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json(partner)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    await prisma.partner.delete({ where: { id } })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'partner.deleted',
      resource: `partner/${id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
