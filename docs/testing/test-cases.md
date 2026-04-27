# Test cases pre maisweb

> Verzia 1.0 · 27. apríla 2026 · ITernal s.r.o.

## Ako používať

- Každý krok testu je zaškrtávateľný checkbox — zaškrtni po overení
- Pri zlyhaní zaznamenaj do `test-cases.xlsx` (stĺpec Skutočný výsledok, Stav = Fail)
- Vytvor GitHub Issue s ID testu (napr. `TC-F-003`) a prilož screenshot
- **Priorita**: 🔴 Critical > 🟠 High > 🟡 Medium > 🟢 Low

---

## Obsah

- [1. Funkčné testy](#1-funkčné-testy) — 20 testov
- [2. Vizuálne testy](#2-vizuálne-testy) — 15 testov
- [3. Obsahové testy](#3-obsahové-testy) — 15 testov
- [4. Admin testy](#4-admin-testy) — 15 testov
- [5. Content CMS testy](#5-content-cms-testy) — 10 testov
- [6. SEO testy](#6-seo-testy) — 8 testov
- [7. Security testy](#7-security-testy) — 7 testov
- [8. Lokalizácia testy](#8-lokalizácia-testy) — 5 testov
- [9. Edge Cases](#9-edge-cases) — 5 testov
- [10. Performance testy](#10-performance-testy) — 5 testov

---

## 1. Funkčné testy

### TC-F-001: Otvorenie hlavnej stránky
**Priorita:** 🔴 Critical

**Predpoklad:** Internet pripojenie, Chrome/Firefox/Safari

**Postup:**
- [ ] 1. Otvor https://www.mais.sk
- [ ] 2. Počkaj na načítanie (max 5 s)
- [ ] 3. Otvor DevTools (F12) → Console tab
- [ ] 4. Over že nie sú červené JS chyby

**Očakávaný výsledok:** Stránka sa načíta. Hero blok s nadpisom je viditeľný. Navbar prítomný. Marquee pás sa zobrazuje. Žiadne JS chyby.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-002: Scroll linky v navbare
**Priorita:** 🟠 High

**Predpoklad:** Hlavná stránka /sk je otvorená

**Postup:**
- [ ] 1. Klikni "Funkcie" v navbare → over skrolovanie na sekciu Funkcie
- [ ] 2. Klikni "Školy" → over skrolovanie na sekciu Školy
- [ ] 3. Klikni "Kontakt" → over skrolovanie na kontaktný blok

**Očakávaný výsledok:** Po každom kliknutí sa stránka plynulo skroluje na správnu sekciu. Obsah sekcie je viditeľný.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-003: Prepínanie jazyka na EN
**Priorita:** 🔴 Critical

**Predpoklad:** Aktuálna URL je /sk alebo /sk/...

**Postup:**
- [ ] 1. Klikni "EN" v jazykovom prepínači (pravý horný roh)
- [ ] 2. Over URL adresu v prehliadači
- [ ] 3. Prečítaj hero nadpis
- [ ] 4. Over texty v navbare

**Očakávaný výsledok:** URL obsahuje /en. Hero nadpis je v angličtine. Navbar položky v EN. Zelená bodka je pri EN.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-004: Prepínanie jazyka na UK (ukrajinskú)
**Priorita:** 🟠 High

**Predpoklad:** Aktuálna URL je /sk alebo /sk/...

**Postup:**
- [ ] 1. Klikni "UK" v jazykovom prepínači
- [ ] 2. Over URL adresu
- [ ] 3. Prečítaj hero nadpis
- [ ] 4. Over že text obsahuje ukrajinskú kyrilisku

**Očakávaný výsledok:** URL obsahuje /uk. Hero nadpis je v ukrajinskej kyrililike. Všetky texty v ukrajinskej.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-005: Prepínanie jazyka na HU (maďarskú)
**Priorita:** 🟠 High

**Predpoklad:** Aktuálna URL je /sk alebo /sk/...

**Postup:**
- [ ] 1. Klikni "HU" v jazykovom prepínači
- [ ] 2. Over URL adresu
- [ ] 3. Prečítaj hero nadpis
- [ ] 4. Skontroluj texty tlačidiel

**Očakávaný výsledok:** URL obsahuje /hu. Hero nadpis je v maďarčine. Navbar položky v HU.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-006: CTA tlačidlo „Nájdi svoju školu"
**Priorita:** 🔴 Critical

**Predpoklad:** Hlavná stránka /sk je otvorená, hero blok viditeľný

**Postup:**
- [ ] 1. Nájdi primárne (oranžové) CTA tlačidlo v hero
- [ ] 2. Prečítaj text tlačidla
- [ ] 3. Klikni naň
- [ ] 4. Over URL

**Očakávaný výsledok:** Tlačidlo má text "Nájdi svoju školu" (alebo ekvivalent). Klik presmeruje na /sk/podpora.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-007: CTA tlačidlo „Pre inštitúcie"
**Priorita:** 🟠 High

**Predpoklad:** Hlavná stránka /sk je otvorená, hero blok viditeľný

**Postup:**
- [ ] 1. Nájdi sekundárne CTA tlačidlo v hero
- [ ] 2. Prečítaj text
- [ ] 3. Klikni naň
- [ ] 4. Over URL

**Očakávaný výsledok:** Tlačidlo má text "Pre inštitúcie" (alebo ekvivalent). Klik presmeruje na /sk/pre-institucie.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-008: Odkaz na web partnerskej školy
**Priorita:** 🟠 High

**Predpoklad:** Sekcia Školy je viditeľná alebo stránka /podpora

**Postup:**
- [ ] 1. Nájdi kartu školy TUKE
- [ ] 2. Klikni tlačidlo "Webstránka"
- [ ] 3. Over URL cieľovej stránky
- [ ] 4. Over že sa otvorí v NOVOM tabe

**Očakávaný výsledok:** Otvorí sa web tuke.sk (alebo ekvivalent) v novom tabe. Správna URL pre školu.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-009: Odkaz na prihlásenie do MAISu
**Priorita:** 🟠 High

**Predpoklad:** Sekcia Školy alebo stránka /podpora je viditeľná

**Postup:**
- [ ] 1. Nájdi kartu školy TUKE
- [ ] 2. Klikni tlačidlo "Prihlásenie" alebo "Neviem sa prihlásiť"
- [ ] 3. Over cieľovú URL

**Očakávaný výsledok:** Link vedie na prihlasovaciu stránku MAISu pre danú školu alebo na návod. Otvára sa v novom tabe.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-010: Odkaz na e-prihlášku
**Priorita:** 🟠 High

**Predpoklad:** Sekcia Školy alebo /podpora – karta školy s e-prihláškou (napr. TUKE)

**Postup:**
- [ ] 1. Nájdi kartu školy s tlačidlom "E-prihláška"
- [ ] 2. Klikni naň
- [ ] 3. Over cieľovú URL
- [ ] 4. Over nový tab

**Očakávaný výsledok:** Link vedie na online prihlášku školy v novom tabe. Školy bez e-prihlášky toto tlačidlo nemajú.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-011: Navigácia na stránku /podpora
**Priorita:** 🟠 High

**Predpoklad:** Aktuálna je hlavná stránka /sk

**Postup:**
- [ ] 1. Klikni "Podpora" v navbare
- [ ] 2. Over URL
- [ ] 3. Skontroluj obsah

**Očakávaný výsledok:** URL sa zmení na /sk/podpora. Stránka zobrazuje karty škôl s tlačidlami. Zobrazuje počet inštitúcií.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-012: Navigácia na stránku /pre-institucie
**Priorita:** 🟠 High

**Predpoklad:** Aktuálna je hlavná stránka /sk

**Postup:**
- [ ] 1. Klikni "Pre inštitúcie" v navbare
- [ ] 2. Over URL
- [ ] 3. Skontroluj obsah

**Očakávaný výsledok:** URL sa zmení na /sk/pre-institucie. Stránka zobrazuje hero, tri dôvody, bento grid a referencie.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-013: Navigácia na stránku /kontakt
**Priorita:** 🟡 Medium

**Predpoklad:** Aktuálna je ľubovoľná stránka

**Postup:**
- [ ] 1. Klikni "Kontakt" v navbare alebo footeri
- [ ] 2. Over URL
- [ ] 3. Skontroluj obsah

**Očakávaný výsledok:** URL sa zmení na /sk/kontakt. Stránka zobrazuje email, telefón a adresu.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-014: Logo MAIS naviguje na homepage
**Priorita:** 🟡 Medium

**Predpoklad:** Aktuálna je podstránka (napr. /sk/podpora)

**Postup:**
- [ ] 1. Klikni na logo MAIS v ľavom rohu navbaru
- [ ] 2. Over URL

**Očakávaný výsledok:** Presmeruje na hlavnú stránku /sk. Funguje z ľubovoľnej podstránky.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-015: Footer navigačné linky
**Priorita:** 🟡 Medium

**Predpoklad:** Footer je viditeľný (najspodnejšia časť stránky)

**Postup:**
- [ ] 1. Nájdi footer
- [ ] 2. Klikni na každý navigačný link vo footeri
- [ ] 3. Over ciele

**Očakávaný výsledok:** Každý footer link vedie na správnu stránku. Externé linky v novom tabe.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-016: Emailový link mais@mais.sk
**Priorita:** 🟡 Medium

**Predpoklad:** Zariadenie má nastavený emailový klient

**Postup:**
- [ ] 1. Nájdi link mais@mais.sk (footer alebo /kontakt)
- [ ] 2. Klikni naň

**Očakávaný výsledok:** Otvorí sa emailový klient s predvyplnenou adresou mais@mais.sk. Správna adresa.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-017: Telefónny link +421 915 724 757
**Priorita:** 🟡 Medium

**Predpoklad:** Mobilné zariadenie alebo desktop s VoIP

**Postup:**
- [ ] 1. Nájdi telefónne číslo na stránke
- [ ] 2. Klikni naň

**Očakávaný výsledok:** Otvorí sa dialóg pre volanie s číslom +421915724757. Na desktop VoIP aplikácia.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-018: /pre-institucie CTA „Kontaktujte nás"
**Priorita:** 🟠 High

**Predpoklad:** Stránka /sk/pre-institucie je otvorená

**Postup:**
- [ ] 1. Skroluj na CTA sekciu na spodku stránky
- [ ] 2. Klikni tlačidlo "Kontaktujte nás"
- [ ] 3. Over kam vedie

**Očakávaný výsledok:** Presmeruje na /sk/kontakt alebo otvorí emailový klient. Kontaktné údaje dostupné.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-019: /podpora – kontaktný banner
**Priorita:** 🟠 High

**Predpoklad:** Stránka /sk/podpora je otvorená

**Postup:**
- [ ] 1. Skroluj na spodok stránky
- [ ] 2. Nájdi banner "Tvoja škola nie je v zozname?"
- [ ] 3. Klikni na kontaktné tlačidlo

**Očakávaný výsledok:** Banner je viditeľný. Klik otvorí emailový klient alebo vedie na /kontakt.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-F-020: Hamburger menu na mobile
**Priorita:** 🟠 High

**Predpoklad:** Prehliadač v mobilnom zobrazení (≤ 768 px) alebo skutočný mobil

**Postup:**
- [ ] 1. Zmenši okno na 375 px (F12 → DevTools → Toggle device)
- [ ] 2. Klikni hamburger ikonu (≡) v navbare
- [ ] 3. Over zobrazenie menu
- [ ] 4. Klikni na položku
- [ ] 5. Over zatváranie

**Očakávaný výsledok:** Menu sa otvorí s viditeľnými položkami. Klik naviguje správne. Menu sa zavrie po výbere.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 2. Vizuálne testy

### TC-V-001: Desktop layout 1920×1080
**Priorita:** 🟠 High

**Predpoklad:** Prehliadač nastavený na 1920 × 1080 px

**Postup:**
- [ ] 1. Otvor https://www.mais.sk na 1920 px
- [ ] 2. Skroluj cez celú stránku
- [ ] 3. Skontroluj: hero, marquee, stats, features, orbital, integrácie, školy, footer

**Očakávaný výsledok:** Hero na celú šírku. Marquee viditeľný. Stats v 4 stĺpcoch. Features 3×2. Nič nepretéka.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-002: Notebook layout 1366×768
**Priorita:** 🟡 Medium

**Predpoklad:** Prehliadač nastavený na 1366 × 768 px

**Postup:**
- [ ] 1. Otvor stránku na 1366 px
- [ ] 2. Skroluj cez celú stránku
- [ ] 3. Over že nič nie je orezané alebo pretekajúce

**Očakávaný výsledok:** Všetky sekcie viditeľné. Texty čitateľné. Žiadny horizontálny scrollbar.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-003: Tablet layout 768 px
**Priorita:** 🟠 High

**Predpoklad:** DevTools otvorené, šírka nastavená na 768 px

**Postup:**
- [ ] 1. F12 → Toggle device toolbar
- [ ] 2. Nastav šírku 768 px
- [ ] 3. Skontroluj navbar
- [ ] 4. Over zalomenie kariet
- [ ] 5. Over čitateľnosť textov

**Očakávaný výsledok:** Navbar skrytý do hamburger menu. Karty partnrov v 2 stĺpcoch. Texty čitateľné.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-004: Mobil layout 375 px (iPhone SE)
**Priorita:** 🔴 Critical

**Predpoklad:** DevTools – iPhone SE (375 × 667)

**Postup:**
- [ ] 1. F12 → Toggle device → iPhone SE
- [ ] 2. Skroluj cez celú stránku
- [ ] 3. Over hamburger menu
- [ ] 4. Over veľkosť tlačidiel (min 44 × 44 px)
- [ ] 5. Over overflow

**Očakávaný výsledok:** Všetko v 1 stĺpci. Žiadny horizontálny scroll. Tlačidlá dotykovo prístupné. Texty čitateľné.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-005: Hero gradient / background animácia
**Priorita:** 🟡 Medium

**Predpoklad:** Desktop, stránka sa práve načítala

**Postup:**
- [ ] 1. Otvor hlavnú stránku
- [ ] 2. Pozoruj hero blok 5 sekúnd
- [ ] 3. Over pohyb alebo zmenu gradientu pozadia

**Očakávaný výsledok:** Gradient v hero sa animuje. Animácia plynulá, bez zásekov.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-006: Marquee pás – kontinuálna animácia
**Priorita:** 🟡 Medium

**Predpoklad:** Hlavná stránka načítaná

**Postup:**
- [ ] 1. Pozoruj marquee pás (pod hero)
- [ ] 2. Sleduj animáciu 5 sekúnd
- [ ] 3. Over smer a plynulosť
- [ ] 4. Over že sa opakuje v slučke

**Očakávaný výsledok:** Marquee sa kontinuálne posúva. Školy sa opakujú v slučke bez prerušení.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-007: NumberTicker – animácia čísel v stats
**Priorita:** 🟡 Medium

**Predpoklad:** Stats sekcia je v zornom poli prehliadača

**Postup:**
- [ ] 1. Skroluj na stats sekciu
- [ ] 2. Sleduj čísla 22+, 9, 50 000+, 100%
- [ ] 3. Over animáciu počítania od 0

**Očakávaný výsledok:** Čísla sa animujú od 0 pri prvom zobrazení v zornom poli. Zastavujú na správnych hodnotách.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-008: Orbital animácia – moduly obiehajú
**Priorita:** 🟢 Low

**Predpoklad:** Sekcia Architektúra je viditeľná (desktop)

**Postup:**
- [ ] 1. Skroluj na sekciu Architektúra
- [ ] 2. Pozoruj orbital animáciu
- [ ] 3. Over rotáciu modulov
- [ ] 4. Over text v strede

**Očakávaný výsledok:** 9 modulov obiehajú okolo "MAIS core engine" v strede. Animácia plynulá. Text čitateľný.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-009: Hover stav tlačidiel
**Priorita:** 🟡 Medium

**Predpoklad:** Desktop s myšou, tlačidlá viditeľné

**Postup:**
- [ ] 1. Najeď myšou na primárne oranžové tlačidlo
- [ ] 2. Over vizuálnu zmenu (farba, tieň)
- [ ] 3. Odjeď a over návrat
- [ ] 4. Opakuj pre sekundárne tlačidlo

**Očakávaný výsledok:** Tlačidlá majú viditeľný hover efekt. Stav sa vráti po odchode kurzora.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-010: Focus stav – klávesnicová navigácia
**Priorita:** 🟡 Medium

**Predpoklad:** Prehliadač s klávesnicou

**Postup:**
- [ ] 1. Klikni na prázdne miesto na stránke
- [ ] 2. Stlač Tab
- [ ] 3. Sleduj focus indikátor (modrý/biely outline)
- [ ] 4. Prejdi Tab cez všetky interaktívne prvky

**Očakávaný výsledok:** Každý interaktívny element má viditeľný focus ring. Poradie navigácie je logické.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-011: Aktívna bodka v language switcheri
**Priorita:** 🟢 Low

**Predpoklad:** Stránka /sk je otvorená

**Postup:**
- [ ] 1. Pozri language switcher v navbare
- [ ] 2. Over ktorý jazyk má farebnú bodku
- [ ] 3. Prepni na EN
- [ ] 4. Over polohu bodky

**Očakávaný výsledok:** Aktívny jazyk (SK) má zelenú bodku. Po prepnutí na EN sa bodka presunie na EN.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-012: Navbar efekt pri skrolovaní
**Priorita:** 🟢 Low

**Predpoklad:** Hlavná stránka, hero je viditeľný (navrchu)

**Postup:**
- [ ] 1. Pozoruj navbar pri načítaní
- [ ] 2. Začni skrolovať nadol
- [ ] 3. Over zmenu pozadia / tieňa navbaru
- [ ] 4. Over sticky polohu

**Očakávaný výsledok:** Navbar sa pri skrolovaní zmení (blur/pozadie). Zostáva sticky na vrchu stránky.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-013: Hover efekt na kartách partnerov
**Priorita:** 🟢 Low

**Predpoklad:** Desktop s myšou, sekcia Školy viditeľná

**Postup:**
- [ ] 1. Najeď myšou na kartu školy
- [ ] 2. Over hover efekt (tieň, scale, border)
- [ ] 3. Odjeď a over návrat

**Očakávaný výsledok:** Karta má vizuálny hover efekt (tieň alebo transform). Animácia plynulá.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-014: AOS scroll animácie
**Priorita:** 🟡 Medium

**Predpoklad:** Prehliadač bez prefers-reduced-motion

**Postup:**
- [ ] 1. Skroluj pomaly cez celú stránku od hora nadol
- [ ] 2. Sleduj vstup sekcií do zorného poľa

**Očakávaný výsledok:** Sekcie vstupujú s animáciou (fade-up, fade-in). Animácie plynulé, bez zásekov.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-V-015: Integrácie chipy – farby podľa kategórie
**Priorita:** 🟡 Medium

**Predpoklad:** Sekcia Integrácie viditeľná na hlavnej stránke

**Postup:**
- [ ] 1. Nájdi sekciu Integrácie
- [ ] 2. Over 6 kategórií (Identita, Ekonomika, Štúdium, Registratúra, Externé, Mobilné)
- [ ] 3. Over rôzne farby chipov pre rôzne kategórie

**Očakávaný výsledok:** Každá kategória má odlišnú farebnú schému. Chipy čitateľné. Farby konzistentné v rámci kategórie.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 3. Obsahové testy

### TC-O-001: Hero text SK
**Priorita:** 🔴 Critical

**Predpoklad:** Stránka /sk načítaná

**Postup:**
- [ ] 1. Prečítaj hlavný nadpis hero sekcie
- [ ] 2. Prečítaj podnadpis
- [ ] 3. Skontroluj badge nad nadpisom

**Očakávaný výsledok:** Nadpis: "Akademický informačný systém, ktorý poháňa slovenské univerzity" (alebo aktuálny z DB). Podnadpis v SK. Badge viditeľný.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-002: Hero text EN
**Priorita:** 🟠 High

**Predpoklad:** Stránka /en načítaná

**Postup:**
- [ ] 1. Prečítaj hlavný nadpis hero sekcie
- [ ] 2. Prečítaj podnadpis
- [ ] 3. Over že nie sú slovenské slová

**Očakávaný výsledok:** Nadpis v angličtine. Podnadpis v angličtine. Žiadne slovenské slová v hero.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-003: Hero text UK (kyrilika)
**Priorita:** 🟠 High

**Predpoklad:** Stránka /uk načítaná

**Postup:**
- [ ] 1. Prečítaj hlavný nadpis hero sekcie
- [ ] 2. Over že text je kyrilika
- [ ] 3. Over čitateľnosť fontu

**Očakávaný výsledok:** Nadpis v ukrajinskej kyrililike. Font zobrazuje cyrilické znaky správne.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-004: Hero text HU (maďarčina)
**Priorita:** 🟠 High

**Predpoklad:** Stránka /hu načítaná

**Postup:**
- [ ] 1. Prečítaj hlavný nadpis hero sekcie
- [ ] 2. Over maďarské diakritické znaky (é, á, ő, ű)

**Očakávaný výsledok:** Nadpis v maďarčine. Diakritické znaky sa zobrazujú správne.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-005: Stats sekcia – 4 správne hodnoty
**Priorita:** 🔴 Critical

**Predpoklad:** Stats sekcia viditeľná na hlavnej stránke

**Postup:**
- [ ] 1. Nájdi sekciu so 4 veľkými číslami
- [ ] 2. Prečítaj hodnotu 1 (roky)
- [ ] 3. Prečítaj hodnotu 2 (inštitúcie)
- [ ] 4. Prečítaj hodnotu 3 (používatelia)
- [ ] 5. Prečítaj hodnotu 4 (kompatibilita)

**Očakávaný výsledok:** "22+" rokov skúseností. "9" inštitúcií. "50 000+" aktívnych používateľov. "100%" kompatibilita s legislatívou.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-006: Marquee pás – 9 partnerských škôl
**Priorita:** 🟠 High

**Predpoklad:** Marquee pás viditeľný pod hero

**Postup:**
- [ ] 1. Pozoruj marquee pás
- [ ] 2. Vypíš všetky skratky škôl
- [ ] 3. Over počet (9)

**Očakávaný výsledok:** Všetkých 9 škôl prítomných: TUKE, TRUNI, SZU, UNIPO, AOS, APZ, BISLA, DTI, VŠBM. Každá má bodku a mesto.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-007: Integrácie – počet položiek a kategórie
**Priorita:** 🟡 Medium

**Predpoklad:** Sekcia Integrácie viditeľná na hlavnej stránke

**Postup:**
- [ ] 1. Spočítaj integračné chipy
- [ ] 2. Over 6 kategórií
- [ ] 3. Nájdi LDAP, SAP, CRŠ ako konkrétne príklady

**Očakávaný výsledok:** 29 integrácií v 6 kategóriách. Identita (LDAP, OAuth2, SSO), Ekonomika (SAP, Štátna pokladnica), Štúdium (CRŠ, CVTI), Registratúra, Externé, Mobilné.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-008: Partneri – mestá a logá/monogramy
**Priorita:** 🟡 Medium

**Predpoklad:** Sekcia Školy alebo /skoly viditeľná

**Postup:**
- [ ] 1. Pre každú kartu školy over: logo/monogram, plný názov, mesto
- [ ] 2. Over správnosť miest: TUKE = Košice, TRUNI = Trnava, SZU = Bratislava

**Očakávaný výsledok:** Všetkých 9 škôl má logo/monogram, plný názov a správne mesto. Logá sa načítavajú.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-009: Kontaktné info (email a telefón)
**Priorita:** 🔴 Critical

**Predpoklad:** Footer alebo /kontakt viditeľný

**Postup:**
- [ ] 1. Nájdi emailovú adresu
- [ ] 2. Prečítaj presný text
- [ ] 3. Nájdi telefónne číslo
- [ ] 4. Prečítaj presný text

**Očakávaný výsledok:** Email: mais@mais.sk. Telefón: +421 915 724 757. Oba sú klikateľné linky.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-010: Copyright text v footeri
**Priorita:** 🟢 Low

**Predpoklad:** Footer viditeľný

**Postup:**
- [ ] 1. Nájdi copyright text v footeri
- [ ] 2. Prečítaj rok a názov spoločnosti

**Očakávaný výsledok:** Footer obsahuje copyright s aktuálnym rokom (2026) a názvom ITernal s.r.o.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-011: Feature karty – 6 modulov MAIS
**Priorita:** 🟠 High

**Predpoklad:** Sekcia Funkcie/Features viditeľná

**Postup:**
- [ ] 1. Spočítaj feature karty
- [ ] 2. Prečítaj nadpis každej karty
- [ ] 3. Over že každá má popis

**Očakávaný výsledok:** 6 kariet: Študijná agenda, E-prihláška, Bezpečnosť, Výkon, Integrácie, Podpora. Každá má ikonu, nadpis a popis.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-012: /podpora – texty a tlačidlá škôl
**Priorita:** 🟠 High

**Predpoklad:** Stránka /sk/podpora načítaná

**Postup:**
- [ ] 1. Prečítaj hero text na /podpora
- [ ] 2. Over live číslo inštitúcií (malo by byť 9)
- [ ] 3. Skontroluj texty tlačidiel na kartách škôl

**Očakávaný výsledok:** Hero text v SK. Live číslo = 9. Tlačidlá: "Webstránka", "Prihlásenie", "E-prihláška".

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-013: /pre-institucie – referencie (3 citáty)
**Priorita:** 🟠 High

**Predpoklad:** Stránka /sk/pre-institucie načítaná

**Postup:**
- [ ] 1. Skroluj na sekciu Referencie
- [ ] 2. Spočítaj citáty
- [ ] 3. Prečítaj každý citát
- [ ] 4. Over meno, titul a školu

**Očakávaný výsledok:** 3 citáty od zástupcov škôl. Každý má meno, titul a školu. Text zmysluplný v SK.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-014: /kontakt – kompletné údaje
**Priorita:** 🟡 Medium

**Predpoklad:** Stránka /sk/kontakt načítaná

**Postup:**
- [ ] 1. Prečítaj email
- [ ] 2. Prečítaj telefón
- [ ] 3. Prečítaj adresu
- [ ] 4. Over spoločnosť

**Očakávaný výsledok:** Email: mais@mais.sk. Telefón: +421 915 724 757. Adresa: Dubnica nad Váhom. Spoločnosť: ITernal s.r.o.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-O-015: Orbital animácia – 9 modulov MAIS
**Priorita:** 🟡 Medium

**Predpoklad:** Sekcia Architektúra viditeľná (desktop)

**Postup:**
- [ ] 1. Nájdi orbital animáciu
- [ ] 2. Spočítaj moduly
- [ ] 3. Prečítaj text v strede
- [ ] 4. Over 4 technické detaily pod animáciou

**Očakávaný výsledok:** 9 modulov okolo "MAIS core engine". V strede text "MAIS core engine". Pod animáciou 4 detaily: SSO, databáza, integrácie, zálohy.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 4. Admin testy

### TC-A-001: Login so správnymi credentials
**Priorita:** 🔴 Critical

**Predpoklad:** Poznáš prihlasovacie údaje

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/admin/login
- [ ] 2. Zadaj email: admin@mais.sk
- [ ] 3. Zadaj správne heslo
- [ ] 4. Klikni "Prihlásiť sa"

**Očakávaný výsledok:** Presmeruje na /admin dashboard. Admin rozhranie sa zobrazí s navigačnými sekciami.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-002: Login s nesprávnym heslom
**Priorita:** 🔴 Critical

**Predpoklad:** Admin login stránka otvorená

**Postup:**
- [ ] 1. Zadaj email: admin@mais.sk
- [ ] 2. Zadaj nesprávne heslo (napr. wrongpass99!)
- [ ] 3. Klikni "Prihlásiť sa"

**Očakávaný výsledok:** Login zlyhá. Zobrazí sa chybová správa. URL ostáva /admin/login. Formulár ostáva viditeľný.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-003: Rate limiting – blokovanie po 6 pokusoch
**Priorita:** 🟠 High

**Predpoklad:** Admin login stránka otvorená (testovať na beta)

**Postup:**
- [ ] 1. Zadaj nesprávne heslo 5× v rade
- [ ] 2. Skontroluj správu po 5. pokuse
- [ ] 3. Zadaj nesprávne heslo 6×
- [ ] 4. Skontroluj správu po 6. pokuse

**Očakávaný výsledok:** Po 5 pokusoch: štandardná chyba. Po 6. pokuse: "Príliš veľa pokusov prihlásenia, skúste neskôr."

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-004: Force password change pri prvom prihlásení
**Priorita:** 🔴 Critical

**Predpoklad:** Nový admin účet s mustChangePassword=true, alebo default heslo

**Postup:**
- [ ] 1. Prihlás sa s účtom mustChangePassword=true
- [ ] 2. Sleduj presmerovanie
- [ ] 3. Pokús sa otvoriť /admin priamo bez zmeny hesla

**Očakávaný výsledok:** Automaticky presmeruje na /admin/change-password. Priamy prístup na /admin nie je možný bez zmeny hesla.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-005: Validácia hesla – príliš krátke
**Priorita:** 🟠 High

**Predpoklad:** Stránka /admin/change-password otvorená

**Postup:**
- [ ] 1. Zadaj aktuálne heslo (správne)
- [ ] 2. Nové heslo: "abc"
- [ ] 3. Potvrď: "abc"
- [ ] 4. Klikni Uložiť

**Očakávaný výsledok:** Chyba: "Heslo musí mať aspoň 8 znakov". Heslo sa neuloží. Zostávaš na stránke.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-006: Validácia hesla – chýbajúce typy znakov
**Priorita:** 🟠 High

**Predpoklad:** Stránka /admin/change-password otvorená

**Postup:**
- [ ] 1. Zadaj aktuálne heslo (správne)
- [ ] 2. Nové heslo: "heslo123" (chýba veľké písmeno a špeciálny znak)
- [ ] 3. Klikni Uložiť

**Očakávaný výsledok:** Chyby: "Musí obsahovať veľké písmeno" + "Musí obsahovať špeciálny znak". Heslo neuložené.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-007: Pridanie nového partnera
**Priorita:** 🔴 Critical

**Predpoklad:** Prihlásený do adminu, /admin/partners otvorená

**Postup:**
- [ ] 1. Klikni "Pridať partnera"
- [ ] 2. Vyplň: skratka, plný názov, mesto, URL webu, URL prihlásenia
- [ ] 3. Klikni Uložiť
- [ ] 4. Over v zozname
- [ ] 5. Otvor web a over kartu školy

**Očakávaný výsledok:** Partner sa uloží. V zozname partnerov viditeľný. Na webe (/sk alebo /podpora) sa zobrazí nová karta školy.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-008: Editácia existujúceho partnera
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený do adminu, existuje aspoň 1 partner

**Postup:**
- [ ] 1. V zozname klikni Upraviť na partnerovi
- [ ] 2. Zmeň mestý (pridaj "TEST")
- [ ] 3. Ulož
- [ ] 4. Over zmenu v zozname
- [ ] 5. Otvor web a over zmenu

**Očakávaný výsledok:** Zmena sa uloží. Admin zoznam zobrazuje novú hodnotu. Web okamžite zobrazuje zmenu.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-009: Zmazanie partnera
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený do adminu, existuje testovací partner

**Postup:**
- [ ] 1. V zozname klikni Zmazať na testovacím partnerovi
- [ ] 2. Over confirmation dialóg
- [ ] 3. Potvrď zmazanie
- [ ] 4. Over zoznam
- [ ] 5. Otvor web a over

**Očakávaný výsledok:** Confirmation dialóg sa zobrazí. Po potvrdení partner zmizne zo zoznamu. Web kartu školy viac nezobrazuje.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-010: CRUD operácie pre integrácie
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený do adminu

**Postup:**
- [ ] 1. Otvor /admin/integrations
- [ ] 2. Pridaj integráciu (názov "TEST-INTEG", kategória)
- [ ] 3. Over v zozname
- [ ] 4. Uprav ju
- [ ] 5. Zmaž ju
- [ ] 6. Over web

**Očakávaný výsledok:** Integrácia sa pridá, upraví a zmaže. Web v sekcii Integrácie reflektuje každú zmenu.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-011: CRUD operácie pre referencie
**Priorita:** 🟡 Medium

**Predpoklad:** Prihlásený do adminu

**Postup:**
- [ ] 1. Otvor /admin/testimonials
- [ ] 2. Pridaj referenciu (citát, meno, titul, škola)
- [ ] 3. Over v zozname
- [ ] 4. Uprav ju
- [ ] 5. Zmaž ju
- [ ] 6. Over /pre-institucie

**Očakávaný výsledok:** Referencia sa pridá, upraví a zmaže. Sekcia Referencie na /pre-institucie reflektuje zmeny.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-012: Root admin pridáva nového správcu
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený ako root admin (sekcia Správcovia viditeľná)

**Postup:**
- [ ] 1. Otvor /admin/users
- [ ] 2. Klikni Pridať správcu
- [ ] 3. Zadaj email nového správcu a heslo
- [ ] 4. Ulož
- [ ] 5. Over v zozname

**Očakávaný výsledok:** Nový správca vytvorený. Viditeľný v zozname používateľov s rolou "správca".

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-013: Non-root správca nevidí sekciu Správcovia
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený ako non-root správca

**Postup:**
- [ ] 1. Prihlás sa ako non-root správca
- [ ] 2. Pozri sidebar admin rozhrania
- [ ] 3. Hľadaj sekciu "Správcovia" alebo "Používatelia"

**Očakávaný výsledok:** Sekcia Správcovia NIE JE viditeľná v sidebar. Non-root nemá prístup k správe účtov.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-014: Audit log zaznamenáva admin akcie
**Priorita:** 🟡 Medium

**Predpoklad:** Prihlásený ako root admin

**Postup:**
- [ ] 1. Vykonaj akciu: uprav partnera
- [ ] 2. Otvor /admin/audit
- [ ] 3. Nájdi záznam akcie
- [ ] 4. Over: akcia, email, čas

**Očakávaný výsledok:** Audit log zobrazuje záznam. Správna akcia, email administrátora a čas. Zoradené od najnovšieho.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-A-015: Session expirácia po dlhej inaktivite
**Priorita:** 🟡 Medium

**Predpoklad:** Prihlásený do adminu (admin session trvá 4 h)

**Postup:**
- [ ] 1. Prihláš sa do adminu
- [ ] 2. Počkaj 4+ hodiny bez aktivity (alebo manuálne expiruj cookie v DevTools)
- [ ] 3. Pokús sa vykonať akciu alebo načítaj /admin

**Očakávaný výsledok:** Session je expirovaná. Presmeruje na /admin/login. Chráneného obsahu nie je možné dostať sa bez opätovného prihlásenia.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 5. Content CMS testy

### TC-C-001: Otvorenie /admin/sections – prehľad sekcií
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený do adminu

**Postup:**
- [ ] 1. Klikni "Sekcie" alebo "Obsah webu" v admin navbare
- [ ] 2. Over počet dlaždíc
- [ ] 3. Over popis každej dlaždice

**Očakávaný výsledok:** 4 dlaždice: Homepage, Pre inštitúcie, Podpora, Footer & Kontakt. Každá ukazuje počet skupín a polí.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-002: Editácia hero.title1 SK
**Priorita:** 🔴 Critical

**Predpoklad:** Prihlásený, /admin/sections/homepage otvorená, záložka SK

**Postup:**
- [ ] 1. Nájdi skupinu "Hero"
- [ ] 2. Klikni na pole "hero.title1"
- [ ] 3. Vymaž obsah a napíš "TEST NADPIS"
- [ ] 4. Sleduj status indikátor
- [ ] 5. Klikni "Uložiť skupinu"

**Očakávaný výsledok:** Po zmene: status "neuložené". Po uložení: status "upravené v DB". Toast "Uložené ✓" zelený.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-003: CMS zmena sa prejaví na webe
**Priorita:** 🔴 Critical

**Predpoklad:** TC-C-002 dokončený – hero.title1 SK zmenený na "TEST NADPIS"

**Postup:**
- [ ] 1. Otvor novú záložku prehliadača
- [ ] 2. Otvor https://www.mais.sk/sk
- [ ] 3. Prečítaj hero nadpis

**Očakávaný výsledok:** Hero nadpis zobrazuje "TEST NADPIS". Nie pôvodnú hodnotu z messages.json.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-004: Reset textu na pôvodnú hodnotu
**Priorita:** 🟠 High

**Predpoklad:** TC-C-002 dokončený – pole hero.title1 SK je zmenené

**Postup:**
- [ ] 1. Nájdi zmenené pole v admin
- [ ] 2. Klikni "Reset" pri danom poli
- [ ] 3. Over status poľa
- [ ] 4. Ulož skupinu
- [ ] 5. Otvor web a over nadpis

**Očakávaný výsledok:** Po resete: status "pôvodné". Text = pôvodná hodnota z messages.json. Web zobrazuje pôvodnú hodnotu.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-005: Editácia textu v iných jazykoch (EN)
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený, /admin/sections/homepage otvorená

**Postup:**
- [ ] 1. Prepni záložku na "EN"
- [ ] 2. Nájdi pole hero.title1
- [ ] 3. Zmeň na "TEST EN HEADING"
- [ ] 4. Ulož
- [ ] 5. Otvor /en na webe
- [ ] 6. Otvor /sk a over že SK sa nezmenilo

**Očakávaný výsledok:** Zmena viditeľná len na /en. SK, UK, HU zostávajú nezmenené.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-006: Status indikátory – hierarchia
**Priorita:** 🟡 Medium

**Predpoklad:** Prihlásený, sekcia homepage otvorená

**Postup:**
- [ ] 1. Over status poľa bez zmeny (= "pôvodné")
- [ ] 2. Zmeň hodnotu → status = "neuložené"
- [ ] 3. Ulož → status = "upravené v DB"
- [ ] 4. Over status skupiny a dlaždice stránky

**Očakávaný výsledok:** Status propaguje hierarchicky: pole → skupina → stránka. Každý level odráža reálny stav.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-007: Multi-field save (viacero polí naraz)
**Priorita:** 🟡 Medium

**Predpoklad:** Prihlásený, sekcia homepage otvorená

**Postup:**
- [ ] 1. Zmeň 3 rôzne polia v jednej skupine
- [ ] 2. Klikni raz "Uložiť skupinu"
- [ ] 3. Over toast
- [ ] 4. Over status všetkých 3 polí

**Očakávaný výsledok:** Všetky 3 polia uložené jednou akciou. Toast "Uložené ✓". Status každého = "upravené v DB".

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-008: Dlhý text nepokazí layout webu
**Priorita:** 🟢 Low

**Predpoklad:** Prihlásený do adminu

**Postup:**
- [ ] 1. Do CMS poľa zadaj text dlhší ako 300 znakov
- [ ] 2. Ulož
- [ ] 3. Otvor web na desktop (1366 px) a mobile (375 px)
- [ ] 4. Over layout

**Očakávaný výsledok:** Layout sa nepokazí. Text je zabalený alebo skrátený. Žiadny overflow mimo kontajnera.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-009: Špeciálne znaky v CMS texte
**Priorita:** 🟡 Medium

**Predpoklad:** Prihlásený do adminu

**Postup:**
- [ ] 1. Do CMS poľa zadaj: & < > " ' a emoji 🎓
- [ ] 2. Ulož
- [ ] 3. Otvor web a over zobrazenie
- [ ] 4. Over DevTools Console – žiadna JS chyba

**Očakávaný výsledok:** Špeciálne znaky zobrazené správne (& ako &, < ako <). Emoji viditeľné. Žiadna JS chyba.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-C-010: Toast notifikácie pri ukladaní a resetovaní
**Priorita:** 🟢 Low

**Predpoklad:** Prihlásený, CMS zmena pripravená na uloženie

**Postup:**
- [ ] 1. Klikni "Uložiť skupinu"
- [ ] 2. Over toast správu a farbu
- [ ] 3. Počkaj kým zmizne
- [ ] 4. Klikni "Reset" na poli
- [ ] 5. Over toast

**Očakávaný výsledok:** Uloženie: zelený toast "Uložené ✓", automaticky zmizne. Reset: toast s informáciou. Žiadne toast prekrývanie.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 6. SEO testy

### TC-S-001: robots.txt – obsah a pravidlá
**Priorita:** 🟠 High

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/robots.txt
- [ ] 2. Over Allow pravidlá
- [ ] 3. Over Disallow pravidlá
- [ ] 4. Over sitemap link
- [ ] 5. Over GPTBot pravidlo

**Očakávaný výsledok:** Allow: /sk, /en, /uk, /hu, /skoly. Disallow: /admin, /api. Sitemap link prítomný. GPTBot Disallow: /.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-S-002: sitemap.xml – 12 URL so hreflang
**Priorita:** 🟠 High

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sitemap.xml
- [ ] 2. Spočítaj <url> elementy
- [ ] 3. Over hreflang alternates v každom URL
- [ ] 4. Over lastmod dátum

**Očakávaný výsledok:** 12 URL (4 jazyky × 3 stránky). Každé URL má 4 hreflang alternáty + x-default. Lastmod prítomný.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-S-003: Hreflang tagy v <head>
**Priorita:** 🟠 High

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sk
- [ ] 2. Ctrl+U (View source)
- [ ] 3. Hľadaj: <link rel="alternate" hreflang=
- [ ] 4. Spočítaj a over hodnoty href

**Očakávaný výsledok:** 5 hreflang tagov: hreflang="sk", "en", "uk", "hu", "x-default". Každý s korektnou URL.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-S-004: Meta title a description lokalizované
**Priorita:** 🟠 High

**Predpoklad:** Web dostupný v 4 jazykoch

**Postup:**
- [ ] 1. Otvor /sk → DevTools → Elements → hľadaj <title>
- [ ] 2. Opakuj pre /hu
- [ ] 3. Over description tag pre oba jazyky

**Očakávaný výsledok:** /sk: title a description v slovenčine. /hu: title a description v maďarčine. Každý jazyk má unikátny obsah.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-S-005: OG image dynamický endpoint
**Priorita:** 🟡 Medium

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sk/opengraph-image
- [ ] 2. Over Content-Type odpovede
- [ ] 3. Over rozmery obrázka

**Očakávaný výsledok:** Server vracia PNG obrázok. Content-Type: image/png. Rozmer 1200 × 630 px.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-S-006: JSON-LD structured data
**Priorita:** 🟠 High

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sk
- [ ] 2. Ctrl+U (View source)
- [ ] 3. Hľadaj <script type="application/ld+json">
- [ ] 4. Skontroluj @type hodnotu

**Očakávaný výsledok:** <script type="application/ld+json"> prítomný. @type: Organization a/alebo SoftwareApplication. name, url, description vyplnené.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-S-007: Admin stránky – noindex
**Priorita:** 🟠 High

**Predpoklad:** DevTools dostupné

**Postup:**
- [ ] 1. DevTools → Network tab
- [ ] 2. Načítaj /admin/login
- [ ] 3. Klikni na HTML dokument požiadavku
- [ ] 4. Pozri Response Headers

**Očakávaný výsledok:** Header X-Robots-Tag: noindex, nofollow, noarchive prítomný v odpovedi /admin stránok.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-S-008: Canonical URL v <head>
**Priorita:** 🟡 Medium

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sk
- [ ] 2. Ctrl+U (View source)
- [ ] 3. Hľadaj <link rel="canonical"
- [ ] 4. Over hodnotu href

**Očakávaný výsledok:** <link rel="canonical" href="https://www.mais.sk/sk"> prítomný. URL súhlasí s aktuálnou stránkou.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 7. Security testy

### TC-SEC-001: Security headers na verejných stránkach
**Priorita:** 🟠 High

**Predpoklad:** DevTools dostupné

**Postup:**
- [ ] 1. DevTools → Network tab
- [ ] 2. Načítaj /sk
- [ ] 3. Klikni na HTML dokument v Network
- [ ] 4. Pozri Response Headers
- [ ] 5. Hľadaj bezpečnostné hlavičky

**Očakávaný výsledok:** Prítomné: Strict-Transport-Security, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-SEC-002: Admin no-cache hlavičky
**Priorita:** 🟠 High

**Predpoklad:** Admin dostupný, DevTools otvorené

**Postup:**
- [ ] 1. DevTools → Network tab
- [ ] 2. Načítaj /admin/login
- [ ] 3. Klikni na HTML dokument
- [ ] 4. Over Cache-Control header

**Očakávaný výsledok:** Cache-Control: no-store, no-cache, must-revalidate prítomný na /admin stránkach.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-SEC-003: Admin X-Robots-Tag noindex v HTTP odpovedi
**Priorita:** 🟠 High

**Predpoklad:** DevTools dostupné

**Postup:**
- [ ] 1. DevTools → Network tab
- [ ] 2. Načítaj /admin alebo /admin/login
- [ ] 3. Pozri Response Headers

**Očakávaný výsledok:** X-Robots-Tag: noindex, nofollow, noarchive prítomný v HTTP odpovedi /admin ciest.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-SEC-004: HTTPS redirect (HTTP → HTTPS)
**Priorita:** 🟡 Medium

**Predpoklad:** Produkčný server mais.sk je aktívny

**Postup:**
- [ ] 1. Zadaj do prehliadača: http://www.mais.sk
- [ ] 2. Sleduj presmerovanie
- [ ] 3. Over finálnu URL

**Očakávaný výsledok:** Automaticky presmeruje na https://www.mais.sk. URL sa zmení na HTTPS. Žiadne bezpečnostné varovania.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-SEC-005: Brute force – blokovanie po 6 pokusoch
**Priorita:** 🟠 High

**Predpoklad:** Admin login dostupný (testovať na beta, nie produkcia)

**Postup:**
- [ ] 1. Otvor /admin/login
- [ ] 2. Zadaj nesprávne heslo 5×
- [ ] 3. Over správu po 5. pokuse
- [ ] 4. Zadaj nesprávne heslo 6×
- [ ] 5. Over správu

**Očakávaný výsledok:** Prvých 5 pokusov: štandardná chybová správa. Po 6. pokuse: správa o blokovaní. IP zablokovaná.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-SEC-006: SQL injection – odolnosť login formulára
**Priorita:** 🟡 Medium

**Predpoklad:** Admin login stránka otvorená

**Postup:**
- [ ] 1. Email: admin' OR '1'='1
- [ ] 2. Heslo: anything123!
- [ ] 3. Odošli formulár
- [ ] 4. Over odpoveď

**Očakávaný výsledok:** Login zlyhá normálne (nesprávne credentials). Žiadna DB chyba ani neočakávaná odpoveď. App ostáva stabilná.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-SEC-007: XSS ochrana v CMS poliach
**Priorita:** 🟠 High

**Predpoklad:** Prihlásený do adminu, /admin/sections otvorená

**Postup:**
- [ ] 1. Do CMS textového poľa zadaj: <script>alert('XSS')</script>
- [ ] 2. Ulož
- [ ] 3. Otvor web v novom tabe
- [ ] 4. Sleduj či sa spustí alert

**Očakávaný výsledok:** Alert sa NESPUSTÍ. Text je zobrazený ako čistý text alebo je escapenutý. Žiadne JavaScript execution.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 8. Lokalizácia testy

### TC-L-001: Auto-detekcia maďarského jazyka prehliadača
**Priorita:** 🟠 High

**Predpoklad:** Chrome prehliadač, NEXT_LOCALE cookie neexistuje

**Postup:**
- [ ] 1. Chrome → Nastavenia → Jazyky → Pridaj Hungarian (hu) ako primárny
- [ ] 2. Otvor nové inkognito okno
- [ ] 3. Otvor https://www.mais.sk/
- [ ] 4. Over URL presmerovanie

**Očakávaný výsledok:** Automaticky presmeruje na /hu. Stránka sa zobrazí v maďarčine.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-L-002: Cookie persistence – zachovanie jazykovej voľby
**Priorita:** 🟡 Medium

**Predpoklad:** Web otvorený v prehliadači

**Postup:**
- [ ] 1. Klikni SK v prepínači
- [ ] 2. DevTools → Application → Cookies → mais.sk
- [ ] 3. Nájdi NEXT_LOCALE cookie
- [ ] 4. Zavri a znova otvor prehliadač
- [ ] 5. Otvor mais.sk

**Očakávaný výsledok:** NEXT_LOCALE=sk cookie nastavená. Pri ďalšej návšteve sa načíta /sk bez ohľadu na jazyk prehliadača.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-L-003: Fallback na SK pre nepodporovaný jazyk
**Priorita:** 🟡 Medium

**Predpoklad:** Chrome prehliadač

**Postup:**
- [ ] 1. Chrome → Nastavenia → Jazyky → Nastav German (de) ako primárny
- [ ] 2. Vymaž NEXT_LOCALE cookie
- [ ] 3. Otvor mais.sk v inkognito okne

**Očakávaný výsledok:** Presmeruje na /sk (fallback). Stránka sa zobrazí v slovenčine.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-L-004: Prepínanie jazyka zachováva podstránku
**Priorita:** 🟡 Medium

**Predpoklad:** Aktuálna URL je /sk/podpora

**Postup:**
- [ ] 1. Otvor /sk/podpora
- [ ] 2. Klikni EN v prepínači
- [ ] 3. Over URL

**Očakávaný výsledok:** URL sa zmení na /en/podpora. Zostaneš na stránke /podpora. Nie presmerovaný na homepage.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-L-005: URL prefix pre všetky 4 jazyky a podstránky
**Priorita:** 🟠 High

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Over /sk, /en, /uk, /hu (hlavná)
- [ ] 2. Over /sk/podpora, /en/podpora, /uk/podpora, /hu/podpora
- [ ] 3. Over /sk/pre-institucie pre každý jazyk

**Očakávaný výsledok:** Každý jazyk má prefix /sk/, /en/, /uk/, /hu/. Všetky kombinácie jazyk+stránka fungujú a vracajú 200.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 9. Edge Cases

### TC-E-001: 404 stránka pre neexistujúce URL
**Priorita:** 🟠 High

**Predpoklad:** Web dostupný

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sk/neexistujuca-stranka-xyz
- [ ] 2. Over HTTP status (F12 → Network)
- [ ] 3. Over obsah stránky
- [ ] 4. Klikni na link späť na homepage

**Očakávaný výsledok:** 404 stránka sa zobrazí. HTTP status 404. Obsahuje odkaz na homepage. Navbar funkčný.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-E-002: Prázdny formulár – validácia povinných polí
**Priorita:** 🟡 Medium

**Predpoklad:** Prihlásený do adminu, /admin/partners otvorená

**Postup:**
- [ ] 1. Klikni Pridať partnera
- [ ] 2. Nič nevyplňuj
- [ ] 3. Klikni Uložiť

**Očakávaný výsledok:** Validačné chyby sa zobrazia pri povinných poliach. Formulár sa neodošle. Žiadne prázdne záznamy v DB.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-E-003: Veľmi dlhý text nepokazí layout
**Priorita:** 🟢 Low

**Predpoklad:** Prihlásený do adminu

**Postup:**
- [ ] 1. Do CMS poľa zadaj text dlhší ako 500 znakov
- [ ] 2. Ulož
- [ ] 3. Otvor web na desktop (1366 px)
- [ ] 4. Otvor web na mobile (375 px)
- [ ] 5. Skontroluj overflow

**Očakávaný výsledok:** Layout sa nepokazí na žiadnom breakpointe. Žiadny horizontal overflow. Text zabalený alebo skrátený.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-E-004: Špeciálne a medzinárodné znaky v texte
**Priorita:** 🟡 Medium

**Predpoklad:** Prehliadač s podporou UTF-8

**Postup:**
- [ ] 1. Otvor /uk a over zobrazenie kyriliky
- [ ] 2. Otvor /hu a over maďarské znaky (ő, ű, á)
- [ ] 3. Over adresu mais@mais.sk
- [ ] 4. Skontroluj DevTools Console – žiadne kódovacie chyby

**Očakávaný výsledok:** Všetky špeciálne znaky zobrazené správne. Žiadne "?" alebo rámčeky namiesto znakov.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-E-005: Načítanie pri pomalom pripojení (Slow 3G)
**Priorita:** 🟢 Low

**Predpoklad:** Chrome DevTools dostupné

**Postup:**
- [ ] 1. F12 → Network → Throttle: Slow 3G
- [ ] 2. Načítaj hlavnú stránku (Ctrl+Shift+R)
- [ ] 3. Sleduj loading state
- [ ] 4. Over že stránka sa načíta
- [ ] 5. Over DevTools Console

**Očakávaný výsledok:** Stránka sa načíta aj pri Slow 3G. Kľúčový obsah viditeľný po načítaní. Žiadne JS chyby.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

## 10. Performance testy

### TC-P-001: Lighthouse Desktop – skóre
**Priorita:** 🟠 High

**Predpoklad:** Chrome, produkčný web alebo beta (nie localhost)

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sk
- [ ] 2. F12 → Lighthouse tab
- [ ] 3. Vyber Desktop
- [ ] 4. Klikni Analyze page load
- [ ] 5. Zapíš všetky 4 skóre

**Očakávaný výsledok:** Performance ≥ 90. Accessibility ≥ 95. Best Practices ≥ 90. SEO ≥ 95.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-P-002: Lighthouse Mobile – skóre
**Priorita:** 🟠 High

**Predpoklad:** Chrome, produkčný web alebo beta

**Postup:**
- [ ] 1. Otvor https://www.mais.sk/sk
- [ ] 2. F12 → Lighthouse tab
- [ ] 3. Vyber Mobile
- [ ] 4. Klikni Analyze page load
- [ ] 5. Zapíš skóre

**Očakávaný výsledok:** Performance ≥ 75. Accessibility ≥ 95. Best Practices ≥ 90. SEO ≥ 95.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-P-003: First Contentful Paint (FCP) < 1.5 s
**Priorita:** 🟡 Medium

**Predpoklad:** Lighthouse Desktop spustené

**Postup:**
- [ ] 1. Spusti Lighthouse Desktop
- [ ] 2. Nájdi metriku FCP (First Contentful Paint)

**Očakávaný výsledok:** FCP < 1.5 s na desktop. Prvý text alebo obrázok viditeľný rýchlo po načítaní.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-P-004: Total Blocking Time (TBT) < 300 ms
**Priorita:** 🟡 Medium

**Predpoklad:** Lighthouse Desktop spustené

**Postup:**
- [ ] 1. Spusti Lighthouse Desktop
- [ ] 2. Nájdi metriku TBT (Total Blocking Time)

**Očakávaný výsledok:** Total Blocking Time < 300 ms. Stránka je interaktívna rýchlo po načítaní.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---

### TC-P-005: Bundle size JS < 500 KB compressed
**Priorita:** 🟢 Low

**Predpoklad:** Chrome DevTools, produkčný build

**Postup:**
- [ ] 1. F12 → Network tab
- [ ] 2. Načítaj stránku (Ctrl+Shift+R)
- [ ] 3. Filter: JS
- [ ] 4. Pozri stĺpec Transferred
- [ ] 5. Spočítaj celkovú veľkosť

**Očakávaný výsledok:** Celková veľkosť JS súborov (Transferred = compressed) < 500 KB. Žiadny extrémne veľký bundle.

**Skutočný výsledok:** _(vyplní tester)_

**Stav:** `Pass` / `Fail` / `Blocked` / `N/A`

---
