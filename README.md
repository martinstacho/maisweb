# MAIS – Modulárny akademický informačný systém

Marketingový web pre akademický informačný systém MAIS od spoločnosti ITernal s.r.o. Web prezentuje systém MAIS slovenským univerzitám a ich študentom, poskytuje helpdesk pre prihlasovanie a e-prihlášky, a je plne lokalizovaný do 4 jazykov (SK / EN / UK / HU).

**Produkcia:** [mais.sk](https://www.mais.sk) · **Beta:** [maisweb-beta.vercel.app](https://maisweb-beta.vercel.app)

---

## Quick start

```bash
git clone https://github.com/martinstacho/maisweb.git
cd maisweb
npm install

# Vyplň .env.local podľa sekcie Environment premenné nižšie
npx prisma migrate dev
npx prisma db seed

npm run dev
# → http://localhost:3000
```

**Admin:** `http://localhost:3000/admin/login` · `admin@mais.sk` / `admin123`

> Pri prvom prihlásení systém vyzve na zmenu hesla.

---

## Tech stack

| Vrstva | Technológia |
|---|---|
| Framework | Next.js 16.2 (App Router, Server Components) |
| Jazyk | TypeScript |
| Štýly | Tailwind CSS v4 + shadcn/ui |
| Databáza | PostgreSQL cez Neon (serverless) + Prisma ORM |
| Auth | Auth.js v5 (Credentials provider, JWT) |
| i18n | next-intl 4.9 (SK / EN / UK / HU) |
| Animácie | motion (Framer Motion), AOS |
| Hosting | Vercel (auto-deploy z main branchy) |
| Analytics | Google Analytics 4 (G-QGVZ38H465) |

---

## Štruktúra repozitára

```
maisweb/
├── src/
│   ├── app/
│   │   ├── [locale]/       # Verejné stránky (/, /podpora, /pre-institucie, /kontakt, /skoly)
│   │   ├── admin/          # Admin rozhranie (chránené prihlásením)
│   │   └── api/            # REST API endpointy
│   ├── components/         # React komponenty (Navbar, HeroSection, LogoStrip, ...)
│   ├── lib/                # Utility (content CMS, rate-limit, audit, password)
│   ├── messages/           # i18n preklady (sk.json, en.json, uk.json, hu.json)
│   └── i18n/               # next-intl konfigurácia a routing
├── prisma/
│   ├── schema.prisma       # DB schéma (6 modelov)
│   ├── migrations/         # História migrácií
│   └── seed.ts             # Počiatočné dáta (partneri, integrácie, referencie)
├── public/                 # Statické súbory (logá, OG obrázok)
├── docs/                   # Dokumentácia projektu
└── backups/                # DB zálohy (pg_dump)
```

---

## Environment premenné

Skopíruj `.env` a vytvor `.env.local` s reálnymi hodnotami:

```env
DATABASE_URL=        # Neon pooler URL (pre aplikáciu)
DIRECT_URL=          # Neon direct URL (pre migrácie)
AUTH_SECRET=         # Náhodný reťazec 32+ znakov
NEXTAUTH_URL=        # http://localhost:3000 (dev) alebo https://www.mais.sk (prod)
NEXT_PUBLIC_GA_MEASUREMENT_ID=  # G-QGVZ38H465 (len pridaj v Vercel Production env)
```

---

## Dokumentácia

| Dokument | Pre koho | Obsah |
|---|---|---|
| [PRIRUCKA-WEB.md](docs/PRIRUCKA-WEB.md) | Tester / používateľ | Štruktúra webu, čo odkiaľ pochádza, checklist na testovanie |
| [PRIRUCKA-ADMIN.md](docs/PRIRUCKA-ADMIN.md) | Správca obsahu | Prihlásenie, editácia textov, správa partnerov a integrácií |
| [TECHNICKA-DOKUMENTACIA.md](docs/TECHNICKA-DOKUMENTACIA.md) | Developer | Architektúra, API, DB schéma, SEO, deploy, bezpečnosť |

---

## Vlastník

**ITernal s.r.o.** · [iternal.sk](https://www.iternal.sk)
Dubnica nad Váhom · mais@mais.sk · +421 915 724 757

*Posledná aktualizácia: apríl 2026 · verzia 1.1*
