import { prisma } from "../config/database.js"
import type { Interpretation } from "../../src/generated/prisma/client.js"
import type { CreateInterpretationInput, UpdateInterpretationInput } from "../validators/InterpretationSchema.js"

class InterpretationRepository {

    async count(): Promise<number> {
        try {
            const count = await prisma.interpretation.count();
            return count;
        } catch (error) {
            console.error('Erreur lors du comptage des interprétations:', error);
            throw new Error('Impossible de compter les interprétations');
        }
    }

    async create(data: CreateInterpretationInput): Promise<Interpretation> {
        try {
            const interpretation = await prisma.interpretation.create({
                data: {
                    titre: data.titre,
                    description: data.description,
                    recommandationId: data.recommandationId,
                    scoreMin: data.scoreMin,
                    scoreMax: data.scoreMax,
                    themeId: data.themeId
                }
            });
            return interpretation;
        } catch (error) {
            console.error('Erreur lors de la création de l\'interprétation:', error);
            throw new Error(`Impossible de créer l'interprétation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Interpretation[]> {
        try {
            const interpretations = await prisma.interpretation.findMany({
                include: {
                    recommandation: true,
                    theme: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return interpretations;
        } catch (error) {
            console.error('Erreur lors de la récupération des interprétations:', error);
            throw new Error('Impossible de récupérer les interprétations');
        }
    }

    async findById(id: string): Promise<Interpretation | null> {
        try {
            const interpretation = await prisma.interpretation.findUnique({
                where: { id: parseInt(id) },
                include: {
                    recommandation: true,
                    theme: true
                }
            });
            return interpretation;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'interprétation:', error);
            throw new Error('Impossible de récupérer l\'interprétation');
        }
    }

    async findByThemeId(themeId: string): Promise<Interpretation[]> {
        try {
            const interpretations = await prisma.interpretation.findMany({
                where: { themeId: parseInt(themeId) },
                include: {
                    recommandation: true
                },
                orderBy: [
                    { scoreMin: 'asc' }
                ]
            });
            return interpretations;
        } catch (error) {
            console.error('Erreur lors de la récupération des interprétations par thème:', error);
            throw new Error('Impossible de récupérer les interprétations par thème');
        }
    }

    async findByScoreRange(themeId: string, score: number): Promise<Interpretation | null> {
        try {
            const interpretation = await prisma.interpretation.findFirst({
                where: {
                    themeId: parseInt(themeId),
                    scoreMin: { lte: score },
                    scoreMax: { gte: score }
                },
                include: {
                    recommandation: true
                }
            });
            return interpretation;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'interprétation par score:', error);
            throw new Error('Impossible de récupérer l\'interprétation par score');
        }
    }

    async update(id: string, data: Partial<UpdateInterpretationInput>): Promise<Interpretation> {
        try {
            const interpretation = await prisma.interpretation.update({
                where: { id: parseInt(id) },
                data
            });
            return interpretation;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'interprétation:', error);
            throw new Error('Impossible de mettre à jour l\'interprétation');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.interpretation.delete({
                where: { id: parseInt(id) }
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'interprétation:', error);
            throw new Error('Impossible de supprimer l\'interprétation');
        }
    }
}

export default new InterpretationRepository();
