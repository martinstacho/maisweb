# Príručka webu MAIS

> Táto príručka je určená pre testera alebo kohokoľvek, kto chce pochopiť čo web obsahuje, odkiaľ čo pochádza a ako ho otestovať. Nevyžaduje žiadne technické znalosti.

---

## Obsah

1. [Účel webu](#1-účel-webu)
2. [Štruktúra webu – mapa stránok](#2-štruktúra-webu--mapa-stránok)
3. [Jazykové verzie](#3-jazykové-verzie)
4. [Odkiaľ čo prichádza](#4-odkiaľ-čo-prichádza)
5. [Checklist na testovanie](#5-checklist-na-testovanie)

---

## 1. Účel webu

**maisweb** je prezentačný web pre systém MAIS (Modulárny akademický informačný systém), ktorý vyvinula spoločnosť ITernal s.r.o.

Web slúži **dvom skupinám návštevníkov:**

| Skupina | Čo hľadajú |
|---|---|
| **Študenti a uchádzači** | Kde sa prihlásiť do systému svojej školy, kde podať e-prihlášku |
| **Rozhodovatelia na univerzitách** (rektori, kvestori, IT oddelenia) | Prečo kúpiť MAIS, čo ponúka, kto ho už používa |

**Adresy webu:**
- Beta verzia (na testovanie): `maisweb-beta.vercel.app`
- Produkcia (po nasadení): `mais.sk`

---

## 2. Štruktúra webu – mapa stránok

Web má 4 hlavné stránky dostupné v každom jazyku. URL vždy začína predponou jazyka (napr. `/sk/podpora`, `/en/podpora`).

---

### Hlavná stránka `/`

Landing page pre obe cieľové skupiny. Sekcie zhora nadol:

#### Hero blok
Úvodný blok s veľkým nadpisom „Akademický informačný systém" a dvomi tlačidlami:
- **Primárne tlačidlo** – vedie na stránku pre inštitúcie
- **Sekundárne tlačidlo** – vedie na helpdesk pre študentov

*[Screenshot: celý hero blok s nadpisom, podnadpisom a dvomi tlačidlami]*

---

#### Marquee pás (bežiaci text)
Pod hero blokom je animovaný pás so skratkami všetkých 9 partnerských škôl (TUKE, TRUNI, SZU...). Školy sa striedajú v slučke. Dáta pochádzajú z databázy – keď admin pridá novú školu, automaticky sa objaví aj tu.

*[Screenshot: marquee pás s farebnými bodkami a skratkami škôl]*

---

#### Štatistiky
Štyri veľké čísla s popismi:
- **22 rokov** skúseností (od roku 2004 — od roku 1993 s predchádzajúcim systémom SIMUS)
- **9 inštitúcií** aktuálne využíva MAIS
- **50 000+** aktívnych používateľov
- **100%** kompatibilný s legislatívou

*[Screenshot: sekcia so 4 číslami]*

---

#### Features – Funkcie systému
Šesť kariet popisujúcich hlavné moduly MAIS:
1. Študijná agenda
2. E-prihláška
3. Bezpečnosť
4. Výkon
5. Integrácie
6. Podpora (dostupnosť)

*[Screenshot: 6 feature kariet v mriežke]*

---

#### Architektúra
Interaktívna orbitálna animácia – v strede je „MAIS core engine" a okolo neho obiehajú 9 modulov systému. Pod animáciou sú 4 technické detaily (SSO, databáza, integrácie, zálohy).

*[Screenshot: orbitálna animácia s modulmi]*

---

#### Integrácie
Prehľad 29 systémov, s ktorými sa MAIS integruje. Rozdelené do 6 kategórií:

| Kategória | Príklady |
|---|---|
| Identita | LDAP, OAuth2, SSO |
| Ekonomika | SAP, Štátna pokladnica, Omega |
| Štúdium | CRŠ, CVTI, CRZP |
| Registratúra | MEMPHIS, Autogram |
| Externé | aSc Rozvrhy, E-learning |
| Mobilné | Android App, iOS App |

Dáta pochádzajú z databázy – admin môže pridávať a upravovať integrácie.

*[Screenshot: sekcia integrácií s farebnými chipmi]*

---

#### Školy (partneri)
9 kariet partnerských škôl s logom (monogramom), názvom a mestom. Pri každej karte sú 2–3 tlačidlá:
- Odkaz na webstránku školy
- Odkaz na helpdesk prihlásenia
- Odkaz na e-prihlášku (ak existuje)

Dáta pochádzajú z databázy.

*[Screenshot: mriežka 9 school kariet]*

---

#### Kontakt (päta stránky)
CTA blok s emailom mais@mais.sk a telefónom. Pod ním globálna päta s navigáciou.

---

### `/podpora` – Helpdesk pre študentov

Stránka určená **študentom a uchádzačom** – čo robiť keď sa nevedia prihlásiť do MAISu alebo chcú podať e-prihlášku.

**Čo na stránke nájdeš:**
- Počet aktívnych inštitúcií (live číslo z databázy)
- Odkaz na skok priamo na zoznam škôl
- Mriežka kariet pre každú partnerskú školu s tlačidlami:
  - **Oficiálna webstránka** školy
  - **Neviem sa prihlásiť** – vedie buď na stránku s návodom, alebo otvára email
  - **E-prihláška** – priamy odkaz na online prihlášku

Ak škola používateľa nie je v zozname, môže kontaktovať centrálny helpdesk (email + telefón) cez banner v spodnej časti stránky.

*[Screenshot: zoznam kariet škôl na /podpora]*

---

### `/pre-institucie` – Pre univerzity

Stránka určená **rozhodovacom na univerzitách** – prečo implementovať MAIS.

**Čo na stránke nájdeš:**
1. **Hero blok** s hlavnou správou
2. **Tri dôvody** – prečo MAIS oproti konkurencii
3. **Bento grid** – vizualizácia ekosystému MAIS (kompatibilita, integrácie, bezpečnosť, podpora)
4. **Referencie** – 3 náhodne vybrané citáty od zástupcov škôl
5. **CTA blok** – výzva na kontakt

*[Screenshot: /pre-institucie hero a bento grid]*

---

### `/kontakt` – Kontaktná stránka

Kontaktné údaje ITernal s.r.o.:
- Email: mais@mais.sk
- Telefón: +421 915 724 757
- Adresa: Dubnica nad Váhom

*[Screenshot: /kontakt stránka]*

---

### `/skoly` – Zoznam škôl

Alternatívny pohľad na partnerské školy s podrobnejšími informáciami. Obsah sa prekrýva so sekciou Školy na hlavnej stránke.

---

## 3. Jazykové verzie

Web je dostupný v **4 jazykoch**:

| Jazyk | Prefix URL | Kto ho potrebuje |
|---|---|---|
| 🇸🇰 Slovenčina | `/sk/` | Slovenské školy a ich študenti |
| 🇬🇧 Angličtina | `/en/` | Medzinárodní uchádzači |
| 🇺🇦 Ukrajinčina | `/uk/` | Ukrajinskí uchádzači (aktuálne veľká skupina) |
| 🇭🇺 Maďarčina | `/hu/` | Maďarsky hovoriace regióny Slovenska |

**Prepínač jazykov** je v pravej časti navigácie. Aktívny jazyk má farebnú bodku.

**Automatická detekcia jazyka:**
Web sa pri prvej návšteve automaticky prepne do jazyka prehliadača návštevníka. Ak má prehliadač nastavený nepodporovaný jazyk (napr. nemčinu), zobrazí sa slovenská verzia. Po kliknutí na iný jazyk v prepínači si web túto voľbu zapamätá aj pri ďalšej návšteve.

---

## 4. Odkiaľ čo prichádza

### Z databázy (môže meniť admin bez programátora)

| Čo | Kde na webe | Kde meniť |
|---|---|---|
| Zoznam škôl (9 partnerov) | Marquee pás, sekcia Školy, /podpora, /skoly | Admin → Partneri |
| Integrácie (29 položiek) | Sekcia Integrácie, /pre-institucie | Admin → Integrácie |
| Referencie | Sekcia Referencie na /pre-institucie | Admin → Referencie |
| Texty webu (106 polí × 4 jazyky) | Všetky texty na všetkých stránkach | Admin → Sekcie |

### Z kódu (vyžaduje programátora)

- Farby, fonty, layout stránok
- Animácie (orbital, marquee, hero efekty)
- Štruktúra stránok a navigácia
- Loga škôl v `/public/logos/` (SVG/JPG súbory)

### Statické súbory

- `/public/og-image.png` – obrázok, ktorý sa zobrazí pri zdieľaní odkazu na sociálnych sieťach (Facebook, LinkedIn, WhatsApp)

> **Poznámka:** OG obrázok sa generuje aj dynamicky pre každý jazyk – ak ho chcete zmeniť, stačí nahradiť `/public/og-image.png` alebo požiadať programátora o úpravu dynamickej verzie.

---

## 5. Checklist na testovanie

Použi tento zoznam pri každom testovaní webu. Fajkuj systematicky.

### Základná funkcionalita

- [ ] Otvor `maisweb-beta.vercel.app` – web sa načíta bez chyby
- [ ] Klikni na všetky položky v navigácii (Funkcie, Školy, Pre inštitúcie, Podpora, Kontakt)
- [ ] Klikni na logo MAIS v ľavom rohu navigácie – vráti sa na hlavnú stránku

### Jazykové verzie

- [ ] Klikni na **SK** v prepínači – slovenský text
- [ ] Klikni na **EN** – anglický text (skontroluj nadpisy, tlačidlá, texty)
- [ ] Klikni na **UK** – ukrajinský text (kyrilika)
- [ ] Klikni na **HU** – maďarský text
- [ ] Over že URL sa mení: `/sk/`, `/en/`, `/uk/`, `/hu/`

### Hlavná stránka

- [ ] Hero: nadpis, podnadpis a 2 tlačidlá sa zobrazujú správne
- [ ] Marquee pás beží a zobrazuje 9 škôl
- [ ] Štatistiky – 4 čísla sú viditeľné
- [ ] Features sekcia – 6 kariet s nadpisom a popisom
- [ ] Orbitálna animácia – modulový kruh sa otáča
- [ ] Integrácie – farebné chipy v 6 kategóriách
- [ ] Školy – 9 kariet, každá má tlačidlá (web, prihlásenie, e-prihláška)
- [ ] Footer – navigačné linky a copyright

### Stránka /podpora

- [ ] Stránka sa načíta pre každý jazyk
- [ ] Každá karta školy má funkčný odkaz na web školy (otvorí v novom tabe)
- [ ] Klikni na „Prihlásenie" na aspoň 3 školách – over že vedie na správnu URL
- [ ] Klikni na „E-prihláška" – over správny odkaz
- [ ] Spodný banner s kontaktom je viditeľný

### Stránka /pre-institucie

- [ ] Stránka sa načíta
- [ ] Referencie sa zobrazujú (3 citáty)
- [ ] CTA tlačidlo vedie na /kontakt

### Responzivita

- [ ] Otvor DevTools (F12) → prepni na mobilné zobrazenie (iPhone 14 alebo podobné)
- [ ] Skontroluj hlavnú stránku na mobile – nič nepretéka
- [ ] Skontroluj navigáciu na mobile – hamburgurové menu funguje
- [ ] Skontroluj /podpora na mobile – karty škôl sú čitateľné

### Technické detaily

- [ ] View source (Ctrl+U) → v `<head>` sú `<link rel="alternate" hreflang="sk">` tagy pre každý jazyk
- [ ] View source → je prítomný JSON-LD blok (`<script type="application/ld+json">`)
- [ ] Otvor `/robots.txt` – zobrazí sa obsah s pravidlami pre vyhľadávače
- [ ] Otvor `/sitemap.xml` – zobrazí sa XML s 12 URL (4 jazyky × 3 stránky)

---

*Dokument: docs/PRIRUCKA-WEB.md · Posledná aktualizácia: apríl 2026*
