import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/integrations'

export async function GET() {
  try {
    const items = await prisma.integration.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }],
    })

    const grouped = CATEGORY_ORDER
      .map(catId => {
        const meta = CATEGORY_META[catId]
        const chips = items.filter(i => i.category === catId).map(i => i.name)
        return { id: catId, label: meta.label, accent: meta.accent, chips }
      })
      .filter(g => g.chips.length > 0)

    return NextResponse.json({
      groups: grouped,
      total: items.length,
      displayCount: Math.floor(items.length / 10) * 10,
    })
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
    const integration = await prisma.integration.create({ data: createData })
    return NextResponse.json(integration, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
