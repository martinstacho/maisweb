export const CATEGORY_META: Record<string, { label: string; accent: string }> = {
  identity: { label: 'Identita & Prístup',       accent: 'var(--indigo)' },
  finance:  { label: 'Ekonomika & Financie',     accent: 'var(--amber)'  },
  study:    { label: 'Štúdium & Výskum',         accent: 'var(--mint)'   },
  registry: { label: 'Registratúra & Dokumenty', accent: 'var(--coral)'  },
  external: { label: 'Externé systémy',          accent: 'var(--orange)' },
  mobile:   { label: 'Mobilné & Notifikácie',    accent: 'var(--violet)' },
}

export const CATEGORY_ORDER = ['identity', 'finance', 'study', 'registry', 'external', 'mobile']

export function formatIntegrationCount(count: number): string {
  if (count < 10) return count.toString()
  const decade = Math.floor(count / 10) * 10
  return `${decade}+`
}

export interface IntegrationGroup {
  id: string
  label: string
  accent: string
  chips: string[]
}

export interface IntegrationsApiResponse {
  groups: IntegrationGroup[]
  total: number
  displayCount: number
}
