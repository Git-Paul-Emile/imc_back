import 'dotenv/config';
import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des réponses...');

  const reponses = [
    {
      libelle: 'Pas du tout d\'accord',
      point: 1,
      ordre: 1,
    },
    {
      libelle: 'Peu d\'accord',
      point: 2,
      ordre: 2,
    },
    {
      libelle: 'Plutôt d\'accord',
      point: 3,
      ordre: 3,
    },
    {
      libelle: 'Tout à fait d\'accord',
      point: 4,
      ordre: 4,
    },
  ];

  for (const reponse of reponses) {
    const existingReponse = await prisma.reponse.findFirst({
      where: { libelle: reponse.libelle },
    });

    if (!existingReponse) {
      await prisma.reponse.create({
        data: reponse,
      });
      console.log(`✅ Réponse créée : ${reponse.libelle} (${reponse.point} points)`);
    } else {
      console.log(`⚠️ Réponse déjà existante : ${reponse.libelle}`);
    }
  }

  console.log('🌱 Seeding des réponses terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
