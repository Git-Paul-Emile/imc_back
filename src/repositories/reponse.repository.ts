import {prisma} from "../config/database.js"
import type { Reponse } from "../../src/generated/prisma/client.js"
import type { CreateReponseInput, UpdateReponseInput } from "../validators/ReponseSchema.js"

class ReponseRepository {

    async count(): Promise<number> {
        try {
            const count = await prisma.reponse.count();
            return count;
        } catch (error) {
            console.error('Erreur lors du comptage des réponses:', error);
            throw new Error('Impossible de compter les réponses');
        }
    }
    
    async create(data: CreateReponseInput): Promise<Reponse> {
        try {
            const reponse = await prisma.reponse.create({
                data: {
                    libelle: data.libelle,
                    point: data.point,
                    ordre: data.ordre || 0
                }
            });
            return reponse;
        } catch (error) {
            console.error('Erreur lors de la création de la réponse:', error);
            throw new Error(`Impossible de créer la réponse: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Reponse[]> {
        try {
            const reponses = await prisma.reponse.findMany({
                orderBy: {
                    ordre: 'asc'
                }
            });
            return reponses;
        } catch (error) {
            console.error('Erreur lors de la récupération des réponses:', error);
            throw new Error('Impossible de récupérer les réponses');
        }
            
    }

    async findById(id: string): Promise<Reponse | null> {
        try {
            const reponse = await prisma.reponse.findUnique({
                where: {id: parseInt(id)}
            });
            return reponse;
        } catch (error) {
            console.error('Erreur lors de la récupération de la réponse:', error);
            throw new Error('Impossible de récupérer la réponse');
        }
    }

    async update(id: string, data: UpdateReponseInput):
    Promise<Reponse> {
        try {
            const reponse = await prisma.reponse.update({
                where: {id: parseInt(id)},
                data,
            });
            return reponse;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réponse:', error);
            throw new Error('Impossible de mettre à jour la réponse');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.reponse.delete({
                where: {id: parseInt(id)}
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la réponse:', error);
            throw new Error('Impossible de supprimer la réponse');
        }
    }

    async findByPointGreaterThan(point: number): Promise<Reponse[]> {
        try {
            const reponses = await prisma.reponse.findMany({
                where: {
                    point: {
                        gt: point
                    }
                },
                orderBy: {
                    point: 'desc'
                }
            });
            return reponses;
        } catch (error) {
            console.error('Erreur lors de la récupération des réponses par point:', error);
            throw new Error('Impossible de récupérer les réponses par point');
        }
    }

    async findByPointLessThan(point: number): Promise<Reponse[]> {
        try {
            const reponses = await prisma.reponse.findMany({
                where: {
                    point: {
                        lt: point
                    }
                },
                orderBy: {
                    point: 'asc'
                }
            });
            return reponses;
        } catch (error) {
            console.error('Erreur lors de la récupération des réponses par point:', error);
            throw new Error('Impossible de récupérer les réponses par point');
        }
    }

}

export default new ReponseRepository();
