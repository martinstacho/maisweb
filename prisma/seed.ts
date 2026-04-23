import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const passwordHash = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@mais.sk' },
    update: { name: 'Hlavný administrátor' },
    create: { email: 'admin@mais.sk', name: 'Hlavný administrátor', passwordHash },
  })
  console.log('✓ Admin user created: admin@mais.sk / admin123')

  // Partners
  const partners = [
    { name: 'Prešovská univerzita v Prešove', shortName: 'UNIPO', logoUrl: '/logos/unipo.svg', websiteUrl: 'https://www.unipo.sk', displayOrder: 1 },
    { name: 'Technická univerzita v Košiciach', shortName: 'TUKE', logoUrl: '/logos/TUKE_fullname_white.svg', websiteUrl: 'https://www.tuke.sk', displayOrder: 2 },
    { name: 'Trnavská univerzita v Trnave', shortName: 'TRUNI', logoUrl: '/logos/truni.svg', websiteUrl: 'https://www.truni.sk', displayOrder: 3 },
    { name: 'Slovenská zdravotnícka univerzita', shortName: 'SZU', logoUrl: '/logos/szu.svg', websiteUrl: 'https://www.szu.sk', displayOrder: 4 },
    { name: 'Dubnické technologické inštitúty', shortName: 'DTI', logoUrl: '/logos/dti.svg', websiteUrl: 'https://www.dti.sk', displayOrder: 5 },
    { name: 'Vysoká škola bezpečnostného manažérstva', shortName: 'VŠBM', logoUrl: '/logos/vsbm.svg', websiteUrl: 'https://www.vsbm.sk', displayOrder: 6 },
    { name: 'Akadémia Policajného zboru v Bratislave', shortName: 'APZ', logoUrl: '/logos/apz.svg', websiteUrl: 'https://www.akademiapz.sk', displayOrder: 7 },
    { name: 'Akadémia ozbrojených síl gen. M. R. Štefánika', shortName: 'AOS', logoUrl: '/logos/aos.svg', websiteUrl: 'https://www.aos.sk', displayOrder: 8 },
  ]

  for (const p of partners) {
    await prisma.partner.upsert({
      where: { id: p.shortName.toLowerCase() },
      update: p,
      create: { id: p.shortName.toLowerCase(), ...p },
    })
  }
  console.log(`✓ ${partners.length} partners seeded`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
