import {prisma} from "../config/database.js"
import type { Recommandation } from "../../src/generated/prisma/client.js"

class RecommandationRepository {

    async count(): Promise<number> {
        try {
            const count = await prisma.recommandation.count();
            return count;
        } catch (error) {
            console.error('Erreur lors du comptage des recommandations:', error);
            throw new Error('Impossible de compter les recommandations');
        }
    }
    
    async create(data: { description: string }): Promise<Recommandation> {
        try {
            const recommandation = await prisma.recommandation.create({
                data: {
                    description: data.description
                }
            });
            return recommandation;
        } catch (error) {
            console.error('Erreur lors de la création de la recommandation:', error);
            throw new Error(`Impossible de créer la recommandation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Recommandation[]> {
        try {
            const recommandations = await prisma.recommandation.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    interpretations: true
                }
            });
            return recommandations;
        } catch (error) {
            console.error('Erreur lors de la récupération des recommandations:', error);
            throw new Error('Impossible de récupérer les recommandations');
        }
            
    }

    async findById(id: string): Promise<Recommandation | null> {
        try {
            const recommandation = await prisma.recommandation.findUnique({
                where: {id: parseInt(id)},
                include: {
                    interpretations: true
                }
            });
            return recommandation;
        } catch (error) {
            console.error('Erreur lors de la récupération de la recommandation:', error);
            throw new Error('Impossible de récupérer la recommandation');
        }
    }

    async update(id: string, data: Partial<Recommandation>): Promise<Recommandation> {
        try {
            const recommandation = await prisma.recommandation.update({
                where: {id: parseInt(id)},
                data,
            });
            return recommandation;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la recommandation:', error);
            throw new Error('Impossible de mettre à jour la recommandation');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.recommandation.delete({
                where: {id: parseInt(id)}
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la recommandation:', error);
            throw new Error('Impossible de supprimer la recommandation');
        }
    }

}

export default new RecommandationRepository();
