import "dotenv/config";
import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des recommandations...');

  const recommandations = [
    // Thème 1: Climat social et bien-être organisationnel
    {
      description: 'Un diagnostic social approfondi, un accompagnement managérial ciblé, la mise en place dun plan damelioration du climat social.',
    },
    {
      description: 'Des actions ciblees damelioration du climat social, un accompagnement des managers, la mise en place dindicateurs de suivi du bien-etre et de lengagement.',
    },
    {
      description: 'Consolider les pratiques actuelles, investir dans la prevention des risques psychosociaux, renforcer la culture managériale et la communication interne.',
    },
    {
      description: 'La mise en place de dispositifs dinnovation sociale, le developpement de pratiques managériales avancées, le positionnement de lentreprise comme reference en matiere de climat social.',
    },
    // Thème 2: Leadership et Management
    {
      description: 'Un diagnostic managerial approfondi, un coaching des dirigeants et managers, la mise en place de bases managériales solides.',
    },
    {
      description: 'Un renforcement des compétences managériales, des actions de coaching ciblees, lharmonisation des pratiques de leadership.',
    },
    {
      description: 'Le developpement du leadership transformationnel, le renforcement du feedback et de lintelligence collective, des formations avancées en management.',
    },
    {
      description: 'Le maintien et la valorisation des bonnes pratiques, des dispositifs de leadership avance, le positionnement de vos managers comme leaders dinfluence.',
    },
    // Thème 3: Performance et engagement des équipes
    {
      description: 'Un diagnostic approfondi de la performance humaine, la clarification des objectifs et des rôles, la mise en place dun systeme de pilotage de la performance.',
    },
    {
      description: 'Le renforcement des mécanismes dengagement, lharmonisation des pratiques de reconnaissance, linstauration dune culture claire de la performance.',
    },
    {
      description: 'Loptimisation des outils de pilotage, le developpement de la reconnaissance et de la motivation, le renforcement de la culture de lamélioration continue.',
    },
    {
      description: 'La pérennisation des bonnes pratiques, linnovation dans le management de la performance, le positionnement de lentreprise comme organisation apprenante et performante.',
    },
    // Thème 4: Organisation et efficacité opérationnelle
    {
      description: 'Un diagnostic organisationnel approfondi, la clarification des rôles et responsabilités, la refonte des processus clés.',
    },
    {
      description: 'Loptimisation des processus existants, lamélioration de la coordination interservices, laccompagnement des managers dans la conduite du changement.',
    },
    {
      description: 'Lamélioration continue des processus, le renforcement des outils de pilotage opérationnel, lanticipation des évolutions organisationnelles.',
    },
    {
      description: 'La pérennisation des bonnes pratiques, linnovation organisationnelle, le partage des standards dexcellence en interne.',
    },
    // Thème 5: Développement des talents et compétences
    {
      description: 'Un diagnostic RH approfondi, la structuration de la gestion des compétences, la mise en place de parcours de développement adaptés.',
    },
    {
      description: 'La formalisation des pratiques RH, le déploiement de plans de formation cibles, le renforcement du coaching et de laccompagnement.',
    },
    {
      description: 'Loptimisation des parcours professionnels, le renforcement de la mobilité interne, lancrage dune culture forte de developpement continu.',
    },
    {
      description: 'Linnovation dans les pratiques RH, le developpement des leaders de demain, le positionnement de lentreprise comme employeur de reference.',
    },
  ];

  // Supprimer les recommandations existantes
  await prisma.recommandation.deleteMany({});

  // Créer les nouvelles recommandations
  for (const recommandation of recommandations) {
    await prisma.recommandation.create({
      data: recommandation,
    });
    console.log(`✅ Recommandation créée : ${recommandation.description.substring(0, 50)}...`);
  }

  console.log('🌱 Seeding des recommandations terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
