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

async function fetchDBMap(locale: string): Promise<Record<string, string>> {
  const records = await prisma.siteContent.findMany({ where: { locale } })
  const map: Record<string, string> = {}
  records.forEach(r => { map[r.key] = r.value })
  return map
}

// no-op kept so existing API routes compile without changes
export function invalidateContentCache(_locale?: string) {}

export async function getContent(key: string, locale: string): Promise<string> {
  const dbMap = await fetchDBMap(locale)
  if (key in dbMap) return dbMap[key]
  const messages = fallbackMessages[locale] ?? fallbackMessages.sk
  return getNestedValue(messages, key) ?? key
}

export async function getContentBatch(keys: string[], locale: string): Promise<Record<string, string>> {
  const dbMap = await fetchDBMap(locale)
  const messages = fallbackMessages[locale] ?? fallbackMessages.sk
  const result: Record<string, string> = {}
  for (const key of keys) {
    result[key] = key in dbMap ? dbMap[key] : (getNestedValue(messages, key) ?? key)
  }
  return result
}

export async function getAllContentForLocale(locale: string): Promise<Record<string, string>> {
  const dbMap = await fetchDBMap(locale)
  const result: Record<string, string> = {}
  const messages = fallbackMessages[locale] ?? fallbackMessages.sk
  flattenObject(messages, '', result)
  Object.assign(result, dbMap)
  return result
}

export function flattenObject(obj: unknown, prefix: string, result: Record<string, string>) {
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
