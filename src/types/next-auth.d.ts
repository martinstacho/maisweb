import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      isRoot: boolean
    } & DefaultSession['user']
  }
  interface User {
    isRoot?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    isRoot?: boolean
  }
}
