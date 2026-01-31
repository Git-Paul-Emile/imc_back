import 'dotenv/config';
import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des questions...');

  // Récupérer toutes les catégories
  const categories = await prisma.categorie.findMany({
    include: { theme: true },
  });

  if (categories.length === 0) {
    console.log('⚠️ Aucune catégorie trouvée. Veuillez d\'abord exécuter le seed des catégories.');
    return;
  }

  // Mapper les catégories par leur code et titre de theme
  const getCategoriesByTheme = (themeTitre: string) => {
    return categories.filter((c) => c.theme.titre === themeTitre);
  };

  const questionsData = [
    // Thème 1: Climat social et bien-être organisationnel
    // Catégorie A: Relations interprofessionnelles et confiance
    {
      libelle: 'Les relations entre collaborateurs sont globalement saines et respectueuses.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'A')?.id,
      ordre: 1,
    },
    {
      libelle: 'Les collaborateurs se sentent écoutés par leur hiérarchie.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'A')?.id,
      ordre: 2,
    },
    {
      libelle: 'La confiance est présente entre les équipes et le management.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'A')?.id,
      ordre: 3,
    },
    {
      libelle: 'Les conflits sont gérés de manière constructive.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'A')?.id,
      ordre: 4,
    },
    {
      libelle: 'Le climat social favorise la collaboration plutôt que la compétition négative.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'A')?.id,
      ordre: 5,
    },
    // Catégorie B: Bien-être et motivation
    {
      libelle: 'Les collaborateurs se sentent motivés dans leur travail au quotidien.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'B')?.id,
      ordre: 6,
    },
    {
      libelle: 'Les conditions de travail permettent un bon équilibre entre vie professionnelle et personnelle.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'B')?.id,
      ordre: 7,
    },
    {
      libelle: 'Les efforts et les résultats sont reconnus à leur juste valeur.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'B')?.id,
      ordre: 8,
    },
    {
      libelle: 'Le stress professionnel est maîtrisé dans l\'organisation.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'B')?.id,
      ordre: 9,
    },
    {
      libelle: 'Les collaborateurs se sentent respectés et considérés.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'B')?.id,
      ordre: 10,
    },
    // Catégorie C: Culture et engagement
    {
      libelle: 'Les valeurs de l\'entreprise sont claires et partagées.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'C')?.id,
      ordre: 11,
    },
    {
      libelle: 'Les collaborateurs se sentent fiers d\'appartenir à l\'organisation.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'C')?.id,
      ordre: 12,
    },
    {
      libelle: 'La communication interne est fluide et transparente.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'C')?.id,
      ordre: 13,
    },
    {
      libelle: 'Les différences culturelles, générationnelles ou sociales sont respectées.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'C')?.id,
      ordre: 14,
    },
    {
      libelle: 'L\'entreprise favorise un climat inclusif et équitable.',
      categorieId: getCategoriesByTheme('Climat social et bien-être organisationnel').find(c => c.code === 'C')?.id,
      ordre: 15,
    },

    // Thème 2: Leadership et gouvernance managériale
    // Catégorie A: Vision, posture et exemplarité
    {
      libelle: 'La vision stratégique de l\'entreprise est claire et partagée par les équipes.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'A')?.id,
      ordre: 1,
    },
    {
      libelle: 'Les dirigeants et managers incarnent les valeurs de l\'entreprise.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'A')?.id,
      ordre: 2,
    },
    {
      libelle: 'Les managers font preuve d\'exemplarité dans leurs comportements.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'A')?.id,
      ordre: 3,
    },
    {
      libelle: 'Les décisions managériales sont cohérentes et assumées.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'A')?.id,
      ordre: 4,
    },
    {
      libelle: 'Le leadership favorise la confiance et l\'engagement.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'A')?.id,
      ordre: 5,
    },
    // Catégorie B: Management des équipes
    {
      libelle: 'Les objectifs sont clairement définis et compris par les équipes.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'B')?.id,
      ordre: 6,
    },
    {
      libelle: 'Les managers savent motiver et mobiliser leurs collaborateurs.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'B')?.id,
      ordre: 7,
    },
    {
      libelle: 'Le feedback est régulier, constructif et orienté amélioration.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'B')?.id,
      ordre: 8,
    },
    {
      libelle: 'Les managers accompagnent efficacement le développement des compétences.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'B')?.id,
      ordre: 9,
    },
    {
      libelle: 'Les situations difficiles sont gérées avec professionnalisme.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'B')?.id,
      ordre: 10,
    },
    // Catégorie C: Communication et prise de décision
    {
      libelle: 'La communication managériale est claire, ouverte et transparente.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'C')?.id,
      ordre: 11,
    },
    {
      libelle: 'Les collaborateurs peuvent s\'exprimer librement et être entendus.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'C')?.id,
      ordre: 12,
    },
    {
      libelle: 'Les décisions sont prises dans des délais raisonnables.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'C')?.id,
      ordre: 13,
    },
    {
      libelle: 'Les managers savent arbitrer et prioriser efficacement.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'C')?.id,
      ordre: 14,
    },
    {
      libelle: 'Le management favorise l\'intelligence collective.',
      categorieId: getCategoriesByTheme('Leadership et gouvernance managériale').find(c => c.code === 'C')?.id,
      ordre: 15,
    },

    // Thème 3: Performance et engagement des équipes
    // Catégorie A: Objectifs et pilotage de la performance
    {
      libelle: 'Les objectifs individuels et collectifs sont clairement définis.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'A')?.id,
      ordre: 1,
    },
    {
      libelle: 'Les objectifs sont alignés avec la stratégie globale de l\'entreprise.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'A')?.id,
      ordre: 2,
    },
    {
      libelle: 'Les indicateurs de performance sont pertinents et suivis régulièrement.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'A')?.id,
      ordre: 3,
    },
    {
      libelle: 'Les collaborateurs comprennent comment leur travail contribue aux résultats.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'A')?.id,
      ordre: 4,
    },
    {
      libelle: 'Les résultats sont analysés et partagés de manière constructive.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'A')?.id,
      ordre: 5,
    },
    // Catégorie B: Engagement et responsabilisation
    {
      libelle: 'Les collaborateurs sont impliqués dans l\'atteinte des résultats.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'B')?.id,
      ordre: 6,
    },
    {
      libelle: 'Chacun se sent responsable de la performance collective.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'B')?.id,
      ordre: 7,
    },
    {
      libelle: 'Les initiatives et les prises de responsabilité sont encouragées.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'B')?.id,
      ordre: 8,
    },
    {
      libelle: 'Les collaborateurs font preuve de proactivité dans leur travail.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'B')?.id,
      ordre: 9,
    },
    {
      libelle: 'L\'engagement des équipes est stable et durable.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'B')?.id,
      ordre: 10,
    },
    // Catégorie C: Reconnaissance et amélioration continue
    {
      libelle: 'Les efforts et les résultats sont reconnus à leur juste valeur.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'C')?.id,
      ordre: 11,
    },
    {
      libelle: 'Les performances individuelles et collectives sont valorisées.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'C')?.id,
      ordre: 12,
    },
    {
      libelle: 'Les erreurs sont utilisées comme leviers d\'apprentissage.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'C')?.id,
      ordre: 13,
    },
    {
      libelle: 'L\'entreprise encourage l\'amélioration continue.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'C')?.id,
      ordre: 14,
    },
    {
      libelle: 'La culture du résultat est positive et motivante.',
      categorieId: getCategoriesByTheme('Performance et engagement des équipes').find(c => c.code === 'C')?.id,
      ordre: 15,
    },

    // Thème 4: Organisation et efficacité opérationnelle
    // Catégorie A: Structure et rôles
    {
      libelle: 'Les rôles et responsabilités sont clairement définis dans l\'organisation.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'A')?.id,
      ordre: 1,
    },
    {
      libelle: 'Chaque collaborateur connaît précisément son périmètre d\'action.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'A')?.id,
      ordre: 2,
    },
    {
      libelle: 'Les fiches de poste sont claires et à jour.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'A')?.id,
      ordre: 3,
    },
    {
      libelle: 'Les chevauchements de responsabilités sont limités.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'A')?.id,
      ordre: 4,
    },
    {
      libelle: 'La structure organisationnelle est adaptée aux activités de l\'entreprise.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'A')?.id,
      ordre: 5,
    },
    // Catégorie B: Processus et coordination
    {
      libelle: 'Les processus de travail sont clairement formalisés.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'B')?.id,
      ordre: 6,
    },
    {
      libelle: 'Les circuits de décision sont simples et efficaces.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'B')?.id,
      ordre: 7,
    },
    {
      libelle: 'La coordination entre les services est fluide.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'B')?.id,
      ordre: 8,
    },
    {
      libelle: 'Les délais de traitement des tâches sont maîtrisés.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'B')?.id,
      ordre: 9,
    },
    {
      libelle: 'Les dysfonctionnements organisationnels sont rapidement corrigés.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'B')?.id,
      ordre: 10,
    },
    // Catégorie C: Agilité et amélioration continue
    {
      libelle: 'L\'organisation s\'adapte facilement aux changements.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'C')?.id,
      ordre: 11,
    },
    {
      libelle: 'Les collaborateurs comprennent les évolutions organisationnelles.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'C')?.id,
      ordre: 12,
    },
    {
      libelle: 'Les outils de travail sont adaptés aux besoins opérationnels.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'C')?.id,
      ordre: 13,
    },
    {
      libelle: 'L\'entreprise encourage la remise en question des pratiques existantes.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'C')?.id,
      ordre: 14,
    },
    {
      libelle: 'L\'amélioration continue fait partie de la culture interne.',
      categorieId: getCategoriesByTheme('Organisation et efficacité opérationnelle').find(c => c.code === 'C')?.id,
      ordre: 15,
    },

    // Thème 5: Développement des talents et compétences
    // Catégorie A: Identification et gestion des talents
    {
      libelle: 'Les compétences clés nécessaires à la performance sont clairement identifiées.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'A')?.id,
      ordre: 1,
    },
    {
      libelle: 'L\'entreprise sait repérer les talents à fort potentiel.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'A')?.id,
      ordre: 2,
    },
    {
      libelle: 'Les postes sont occupés par des profils adaptés aux exigences du rôle.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'A')?.id,
      ordre: 3,
    },
    {
      libelle: 'Les talents sont valorisés et reconnus au sein de l\'organisation.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'A')?.id,
      ordre: 4,
    },
    {
      libelle: 'La gestion des talents est alignée avec la stratégie de l\'entreprise.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'A')?.id,
      ordre: 5,
    },
    // Catégorie B: Formation et développement des compétences
    {
      libelle: 'L\'entreprise dispose d\'un plan de formation structuré.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'B')?.id,
      ordre: 6,
    },
    {
      libelle: 'Les formations proposées répondent aux besoins réels des équipes.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'B')?.id,
      ordre: 7,
    },
    {
      libelle: 'Les collaborateurs ont des opportunités de développement professionnel.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'B')?.id,
      ordre: 8,
    },
    {
      libelle: 'Le coaching et l\'accompagnement individuel sont encouragés.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'B')?.id,
      ordre: 9,
    },
    {
      libelle: 'Les compétences acquises sont mises en pratique dans le travail quotidien.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'B')?.id,
      ordre: 10,
    },
    // Catégorie C: Évolution professionnelle et fidélisation
    {
      libelle: 'Les perspectives d\'évolution professionnelle sont claires.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'C')?.id,
      ordre: 11,
    },
    {
      libelle: 'Les mobilités internes sont encouragées et accompagnées.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'C')?.id,
      ordre: 12,
    },
    {
      libelle: 'Les collaborateurs se projettent durablement dans l\'entreprise.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'C')?.id,
      ordre: 13,
    },
    {
      libelle: 'L\'entreprise agit pour limiter le turnover des talents clés.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'C')?.id,
      ordre: 14,
    },
    {
      libelle: 'La culture de l\'apprentissage continu est bien ancrée.',
      categorieId: getCategoriesByTheme('Développement des talents et compétences').find(c => c.code === 'C')?.id,
      ordre: 15,
    },
  ];

  // Type pour les données de questions valides
  type QuestionData = {
    libelle: string;
    categorieId: number;
    ordre: number;
  };

  // Filtrer les questions avec un categorieId valide
  const validQuestionsData: QuestionData[] = questionsData
    .filter((q): q is QuestionData => q.categorieId !== undefined)
    .map(({ libelle, categorieId, ordre }) => ({ libelle, categorieId, ordre }));

  for (const question of validQuestionsData) {
    if (!question.categorieId) {
      console.log(`⚠️ Catégorie non trouvée pour la question: ${question.libelle.substring(0, 50)}...`);
      continue;
    }

    // Récupérer le themeId de la catégorie
    const questionCategory = await prisma.categorie.findUnique({
      where: { id: question.categorieId },
      select: { themeId: true },
    });

    if (!questionCategory) {
      console.log(`⚠️ Catégorie non trouvée pour la question: ${question.libelle.substring(0, 50)}...`);
      continue;
    }

    // Vérifier si une question avec le même libellé existe déjà dans ce thème
    const existingQuestion = await prisma.question.findFirst({
      where: {
        libelle: question.libelle,
        categorie: {
          themeId: questionCategory.themeId,
        },
      },
    });

    if (!existingQuestion) {
      await prisma.question.create({
        data: question,
      });
      console.log(`✅ Question créée : ${question.libelle.substring(0, 50)}...`);
    } else {
      console.log(`⚠️ Question déjà existante : ${question.libelle.substring(0, 50)}...`);
    }
  }

  console.log('🌱 Seeding des questions terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
