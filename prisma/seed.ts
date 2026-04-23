import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@mais.sk' },
    update: { name: 'Hlavný administrátor' },
    create: { email: 'admin@mais.sk', name: 'Hlavný administrátor', passwordHash },
  })
  console.log('✓ Admin user: admin@mais.sk / admin123')

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
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
