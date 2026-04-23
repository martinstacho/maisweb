export interface PartnerStatic {
  short: string
  mono: string
  name: string
  city: string
  est: number
  accent: string
  web: string
  apply: string
  phone: string
  email: string
}

export const PARTNERS_STATIC: PartnerStatic[] = [
  { short: 'TUKE',  mono: 'TUKE',  name: 'Technická univerzita v Košiciach',                      city: 'Košice',             est: 1952, accent: 'oklch(0.7 0.2 40)',    web: 'https://www.tuke.sk',         apply: 'https://eprihlaska.tuke.sk',              phone: '+421 55 602 2030',  email: 'mais@tuke.sk' },
  { short: 'TRUNI', mono: 'TRUNI', name: 'Trnavská univerzita v Trnave',                          city: 'Trnava',             est: 1992, accent: 'oklch(0.68 0.2 25)',   web: 'https://www.truni.sk',        apply: 'https://eprihlaska.truni.sk',             phone: '+421 33 593 9203',  email: 'mais@truni.sk' },
  { short: 'SZU',   mono: 'SZU',   name: 'Slovenská zdravotnícka univerzita',                     city: 'Bratislava',         est: 2002, accent: 'oklch(0.72 0.17 155)', web: 'https://www.szu.sk',          apply: 'https://www.szu.sk/eprihlaska',           phone: '+421 2 5936 9911',  email: 'mais@szu.sk' },
  { short: 'UNIPO', mono: 'UNIPO', name: 'Prešovská univerzita v Prešove',                        city: 'Prešov',             est: 1997, accent: 'oklch(0.68 0.18 200)', web: 'https://www.unipo.sk',        apply: 'https://eprihlaska.unipo.sk',             phone: '+421 51 756 3111',  email: 'mais@unipo.sk' },
  { short: 'AOS',   mono: 'AOS',   name: 'Akadémia ozbrojených síl gen. M. R. Štefánika',        city: 'Liptovský Mikuláš', est: 2004, accent: 'oklch(0.68 0.14 140)', web: 'https://www.aos.sk',          apply: 'https://www.aos.sk/eprihlaska',           phone: '+421 960 423 803',  email: 'mais@aos.sk' },
  { short: 'APZ',   mono: 'APZ',   name: 'Akadémia Policajného zboru v Bratislave',               city: 'Bratislava',         est: 1992, accent: 'oklch(0.6 0.2 255)',   web: 'https://www.akademiapz.sk',   apply: 'https://www.akademiapz.sk/eprihlaska',    phone: '+421 9610 57003',   email: 'mais@akademiapz.sk' },
  { short: 'BISLA', mono: 'BISLA', name: 'BISLA — Liberal Arts College',                          city: 'Bratislava',         est: 2006, accent: 'oklch(0.75 0.17 85)',   web: 'https://bisla.sk',            apply: 'https://bisla.sk/prihlaska',              phone: '+421 2 5441 7498',  email: 'mais@bisla.sk' },
  { short: 'DTI',   mono: 'DTI',   name: 'Vysoká škola DTI',                                     city: 'Dubnica nad Váhom',  est: 2006, accent: 'oklch(0.68 0.2 15)',    web: 'https://dti.sk',              apply: 'https://dti.sk/eprihlaska',               phone: '+421 42 444 0501',  email: 'mais@dti.sk' },
  { short: 'VŠBM',  mono: 'VŠBM',  name: 'Vysoká škola bezpečnostného manažérstva v Košiciach',  city: 'Košice',             est: 2006, accent: 'oklch(0.7 0.19 300)',   web: 'https://www.vsbm.sk',         apply: 'https://www.vsbm.sk/eprihlaska',          phone: '+421 55 720 5611',  email: 'mais@vsbm.sk' },
]

export function getPartnerStatic(shortName: string): PartnerStatic | undefined {
  return PARTNERS_STATIC.find(p => p.short === shortName)
}

export function monoLetterSize(mono: string): string {
  if (mono.length >= 5) return '18px'
  if (mono.length === 4) return '22px'
  if (mono.length === 3) return '26px'
  return '30px'
}
