import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/sk', '/en', '/uk', '/hu', '/podpora', '/pre-institucie', '/kontakt'],
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://www.mais.sk/sitemap.xml',
    host: 'https://www.mais.sk',
  }
}
