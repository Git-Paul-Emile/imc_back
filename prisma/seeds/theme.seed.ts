import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des thèmes...');

  const themes = [
    {
      titre: 'Climat social et bien-être organisationnel',
    },
    {
      titre: 'Leadership et gouvernance managériale',
    },
    {
      titre: 'Performance et engagement des équipes',
    },
    {
      titre: 'Organisation et efficacité opérationnelle',
    },
    {
      titre: 'Développement des talents et compétences',
    },
  ];

  for (const theme of themes) {
    const existingTheme = await prisma.theme.findFirst({
      where: { titre: theme.titre },
    });

    if (!existingTheme) {
      await prisma.theme.create({
        data: theme,
      });
      console.log(`✅ Thème créé : ${theme.titre}`);
    } else {
      console.log(`⚠️ Thème déjà existant : ${theme.titre}`);
    }
  }

  console.log('🌱 Seeding des thèmes terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
