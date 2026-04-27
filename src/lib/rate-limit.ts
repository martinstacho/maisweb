interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key)
  }
}, 5 * 60 * 1000)

export function rateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxAttempts - 1, resetIn: windowMs }
  }

  if (entry.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now }
  }

  entry.count++
  return { allowed: true, remaining: maxAttempts - entry.count, resetIn: entry.resetAt - now }
}

export function rateLimitReset(key: string) {
  store.delete(key)
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
