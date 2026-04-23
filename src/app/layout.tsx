import type { Metadata } from 'next'
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

const geist = Geist({ variable: '--font-geist', subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ variable: '--font-jetbrains-mono', subsets: ['latin'], weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'MAIS – Modulárny akademický informačný systém',
  description: 'Akademický informačný systém, ktorý poháňa slovenské univerzity. Od roku 2004 slúži 50 000+ aktívnym používateľom na 9 inštitúciách.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="sk"
      className={`${geist.variable} ${geistMono.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full antialiased"
        style={{ fontFamily: "var(--font-geist, 'Geist'), ui-sans-serif, system-ui, sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
