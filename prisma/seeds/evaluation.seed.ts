import 'dotenv/config';
import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des évaluations...');

  // Récupérer les entreprises, thèmes et interprétations
  const entreprises = await prisma.entreprise.findMany();
  const themes = await prisma.theme.findMany();
  const interpretations = await prisma.interpretation.findMany();

  if (entreprises.length === 0) {
    console.log('⚠️ Aucune entreprise trouvée. Veuillez d\'abord exécuter le seed des entreprises.');
    return;
  }

  if (themes.length === 0) {
    console.log('⚠️ Aucun thème trouvé. Veuillez d\'abord exécuter le seed des thèmes.');
    return;
  }

  // Vérifier si des évaluations existent déjà
  const existingEvaluations = await prisma.evaluation.findMany();
  if (existingEvaluations.length > 0) {
    console.log('⚠️ Des évaluations existent déjà. Le seeding est terminé.');
    return;
  }

  // Données d'évaluations d'exemple basées sur le PDF
  const evaluationsData = [
    // Évaluations pour l'entreprise 1 - Thème 1: Climat social
    {
      entrepriseId: entreprises[0].id,
      themeId: themes[0].id,
      motif: 'Évaluation initiale du climat social',
      scoreTotal: 42,
      interpretationId: interpretations.find(i => i.themeId === themes[0].id && i.scoreMin <= 42 && i.scoreMax >= 42)?.id || null,
      isFree: true,
    },
    // Évaluations pour l'entreprise 1 - Thème 2: Leadership
    {
      entrepriseId: entreprises[0].id,
      themeId: themes[1].id,
      motif: 'Diagnostic du leadership managérial',
      scoreTotal: 35,
      interpretationId: interpretations.find(i => i.themeId === themes[1].id && i.scoreMin <= 35 && i.scoreMax >= 35)?.id || null,
      isFree: true,
    },
    // Évaluations pour l'entreprise 1 - Thème 3: Performance
    {
      entrepriseId: entreprises[0].id,
      themeId: themes[2].id,
      motif: 'Analyse de la performance des équipes',
      scoreTotal: 48,
      interpretationId: interpretations.find(i => i.themeId === themes[2].id && i.scoreMin <= 48 && i.scoreMax >= 48)?.id || null,
      isFree: false,
    },
    // Évaluations pour l'entreprise 2 - Thème 1: Climat social
    {
      entrepriseId: entreprises[1]?.id || entreprises[0].id,
      themeId: themes[0].id,
      motif: 'Évaluation annuelle du climat social',
      scoreTotal: 55,
      interpretationId: interpretations.find(i => i.themeId === themes[0].id && i.scoreMin <= 55 && i.scoreMax >= 55)?.id || null,
      isFree: true,
    },
    // Évaluations pour l'entreprise 2 - Thème 4: Organisation
    {
      entrepriseId: entreprises[1]?.id || entreprises[0].id,
      themeId: themes[3].id,
      motif: 'Audit de l\'organisation',
      scoreTotal: 28,
      interpretationId: interpretations.find(i => i.themeId === themes[3].id && i.scoreMin <= 28 && i.scoreMax >= 28)?.id || null,
      isFree: false,
    },
    // Évaluations pour l'entreprise 3 - Thème 5: Développement des talents
    {
      entrepriseId: entreprises[2]?.id || entreprises[0].id,
      themeId: themes[4].id,
      motif: 'Évaluation de la gestion des talents',
      scoreTotal: 38,
      interpretationId: interpretations.find(i => i.themeId === themes[4].id && i.scoreMin <= 38 && i.scoreMax >= 38)?.id || null,
      isFree: true,
    },
    // Évaluations pour l'entreprise 3 - Thème 2: Leadership
    {
      entrepriseId: entreprises[2]?.id || entreprises[0].id,
      themeId: themes[1].id,
      motif: 'Évaluation du leadership',
      scoreTotal: 52,
      interpretationId: interpretations.find(i => i.themeId === themes[1].id && i.scoreMin <= 52 && i.scoreMax >= 52)?.id || null,
      isFree: false,
    },
  ];

  for (const evaluation of evaluationsData) {
    // Créer l'évaluation avec ses EvaluationReponse
    const result = await prisma.evaluation.create({
      data: {
        entrepriseId: evaluation.entrepriseId,
        themeId: evaluation.themeId,
        motif: evaluation.motif,
        scoreTotal: evaluation.scoreTotal,
        interpretationId: evaluation.interpretationId,
        isFree: evaluation.isFree,
        reponses: {
          create: [] // Les EvaluationReponse seront créées avec des valeurs par défaut
        }
      },
      include: {
        reponses: true
      }
    });

    // Récupérer les questions du thème et mettre à jour les EvaluationReponse
    const questions = await prisma.question.findMany({
      where: {
        categorie: {
          themeId: evaluation.themeId
        }
      }
    });

    // Prendre des réponses au hasard pour simuler les réponses de l'évaluation
    const allReponses = await prisma.reponse.findMany();
    
    for (const er of result.reponses) {
      const question = questions.find(q => q.id === er.questionId);
      if (question) {
        // Récupérer les réponses possibles pour cette question
        const reponsesDeLaQuestion = allReponses.filter(
          (r) => r.id >= (question.id - 1) * 4 + 1 && r.id <= question.id * 4
        );
        
        if (reponsesDeLaQuestion.length > 0) {
          const reponseChoisie = reponsesDeLaQuestion[0];
          await prisma.evaluationReponse.update({
            where: { id: er.id },
            data: {
              reponseId: reponseChoisie.id,
              pointObtenu: reponseChoisie.point
            }
          });
        }
      }
    }

    console.log(`✅ Évaluation créée : ${evaluation.motif} (Score: ${evaluation.scoreTotal}) avec ${result.reponses.length} réponses`);
  }

  console.log('🌱 Seeding des évaluations terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
