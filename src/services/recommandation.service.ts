import recommandationRepository from "../repositories/recommandation.repository.js";
import type { CreateRecommandationInput, UpdateRecommandationInput } from "../validators/RecommandationSchema.js";

class RecommandationService {

    async countRecommandation() {
        try {
            const count = await recommandationRepository.count();
            return count;
        } catch (error) {
            console.error('Erreur dans le service lors du comptage des recommandations:', error);
            throw error;
        }
    }

    async createRecommandation(data: CreateRecommandationInput) {
        try {
            const recommandation = await recommandationRepository.create(data);
            return {
                id: recommandation.id.toString(),
                description: recommandation.description,
                createdAt: recommandation.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création de la recommandation:', error);
            throw error;
        }
    }

    async getAllRecommandations() {
        try {
            const recommandations = await recommandationRepository.findAll();

            if (!recommandations || recommandations.length === 0) {
                throw new Error('Aucune recommandation existante');
            }

            return recommandations.map(recommandation => ({
                id: recommandation.id.toString(),
                description: recommandation.description,
                createdAt: recommandation.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des recommandations:', error);
            throw error;
        }
    }

    async getRecommandationById(id: string) {
        try {
            const existingRecommandation = await recommandationRepository.findById(id);
            if (!existingRecommandation) {
                throw new Error('Recommandation non trouvée');
            }
            return {
                id: existingRecommandation.id.toString(),
                description: existingRecommandation.description,
                createdAt: existingRecommandation.createdAt
            };
        } catch(error){
            console.error('Erreur dans le service lors de la récupération de la recommandation par ID:', error);
            throw error;
        }
    }

    async updateRecommandation(id: string, data: UpdateRecommandationInput) {
        try {
            // Vérifier si la recommandation existe
            const existingRecommandation = await recommandationRepository.findById(id);
            if (!existingRecommandation) {
                throw new Error('Recommandation non trouvée');
            }

            const updated = await recommandationRepository.update(id, data);
            return {
                id: updated.id.toString(),
                description: updated.description,
                createdAt: updated.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour de la recommandation:', error);
            throw error;
        }
    }

    async deleteRecommandation(id: string) {
        try {
            const existingRecommandation = await recommandationRepository.findById(id);
            if (!existingRecommandation) {
                throw new Error('Recommandation non trouvée');
            }
            await recommandationRepository.delete(id);

            return { message: 'Recommandation supprimée avec succès' };

        } catch (error) {
            console.error('Erreur dans le service lors de la suppression de la recommandation:', error);
            throw error;
        }
    }

}

export default new RecommandationService();
