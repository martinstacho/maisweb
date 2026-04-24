export const PARTNER_META: Record<string, { accent: string; est: number; name: string }> = {
  'TUKE':  { accent: 'oklch(0.7 0.2 40)',    est: 1952, name: 'Technická univerzita v Košiciach' },
  'TRUNI': { accent: 'oklch(0.68 0.2 25)',   est: 1992, name: 'Trnavská univerzita v Trnave' },
  'SZU':   { accent: 'oklch(0.72 0.17 155)', est: 2002, name: 'Slovenská zdravotnícka univerzita' },
  'UNIPO': { accent: 'oklch(0.68 0.18 200)', est: 1997, name: 'Prešovská univerzita v Prešove' },
  'AOS':   { accent: 'oklch(0.68 0.14 140)', est: 1993, name: 'Akadémia ozbrojených síl gen. M. R. Štefánika' },
  'APZ':   { accent: 'oklch(0.6 0.2 255)',   est: 1992, name: 'Akadémia Policajného zboru v Bratislave' },
  'BISLA': { accent: 'oklch(0.75 0.17 85)',  est: 2006, name: 'BISLA — Liberal Arts College' },
  'DTI':   { accent: 'oklch(0.68 0.2 15)',   est: 2006, name: 'Vysoká škola DTI' },
  'VŠBM':  { accent: 'oklch(0.7 0.19 300)',  est: 2006, name: 'Vysoká škola bezpečnostného manažérstva v Košiciach' },
}

export function monoLetterSize(mono: string): string {
  if (mono.length >= 5) return '18px'
  if (mono.length === 4) return '22px'
  if (mono.length === 3) return '26px'
  return '30px'
}
