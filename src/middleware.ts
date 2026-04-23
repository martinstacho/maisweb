import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { auth } from './auth'
import { type NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin routes — Auth.js chráni, intl sa neaplikuje
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login'
    const session = await auth()
    if (!isLoginPage && !session) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    if (isLoginPage && session) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    return NextResponse.next()
  }

  // API routes — preskočiť
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
