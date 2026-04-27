import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@mais.sk' },
    update: { name: 'Hlavný administrátor' },
    create: { email: 'admin@mais.sk', name: 'Hlavný administrátor', passwordHash, mustChangePassword: true },
  })
  console.log('✓ Admin user: admin@mais.sk / admin123 (mustChangePassword=true)')

  const rootHash = await bcrypt.hash('changeme123', 10)
  await prisma.user.upsert({
    where: { email: 'martin.stacho@gmail.com' },
    update: { isRoot: true },
    create: {
      email: 'martin.stacho@gmail.com',
      name: 'Martin Stacho',
      passwordHash: rootHash,
      isRoot: true,
    },
  })
  console.log('✓ Root admin: martin.stacho@gmail.com / changeme123')

  const partners = [
    {
      id: 'tuke',
      name: 'Technická univerzita v Košiciach',
      shortName: 'TUKE',
      logoUrl: '/logos/TUKE_fullname_white.svg',
      websiteUrl: 'https://www.tuke.sk',
      loginUrl: 'https://mais.tuke.sk/dokumenty/MAIS_prihlasenie.pdf',
      applicationUrl: 'https://eprihlaska.tuke.sk/eprihlaska/',
      city: 'Košice',
      supportPhone: '+421 55 602 2030',
      supportEmail: 'mais@tuke.sk',
      displayOrder: 1,
    },
    {
      id: 'truni',
      name: 'Trnavská univerzita v Trnave',
      shortName: 'TRUNI',
      logoUrl: '/logos/truni.svg',
      websiteUrl: 'https://www.truni.sk',
      loginUrl: 'https://www.truni.sk/sk/mais',
      applicationUrl: 'https://mais.truni.sk/eprihlaska/',
      city: 'Trnava',
      supportPhone: '+421 33 593 9203',
      supportEmail: 'mais@truni.sk',
      displayOrder: 2,
    },
    {
      id: 'szu',
      name: 'Slovenská zdravotnícka univerzita',
      shortName: 'SZU',
      logoUrl: '/logos/szu.svg',
      websiteUrl: 'https://www.szu.sk',
      loginUrl: 'https://www.szu.sk',
      applicationUrl: 'https://mais.szu.sk/eprihlaska/',
      city: 'Bratislava',
      supportPhone: '+421 2 5936 9911',
      supportEmail: 'mais@szu.sk',
      displayOrder: 3,
    },
    {
      id: 'unipo',
      name: 'Prešovská univerzita v Prešove',
      shortName: 'UNIPO',
      logoUrl: '/logos/unipo.svg',
      websiteUrl: 'https://www.unipo.sk',
      loginUrl: 'https://www.unipo.sk/cvtpu/hlavne-sekcie/MAIS/probemy',
      applicationUrl: 'https://mais.unipo.sk/eprihlaska/',
      city: 'Prešov',
      supportPhone: '+421 51 756 3111',
      supportEmail: 'mais@unipo.sk',
      displayOrder: 4,
    },
    {
      id: 'aos',
      name: 'Akadémia ozbrojených síl gen. M. R. Štefánika',
      shortName: 'AOS',
      logoUrl: '/logos/aos.svg',
      websiteUrl: 'https://www.aos.sk',
      loginUrl: 'https://www.aos.sk/?stranky=mais/mais.php',
      applicationUrl: 'https://mais.aos.sk/eprihlaska/',
      city: 'Liptovský Mikuláš',
      supportPhone: '+421 960 423 803',
      supportEmail: 'mais@aos.sk',
      displayOrder: 5,
    },
    {
      id: 'apz',
      name: 'Akadémia Policajného zboru v Bratislave',
      shortName: 'APZ',
      logoUrl: '/logos/apz.svg',
      websiteUrl: 'https://www.akademiapz.sk',
      loginUrl: 'https://www.akademiapz.sk/sluzby/mais/student',
      applicationUrl: 'https://mais.akademiapz.sk/eprihlaska/',
      city: 'Bratislava',
      supportPhone: '+421 9610 57003',
      supportEmail: 'mais@akademiapz.sk',
      displayOrder: 6,
    },
    {
      id: 'bisla',
      name: 'BISLA — Liberal Arts College',
      shortName: 'BISLA',
      logoUrl: '/logos/bisla.jpg',
      websiteUrl: 'https://www.bisla.sk',
      loginUrl: 'https://bisla.sk/support',
      applicationUrl: 'https://bisla.sk/prihlaska',
      city: 'Bratislava',
      supportPhone: '+421 2 5441 7498',
      supportEmail: 'mais@bisla.sk',
      displayOrder: 7,
    },
    {
      id: 'dti',
      name: 'Vysoká škola DTI',
      shortName: 'DTI',
      logoUrl: '/logos/dti.svg',
      websiteUrl: 'https://www.dti.sk',
      loginUrl: 'mailto:mais@dti.sk?subject=MAIS - problém s prihlásením&body=meno a priezvisko:%0Adátum narodenia:%0Apopis problému:',
      applicationUrl: 'https://mais.dti.sk/eprihlaska/',
      city: 'Dubnica nad Váhom',
      supportPhone: '+421 42 444 0501',
      supportEmail: 'mais@dti.sk',
      displayOrder: 8,
    },
    {
      id: 'vsbm',
      name: 'Vysoká škola bezpečnostného manažérstva v Košiciach',
      shortName: 'VŠBM',
      logoUrl: '/logos/vsbm.svg',
      websiteUrl: 'https://www.vsbm.sk',
      loginUrl: 'https://mais.vsbm.sk/student/detailSpravy/2372434.mais',
      applicationUrl: 'https://mais.vsbm.sk/eprihlaska/',
      city: 'Košice',
      supportPhone: '+421 55 720 5611',
      supportEmail: 'mais@vsbm.sk',
      displayOrder: 9,
    },
  ]

  for (const p of partners) {
    await prisma.partner.upsert({
      where: { id: p.id },
      update: p,
      create: { ...p, isActive: true },
    })
  }
  console.log(`✓ ${partners.length} partners seeded`)

  const integrations = [
    { id: 'ldap',       name: 'LDAP',              category: 'identity', displayOrder: 1 },
    { id: 'idm',        name: 'IDM',               category: 'identity', displayOrder: 2 },
    { id: 'oauth2',     name: 'OAuth2',            category: 'identity', displayOrder: 3 },
    { id: 'sso',        name: 'Single Sign-On',    category: 'identity', displayOrder: 4 },
    { id: 'sap',        name: 'SAP',               category: 'finance',  displayOrder: 1 },
    { id: 'statpok',    name: 'Štátna pokladnica', category: 'finance',  displayOrder: 2 },
    { id: 'omega',      name: 'Omega',             category: 'finance',  displayOrder: 3 },
    { id: 'emstud',     name: 'EM Študent',        category: 'finance',  displayOrder: 4 },
    { id: 'transcard',  name: 'TransCard',         category: 'finance',  displayOrder: 5 },
    { id: 'crs',        name: 'CRŠ',              category: 'study',    displayOrder: 1 },
    { id: 'cvti',       name: 'UIPŠ / CVTI',      category: 'study',    displayOrder: 2 },
    { id: 'ezp',        name: 'EZP',              category: 'study',    displayOrder: 3 },
    { id: 'crzp',       name: 'CRZP',             category: 'study',    displayOrder: 4 },
    { id: 'plagoff',    name: 'PLAGOFF',          category: 'study',    displayOrder: 5 },
    { id: 'isois',      name: 'ISOIS',            category: 'study',    displayOrder: 6 },
    { id: 'memphis',    name: 'MEMPHIS',          category: 'registry', displayOrder: 1 },
    { id: 'admis',      name: 'ADMIS',            category: 'registry', displayOrder: 2 },
    { id: 'espis',      name: 'ESPIS',            category: 'registry', displayOrder: 3 },
    { id: 'autogram',   name: 'Autogram',         category: 'registry', displayOrder: 4 },
    { id: 'podpisuj',   name: 'Podpisuj',         category: 'registry', displayOrder: 5 },
    { id: 'prihlaskavs',name: 'PrihláškaVŠ',      category: 'external', displayOrder: 1 },
    { id: 'asc',        name: 'aSc Rozvrhy',      category: 'external', displayOrder: 2 },
    { id: 'elearning',  name: 'E-learning / LMS', category: 'external', displayOrder: 3 },
    { id: 'aleph',      name: 'Aleph',            category: 'external', displayOrder: 4 },
    { id: 'davinci',    name: 'DaVinci',          category: 'external', displayOrder: 5 },
    { id: 'android',    name: 'Android App',      category: 'mobile',   displayOrder: 1 },
    { id: 'ios',        name: 'iOS App',          category: 'mobile',   displayOrder: 2 },
    { id: 'banner',     name: 'Banner systém',    category: 'mobile',   displayOrder: 3 },
    { id: 'push',       name: 'Push notifikácie', category: 'mobile',   displayOrder: 4 },
  ]

  for (const item of integrations) {
    await prisma.integration.upsert({
      where: { id: item.id },
      update: { name: item.name, category: item.category, displayOrder: item.displayOrder },
      create: { ...item, isActive: true },
    })
  }
  console.log(`✓ ${integrations.length} integrations seeded`)

  const testimonials = [
    {
      id: 'test-tuke',
      title: 'Digitalizácia prijímacieho konania',
      text: 'MAIS nám umožnil digitalizovať celé prijímacie konanie. Počet papierových prihlášok klesol na nulu.',
      author: 'IT oddelenie',
      partnerId: 'tuke',
    },
    {
      id: 'test-truni',
      title: 'Hladká implementácia',
      text: 'Implementácia prebehla hladko, podpora ITernalu bola výborná počas celého procesu.',
      author: 'Kvestorát',
      partnerId: 'truni',
    },
    {
      id: 'test-szu',
      title: 'Výkon počas zápisného týždňa',
      text: 'Systém zvládol záťaž zápisného týždňa bez jediného výpadku. 8 000 zápisov za 3 dni.',
      author: 'Správca systému',
      partnerId: 'szu',
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: { title: t.title, text: t.text, author: t.author, partnerId: t.partnerId },
      create: { ...t, isActive: true },
    })
  }
  console.log(`✓ ${testimonials.length} testimonials seeded`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
