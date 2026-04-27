import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.mais.sk'
const LOCALES = ['sk', 'en', 'uk', 'hu']
const PAGES = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/podpora', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/pre-institucie', changeFrequency: 'monthly' as const, priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const { path, changeFrequency, priority } of PAGES) {
      urls.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      })
    }
  }

  return urls
}
