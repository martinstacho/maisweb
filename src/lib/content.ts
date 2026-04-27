import { prisma } from '@/lib/prisma'
import skMessages from '@/messages/sk.json'
import enMessages from '@/messages/en.json'
import ukMessages from '@/messages/uk.json'
import huMessages from '@/messages/hu.json'

type Messages = Record<string, unknown>

const fallbackMessages: Record<string, Messages> = {
  sk: skMessages as Messages,
  en: enMessages as Messages,
  uk: ukMessages as Messages,
  hu: huMessages as Messages,
}

function getNestedValue(obj: Messages, path: string): string | undefined {
  const val = path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[part]
    return undefined
  }, obj)
  return typeof val === 'string' ? val : undefined
}

// Per-request in-memory cache (module-level, reset on server restart / cold start)
const dbCache: Record<string, Map<string, string>> = {}

export async function loadContent(locale: string): Promise<Map<string, string>> {
  if (dbCache[locale]) return dbCache[locale]

  const records = await prisma.siteContent.findMany({ where: { locale } })
  const map = new Map<string, string>()
  records.forEach(r => map.set(r.key, r.value))
  dbCache[locale] = map
  return map
}

export function invalidateContentCache(locale?: string) {
  if (locale) {
    delete dbCache[locale]
  } else {
    for (const k of Object.keys(dbCache)) delete dbCache[k]
  }
}

export async function getContent(key: string, locale: string): Promise<string> {
  const dbMap = await loadContent(locale)

  const dbValue = dbMap.get(key)
  if (dbValue !== undefined) return dbValue

  const messages = fallbackMessages[locale] ?? fallbackMessages.sk
  const fallback = getNestedValue(messages, key)
  if (fallback !== undefined) return fallback

  return key
}

export async function getContentBatch(keys: string[], locale: string): Promise<Record<string, string>> {
  const dbMap = await loadContent(locale)
  const messages = fallbackMessages[locale] ?? fallbackMessages.sk
  const result: Record<string, string> = {}

  for (const key of keys) {
    const dbValue = dbMap.get(key)
    if (dbValue !== undefined) {
      result[key] = dbValue
    } else {
      result[key] = getNestedValue(messages, key) ?? key
    }
  }
  return result
}

export async function getAllContentForLocale(locale: string): Promise<Record<string, string>> {
  const dbMap = await loadContent(locale)
  const result: Record<string, string> = {}

  const messages = fallbackMessages[locale] ?? fallbackMessages.sk
  flattenObject(messages, '', result)

  dbMap.forEach((value, key) => { result[key] = value })

  return result
}

function flattenObject(obj: unknown, prefix: string, result: Record<string, string>) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const fullKey = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'string') {
      result[fullKey] = v
    } else if (v && typeof v === 'object' && !Array.isArray(v)) {
      flattenObject(v, fullKey, result)
    }
  }
}
