import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['sk', 'en', 'uk', 'hu'],
  defaultLocale: 'sk',
})
