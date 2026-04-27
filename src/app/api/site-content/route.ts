import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { getAllContentForLocale, invalidateContentCache } from '@/lib/content'
import { logAudit } from '@/lib/audit'
import { getClientIp } from '@/lib/rate-limit'

const LOCALES = ['sk', 'en', 'uk', 'hu']

// GET /api/site-content?locale=sk  → all keys for locale (DB overrides + fallbacks)
export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const locale = searchParams.get('locale') ?? 'sk'

  if (!LOCALES.includes(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  const content = await getAllContentForLocale(locale)
  return NextResponse.json(content)
}

// PUT /api/site-content  body: { key, locale, value }
export async function PUT(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key, locale, value } = await req.json()

  if (!key || !locale || value === undefined) {
    return NextResponse.json({ error: 'key, locale and value are required' }, { status: 400 })
  }
  if (!LOCALES.includes(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  const record = await prisma.siteContent.upsert({
    where: { key_locale: { key, locale } },
    update: { value, updatedBy: session.user.email ?? null },
    create: { key, locale, value, updatedBy: session.user.email ?? null },
  })

  invalidateContentCache()
  logAudit({
    userId: session.user.id,
    userEmail: session.user.email ?? undefined,
    action: 'content.updated',
    resource: `content/${key}/${locale}`,
    ip: getClientIp(req),
  })
  return NextResponse.json(record)
}
