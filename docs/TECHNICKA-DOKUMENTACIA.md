# Technická dokumentácia maisweb

> Pre developerov a DevOps. Pokrýva architektúru, API, databázu, i18n, Content CMS, SEO, bezpečnosť a deployment.

---

## Obsah

1. [Architektúra a tech stack](#1-architektúra-a-tech-stack)
2. [Štruktúra projektu](#2-štruktúra-projektu)
3. [Databáza](#3-databáza)
4. [API endpointy](#4-api-endpointy)
5. [Internationalization (i18n)](#5-internationalization-i18n)
6. [Content CMS](#6-content-cms)
7. [SEO konfigurácia](#7-seo-konfigurácia)
8. [Bezpečnosť](#8-bezpečnosť)
9. [Deployment](#9-deployment)
10. [Monitoring a údržba](#10-monitoring-a-údržba)

---

## 1. Architektúra a tech stack

### Prehľad

```
Browser
  │
  ▼
Vercel Edge Network (CDN + TLS)
  │
  ▼
Next.js 16 App Router (Node.js runtime)
  │         │
  │         ├─ Server Components (HTML generation)
  │         ├─ API Routes (REST endpoints)
  │         └─ Middleware (auth guard, i18n redirect)
  │
  ▼
Neon PostgreSQL (serverless, pooled connection)
```

### Tech stack

| Vrstva | Technológia | Verzia |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| Jazyk | TypeScript | 5.x |
| Štýly | Tailwind CSS v4 + shadcn/ui | 4.x |
| ORM | Prisma | 6.19 |
| Databáza | PostgreSQL (Neon serverless) | PG 16 |
| Auth | Auth.js (NextAuth) | v5 beta.31 |
| i18n | next-intl | 4.9.1 |
| Animácie | motion (Framer Motion), AOS | 11.x |
| Hosting | Vercel | free tier |
| Analytics | Google Analytics 4 | G-QGVZ38H465 |

### Rendering stratégia

Všetky stránky pod `/[locale]/` majú `export const dynamic = 'force-dynamic'` – server-rendered on demand. Dôvod: Content CMS číta priamo z Prisma bez cache, čo garantuje okamžité prejavenie zmien z admina.

Admin stránky sú tiež `force-dynamic` kvôli session overeniu.

Staticky prerendrované sú len `/robots.txt` a `/sitemap.xml` (○ v build výstupe).

---

## 2. Štruktúra projektu

```
maisweb/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # generateMetadata, ContentProvider, JSON-LD
│   │   │   ├── page.tsx            # Homepage (/, /sk, /en, /uk, /hu)
│   │   │   ├── opengraph-image.tsx # Dynamický OG obrázok 1200×630
│   │   │   ├── podpora/            # Helpdesk pre študentov
│   │   │   ├── pre-institucie/     # Sales page pre inštitúcie
│   │   │   ├── kontakt/            # Kontaktná stránka
│   │   │   └── skoly/              # Zoznam škôl
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx          # noindex metadata
│   │   │   ├── page.tsx            # Dashboard
│   │   │   ├── login/              # Prihlasovací formulár
│   │   │   ├── change-password/    # Force password change flow
│   │   │   ├── partners/           # CRUD partneri
│   │   │   ├── integrations/       # CRUD integrácie
│   │   │   ├── testimonials/       # CRUD referencie
│   │   │   ├── sections/           # Content CMS UI
│   │   │   ├── users/              # Správa admin účtov (root only)
│   │   │   └── audit/              # Audit log (root only)
│   │   │
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ # Auth.js handler
│   │   │   ├── partners/           # GET (public) + POST (auth)
│   │   │   ├── partners/[id]/      # GET + PUT + DELETE (auth)
│   │   │   ├── integrations/       # GET (public) + POST (auth)
│   │   │   ├── integrations/[id]/  # GET + PUT + DELETE (auth)
│   │   │   ├── testimonials/       # GET (public, rate-limited) + POST (auth)
│   │   │   ├── testimonials/[id]/  # PUT + DELETE (auth)
│   │   │   ├── site-content/       # GET (auth) + PUT (auth) – Content CMS
│   │   │   ├── site-content/[key]/ # GET (auth) + DELETE (auth)
│   │   │   ├── users/              # GET + POST (root only)
│   │   │   ├── users/[id]/         # GET + PATCH + DELETE (root only)
│   │   │   ├── upload/             # Nahrávanie súborov
│   │   │   └── admin/change-password/ # POST – zmena hesla
│   │   │
│   │   ├── layout.tsx              # Root layout (fonts, GA, ThemeProvider)
│   │   ├── page.tsx                # Redirect / → /sk
│   │   ├── robots.ts               # /robots.txt
│   │   └── sitemap.ts              # /sitemap.xml
│   │
│   ├── components/
│   │   ├── HeroSection.tsx         # Hero blok (client, props-driven)
│   │   ├── Navbar.tsx              # Navigácia (useContent, LanguageSwitcher)
│   │   ├── MaisFooter.tsx          # Päta (props-driven)
│   │   ├── LogoStrip.tsx           # Marquee pás škôl (useContent)
│   │   ├── ArchitectureSection.tsx # Orbitálna animácia (useContent)
│   │   ├── IntegrationsSection.tsx # Integrácie (useContent)
│   │   ├── TestimonialsSection.tsx # Referencie (useContent)
│   │   ├── LanguageSwitcher.tsx    # Prepínač jazykov
│   │   ├── GoogleAnalytics.tsx     # GA4 script (env-gated)
│   │   ├── admin/                  # Admin-specific komponenty
│   │   │   └── ContentEditor.tsx   # CMS editor s collapsible groups
│   │   └── ui/                     # shadcn/ui komponenty
│   │
│   ├── lib/
│   │   ├── content.ts              # Content CMS helper (getContent, getContentBatch, getAllContentForLocale)
│   │   ├── content-client.tsx      # ContentProvider + useContent() hook
│   │   ├── content-schema.ts       # Register 4 stránok, 18 skupín, 106 polí
│   │   ├── audit.ts                # logAudit() helper
│   │   ├── rate-limit.ts           # In-memory rate limiter
│   │   ├── password.ts             # validatePassword()
│   │   ├── prisma.ts               # Prisma client singleton
│   │   ├── partners-data.ts        # Statické meta (accent farby, EST rok)
│   │   └── integrations.ts         # Statické meta kategórií
│   │
│   ├── messages/
│   │   ├── sk.json                 # Slovenčina (master)
│   │   ├── en.json
│   │   ├── uk.json
│   │   └── hu.json
│   │
│   ├── i18n/
│   │   ├── routing.ts              # defineRouting (locales, defaultLocale, localeDetection)
│   │   └── request.ts              # getRequestConfig (next-intl server)
│   │
│   ├── middleware.ts               # Auth guard + i18n redirect + mustChangePassword
│   └── types/
│       └── next-auth.d.ts          # Session/JWT type augmentation
│
├── prisma/
│   ├── schema.prisma               # DB schéma
│   ├── seed.ts                     # Seed (9 partnerov, 29 integrácií, 3 referencie, 2 admini)
│   ├── migrations/                 # História SQL migrácií
│   └── prisma.config.ts            # Prisma config (env override)
│
├── public/
│   ├── logos/                      # SVG/JPG logá škôl
│   ├── logo-mais.png / .svg        # MAIS logo
│   └── og-image.png                # Statický OG fallback
│
├── docs/                           # Dokumentácia
├── backups/                        # pg_dump zálohy
├── next.config.ts                  # Security headers, next-intl plugin
└── CLAUDE.md / AGENTS.md           # AI agent inštrukcie
```

---

## 3. Databáza

### Modely (Prisma schema)

```prisma
model Partner {
  id             String        // napr. "tuke"
  name           String        // "Technická univerzita v Košiciach"
  shortName      String        // "TUKE"
  logoUrl        String        // "/logos/TUKE_fullname_white.svg"
  websiteUrl     String
  loginUrl       String?       // môže byť mailto:
  applicationUrl String?
  city           String?
  supportPhone   String?
  supportEmail   String?
  displayOrder   Int           // poradie v UI
  isActive       Boolean
  testimonials   Testimonial[]
}

model User {
  id                 String
  email              String   @unique
  name               String?
  passwordHash       String   // bcrypt, rounds=12
  isRoot             Boolean  @default(false)
  mustChangePassword Boolean  @default(false)
}

model Integration {
  id           String
  name         String        // "LDAP", "SAP", ...
  category     String        // "identity"|"finance"|"study"|"registry"|"external"|"mobile"
  isActive     Boolean
  displayOrder Int
}

model Testimonial {
  id        String
  title     String
  text      String
  author    String
  partnerId String
  partner   Partner @relation(...)
  isActive  Boolean
}

model SiteContent {
  id        String
  key       String        // napr. "hero.title1"
  locale    String        // "sk"|"en"|"uk"|"hu"
  value     String @db.Text
  updatedAt DateTime @updatedAt
  updatedBy String?       // email admina
  @@unique([key, locale])
  @@index([key])
}

model AuditLog {
  id        String
  userId    String?
  userEmail String?
  action    String        // "login.success", "partner.updated", ...
  resource  String?       // "partner/tuke"
  details   Json?
  ip        String?
  userAgent String?
  createdAt DateTime @default(now())
  @@index([userId])
  @@index([action])
  @@index([createdAt])
}
```

### Pripojenie k databáze

Projekt používa **Neon serverless PostgreSQL**. V `.env.local`:

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=15
DIRECT_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

`DATABASE_URL` používa PgBouncer connection pool (pre aplikáciu), `DIRECT_URL` ide priamo (pre migrácie – `prisma migrate`).

### Migrácie

```bash
# Vývoj – vytvorí migráciu a aplikuje ju
npx prisma migrate dev --name "popis_zmeny"

# Produkcia – len aplikuje existujúce migrácie
npx prisma migrate deploy

# Regeneruj Prisma client po zmene schémy
npx prisma generate
```

História migrácií je v `prisma/migrations/`. Každá migrácia má timestampovaný adresár so súborom `migration.sql`.

### Seed

```bash
npx prisma db seed
```

Seeduje: 9 partnerov, 29 integrácií, 3 referencie, 2 admin účty (`admin@mais.sk` + root admin).

---

## 4. API endpointy

Všetky endpointy vracajú JSON. Mutácie vyžadujú aktívnu session (Auth.js JWT cookie).

| Endpoint | Metóda | Auth | Popis |
|---|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | — | Auth.js handler (login, logout, session) |
| `/api/partners` | GET | — (rate-limited) | Zoznam aktívnych partnerov |
| `/api/partners` | POST | session | Vytvorenie partnera |
| `/api/partners/[id]` | GET | — | Detail partnera |
| `/api/partners/[id]` | PUT | session | Aktualizácia partnera |
| `/api/partners/[id]` | DELETE | session | Zmazanie partnera |
| `/api/integrations` | GET | — (rate-limited) | Integrácie zoskupené podľa kategórie |
| `/api/integrations` | POST | session | Vytvorenie integrácie |
| `/api/integrations/[id]` | GET/PUT/DELETE | session | CRUD integrácia |
| `/api/testimonials` | GET | — (rate-limited) | 3 náhodné aktívne referencie |
| `/api/testimonials` | POST | session | Vytvorenie referencie |
| `/api/testimonials/[id]` | PUT/DELETE | session | Aktualizácia / zmazanie |
| `/api/site-content` | GET | session | Všetky content keys pre locale |
| `/api/site-content` | PUT | session | Upsert jedného content záznamu |
| `/api/site-content/[key]` | GET | session | Hodnoty pre key vo všetkých 4 localoch |
| `/api/site-content/[key]` | DELETE | session | Reset kľúča (vymaže DB override) |
| `/api/users` | GET/POST | root | Zoznam / vytvorenie správcu |
| `/api/users/[id]` | GET/PATCH/DELETE | root | Detail / aktualizácia / zmazanie |
| `/api/upload` | POST | session | Nahratie súboru (logo) |
| `/api/admin/change-password` | POST | session | Zmena vlastného hesla |

**Chybové odpovede:**
- `401 Unauthorized` – chýba session
- `403 Forbidden` – nedostatočné oprávnenia (nie root)
- `400 Bad Request` – chybné vstupné dáta
- `404 Not Found` – záznam neexistuje
- `429 Too Many Requests` – rate limit prekročený

---

## 5. Internationalization (i18n)

### Konfigurácia

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['sk', 'en', 'uk', 'hu'],
  defaultLocale: 'sk',
  localeDetection: true,  // Accept-Language header → redirect
  localePrefix: 'always', // URL vždy obsahuje /sk, /en, ...
})
```

### Detekcia jazyka (priorita)

1. **Cookie `NEXT_LOCALE`** – nastavená po kliku na language switcher (perzistuje)
2. **`Accept-Language` header** – pri prvej návšteve bez cookie
3. **`defaultLocale: 'sk'`** – fallback pre nepodporované jazyky

### Messages (preklady)

Súbory `src/messages/{sk,en,uk,hu}.json` sú zdrojom pravdy pre všetky texty webu. Keď admin text neupravi, zobrazí sa hodnota z týchto súborov (fallback).

Kľúče sú hierarchické: `hero.title1`, `features.studyAgenda`, `nav.support` atď.

### Server components

```typescript
// getContentBatch – efektívny batch fetch (1 DB query)
const c = await getContentBatch(['hero.title1', 'hero.subtitle', ...], locale)
// → c['hero.title1']
```

### Client components

```typescript
// ContentProvider v locale layout.tsx poskytuje mapu všetkých kľúčov
const c = useContent()
// → c('hero.title1') alebo c('hero.title1', 'fallback ak kľúč chýba')
```

`ContentProvider` je nastavený v `src/app/[locale]/layout.tsx` a zabalí všetky child komponenty.

### Pridanie nového jazyka

1. Vytvor `src/messages/xx.json` (kópia `sk.json`, preložená)
2. Pridaj `'xx'` do `locales` v `src/i18n/routing.ts`
3. Pridaj locale do `META` objektu v `src/app/[locale]/layout.tsx` (title, description, ogLocale)
4. Pridaj locale do `LOCALES` konštanty v `src/app/api/site-content/route.ts`
5. Pridaj `xxMessages` do `fallbackMessages` v `src/lib/content.ts`
6. `npm run build` – over že TypeScript prechádza

---

## 6. Content CMS

### Filozofia

DB-first s fallback chain:

```
getContent('hero.title1', 'sk')
  │
  ├─ SiteContent WHERE key='hero.title1' AND locale='sk'
  │    └─ nájdené → vráti DB hodnotu
  │
  ├─ messages/sk.json → hero.title1
  │    └─ nájdené → vráti messages hodnotu
  │
  └─ vráti samotný kľúč (indikátor chyby/chýbajúceho prekladu)
```

### Implementácia

```typescript
// src/lib/content.ts

// Priame Prisma volanie – žiadny module-level cache
async function fetchDBMap(locale: string): Promise<Record<string, string>> {
  const records = await prisma.siteContent.findMany({ where: { locale } })
  const map: Record<string, string> = {}
  records.forEach(r => { map[r.key] = r.value })
  return map
}

// Hlavné funkcie
export async function getContent(key, locale)       // jeden kľúč
export async function getContentBatch(keys, locale) // batch pre server pages
export async function getAllContentForLocale(locale) // všetky kľúče pre ContentProvider
```

### Prečo force-dynamic + žiadny cache

Stránky sú `force-dynamic` a content sa číta fresh z Prisma pri každom requeste. Toto zjednodušuje architektúru a garantuje okamžité prejavenie zmien (bez čakania na cache invalidation). Pre nízko-traffikový site je výkonnostný vplyv zanedbateľný.

### Content schema

`src/lib/content-schema.ts` definuje štruktúru CMS editora:

```typescript
const CONTENT_SCHEMA: ContentPage[] = [
  { id: 'homepage',     title: 'Homepage',           groups: [...] },
  { id: 'institutions', title: 'Pre inštitúcie',     groups: [...] },
  { id: 'support',      title: 'Podpora',            groups: [...] },
  { id: 'footer',       title: 'Footer & Kontakt',   groups: [...] },
]
// Celkovo: 4 stránky, 18 skupín, 106 polí
```

Každá `ContentPage` obsahuje `groups`, každá `group` obsahuje `fields` s `key`, `label`, `type` (`text`|`textarea`|`number`).

### Interpolation

Niektoré texty používajú `{count}` placeholder (napr. `partners.kicker`). Server komponenty to riešia manuálne:

```typescript
c['partners.kicker'].replace('{count}', String(partners.length))
```

---

## 7. SEO konfigurácia

### Robots.txt (`src/app/robots.ts`)

```
Allow: /, /sk, /en, /uk, /hu, /podpora, /pre-institucie, /kontakt
Disallow: /admin, /api
Disallow: GPTBot (celý web)
Sitemap: https://www.mais.sk/sitemap.xml
```

### Sitemap.xml (`src/app/sitemap.ts`)

12 URL (4 jazyky × 3 stránky: homepage, /podpora, /pre-institucie) s `hreflang` alternates pre každé URL.

### Metadata (`src/app/[locale]/layout.tsx`)

`generateMetadata` funkcia generuje per-locale:
- `title` a `description` v príslušnom jazyku
- `alternates.canonical` + `alternates.languages` (hreflang pre SK/EN/UK/HU + x-default=sk)
- `openGraph` s `locale` (sk_SK, en_US, uk_UA, hu_HU)
- `twitter.card: 'summary_large_image'`
- `robots.index: true, follow: true` pre verejné stránky

### OG obrázok (`src/app/[locale]/opengraph-image.tsx`)

Dynamický PNG 1200×630 generovaný pomocou `ImageResponse` z `next/og`. Každý locale má vlastný titulek.

### JSON-LD (v locale layout)

Dva štruktúrované dáta objekty:
- `SoftwareApplication` – MAIS systém
- `Organization` – ITernal s.r.o.

### Admin protection (`src/app/admin/layout.tsx`)

```typescript
export const metadata = {
  robots: { index: false, follow: false, nocache: true }
}
```

Plus `X-Robots-Tag: noindex, nofollow, noarchive` HTTP header cez `next.config.ts`.

### Po nasadení na mais.sk

1. Pridaj doménu do [Google Search Console](https://search.google.com/search-console)
2. Submit `https://www.mais.sk/sitemap.xml`
3. Odkomentuj `verification: { google: 'XXXXX' }` v `generateMetadata`
4. Over hreflang v Search Console (Reports → International Targeting)

---

## 8. Bezpečnosť

### HTTP Security Headers (`next.config.ts`)

| Header | Hodnota | Účel |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS vynútenie (2 roky) |
| `X-Frame-Options` | `DENY` | Anti-clickjacking |
| `X-Content-Type-Options` | `nosniff` | Anti-MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Kontrola referrer info |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Zakázanie browser API |
| `X-DNS-Prefetch-Control` | `on` | DNS prefetch povolenie |
| `X-Robots-Tag` *(admin only)* | `noindex, nofollow, noarchive` | SEO blokovanie admina |
| `Cache-Control` *(admin only)* | `no-store, no-cache, must-revalidate` | Blokovanie cache admina |

### Rate Limiting (`src/lib/rate-limit.ts`)

In-memory rate limiter (Map + setInterval cleanup). Funguje správne v single-instance deploymente (Vercel Fluid Compute). Pre multi-instance produkciu zvážiť Redis/Upstash.

| Endpoint | Limit | Okno | Odozva po prekročení |
|---|---|---|---|
| Login | 5 pokusov | 15 minút per IP | Throw Error (403 od NextAuth) |
| Verejné GET API | 60 requestov | 1 minúta per IP | `429 Too Many Requests` |

### Auth.js Konfigurácia

```typescript
session: {
  strategy: 'jwt',
  maxAge: 4 * 60 * 60,    // 4 hodiny
  updateAge: 60 * 60,      // refresh každú hodinu aktivity
}
```

JWT token obsahuje: `id`, `email`, `isRoot`, `mustChangePassword`.

### Autorizačné vrstvy

1. **Middleware** (`src/middleware.ts`) – redirect neprihlásených na `/admin/login`, `mustChangePassword` guard
2. **API route guards** – `const session = await auth(); if (!session) return 401`
3. **Root guard** – `if (!session.user.isRoot) return 403` pre user management

### Audit Log (`src/lib/audit.ts`)

```typescript
export async function logAudit(params: {
  userId?, userEmail?, action, resource?, details?, ip?, userAgent?
}): Promise<void>
```

Fire-and-forget (errors sú len logované, neblokujú business logic). Zaznamenáva všetky 12 typov akcií z 10 mutačných API routes.

### Password Policy (`src/lib/password.ts`)

```typescript
export function validatePassword(password: string): { valid: boolean; errors: string[] }
// Min 8 znakov, uppercase, lowercase, digit, special char
```

`mustChangePassword: true` je nastavené pri vytvorení každého nového účtu, čo vynúti zmenu hesla pri prvom prihlásení (middleware redirect).

### Posledný root guard

```typescript
const rootCount = await prisma.user.count({ where: { isRoot: true } })
if (rootCount <= 1) return 400 "Nemôžete vymazať posledného root správcu."
```

---

## 9. Deployment

### Vercel (produkcia)

Automatický deploy z `main` branchy. Build command: `prisma generate && next build`.

**Environment variables (nastaviť v Vercel Project Settings → Environment Variables):**

```env
DATABASE_URL          # Neon pooler URL (Production + Preview + Development)
DIRECT_URL            # Neon direct URL (Production + Preview + Development)
AUTH_SECRET           # Min 32 náhodných znakov (openssl rand -base64 32)
NEXTAUTH_URL          # https://www.mais.sk
NEXT_PUBLIC_GA_MEASUREMENT_ID  # G-QGVZ38H465 (len Production!)
```

> `NEXT_PUBLIC_GA_MEASUREMENT_ID` nastav **iba** v Production prostredí – analytics sa tak neaktivujú na preview deploymentoch.

### Migrácie pri deployi

Vercel nespúšťa migrácie automaticky. Možnosti:

```bash
# Manuálne po deployi (lokálne s prod env)
DATABASE_URL="..." DIRECT_URL="..." npx prisma migrate deploy

# Alebo pridaj do build command v Vercel:
# "prisma migrate deploy && prisma generate && next build"
```

### DNS konfigurácia pre mais.sk

```
A     @          76.76.21.21    (Vercel IP)
CNAME www        cname.vercel-dns.com
```

SSL certifikát vydá Vercel automaticky cez Let's Encrypt.

> ⚠️ Zachovaj existujúce MX záznamy pre email `mais@mais.sk` – Vercel ich neovplyvní.

### Rollback

| Typ | Postup |
|---|---|
| Kód | Vercel Dashboard → Deployments → Promote older deployment |
| DB | Neon Dashboard → Branches → Point-in-Time Recovery (7 dní) |
| DB (manuálne) | `pg_restore -d $DATABASE_URL backups/DATUM.dump` |

Git tag pre stav pred CMS: `v1.0-pre-cms`

---

## 10. Monitoring a údržba

### Google Analytics 4

- **Property:** MAIS – GA4
- **Measurement ID:** `G-QGVZ38H465`
- Aktivuje sa len keď je nastavená env premenná `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Implementácia: `src/components/GoogleAnalytics.tsx` (next/script, `afterInteractive`)

### Logy

| Zdroj | Čo obsahuje | Kde |
|---|---|---|
| Vercel Function Logs | Runtime errors, request logy | Vercel Dashboard → Functions |
| Audit Log (DB) | Admin akcie, prihlásenia, zmeny obsahu | `/admin/audit` |

Žiadny externý monitoring (Sentry, Datadog) – nie je potrebný pri tomto scale.

### Odporúčaná údržba

| Frekvencia | Úloha |
|---|---|
| Mesačne | `pg_dump` záloha DB → `backups/` |
| Mesačne | Skontrolovať audit log na podozrivé aktivity |
| Pol-ročne | `npm outdated` – update závislostí |
| Pol-ročne | Skontrolovať GA štatistiky |
| Raz ročne | Rotate `AUTH_SECRET` (odhlási všetkých adminov) |

### Záloha databázy

```bash
# Záloha (vyžaduje pg_dump – napr. cez `brew install libpq`)
/opt/homebrew/opt/libpq/bin/pg_dump \
  "$DATABASE_URL" \
  -Fc -f backups/mais_$(date +%Y%m%d).dump

# Obnova
pg_restore -d "$DATABASE_URL" --no-owner backups/mais_DATUM.dump
```

---

*Dokument: docs/TECHNICKA-DOKUMENTACIA.md · Posledná aktualizácia: apríl 2026 · verzia 1.1*
