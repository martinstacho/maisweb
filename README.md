# MAIS – Modulárny akademický informačný systém

Marketingový web pre MAIS od ITernal s.r.o.

## Tech stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 + shadcn/ui
- Prisma + SQLite (dev)
- Auth.js v5 (Credentials provider)
- next-themes (dark mode)

## Spustenie

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Web beží na http://localhost:3000

## Prihlásenie do admina

URL: http://localhost:3000/admin/login

| Email         | Heslo    |
|---------------|----------|
| admin@mais.sk | admin123 |

> **Dôležité:** Pred nasadením na produkciu zmeňte heslo admina a nastavte silný `AUTH_SECRET` v `.env`.

## Štruktúra stránok

| URL                     | Popis                          |
|-------------------------|--------------------------------|
| `/`                     | Landing page                   |
| `/skoly`                | Zoznam partnerských inštitúcií |
| `/pre-institucie`       | Placeholder pre inštitúcie     |
| `/podpora`              | Placeholder podpora            |
| `/kontakt`              | Kontaktné údaje + formulár     |
| `/admin`                | Dashboard (chránené)           |
| `/admin/partners`       | CRUD zoznam partnerov          |
| `/admin/partners/new`   | Pridať partnera                |
| `/admin/partners/[id]`  | Editovať partnera              |

## Loga

SVG placeholder logá sú v `/public/logos/`. Nahraďte ich reálnymi logami cez admin (upload súboru) alebo priamo do priečinka.

## Produkčné nasadenie

1. Nastaviť `DATABASE_URL` pre produkčnú DB
2. Nastaviť `AUTH_SECRET` (min. 32 znakov)
3. Nastaviť `NEXTAUTH_URL` na doménu
4. `npx prisma migrate deploy`
5. `npm run build && npm start`
