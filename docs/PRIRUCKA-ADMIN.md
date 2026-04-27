# Príručka administrátora MAIS webu

> Táto príručka je pre každého, kto spravuje obsah webu MAIS cez administrátorské rozhranie. Nevyžaduje žiadne programátorské znalosti – vysvetľuje presne čo kliknúť, vyplniť a uložiť.

---

## Obsah

1. [Prihlásenie](#1-prihlásenie)
2. [Prehľad dashboard](#2-prehľad-dashboard)
3. [Správa partnerov (škôl)](#3-správa-partnerov-škôl)
4. [Správa integrácií](#4-správa-integrácií)
5. [Správa referencií](#5-správa-referencií)
6. [Sekcie webu – editácia textov](#6-sekcie-webu--editácia-textov)
7. [Správcovia (len root admin)](#7-správcovia-len-root-admin)
8. [Audit log (len root admin)](#8-audit-log-len-root-admin)
9. [Bezpečnosť a prihlásenie](#9-bezpečnosť-a-prihlásenie)

---

## 1. Prihlásenie

**Adresa admina:**
- Testovanie: `maisweb-beta.vercel.app/admin/login`
- Po spustení na ostrú doménu: `mais.sk/admin/login`

*[Screenshot: prihlasovacie okno s poľami Email a Heslo]*

### Prvé prihlásenie

Pri prvom prihlásení ťa systém automaticky presmeruje na stránku na zmenu hesla. Toto sa stane vždy pri novom účte. Starý účet si zmenu hesla nevyžaduje, pokiaľ ho admin nevynútil.

**Heslá pri inštalácii systému (zmeň ich!)**

| Email | Heslo | Typ |
|---|---|---|
| `admin@mais.sk` | `admin123` | Štandardný admin |
| `martin.stacho@gmail.com` | `changeme123` | Root admin |

> ⚠️ **Dôležité:** Tieto heslá slúžia len pri prvom spustení. Po prvom prihlásení systém vyzve na zmenu hesla a tieto predvolené heslá prestanú fungovať.

### Požiadavky na heslo

Nové heslo musí spĺňať všetky tieto pravidlá (systém ťa upozorní ak niečo chýba):
- Aspoň **8 znakov**
- Aspoň jedno **veľké písmeno** (A–Z)
- Aspoň jedno **malé písmeno** (a–z)
- Aspoň jedno **číslo** (0–9)
- Aspoň jeden **špeciálny znak** (napr. `!`, `@`, `#`, `_`, `-`)

Príklad silného hesla: `Mais2024!` alebo `ITernal@web`

---

## 2. Prehľad dashboard

Po prihlásení vidíš hlavnú obrazovku (dashboard).

*[Screenshot: dashboard s kartami a číslami]*

**Čo vidíš:**

- **Štatistiky** – počet partnerov, integrácií a referencií aktuálne v databáze
- **Karta Sekcie webu** – rýchly prístup na editáciu textov
- **Rýchle akcie** – tlačidlá na pridanie partnera, integrácie, referencie a ďalšie

**Navigácia v hornej lište:**

| Položka | Čo tam nájdeš |
|---|---|
| Partneri | Správa 9 partnerských škôl |
| Integrácie | Správa 29 systémových integrácií |
| Referencie | Správa citátov od škôl |
| Sekcie | Editácia textov na webe |
| Správcovia | Správa admin účtov *(len root admin)* |
| Audit log | Záznam aktivít *(len root admin)* |
| Zobraziť web | Otvorí verejný web v novom tabe |

---

## 3. Správa partnerov (škôl)

Partneri sú 9 škôl, ktoré používajú systém MAIS. Zobrazujú sa na viacerých miestach webu: v bežiacom páse, v sekcii Školy na hlavnej stránke, aj na stránke /podpora.

### Ako pridať novú školu

1. V navigácii klikni na **Partneri**
2. Klikni na tlačidlo **Pridať partnera**
3. Vyplň formulár:

| Pole | Čo sem patrí | Príklad |
|---|---|---|
| Skratka | Krátky identifikátor školy | `TUKE` |
| Plný názov | Oficiálny názov inštitúcie | `Technická univerzita v Košiciach` |
| Mesto | Sídlo školy | `Košice` |
| Web URL | Hlavná webstránka školy | `https://www.tuke.sk` |
| Login URL | Kam presmerujeme študenta keď klikne „Neviem sa prihlásiť" | `https://mais.tuke.sk/...` |
| Application URL | Odkaz na online prihlášku (e-prihláška) | `https://eprihlaska.tuke.sk/` |
| Poradie | Číslo 1–9, určuje poradie v zoznamoch | `1` |
| Aktívna | Zaškrtnutím zobrazíš školu na webe; odškrtnutím skryješ bez vymazania | ✓ |

4. Klikni **Uložiť**

*[Screenshot: formulár na pridanie partnera]*

> **Tip:** Pole „Login URL" môže byť aj emailová adresa (napr. `mailto:mais@skola.sk`) – vtedy sa pri kliknutí otvorí emailový klient. Ak škola má PDF návod, daj tam odkaz na PDF.

### Ako upraviť existujúcu školu

1. Klikni na **Partneri** v navigácii
2. V zozname klikni na školu, ktorú chceš upraviť
3. Zmeň čo potrebuješ
4. Klikni **Uložiť**

### Ako dočasne skryť školu (bez vymazania)

1. Otvor editáciu školy
2. Odškrtni políčko **Aktívna**
3. Klikni **Uložiť**

Škola zmizne z webu, ale ostane v databáze. Kedykoľvek ju môžeš znova zapnúť.

### Ako vymazať školu

1. Otvor editáciu školy
2. Klikni na tlačidlo **Zmazať**
3. Potvrď zmazanie

> ⚠️ **Pozor:** Vymazanie je trvalé a nedá sa vrátiť späť. Ak si nie si istý/á, radšej školu len deaktivuj (odškrtni „Aktívna").

### Čo sa zmení na webe po úprave partnera

Všetky tieto sekcie sa aktualizujú **okamžite** po uložení:
- Bežiaci pás škôl (marquee)
- Sekcia Školy na hlavnej stránke
- Stránka /podpora (helpdesk)
- Stránka /skoly

---

## 4. Správa integrácií

Integrácie sú systémy a aplikácie, s ktorými sa MAIS prepája. Zobrazujú sa v sekcii Integrácie na hlavnej stránke.

### Ako pridať novú integráciu

1. Klikni na **Integrácie** v navigácii
2. Klikni na **Pridať integráciu**
3. Vyplň:
   - **Názov** – napr. `LDAP` alebo `aSc Rozvrhy`
   - **Kategória** – vyber jednu zo 6 možností (viď tabuľku nižšie)
   - **Poradie** – číslo, určuje poradie v rámci kategórie
   - **Aktívna** – zaškrtni ak sa má zobrazovať

**Kategórie integrácií:**

| Kategória | Príklady |
|---|---|
| Identita | LDAP, OAuth2, SSO, IDM |
| Ekonomika | SAP, Štátna pokladnica, Omega, TransCard |
| Štúdium | CRŠ, CVTI, CRZP, PLAGOFF |
| Registratúra | MEMPHIS, Autogram, Podpisuj |
| Externé | aSc Rozvrhy, E-learning, Aleph |
| Mobilné | Android App, iOS App, Push notifikácie |

4. Klikni **Uložiť**

---

## 5. Správa referencií

Referencie sú citáty od zástupcov partnerských škôl. Zobrazujú sa na stránke `/pre-institucie`. Web vždy zobrazí **3 náhodne vybrané** referencie – každá návšteva stránky môže zobraziť iné.

### Ako pridať novú referenciu

1. Klikni na **Referencie** v navigácii
2. Klikni na **Pridať referenciu**
3. Vyplň:
   - **Nadpis** – krátky titulok, napr. `Digitalizácia prijímacieho konania`
   - **Text** – samotný citát (2–4 vety)
   - **Autor** – napr. `IT oddelenie` alebo `Kvestorát`
   - **Škola** – vyber z rozbaľovacieho zoznamu
4. Klikni **Uložiť**

> **Tip:** Čím viac referencií máš, tým pestrejšie bude stránka /pre-institucie. Ideálne je mať aspoň 6–9 referencií (po jednej od každej školy).

---

## 6. Sekcie webu – editácia textov

Toto je najdôležitejšia časť admina. Umožňuje ti **meniť texty na celom webe bez pomoci programátora**.

### Čo môžeš editovať

Web obsahuje **106 textových polí** rozdelených do 4 stránok a 18 skupín. Každé pole má **4 jazyky** – SK, EN, UK, HU.

| Stránka | Čo obsahuje |
|---|---|
| Homepage | Hero nadpis, štatistiky, features, architektúra, integrácie, školy, kontakt |
| Pre inštitúcie | Hero, 3 dôvody, bento grid, CTA |
| Podpora | Titulky, popisky, texty na helpdesk stránke |
| Footer & Kontakt | Texty v päte, kontaktné info |

### Ako zmeniť text na webe

1. V navigácii klikni na **Sekcie** (alebo na kartu Sekcie webu na dashboarde)
2. Uvidíš 4 veľké dlaždice – klikni na tú, kde chceš text meniť

*[Screenshot: 4 dlaždice na /admin/sections]*

3. Otvorí sa stránka s rozbaľovacími skupinami (napr. „Hero sekcia", „Štatistiky", „Features")
4. Klikni na názov skupiny – rozbalí sa

*[Screenshot: rozbalená skupina s poľami a 4 jazykmi]*

5. Pri každom poli vidíš 4 záložky: 🇸🇰 SK · 🇬🇧 EN · 🇺🇦 UK · 🇭🇺 HU
6. Klikni na záložku jazyka, klikni do textového poľa a zmeň text
7. Keď text zmeníš, pole dostane **zelený okraj** – to znamená, že zmena ešte nie je uložená
8. Klikni na tlačidlo **Uložiť** vedľa poľa
9. Zobrazí sa zelená hlášková správa „Uložené ✓"
10. Zmena sa **okamžite prejaví na webe** – otvor web v novom tabe a obnov stránku

*[Screenshot: pole so zeleným okrajom a tlačidlom Uložiť]*

### Ako vrátiť text do pôvodného stavu

Pri každom poli, kde si zmenil/a text, sa zobrazí tlačidlo **Reset**. Kliknutím naň sa text vráti do pôvodnej verzie, ktorá je zapísaná v kóde.

> **Poznámka k resetovaniu:** Reset sa prejaví na webe tak isto okamžite.

### Dôležité pravidlá pri editovaní textov

**Vždy uprav všetky 4 jazyky.** Ak zmeníš slovenský text ale zabudneš na angličtinu, ukrajinskí a anglickí návštevníci budú stále vidieť pôvodný text. Výnimkou je ak chceš pre niektorý jazyk zachovať pôvodné znenie.

**Niektoré texty NIE SÚ editovateľné cez Sekcie** – tieto veci môže meniť len programátor:
- Položky v navigácii (Funkcie, Školy, Pre inštitúcie, Podpora, Kontakt) — *plánuje sa sprístupniť*
- Texty v administrátorskom rozhraní
- Skratky škôl (TUKE, TRUNI...) a ich poradia – tie meníš v časti Partneri
- Názvy integrácií – tie meníš v časti Integrácie

### Stavové značky polí

| Stav | Farba | Čo znamená |
|---|---|---|
| Pôvodné | sivá / žiadna | Text je z kódu, nebol upravený |
| Upravené v DB | oranžová/zelená bodka | Text bol zmenený v admine, zobrazuje sa tvoja verzia |

---

## 7. Správcovia (len root admin)

Táto sekcia je viditeľná len pre **root administrátora** (označeného odznakom „Root administrátor"). Umožňuje spravovať prístupy do admina.

*[Screenshot: zoznam správcov s root odznakom]*

### Čo je root admin?

Root admin má rozšírené oprávnenia – môže pridávať a mazať iných správcov, a vidí audit log. Bežný admin tieto možnosti nemá.

### Ako pridať nového správcu

1. Klikni na **Správcovia** v navigácii
2. Klikni na **Pridať správcu**
3. Vyplň email, meno a heslo (nový správca bude vyzvaný na zmenu pri prvom prihlásení)
4. Ak má mať aj root oprávnenia, zaškrtni **Root administrátor**
5. Klikni **Uložiť**

> **Bezpečnostná poistka:** Posledný root admin sa nedá vymazať. Vždy musí ostať aspoň jeden.

### Ako odstrániť správcu

1. Klikni na správcu v zozname
2. Klikni na tlačidlo **Zmazať**
3. Potvrd zmazanie

> Seba samého/samú zmazať nemôžeš.

---

## 8. Audit log (len root admin)

Audit log je záznaman všetkých dôležitých akcií v admine – kto, kedy a čo urobil.

*[Screenshot: tabuľka audit logu s časom, emailom, akciou a IP]*

**Kde ho nájdeš:** Navigácia → Audit log (alebo `maisweb-beta.vercel.app/admin/audit`)

**Čo v ňom vidíš:**
- **Čas** – presný dátum a čas akcie
- **Používateľ** – email správcu, ktorý akciu vykonal
- **Akcia** – čo presne sa stalo (napr. `partner.updated`, `login.failed`)
- **Zdroj** – ktorý záznam bol dotknutý (napr. `partner/tuke`)
- **IP adresa** – z akej IP adresy sa akcia vykonala

**Aké akcie sa zaznamenávajú:**

| Typ akcie | Čo znamená |
|---|---|
| `login.success` | Úspešné prihlásenie |
| `login.failed` | Nesprávné heslo alebo email |
| `login.blocked` | Zablokované prihlásenie po 5 neúspešných pokusoch |
| `partner.created/updated/deleted` | Zmena partnera/školy |
| `integration.*` | Zmena integrácie |
| `testimonial.*` | Zmena referencie |
| `content.updated` | Uložený text cez Sekcie |
| `content.reset` | Text vrátený na pôvodný |
| `user.created/updated/deleted` | Zmena správcu |
| `password.changed` | Zmena hesla |

Audit log zobrazuje **posledných 100 záznamov**.

---

## 9. Bezpečnosť a prihlásenie

### Automatické zablokovanie pri podozrení

Ak niekto zadá nesprávne heslo **5-krát za sebou z tej istej IP adresy**, systém automaticky zablokuje ďalšie pokusy na **15 minút**. Toto chráni pred automatizovanými útokmi (botmi).

Ak si omylom zablokovaný ty sám, počkaj 15 minút a skús znova.

### Automatické odhlásenie

Si automaticky odhlásený/á po **4 hodinách** od prihlásenia. Ak budeš v admine aktívny/á, systém obnoví prihlásenie každú hodinu.

### Admin nie je viditeľný pre Google

Administrátorská časť webu je skrytá pred vyhľadávačmi – Google a iné vyhľadávače ju neindexujú a nezobrazujú vo výsledkoch vyhľadávania.

### Čo robiť ak zabudneš heslo

Kontaktuj root administrátora – ten ti môže nastaviť nové heslo cez Správcovia → úprava účtu.

Ak si zabudol/a heslo ty ako root admin, potrebuješ prístup k serveru – kontaktuj programátora (ITernal s.r.o.).

---

*Dokument: docs/PRIRUCKA-ADMIN.md · Posledná aktualizácia: apríl 2026*
