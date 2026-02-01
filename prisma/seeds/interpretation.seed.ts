import "dotenv/config";
import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des interprétations...');

  // Récupérer tous les thèmes
  const themes = await prisma.theme.findMany();
  if (themes.length === 0) {
    console.log('⚠️ Aucun thème trouvé. Veuillez d\'abord exécuter le seed des thèmes.');
    return;
  }

  // Récupérer toutes les recommandations
  const recommandations = await prisma.recommandation.findMany();
  if (recommandations.length === 0) {
    console.log('⚠️ Aucune recommandation trouvée. Veuillez d\'abord exécuter le seed des recommandations.');
    return;
  }

  // Créer les interprétations basées sur le PDF "Points d'évaluation IMC"
  // 5 thèmes x 4 niveaux = 20 interprétations
  const interpretationsData = [
    // Thème 1: Climat social et bien-être organisationnel
    {
      titre: 'Climat social critique',
      description: 'Les résultats indiquent un climat social fortement dégradé. Les relations internes semblent marquées par un manque de confiance, une communication insuffisante et des tensions non résolues. Les collaborateurs peuvent ressentir une faible reconnaissance, un stress élevé, un sentiment de désengagement et une perte de sens au travail. Ce type de climat représente un risque majeur pour la stabilité de votre entreprise: conflits récurrents, absentéisme, turnover élevé et baisse significative de la performance globale.',
      recommandationId: recommandations[0].id,
      scoreMin: 15,
      scoreMax: 29,
      themeId: themes[0].id,
    },
    {
      titre: 'Climat social fragile',
      description: 'Votre entreprise dispose de certaines bases positives, mais le climat social reste instable et vulnérable. Des difficultés peuvent être observés, notamment une communication interne amendable, une reconnaissance insuffisante des efforts et une gestion du stress et des conflits inégale selon les équipes. Sans action corrective, ces fragilités peuvent s\'amplifier et impacter durablement l\'engagement et la performance des collaborateurs.',
      recommandationId: recommandations[1].id,
      scoreMin: 30,
      scoreMax: 39,
      themeId: themes[0].id,
    },
    {
      titre: 'Climat social stable',
      description: 'Le climat social de votre organisation est globalement sain et fonctionnel. Les relations de travail sont positives, le niveau de confiance est satisfaisant et les collaborateurs se sentent majoritairement impliqués. Toutefois, certains leviers peuvent encore être activés pour renforcer la cohésion, la motivation et la prévention des risques sociaux. À ce stade, l\'enjeu principal est de préserver l\'équilibre existant et d\'anticiper les évolutions futures.',
      recommandationId: recommandations[2].id,
      scoreMin: 40,
      scoreMax: 49,
      themeId: themes[0].id,
    },
    {
      titre: 'Climat social performant',
      description: 'Votre entreprise bénéficie d\'un climat social très favorable, caractérisé par un haut niveau de confiance, de motivation et d\'engagement. Les collaborateurs évoluent dans un environnement respectueux, inclusif et propice à la performance collective. Ce climat constitue un avantage compétitif majeur pour votre organisation. L\'enjeu principal est désormais de maintenir ce niveau d\'excellence, tout en innovant et en anticipant les transformations à venir.',
      recommandationId: recommandations[3].id,
      scoreMin: 50,
      scoreMax: 60,
      themeId: themes[0].id,
    },
    // Thème 2: Leadership et gouvernance managériale
    {
      titre: 'Leadership managérial critique',
      description: 'Les résultats révèlent un leadership fragilisé et des pratiques managériales peu structurées. Le manque de vision partagée, l\'insuffisance de communication et l\'absence de posture managériale claire peuvent générer désengagement, incompréhension et tensions internes. Ce type de situation freine la performance collective et affaiblit durablement la crédibilité du management.',
      recommandationId: recommandations[4].id,
      scoreMin: 15,
      scoreMax: 29,
      themeId: themes[1].id,
    },
    {
      titre: 'Leadership managérial fragile',
      description: 'Le leadership existe mais reste inégal et peu homogène. Certaines pratiques managériales sont efficaces, mais d\'autres manquent de cohérence ou de constance. Les équipes peuvent ressentir un manque de clarté dans les décisions ou dans la communication managériale.',
      recommandationId: recommandations[5].id,
      scoreMin: 30,
      scoreMax: 39,
      themeId: themes[1].id,
    },
    {
      titre: 'Leadership managérial stable',
      description: 'Le leadership est globalement fonctionnel et structuré. Les managers remplissent leur rôle, les équipes sont encadrées et les décisions sont majoritairement efficaces. Cependant, des marges de progression existent pour passer d\'un management de routine à un management qui impacte les attitudes.',
      recommandationId: recommandations[6].id,
      scoreMin: 40,
      scoreMax: 49,
      themeId: themes[1].id,
    },
    {
      titre: 'Leadership managérial performant',
      description: 'Votre organisation bénéficie d\'un leadership fort, structurant et inspirant. Les managers incarnent la vision, mobilisent les équipes et favorisent l\'engagement durable. Ce niveau de maturité constitue un véritable levier de performance et de différenciation.',
      recommandationId: recommandations[7].id,
      scoreMin: 50,
      scoreMax: 60,
      themeId: themes[1].id,
    },
    // Thème 3: Performance et engagement des équipes
    {
      titre: 'Performance humaine critique',
      description: 'Les résultats traduisent un faible niveau de performance et d\'engagement. Les objectifs peuvent être flous, peu partagés ou mal suivis, ce qui limite l\'implication des équipes. Les collaborateurs peuvent ressentir une perte de motivation, un manque de reconnaissance, une faible responsabilisation et une difficulté à relier leurs actions aux résultats attendus. Cette situation freine fortement la compétitivité de l\'entreprise.',
      recommandationId: recommandations[8].id,
      scoreMin: 15,
      scoreMax: 29,
      themeId: themes[2].id,
    },
    {
      titre: 'Performance humaine fragile',
      description: 'La performance existe, mais elle reste irrégulière et dépendante des individus. L\'engagement peut varier selon les équipes, les managers ou les périodes. Certaines pratiques sont présentes, mais manquent de structuration ou de cohérence globale.',
      recommandationId: recommandations[9].id,
      scoreMin: 30,
      scoreMax: 39,
      themeId: themes[2].id,
    },
    {
      titre: 'Performance humaine stable',
      description: 'Votre organisation affiche un niveau de performance globalement satisfaisant. Les objectifs sont connus, les équipes engagées et les résultats atteints de manière régulière. Toutefois, certaines marges de progression existent pour renforcer la dynamique collective et accroître l\'impact.',
      recommandationId: recommandations[10].id,
      scoreMin: 40,
      scoreMax: 49,
      themeId: themes[2].id,
    },
    {
      titre: 'Performance humaine performante',
      description: 'Votre entreprise bénéficie d\'un haut niveau de performance et d\'engagement. Les équipes sont responsabilisées, motivées et orientées résultats. La performance humaine constitue un avantage concurrentiel fort et un moteur de croissance durable.',
      recommandationId: recommandations[11].id,
      scoreMin: 50,
      scoreMax: 60,
      themeId: themes[2].id,
    },
    // Thème 4: Organisation et efficacité opérationnelle
    {
      titre: 'Organisation inefficace',
      description: 'Les résultats mettent en évidence une organisation peu structurée, avec des rôles flous, des processus inefficaces et une coordination insuffisante entre les équipes. Cette situation génère des pertes de temps, des tensions internes, des erreurs récurrentes et une baisse de performance globale.',
      recommandationId: recommandations[12].id,
      scoreMin: 15,
      scoreMax: 29,
      themeId: themes[3].id,
    },
    {
      titre: 'Organisation fragile',
      description: 'L\'organisation fonctionne, mais de manière perfectible et inégale. Certains processus sont efficaces, tandis que d\'autres freinent la performance et la réactivité. Les équipes peuvent compenser par des efforts individuels, ce qui n\'est pas durable.',
      recommandationId: recommandations[13].id,
      scoreMin: 30,
      scoreMax: 39,
      themeId: themes[3].id,
    },
    {
      titre: 'Organisation fonctionnelle',
      description: 'Votre organisation est globalement structurée et opérationnelle. Les processus sont identifiés, les rôles clairs et la coordination globalement efficace. Cependant, des leviers existent pour améliorer l\'agilité et la fluidité.',
      recommandationId: recommandations[14].id,
      scoreMin: 40,
      scoreMax: 49,
      themeId: themes[3].id,
    },
    {
      titre: 'Organisation agile et performante',
      description: 'Votre entreprise bénéficie d\'une organisation fluide, structurée et adaptable. Les processus soutiennent la performance et facilitent l\'atteinte des objectifs. L\'organisation constitue un véritable levier stratégique.',
      recommandationId: recommandations[15].id,
      scoreMin: 50,
      scoreMax: 60,
      themeId: themes[3].id,
    },
    // Thème 5: Développement des talents et compétences
    {
      titre: 'Gestion des talents critique',
      description: 'Les résultats révèlent une faible structuration des pratiques de gestion des talents. Les compétences ne sont pas suffisamment identifiées, les parcours de développement sont limités et les collaborateurs peuvent manquer de perspectives. Cette situation expose l\'entreprise à un turnover élevé, une perte de compétences clés et une dépendance excessive à certains profils.',
      recommandationId: recommandations[16].id,
      scoreMin: 15,
      scoreMax: 29,
      themeId: themes[4].id,
    },
    {
      titre: 'Gestion des talents fragile',
      description: 'Certaines pratiques existent, mais elles restent peu formalisées et inégales. Le développement des talents dépend souvent d\'initiatives ponctuelles plutôt que d\'une stratégie claire. Les collaborateurs peuvent manquer de visibilité sur leur évolution professionnelle.',
      recommandationId: recommandations[17].id,
      scoreMin: 30,
      scoreMax: 39,
      themeId: themes[4].id,
    },
    {
      titre: 'Gestion des talents structurée',
      description: 'Votre entreprise dispose de pratiques globalement structurées et efficaces. Les talents sont identifiés, les compétences développées et les collaborateurs engagés dans leur évolution. Toutefois, des opportunités existent pour renforcer l\'impact et la fidélisation.',
      recommandationId: recommandations[18].id,
      scoreMin: 40,
      scoreMax: 49,
      themeId: themes[4].id,
    },
    {
      titre: 'Gestion des talents performante',
      description: 'Votre organisation bénéficie d\'une gestion des talents mature et performante. Les compétences sont alignées avec la stratégie, les collaborateurs sont engagés et fidélisés. La gestion des talents constitue un avantage concurrentiel durable.',
      recommandationId: recommandations[19].id,
      scoreMin: 50,
      scoreMax: 60,
      themeId: themes[4].id,
    },
  ];

  // Supprimer les interprétations existantes
  await prisma.interpretation.deleteMany({});

  // Créer les nouvelles interprétations
  for (const interpretation of interpretationsData) {
    await prisma.interpretation.create({
      data: interpretation,
    });
    console.log(`✅ Interprétation créée : ${interpretation.titre} (Score: ${interpretation.scoreMin}-${interpretation.scoreMax})`);
  }

  console.log('🌱 Seeding des interprétations terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
