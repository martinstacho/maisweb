# Testovanie maisweb

Tento priečinok obsahuje kompletnú sadu test cases pre overenie funkčnosti webu mais.sk a admin rozhrania.

---

## Súbory

| Súbor | Popis |
|---|---|
| `test-cases.xlsx` | Hlavný Excel súbor — filtrovateľný, s automatickými výpočtami |
| `test-cases.md` | Rovnaké testy ako markdown checklist — pre rýchle prejdenie |
| `generate_test_cases.py` | Python skript — regeneruje oba súbory z jedného zdroja dát |

> `test-cases.xlsx` je vygenerovaný súbor. Nie je verzionovaný v gite — generuj ho lokálne skriptom.

---

## Ako testovať

### Postup pri každom testovaní

1. **Stiahni** (alebo generuj) `test-cases.xlsx`
2. Otvor v **MS Excel** alebo **Google Sheets**
3. Pre každý test case:
   - Prečítaj predpoklad — splň ho pred testom
   - Vykonaj kroky v stĺpci **Postup** na webe
   - Zapíš do stĺpca **Skutočný výsledok** čo sa reálne stalo
   - Nastav **Stav**: `Pass` / `Fail` / `Blocked` / `N/A` (dropdown)
   - Doplň **Poznámky** ak je niečo zvláštne
   - Vyplň **Tester** (tvoje meno) a **Dátum**

4. Pri zlyhaní (Fail):
   - Vytvor GitHub Issue s ID testu (napr. `TC-F-003`)
   - Prilož screenshot problému
   - Označ Stav = `Fail` v Exceli

### Priorizácia

Testuj vždy od Critical nadol:

| Priorita | Kedy | Minimálna podmienka nasadenia |
|---|---|---|
| 🔴 **Critical** | Pred každým nasadením | Všetky musia byť Pass |
| 🟠 **High** | Pred release | Väčšina musí byť Pass |
| 🟡 **Medium** | Pravidelne | Plánujú sa opravy |
| 🟢 **Low** | Keď je čas | Nice to have |

---

## Kategórie testov

| Prefix | Kategória | Počet | Čo overuje |
|---|---|---|---|
| TC-F | Funkčné | 20 | Navigácia, tlačidlá, linky, stránky |
| TC-V | Vizuálne | 15 | Rozloženie, animácie, responsive, hover |
| TC-O | Obsahové | 15 | Texty, čísla, školy, kontakty vo všetkých jazykoch |
| TC-A | Admin | 15 | Login, CRUD partnerov/integrácií, používatelia, audit |
| TC-C | Content CMS | 10 | Editácia textov, save/reset, prejavenie na webe |
| TC-S | SEO | 8 | robots.txt, sitemap, hreflang, OG image, JSON-LD |
| TC-SEC | Security | 7 | Headers, rate limiting, XSS, SQL injection, HTTPS |
| TC-L | Lokalizácia | 5 | Auto-detekcia jazyka, cookie, fallback, URL prefix |
| TC-E | Edge Cases | 5 | 404, prázdny formulár, dlhý text, Slow 3G |
| TC-P | Performance | 5 | Lighthouse, FCP, TBT, bundle size |
| | **Celkom** | **105** | |

---

## Regenerácia súborov

Ak chceš aktualizovať test cases alebo opraviť chybu, uprav `generate_test_cases.py` a spusti:

```bash
# Z root adresára repozitára
python3 docs/testing/generate_test_cases.py
```

Vygeneruje sa `test-cases.xlsx` aj `test-cases.md` z rovnakých dát.

**Požiadavky:**
```bash
python3 -m pip install openpyxl
```

---

## Verzovanie výsledkov

Excel súbor nie je v gite (je vygenerovaný). Odporúčaný postup pre tímové zdieľanie výsledkov:

1. Generuj Excel lokálne
2. Po dokončení testovania ulož ako `test-results-YYYY-MM-DD.xlsx`
3. Zdieľaj cez Google Drive alebo prilož k release noticiam

---

*Dokument: docs/testing/README.md · Posledná aktualizácia: apríl 2026*
