import {prisma} from "../config/database.js"
import type { Evaluation } from "../../src/generated/prisma/client.js"
import type { CreateEvaluationInput, UpdateEvaluationInput } from "../validators/EvaluationSchema.js"
import type { SubmitEvaluationInput, ReponseItemInput } from "../validators/EvaluationSubmitSchema.js"

class EvaluationRepository {

    async count(): Promise<number> {
        try {
            const count = await prisma.evaluation.count();
            return count;
        } catch (error) {
            console.error('Erreur lors du comptage des évaluations:', error);
            throw new Error('Impossible de compter les évaluations');
        }
    }
    
    async create(data: CreateEvaluationInput): Promise<Evaluation> {
        try {
            const evaluation = await prisma.evaluation.create({
                data: {
                    entrepriseId: data.entrepriseId,
                    themeId: data.themeId,
                    motif: data.motif,
                    scoreTotal: data.scoreTotal ?? 0,
                    interpretationId: data.interpretationId,
                    isFree: data.isFree ?? false
                }
            });
            return evaluation;
        } catch (error) {
            console.error('Erreur lors de la création de l\'évaluation:', error);
            throw new Error(`Impossible de créer l'évaluation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async submitEvaluation(data: SubmitEvaluationInput): Promise<any> {
        try {
            // Calculer le score total
            const scoreTotal = data.reponses.reduce((sum, r) => sum + r.pointObtenu, 0);

            // Créer l'évaluation dans une transaction
            const result = await prisma.$transaction(async (tx) => {
                // Vérifier si l'entreprise existe déjà par email
                let entreprise = await tx.entreprise.findFirst({
                    where: { email: data.entreprise.email }
                });

                // Créer l'entreprise si elle n'existe pas
                if (!entreprise) {
                    entreprise = await tx.entreprise.create({
                        data: {
                            nom: data.entreprise.nom,
                            domaineActivite: data.entreprise.domaineActivite,
                            tel: data.entreprise.tel,
                            email: data.entreprise.email,
                            adresse: data.entreprise.adresse
                        }
                    });
                }

                // Créer l'évaluation
                const evaluation = await tx.evaluation.create({
                    data: {
                        entrepriseId: entreprise.id,
                        themeId: data.themeId,
                        motif: data.motif,
                        scoreTotal,
                        isFree: data.isFree ?? true
                    }
                });

                // Créer les réponses
                const evaluationReponses = [];
                for (const reponse of data.reponses) {
                    const evalRep = await tx.evaluationReponse.create({
                        data: {
                            evaluationId: evaluation.id,
                            questionId: reponse.questionId,
                            reponseId: reponse.reponseId,
                            pointObtenu: reponse.pointObtenu
                        },
                        include: {
                            question: true,
                            reponse: true
                        }
                    });
                    evaluationReponses.push(evalRep);
                }

                // Récupérer l'interprétation basée sur le score et le thème
                const interpretation = await tx.interpretation.findFirst({
                    where: {
                        themeId: data.themeId,
                        scoreMin: { lte: scoreTotal },
                        scoreMax: { gte: scoreTotal }
                    },
                    include: {
                        recommandation: true
                    }
                });

                // Mettre à jour l'interprétation de l'évaluation
                if (interpretation) {
                    await tx.evaluation.update({
                        where: { id: evaluation.id },
                        data: { interpretationId: interpretation.id }
                    });
                }

                return {
                    evaluation: {
                        ...evaluation,
                        entreprise,
                        interpretation,
                        recommandations: interpretation?.recommandation
                    },
                    reponses: evaluationReponses
                };
            });

            return result;
        } catch (error) {
            console.error('Erreur lors de la soumission de l\'évaluation:', error);
            throw new Error(`Impossible de soumettre l'évaluation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async createWithReponses(data: CreateEvaluationInput): Promise<{ evaluation: Evaluation; reponses: any[] }> {
        try {
            // Créer l'évaluation
            const evaluation = await prisma.evaluation.create({
                data: {
                    entrepriseId: data.entrepriseId,
                    themeId: data.themeId,
                    motif: data.motif,
                    scoreTotal: data.scoreTotal ?? 0,
                    interpretationId: data.interpretationId,
                    isFree: data.isFree ?? false
                }
            });

            // Récupérer les questions du thème
            const questions = await prisma.question.findMany({
                where: {
                    categorie: {
                        themeId: data.themeId
                    }
                }
            });

            // Créer les EvaluationReponse pour chaque question
            const evaluationReponses = [];
            for (const question of questions) {
                const evalRep = await prisma.evaluationReponse.create({
                    data: {
                        evaluationId: evaluation.id,
                        questionId: question.id,
                        reponseId: 0, // Valeur par défaut, sera mise à jour
                        pointObtenu: 0
                    }
                });
                evaluationReponses.push(evalRep);
            }

            return { evaluation, reponses: evaluationReponses };
        } catch (error) {
            console.error('Erreur lors de la création de l\'évaluation avec réponses:', error);
            throw new Error(`Impossible de créer l'évaluation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Evaluation[]> {
        try {
            const evaluations = await prisma.evaluation.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    entreprise: true,
                    theme: true,
                    interpretation: true,
                    reponses: true
                }
            });
            return evaluations;
        } catch (error) {
            console.error('Erreur lors de la récupération des évaluations:', error);
            throw new Error('Impossible de récupérer les évaluations');
        }
            
    }

    async findById(id: string): Promise<Evaluation | null> {
        try {
            const evaluation = await prisma.evaluation.findUnique({
                where: {id: parseInt(id)},
                include: {
                    entreprise: true,
                    theme: true,
                    interpretation: true,
                    reponses: {
                        include: {
                            question: true,
                            reponse: true
                        }
                    },
                    paiement: true
                }
            });
            return evaluation;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'évaluation:', error);
            throw new Error('Impossible de récupérer l\'évaluation');
        }
    }

    async findByEntreprise(entrepriseId: string): Promise<Evaluation[]> {
        try {
            const evaluations = await prisma.evaluation.findMany({
                where: {entrepriseId: parseInt(entrepriseId)},
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    theme: true,
                    interpretation: true
                }
            });
            return evaluations;
        } catch (error) {
            console.error('Erreur lors de la récupération des évaluations par entreprise:', error);
            throw new Error('Impossible de récupérer les évaluations');
        }
    }

    async findByTheme(themeId: string): Promise<Evaluation[]> {
        try {
            const evaluations = await prisma.evaluation.findMany({
                where: {themeId: parseInt(themeId)},
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    entreprise: true,
                    interpretation: true
                }
            });
            return evaluations;
        } catch (error) {
            console.error('Erreur lors de la récupération des évaluations par thème:', error);
            throw new Error('Impossible de récupérer les évaluations');
        }
    }

    async update(id: string, data: Partial<UpdateEvaluationInput>): Promise<Evaluation> {
        try {
            const evaluation = await prisma.evaluation.update({
                where: {id: parseInt(id)},
                data,
            });
            return evaluation;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'évaluation:', error);
            throw new Error('Impossible de mettre à jour l\'évaluation');
        }
    }

    async updateScore(id: string, scoreTotal: number): Promise<Evaluation> {
        try {
            const evaluation = await prisma.evaluation.update({
                where: {id: parseInt(id)},
                data: { scoreTotal },
            });
            return evaluation;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du score de l\'évaluation:', error);
            throw new Error('Impossible de mettre à jour le score');
        }
    }

    async setInterpretation(id: string, interpretationId: number | null): Promise<Evaluation> {
        try {
            const evaluation = await prisma.evaluation.update({
                where: {id: parseInt(id)},
                data: { interpretationId },
            });
            return evaluation;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'interprétation:', error);
            throw new Error('Impossible de mettre à jour l\'interprétation');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.evaluation.delete({
                where: {id: parseInt(id)}
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'évaluation:', error);
            throw new Error('Impossible de supprimer l\'évaluation');
        }
    }

    async addReponse(evaluationId: string, questionId: number, reponseId: number, pointObtenu: number) {
        try {
            const evaluationReponse = await prisma.evaluationReponse.create({
                data: {
                    evaluationId: parseInt(evaluationId),
                    questionId,
                    reponseId,
                    pointObtenu
                }
            });
            return evaluationReponse;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réponse à l\'évaluation:', error);
            throw new Error('Impossible d\'ajouter la réponse');
        }
    }

    async getReponses(evaluationId: string) {
        try {
            const reponses = await prisma.evaluationReponse.findMany({
                where: {evaluationId: parseInt(evaluationId)},
                include: {
                    question: true,
                    reponse: true
                }
            });
            return reponses;
        } catch (error) {
            console.error('Erreur lors de la récupération des réponses:', error);
            throw new Error('Impossible de récupérer les réponses');
        }
    }
}

export default new EvaluationRepository();
