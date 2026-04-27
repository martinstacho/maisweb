import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { logAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/rate-limit'

type Params = { params: Promise<{ id: string }> }

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params
    const integration = await prisma.integration.findUnique({ where: { id } })
    if (!integration) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(integration)
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
    const integration = await prisma.integration.update({ where: { id }, data: updateData })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'integration.updated',
      resource: `integration/${id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json(integration)
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
    await prisma.integration.delete({ where: { id } })
    logAudit({
      userId: session.user.id,
      userEmail: session.user.email ?? undefined,
      action: 'integration.deleted',
      resource: `integration/${id}`,
      ip: getClientIp(req),
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
