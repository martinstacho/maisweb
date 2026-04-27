import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getAllContentForLocale } from '@/lib/content'
import { ContentProvider } from '@/lib/content-client'

const BASE_URL = 'https://www.mais.sk'

const META: Record<string, { title: string; description: string; ogLocale: string }> = {
  sk: {
    title: 'MAIS – Modulárny akademický informačný systém',
    description: 'Akademický informačný systém, ktorý poháňa slovenské univerzity. Od roku 2004 slúži 50 000+ aktívnym používateľom na 9 inštitúciách.',
    ogLocale: 'sk_SK',
  },
  en: {
    title: 'MAIS – Modular Academic Information System',
    description: 'Academic information system powering Slovak universities. Since 2004 serving 50,000+ active users at 9 institutions.',
    ogLocale: 'en_US',
  },
  uk: {
    title: 'MAIS – Модульна академічна інформаційна система',
    description: 'Академічна інформаційна система, яка забезпечує роботу словацьких університетів. З 2004 року обслуговує 50 000+ користувачів у 9 установах.',
    ogLocale: 'uk_UA',
  },
  hu: {
    title: 'MAIS – Moduláris Akadémiai Információs Rendszer',
    description: 'Akadémiai információs rendszer, amely a szlovák egyetemeket hajtja. 2004 óta több mint 50 000 felhasználót szolgál ki 9 intézményben.',
    ogLocale: 'hu_HU',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const m = META[locale] ?? META.sk

  return {
    metadataBase: new URL(BASE_URL),
    title: m.title,
    description: m.description,
    keywords: 'MAIS, akademický informačný systém, e-prihláška, univerzita, vysoká škola, ITernal, AIS',
    authors: [{ name: 'ITernal s.r.o.', url: 'https://www.iternal.sk' }],
    creator: 'ITernal s.r.o.',
    publisher: 'ITernal s.r.o.',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        sk: `${BASE_URL}/sk`,
        en: `${BASE_URL}/en`,
        uk: `${BASE_URL}/uk`,
        hu: `${BASE_URL}/hu`,
        'x-default': `${BASE_URL}/sk`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      title: m.title,
      description: m.description,
      siteName: 'MAIS',
      locale: m.ogLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const m = META[locale] ?? META.sk

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'MAIS',
      description: m.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '9',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ITernal s.r.o.',
      url: 'https://www.iternal.sk',
      logo: `${BASE_URL}/logo-mais.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+421-915-724-757',
        contactType: 'customer service',
        email: 'mais@mais.sk',
        areaServed: ['SK', 'CZ', 'HU', 'UA'],
        availableLanguage: ['Slovak', 'English', 'Ukrainian', 'Hungarian'],
      },
      sameAs: ['https://www.iternal.sk'],
    },
  ]

  const [messages, content] = await Promise.all([
    getMessages(),
    getAllContentForLocale(locale),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider messages={messages}>
        <ContentProvider content={content}>
          {children}
        </ContentProvider>
      </NextIntlClientProvider>
    </>
  )
}
