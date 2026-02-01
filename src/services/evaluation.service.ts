import evaluationRepository from "../repositories/evaluation.repository.js";
import type { CreateEvaluationInput } from "../validators/EvaluationSchema.js";
import type { SubmitEvaluationInput } from "../validators/EvaluationSubmitSchema.js";

class EvaluationService {

    async countEvaluation() {
        try {
            return await evaluationRepository.count();
        } catch (error) {
            console.error('Erreur dans le service lors du comptage des évaluations:', error);
            throw error;
        }
    }

    async submitEvaluation(data: SubmitEvaluationInput) {
        try {
            const result = await evaluationRepository.submitEvaluation(data);
            return {
                id: result.evaluation.id.toString(),
                entrepriseId: result.evaluation.entrepriseId,
                themeId: result.evaluation.themeId,
                motif: result.evaluation.motif,
                scoreTotal: result.evaluation.scoreTotal,
                isFree: result.evaluation.isFree,
                createdAt: result.evaluation.createdAt,
                entreprise: {
                    id: result.evaluation.entreprise.id,
                    nom: result.evaluation.entreprise.nom,
                    domaineActivite: result.evaluation.entreprise.domaineActivite,
                    email: result.evaluation.entreprise.email,
                    tel: result.evaluation.entreprise.tel,
                    adresse: result.evaluation.entreprise.adresse
                },
                interpretation: result.evaluation.interpretation ? {
                    id: result.evaluation.interpretation.id,
                    titre: result.evaluation.interpretation.titre,
                    description: result.evaluation.interpretation.description,
                    scoreMin: result.evaluation.interpretation.scoreMin,
                    scoreMax: result.evaluation.interpretation.scoreMax
                } : null,
                recommandation: result.evaluation.recommandations ? {
                    description: result.evaluation.recommandations.description
                } : null,
                reponses: result.reponses.map(r => ({
                    id: r.id.toString(),
                    questionId: r.questionId,
                    questionLibelle: r.question.libelle,
                    reponseId: r.reponseId,
                    reponseLibelle: r.reponse.libelle,
                    pointObtenu: r.pointObtenu
                }))
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la soumission de l\'évaluation:', error);
            throw error;
        }
    }

    async createEvaluation(data: CreateEvaluationInput) {
        try {
            const result = await evaluationRepository.createWithReponses(data);
            return {
                id: result.evaluation.id.toString(),
                entrepriseId: result.evaluation.entrepriseId,
                themeId: result.evaluation.themeId,
                motif: result.evaluation.motif,
                scoreTotal: result.evaluation.scoreTotal,
                isFree: result.evaluation.isFree,
                createdAt: result.evaluation.createdAt,
                reponses: result.reponses.map(r => ({
                    id: r.id.toString(),
                    questionId: r.questionId,
                    reponseId: r.reponseId,
                    pointObtenu: r.pointObtenu
                }))
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création de l\'évaluation:', error);
            throw error;
        }
    }

    async getAllEvaluations() {
        try {
            const evaluations = await evaluationRepository.findAll();
            if (!evaluations || evaluations.length === 0) {
                throw new Error('Aucune évaluation existante');
            }
            return evaluations;
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des évaluations:', error);
            throw error;
        }
    }

    async getEvaluationById(id: string) {
        try {
            const existingEvaluation = await evaluationRepository.findById(id);
            if (!existingEvaluation) {
                throw new Error('Évaluation non trouvée');
            }
            return existingEvaluation;
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération de l\'évaluation par ID:', error);
            throw error;
        }
    }

    async getEvaluationsByEntreprise(entrepriseId: string) {
        try {
            return await evaluationRepository.findByEntreprise(entrepriseId);
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des évaluations par entreprise:', error);
            throw error;
        }
    }

    async getEvaluationsByTheme(themeId: string) {
        try {
            return await evaluationRepository.findByTheme(themeId);
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des évaluations par thème:', error);
            throw error;
        }
    }

    async updateEvaluation(id: string, data: Partial<CreateEvaluationInput>) {
        try {
            const existingEvaluation = await evaluationRepository.findById(id);
            if (!existingEvaluation) {
                throw new Error('Évaluation non trouvée');
            }
            const updated = await evaluationRepository.update(id, data);
            return {
                id: updated.id.toString(),
                entrepriseId: updated.entrepriseId,
                themeId: updated.themeId,
                motif: updated.motif,
                scoreTotal: updated.scoreTotal,
                isFree: updated.isFree,
                createdAt: updated.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour de l\'évaluation:', error);
            throw error;
        }
    }

    async updateEvaluationScore(id: string, scoreTotal: number) {
        try {
            const existingEvaluation = await evaluationRepository.findById(id);
            if (!existingEvaluation) {
                throw new Error('Évaluation non trouvée');
            }
            const updated = await evaluationRepository.updateScore(id, scoreTotal);
            return {
                id: updated.id.toString(),
                scoreTotal: updated.scoreTotal
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour du score de l\'évaluation:', error);
            throw error;
        }
    }

    async setEvaluationInterpretation(id: string, interpretationId: number | null) {
        try {
            const existingEvaluation = await evaluationRepository.findById(id);
            if (!existingEvaluation) {
                throw new Error('Évaluation non trouvée');
            }
            const updated = await evaluationRepository.setInterpretation(id, interpretationId);
            return {
                id: updated.id.toString(),
                interpretationId: updated.interpretationId
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour de l\'interprétation de l\'évaluation:', error);
            throw error;
        }
    }

    async deleteEvaluation(id: string) {
        try {
            const existingEvaluation = await evaluationRepository.findById(id);
            if (!existingEvaluation) {
                throw new Error('Évaluation non trouvée');
            }
            await evaluationRepository.delete(id);
            return { message: 'Évaluation supprimée avec succès' };
        } catch (error) {
            console.error('Erreur dans le service lors de la suppression de l\'évaluation:', error);
            throw error;
        }
    }

    async addEvaluationReponse(evaluationId: string, questionId: number, reponseId: number, pointObtenu: number) {
        try {
            const result = await evaluationRepository.addReponse(evaluationId, questionId, reponseId, pointObtenu);
            return {
                id: result.id.toString(),
                evaluationId: result.evaluationId,
                questionId: result.questionId,
                reponseId: result.reponseId,
                pointObtenu: result.pointObtenu
            };
        } catch (error) {
            console.error('Erreur dans le service lors de l\'ajout de la réponse à l\'évaluation:', error);
            throw error;
        }
    }

    async getEvaluationReponses(evaluationId: string) {
        try {
            return await evaluationRepository.getReponses(evaluationId);
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des réponses de l\'évaluation:', error);
            throw error;
        }
    }
}

export default new EvaluationService();
