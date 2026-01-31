import 'dotenv/config';
import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des catégories...');

  // Récupérer tous les thèmes
  const themes = await prisma.theme.findMany();
  
  if (themes.length === 0) {
    console.log('⚠️ Aucun thème trouvé. Veuillez d\'abord exécuter le seed des thèmes.');
    return;
  }

  const categoriesData = [
    // Thème 1: Climat social et bien-être organisationnel
    {
      themeId: themes[0].id,
      titre: 'Relations interprofessionnelles et confiance',
      code: 'A' as const,
    },
    {
      themeId: themes[0].id,
      titre: 'Bien-être et motivation',
      code: 'B' as const,
    },
    {
      themeId: themes[0].id,
      titre: 'Culture et engagement',
      code: 'C' as const,
    },
    // Thème 2: Leadership et gouvernance managériale
    {
      themeId: themes[1].id,
      titre: 'Vision, posture et exemplarité',
      code: 'A' as const,
    },
    {
      themeId: themes[1].id,
      titre: 'Management des équipes',
      code: 'B' as const,
    },
    {
      themeId: themes[1].id,
      titre: 'Communication et prise de décision',
      code: 'C' as const,
    },
    // Thème 3: Performance et engagement des équipes
    {
      themeId: themes[2].id,
      titre: 'Objectifs et pilotage de la performance',
      code: 'A' as const,
    },
    {
      themeId: themes[2].id,
      titre: 'Engagement et responsabilisation',
      code: 'B' as const,
    },
    {
      themeId: themes[2].id,
      titre: 'Reconnaissance et amélioration continue',
      code: 'C' as const,
    },
    // Thème 4: Organisation et efficacité opérationnelle
    {
      themeId: themes[3].id,
      titre: 'Structure et rôles',
      code: 'A' as const,
    },
    {
      themeId: themes[3].id,
      titre: 'Processus et coordination',
      code: 'B' as const,
    },
    {
      themeId: themes[3].id,
      titre: 'Agilité et amélioration continue',
      code: 'C' as const,
    },
    // Thème 5: Développement des talents et compétences
    {
      themeId: themes[4].id,
      titre: 'Identification et gestion des talents',
      code: 'A' as const,
    },
    {
      themeId: themes[4].id,
      titre: 'Formation et développement des compétences',
      code: 'B' as const,
    },
    {
      themeId: themes[4].id,
      titre: 'Évolution professionnelle et fidélisation',
      code: 'C' as const,
    },
  ];

  for (const categorie of categoriesData) {
    const existingCategorie = await prisma.categorie.findFirst({
      where: { 
        titre: categorie.titre,
        themeId: categorie.themeId,
      },
    });

    if (!existingCategorie) {
      await prisma.categorie.create({
        data: categorie,
      });
      console.log(`✅ Catégorie créée : ${categorie.titre}`);
    } else {
      console.log(`⚠️ Catégorie déjà existante : ${categorie.titre}`);
    }
  }

  console.log('🌱 Seeding des catégories terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
