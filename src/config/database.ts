import { PrismaClient } from "@prisma/client";


let prisma: PrismaClient;


export const connectToDatabase = async () => {
 try {
   prisma = new PrismaClient();
   await prisma.$connect();
   console.log("✅ Connecté à la base de données principale");
 } catch (err) {
   console.error("❌ Impossible de se connecter à la base de données", err);
   throw err;
 }
};


export { prisma };
