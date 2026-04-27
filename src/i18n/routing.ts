import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['sk', 'en', 'uk', 'hu'],
  defaultLocale: 'sk',
  localeDetection: true,  // redirect based on Accept-Language header (cookie NEXT_LOCALE takes priority)
  localePrefix: 'always', // all URLs carry /sk, /en, /uk, /hu prefix
})
