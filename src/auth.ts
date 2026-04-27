import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { rateLimit, rateLimitReset, getClientIp } from '@/lib/rate-limit'
import { logAudit } from '@/lib/audit'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60,
    updateAge: 60 * 60,
  },
  pages: { signIn: '/admin/login' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isRoot = user.isRoot ?? false
        token.mustChangePassword = user.mustChangePassword ?? false
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.isRoot = token.isRoot as boolean
        session.user.mustChangePassword = token.mustChangePassword as boolean
      }
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Heslo', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null

        const ip = getClientIp(req as Request)
        const limiter = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)

        if (!limiter.allowed) {
          const minutes = Math.ceil(limiter.resetIn / 60000)
          logAudit({
            action: 'login.blocked',
            userEmail: credentials.email as string,
            ip,
            details: { reason: 'rate_limit', resetInMinutes: minutes },
          })
          throw new Error(`Príliš veľa pokusov. Skús to znova o ${minutes} minút.`)
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) {
          logAudit({
            action: 'login.failed',
            userEmail: credentials.email as string,
            ip,
            details: { reason: 'user_not_found' },
          })
          return null
        }

        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)

        if (!valid) {
          logAudit({
            action: 'login.failed',
            userId: user.id,
            userEmail: user.email,
            ip,
            details: { reason: 'invalid_password' },
          })
          return null
        }

        rateLimitReset(`login:${ip}`)
        logAudit({
          action: 'login.success',
          userId: user.id,
          userEmail: user.email,
          ip,
          details: { mustChangePassword: user.mustChangePassword },
        })

        return {
          id: user.id,
          email: user.email,
          isRoot: user.isRoot,
          mustChangePassword: user.mustChangePassword,
        }
      },
    }),
  ],
})
