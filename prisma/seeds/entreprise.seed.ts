import "dotenv/config";
import { PrismaClient } from '../../src/generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des entreprises...');

  const entreprises = [
    {
      nom: 'Sonatel',
      domaineActivite: 'Télécommunications',
      tel: '771234567',
      email: 'contact@sonatel.sn',
      adresse: 'Sicap Liberté II, Dakar',
    },
    {
      nom: 'Orange Sénégal',
      domaineActivite: 'Télécommunications',
      tel: '770000001',
      email: 'contact@orange.sn',
      adresse: 'Plateau, Dakar',
    },
    {
      nom: 'BIS-SA',
      domaineActivite: 'Informatique et Conseil',
      tel: '338690000',
      email: 'info@bis-sa.com',
      adresse: 'Mermoz, Dakar',
    },
    {
      nom: 'Ecobank Sénégal',
      domaineActivite: 'Banque et Finance',
      tel: '339999999',
      email: 'senegal@ecobank.com',
      adresse: 'Avenue Léopold Sédar Senghor, Dakar',
    },
    {
      nom: 'TotalEnergies Sénégal',
      domaineActivite: 'Énergie et Pétrole',
      tel: '338202020',
      email: 'contact@total.sn',
      adresse: 'Point E, Dakar',
    },
    {
      nom: 'SDE',
      domaineActivite: 'Distribution d\'eau',
      tel: '338330000',
      email: 'contact@sde.sn',
      adresse: 'Dakar Plateau',
    },
    {
      nom: 'Senelec',
      domaineActivite: 'Électricité',
      tel: '338200000',
      email: 'communication@senelec.sn',
      adresse: 'Fann Hock, Dakar',
    },
    {
      nom: 'Air Senegal',
      domaineActivite: 'Transport aérien',
      tel: '338399999',
      email: 'contact@airsenegal.sn',
      adresse: 'Aéroport Blaise Diagne, Diass',
    },
    {
      nom: 'Dakar Dem Dikk',
      domaineActivite: 'Transport public',
      tel: '338245000',
      email: 'contact@dakardemdikk.sn',
      adresse: 'Rue Parent, Dakar',
    },
    {
      nom: 'ASMADE',
      domaineActivite: 'Microfinance',
      tel: '338641000',
      email: 'asmade@asmade.sn',
      adresse: 'Guédiawaye, Dakar',
    },
  ];

  for (const entreprise of entreprises) {
    const existingByEmail = await prisma.entreprise.findFirst({
      where: { email: entreprise.email },
    });

    if (!existingByEmail) {
      await prisma.entreprise.create({
        data: entreprise,
      });
      console.log(`✅ Entreprise créée : ${entreprise.nom}`);
    } else {
      console.log(`⚠️ Entreprise déjà existante : ${entreprise.nom}`);
    }
  }

  console.log('🌱 Seeding des entreprises terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
  })
  .then(async () => {
    await prisma.$disconnect();
  });
