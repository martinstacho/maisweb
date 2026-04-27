import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { invalidateContentCache } from '@/lib/content'

const LOCALES = ['sk', 'en', 'uk', 'hu']

type Params = { params: Promise<{ key: string }> }

// GET /api/site-content/[key]  → DB values for all 4 locales for this key
export async function GET(_: Request, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key } = await params
  const decodedKey = decodeURIComponent(key)

  const records = await prisma.siteContent.findMany({
    where: { key: decodedKey },
  })

  const result: Record<string, { value: string; updatedAt: Date; updatedBy: string | null } | null> = {}
  for (const locale of LOCALES) {
    const r = records.find(x => x.locale === locale)
    result[locale] = r ? { value: r.value, updatedAt: r.updatedAt, updatedBy: r.updatedBy } : null
  }

  return NextResponse.json({ key: decodedKey, locales: result })
}

// DELETE /api/site-content/[key]?locale=sk  → reset to fallback (remove DB override)
export async function DELETE(req: Request, { params }: Params) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key } = await params
  const decodedKey = decodeURIComponent(key)
  const { searchParams } = new URL(req.url)
  const locale = searchParams.get('locale')

  if (!locale) return NextResponse.json({ error: 'locale query param required' }, { status: 400 })
  if (!LOCALES.includes(locale)) return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })

  await prisma.siteContent.deleteMany({
    where: { key: decodedKey, locale },
  })

  invalidateContentCache(locale)
  return NextResponse.json({ success: true })
}
