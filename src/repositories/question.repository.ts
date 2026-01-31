import {prisma} from "../config/database.js"
import type { Question } from "../../src/generated/prisma/client.js"
import type { CreateQuestionInput, UpdateQuestionInput } from "../validators/QuestionSchema.js"

class QuestionRepository {

    async count(): Promise<number> {
        try {
            const count = await prisma.question.count();
            return count;
        } catch (error) {
            console.error('Erreur lors du comptage des questions:', error);
            throw new Error('Impossible de compter les questions');
        }
    }
    
    async create(data: CreateQuestionInput): Promise<Question> {
        try {
            const question = await prisma.question.create({
                data: {
                    libelle: data.libelle,
                    categorieId: data.categorieId,
                    ordre: data.ordre ?? 0
                }
            });
            return question;
        } catch (error) {
            console.error('Erreur lors de la création de la question:', error);
            throw new Error(`Impossible de créer la question: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Question[]> {
        try {
            const questions = await prisma.question.findMany({
                orderBy: {
                    ordre: 'asc'
                },
                include: {
                    categorie: {
                        include: {
                            theme: true
                        }
                    }
                }
            });
            return questions;
        } catch (error) {
            console.error('Erreur lors de la récupération des questions:', error);
            throw new Error('Impossible de récupérer les questions');
        }
            
    }

    async findById(id: string): Promise<Question | null> {
        try {
            const question = await prisma.question.findUnique({
                where: {id: parseInt(id)},
                include: {
                    categorie: {
                        include: {
                            theme: true
                        }
                    },
                    evaluationReponses: true
                }
            });
            return question;
        } catch (error) {
            console.error('Erreur lors de la récupération de la question:', error);
            throw new Error('Impossible de récupérer la question');
        }
    }

    async findByCategorieId(categorieId: string): Promise<Question[]> {
        try {
            const questions = await prisma.question.findMany({
                where: { categorieId: parseInt(categorieId) },
                orderBy: {
                    ordre: 'asc'
                }
            });
            return questions;
        } catch (error) {
            console.error('Erreur lors de la récupération des questions par catégorie:', error);
            throw new Error('Impossible de récupérer les questions par catégorie');
        }
    }

    async findByLibelleAndThemeId(libelle: string, themeId: number): Promise<Question | null> {
        try {
            const question = await prisma.question.findFirst({
                where: {
                    libelle: libelle,
                    categorie: {
                        themeId: themeId,
                    },
                },
            });
            return question;
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'unicité de la question:', error);
            throw new Error('Impossible de vérifier l\'unicité de la question');
        }
    }

    async update(id: string, data: UpdateQuestionInput): Promise<Question> {
        try {
            const question = await prisma.question.update({
                where: {id: parseInt(id)},
                data: {
                    libelle: data.libelle,
                    categorieId: data.categorieId,
                    ordre: data.ordre
                },
            });
            return question;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la question:', error);
            throw new Error('Impossible de mettre à jour la question');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.question.delete({
                where: {id: parseInt(id)}
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la question:', error);
            throw new Error('Impossible de supprimer la question');
        }
    }

}

export default new QuestionRepository();
