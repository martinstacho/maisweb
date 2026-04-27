export type ContentFieldType = 'text' | 'textarea' | 'number'

export interface ContentField {
  key: string
  label: string
  type: ContentFieldType
  description?: string
}

export interface ContentGroup {
  id: string
  title: string
  description?: string
  fields: ContentField[]
}

export interface ContentPage {
  id: string
  title: string
  groups: ContentGroup[]
}

export const CONTENT_SCHEMA: ContentPage[] = [
  {
    id: 'homepage',
    title: 'Homepage',
    groups: [
      {
        id: 'homepage-hero',
        title: 'Hero sekcia',
        description: 'Hlavný úvodný blok s nadpisom a CTA tlačidlami',
        fields: [
          { key: 'hero.badge', label: 'Badge nad nadpisom', type: 'text' },
          { key: 'hero.title1', label: 'Nadpis – riadok 1', type: 'text' },
          { key: 'hero.title2', label: 'Nadpis – riadok 2', type: 'text' },
          { key: 'hero.subtitle', label: 'Subtitle pod nadpisom', type: 'textarea' },
          { key: 'hero.ctaPrimary', label: 'CTA tlačidlo – primárne', type: 'text' },
          { key: 'hero.ctaSecondary', label: 'CTA tlačidlo – sekundárne', type: 'text' },
          { key: 'hero.marqueeHeader', label: 'Text v marquee páse', type: 'text', description: 'napr. "Dôverujú nám · 4 univerzity + 5 VŠ"' },
        ],
      },
      {
        id: 'homepage-stats',
        title: 'Štatistiky (4 čísla)',
        description: 'Číselné hodnoty s popismi pod hero sekciou',
        fields: [
          { key: 'stats.years', label: 'Stat 1 – Label', type: 'text' },
          { key: 'stats.yearsSub', label: 'Stat 1 – Sub text', type: 'text' },
          { key: 'stats.institutions', label: 'Stat 2 – Label', type: 'text' },
          { key: 'stats.institutionsSub', label: 'Stat 2 – Sub text', type: 'text' },
          { key: 'stats.users', label: 'Stat 3 – Label', type: 'text' },
          { key: 'stats.usersSub', label: 'Stat 3 – Sub text', type: 'text' },
          { key: 'stats.compatible', label: 'Stat 4 – Label', type: 'text' },
          { key: 'stats.compatibleSub', label: 'Stat 4 – Sub text', type: 'text' },
        ],
      },
      {
        id: 'homepage-features',
        title: 'Features (6 modulov)',
        description: 'Karty s funkciami MAIS',
        fields: [
          { key: 'features.kicker', label: 'Kicker', type: 'text' },
          { key: 'features.titlePre', label: 'Nadpis – prvá časť', type: 'text' },
          { key: 'features.titleGrad', label: 'Nadpis – gradient časť', type: 'text' },
          { key: 'features.title', label: 'Nadpis – tretia časť', type: 'text' },
          { key: 'features.subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'features.studyAgenda', label: 'Karta 1 – Názov', type: 'text' },
          { key: 'features.studyAgendaDesc', label: 'Karta 1 – Popis', type: 'textarea' },
          { key: 'features.eApplication', label: 'Karta 2 – Názov', type: 'text' },
          { key: 'features.eApplicationDesc', label: 'Karta 2 – Popis', type: 'textarea' },
          { key: 'features.security', label: 'Karta 3 – Názov', type: 'text' },
          { key: 'features.securityDesc', label: 'Karta 3 – Popis', type: 'textarea' },
          { key: 'features.performance', label: 'Karta 4 – Názov', type: 'text' },
          { key: 'features.performanceDesc', label: 'Karta 4 – Popis', type: 'textarea' },
          { key: 'features.integrations', label: 'Karta 5 – Názov', type: 'text' },
          { key: 'features.integrationsDesc', label: 'Karta 5 – Popis', type: 'textarea' },
          { key: 'features.modular', label: 'Karta 6 – Názov', type: 'text' },
          { key: 'features.modularDesc', label: 'Karta 6 – Popis', type: 'textarea' },
        ],
      },
      {
        id: 'homepage-architecture',
        title: 'Architektúra',
        fields: [
          { key: 'arch.kicker', label: 'Kicker', type: 'text' },
          { key: 'arch.line1', label: 'Nadpis – riadok 1', type: 'text' },
          { key: 'arch.line2', label: 'Nadpis – riadok 2 (gradient)', type: 'text' },
          { key: 'arch.line3', label: 'Nadpis – riadok 3', type: 'text' },
          { key: 'arch.desc', label: 'Popis', type: 'textarea' },
        ],
      },
      {
        id: 'homepage-integrations',
        title: 'Integrácie sekcia',
        description: 'Texty sekcie – názvy integrácií sa spravujú v sekcii Integrácie',
        fields: [
          { key: 'integrations.kicker', label: 'Kicker', type: 'text' },
          { key: 'integrations.heading1', label: 'Nadpis – prvá časť', type: 'text' },
          { key: 'integrations.heading2', label: 'Nadpis – gradient časť', type: 'text' },
          { key: 'integrations.countLabel', label: 'Label za číslom (napr. "integrácií")', type: 'text' },
          { key: 'integrations.groups.identity', label: 'Skupina – Identita', type: 'text' },
          { key: 'integrations.groups.finance', label: 'Skupina – Ekonomika', type: 'text' },
          { key: 'integrations.groups.study', label: 'Skupina – Štúdium', type: 'text' },
          { key: 'integrations.groups.registry', label: 'Skupina – Registratúra', type: 'text' },
          { key: 'integrations.groups.external', label: 'Skupina – Externé', type: 'text' },
          { key: 'integrations.groups.mobile', label: 'Skupina – Mobilné', type: 'text' },
        ],
      },
      {
        id: 'homepage-schools',
        title: 'Školy / Klienti sekcia',
        description: 'Texty sekcie – jednotliví partneri sa spravujú v sekcii Partneri',
        fields: [
          { key: 'schools.title', label: 'Nadpis', type: 'text' },
          { key: 'schools.subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'schools.studentBadge', label: 'Badge pre študentov', type: 'text' },
          { key: 'schools.studentTitle', label: 'Nadpis pre študentov', type: 'text' },
          { key: 'schools.studentDesc', label: 'Popis pre študentov', type: 'textarea' },
          { key: 'schools.studentCta', label: 'CTA tlačidlo pre študentov', type: 'text' },
        ],
      },
      {
        id: 'homepage-cta',
        title: 'CTA blok (kontakt)',
        fields: [
          { key: 'cta.kicker', label: 'Kicker', type: 'text' },
          { key: 'cta.title', label: 'Nadpis', type: 'text' },
          { key: 'cta.subtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'cta.button', label: 'Tlačidlo', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'institutions',
    title: 'Pre inštitúcie',
    groups: [
      {
        id: 'institutions-hero',
        title: 'Hero',
        fields: [
          { key: 'institutions.heroKicker', label: 'Kicker', type: 'text' },
          { key: 'institutions.heroTitle1', label: 'Nadpis – riadok 1', type: 'text' },
          { key: 'institutions.heroTitle2', label: 'Nadpis – riadok 2 (gradient)', type: 'text' },
          { key: 'institutions.heroSubtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'institutions.ctaDemo', label: 'CTA – Demo tlačidlo', type: 'text' },
          { key: 'institutions.ctaBrochure', label: 'CTA – Brožúra tlačidlo', type: 'text' },
        ],
      },
      {
        id: 'institutions-reasons',
        title: 'Prečo MAIS (tri dôvody)',
        fields: [
          { key: 'institutions.whyKicker', label: 'Kicker', type: 'text' },
          { key: 'institutions.whyTitle', label: 'Hlavný nadpis sekcie', type: 'text' },
          { key: 'institutions.reason1Title', label: 'Dôvod 1 – Názov', type: 'text' },
          { key: 'institutions.reason1Desc', label: 'Dôvod 1 – Popis', type: 'textarea' },
          { key: 'institutions.reason2Title', label: 'Dôvod 2 – Názov', type: 'text' },
          { key: 'institutions.reason2Desc', label: 'Dôvod 2 – Popis', type: 'textarea' },
          { key: 'institutions.reason2Stat', label: 'Dôvod 2 – Číslo', type: 'text' },
          { key: 'institutions.reason2StatLabel', label: 'Dôvod 2 – Popis čísla', type: 'text' },
          { key: 'institutions.reason3Title', label: 'Dôvod 3 – Názov', type: 'text' },
          { key: 'institutions.reason3Desc', label: 'Dôvod 3 – Popis', type: 'textarea' },
          { key: 'institutions.reason3Stat', label: 'Dôvod 3 – Číslo', type: 'text' },
          { key: 'institutions.reason3StatLabel', label: 'Dôvod 3 – Popis čísla', type: 'text' },
        ],
      },
      {
        id: 'institutions-bento',
        title: 'Ekosystém (Bento grid)',
        fields: [
          { key: 'institutions.bentoKicker', label: 'Kicker', type: 'text' },
          { key: 'institutions.bentoTitle', label: 'Nadpis sekcie', type: 'text' },
          { key: 'institutions.bentoSubtitle', label: 'Subtitle', type: 'textarea' },
          { key: 'institutions.agenda', label: 'Karta – Akademická agenda', type: 'text' },
          { key: 'institutions.agendaDesc', label: 'Akademická agenda – popis', type: 'textarea' },
          { key: 'institutions.eapp', label: 'Karta – E-prihláška', type: 'text' },
          { key: 'institutions.eappDesc', label: 'E-prihláška – popis', type: 'textarea' },
        ],
      },
      {
        id: 'institutions-cta',
        title: 'CTA blok',
        fields: [
          { key: 'institutions.ctaKicker', label: 'Kicker', type: 'text' },
          { key: 'institutions.ctaTitle1', label: 'Nadpis – riadok 1', type: 'text' },
          { key: 'institutions.ctaTitle2', label: 'Nadpis – riadok 2 (gradient)', type: 'text' },
          { key: 'institutions.ctaTitle3', label: 'Nadpis – riadok 3', type: 'text' },
          { key: 'institutions.ctaDesc', label: 'Popis', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'support',
    title: 'Podpora',
    groups: [
      {
        id: 'support-hero',
        title: 'Hero',
        fields: [
          { key: 'support.helpdeskBadge', label: 'Helpdesk badge', type: 'text' },
          { key: 'support.maisSupport', label: 'Hlavný nadpis', type: 'text' },
          { key: 'support.findSchoolDesc', label: 'Popis pod nadpisom', type: 'textarea' },
          { key: 'support.activeInstitutions', label: 'Label "aktívnych inštitúcií"', type: 'text' },
          { key: 'support.skipToList', label: 'Tlačidlo – Preskočiť na zoznam', type: 'text' },
        ],
      },
      {
        id: 'support-list',
        title: 'Zoznam škôl',
        fields: [
          { key: 'support.institutionsList', label: 'Kicker "Zoznam inštitúcií"', type: 'text' },
          { key: 'support.selectSchool', label: 'Nadpis "Vyberte svoju školu"', type: 'text' },
          { key: 'support.allHelpdeskOnline', label: 'Badge "Všetky helpdesky online"', type: 'text' },
          { key: 'support.officialWeb', label: 'Akcia – Oficiálny web', type: 'text' },
          { key: 'support.loginIssue', label: 'Akcia – Neviem sa prihlásiť', type: 'text' },
          { key: 'support.eApplication', label: 'Akcia – Podať e-prihlášku', type: 'text' },
        ],
      },
      {
        id: 'support-notfound',
        title: 'Škola nenájdená',
        fields: [
          { key: 'support.notFoundSchool', label: 'Kicker', type: 'text' },
          { key: 'support.contactCentral', label: 'Nadpis', type: 'text' },
          { key: 'support.contactCentralDesc', label: 'Popis', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'footer',
    title: 'Footer & Kontakt',
    groups: [
      {
        id: 'footer-main',
        title: 'Footer',
        fields: [
          { key: 'footer.tagline', label: 'Tagline', type: 'text' },
          { key: 'footer.rights', label: 'Copyright text', type: 'text' },
        ],
      },
      {
        id: 'contact-info',
        title: 'Kontakt info',
        fields: [
          { key: 'contact.supportLine', label: 'Linka podpory – label', type: 'text' },
          { key: 'contact.supportHours', label: 'Hodiny podpory', type: 'text' },
        ],
      },
    ],
  },
]

export function getPageById(id: string): ContentPage | undefined {
  return CONTENT_SCHEMA.find(p => p.id === id)
}

export function getAllFieldKeys(): string[] {
  return CONTENT_SCHEMA.flatMap(p => p.groups.flatMap(g => g.fields.map(f => f.key)))
}
