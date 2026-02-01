import interpretationRepository from "../repositories/interpretation.repository.js";
import type { CreateInterpretationInput, UpdateInterpretationInput } from "../validators/InterpretationSchema.js";

class InterpretationService {

    async countInterpretation() {
        try {
            const count = await interpretationRepository.count();
            return count;
        } catch (error) {
            console.error('Erreur dans le service lors du comptage des interprétations:', error);
            throw error;
        }
    }

    async createInterpretation(data: CreateInterpretationInput) {
        try {
            const interpretation = await interpretationRepository.create(data);
            return {
                id: interpretation.id.toString(),
                titre: interpretation.titre,
                description: interpretation.description,
                recommandationId: interpretation.recommandationId,
                scoreMin: interpretation.scoreMin,
                scoreMax: interpretation.scoreMax,
                themeId: interpretation.themeId,
                createdAt: interpretation.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création de l\'interprétation:', error);
            throw error;
        }
    }

    async getAllInterpretations() {
        try {
            const interpretations = await interpretationRepository.findAll();

            if (!interpretations || interpretations.length === 0) {
                throw new Error('Aucune interprétation existante');
            }

            return interpretations.map(interpretation => ({
                id: interpretation.id.toString(),
                titre: interpretation.titre,
                description: interpretation.description,
                recommandationId: interpretation.recommandationId,
                scoreMin: interpretation.scoreMin,
                scoreMax: interpretation.scoreMax,
                themeId: interpretation.themeId,
                createdAt: interpretation.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des interprétations:', error);
            throw error;
        }
    }

    async getInterpretationById(id: string) {
        try {
            const existingInterpretation = await interpretationRepository.findById(id);
            if (!existingInterpretation) {
                throw new Error('Interprétation non trouvée');
            }
            return {
                id: existingInterpretation.id.toString(),
                titre: existingInterpretation.titre,
                description: existingInterpretation.description,
                recommandationId: existingInterpretation.recommandationId,
                scoreMin: existingInterpretation.scoreMin,
                scoreMax: existingInterpretation.scoreMax,
                themeId: existingInterpretation.themeId,
                createdAt: existingInterpretation.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération de l\'interprétation par ID:', error);
            throw error;
        }
    }

    async getInterpretationsByThemeId(themeId: string) {
        try {
            const interpretations = await interpretationRepository.findByThemeId(themeId);

            if (!interpretations || interpretations.length === 0) {
                throw new Error('Aucune interprétation trouvée pour ce thème');
            }

            return interpretations.map(interpretation => ({
                id: interpretation.id.toString(),
                titre: interpretation.titre,
                description: interpretation.description,
                recommandationId: interpretation.recommandationId,
                scoreMin: interpretation.scoreMin,
                scoreMax: interpretation.scoreMax,
                themeId: interpretation.themeId,
                createdAt: interpretation.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des interprétations par thème:', error);
            throw error;
        }
    }

    async getInterpretationByScore(themeId: string, score: number) {
        try {
            const interpretation = await interpretationRepository.findByScoreRange(themeId, score);
            if (!interpretation) {
                throw new Error('Aucune interprétation trouvée pour ce score');
            }
            return {
                id: interpretation.id.toString(),
                titre: interpretation.titre,
                description: interpretation.description,
                recommandationId: interpretation.recommandationId,
                scoreMin: interpretation.scoreMin,
                scoreMax: interpretation.scoreMax,
                themeId: interpretation.themeId,
                createdAt: interpretation.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération de l\'interprétation par score:', error);
            throw error;
        }
    }

    async updateInterpretation(id: string, data: UpdateInterpretationInput) {
        try {
            const existingInterpretation = await interpretationRepository.findById(id);
            if (!existingInterpretation) {
                throw new Error('Interprétation non trouvée');
            }

            const updated = await interpretationRepository.update(id, data);
            return {
                id: updated.id.toString(),
                titre: updated.titre,
                description: updated.description,
                recommandationId: updated.recommandationId,
                scoreMin: updated.scoreMin,
                scoreMax: updated.scoreMax,
                themeId: updated.themeId,
                createdAt: updated.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour de l\'interprétation:', error);
            throw error;
        }
    }

    async deleteInterpretation(id: string) {
        try {
            const existingInterpretation = await interpretationRepository.findById(id);
            if (!existingInterpretation) {
                throw new Error('Interprétation non trouvée');
            }
            await interpretationRepository.delete(id);

            return { message: 'Interprétation supprimée avec succès' };

        } catch (error) {
            console.error('Erreur dans le service lors de la suppression de l\'interprétation:', error);
            throw error;
        }
    }
}

export default new InterpretationService();
