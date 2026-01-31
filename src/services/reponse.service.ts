import reponseRepository from "../repositories/reponse.repository.js";
import type { CreateReponseInput, UpdateReponseInput } from "../validators/ReponseSchema.js";

class ReponseService {

    async countReponse() {
        try {
            const count = await reponseRepository.count();
            return count;
        } catch (error) {
            console.error('Erreur dans le service lors du comptage des réponses:', error);
            throw error;
        }
    }

    async createReponse(data: CreateReponseInput) {
        try {
            const reponse = await reponseRepository.create(data);
            return {
                id: reponse.id.toString(),
                libelle: reponse.libelle,
                point: reponse.point,
                ordre: reponse.ordre,
                createdAt: reponse.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création de la réponse:', error);
            throw error;
        }
    }

    async getAllReponses() {
        try {
            const reponses = await reponseRepository.findAll();

            if (!reponses || reponses.length === 0) {
                throw new Error('Aucune réponse existante');
            }

            return reponses.map(reponse => ({
                id: reponse.id.toString(),
                libelle: reponse.libelle,
                point: reponse.point,
                ordre: reponse.ordre,
                createdAt: reponse.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des réponses:', error);
            throw error;
        }
    }

    async getReponseById(id: string) {
        try {
            const existingReponse = await reponseRepository.findById(id);
            if (!existingReponse) {
                throw new Error('Réponse non trouvée');
            }
            return {
                id: existingReponse.id.toString(),
                libelle: existingReponse.libelle,
                point: existingReponse.point,
                ordre: existingReponse.ordre,
                createdAt: existingReponse.createdAt
            };
        } catch(error){
            console.error('Erreur dans le service lors de la récupération de la réponse par ID:', error);
            throw error;
        }
    }

    async updateReponse(id: string, data: UpdateReponseInput) {
        try {
            const existingReponse = await reponseRepository.findById(id);
            if (!existingReponse) {
                throw new Error('Réponse non trouvée');
            }

            const updated = await reponseRepository.update(id, data);
            return {
                id: updated.id.toString(),
                libelle: updated.libelle,
                point: updated.point,
                ordre: updated.ordre,
                createdAt: updated.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour de la réponse:', error);
            throw error;
        }
    }

    async deleteReponse(id: string) {
        try {
            const existingReponse = await reponseRepository.findById(id);
            if (!existingReponse) {
                throw new Error('Réponse non trouvée');
            }
            await reponseRepository.delete(id);

            return { message: 'Réponse supprimée avec succès' };

        } catch (error) {
            console.error('Erreur dans le service lors de la suppression de la réponse:', error);
            throw error;
        }
    }

    async getReponsesByPointGreaterThan(point: number) {
        try {
            const reponses = await reponseRepository.findByPointGreaterThan(point);

            if (!reponses || reponses.length === 0) {
                throw new Error('Aucune réponse trouvée avec un point supérieur à ' + point);
            }

            return reponses.map(reponse => ({
                id: reponse.id.toString(),
                libelle: reponse.libelle,
                point: reponse.point,
                ordre: reponse.ordre,
                createdAt: reponse.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des réponses par point:', error);
            throw error;
        }
    }

    async getReponsesByPointLessThan(point: number) {
        try {
            const reponses = await reponseRepository.findByPointLessThan(point);

            if (!reponses || reponses.length === 0) {
                throw new Error('Aucune réponse trouvée avec un point inférieur à ' + point);
            }

            return reponses.map(reponse => ({
                id: reponse.id.toString(),
                libelle: reponse.libelle,
                point: reponse.point,
                ordre: reponse.ordre,
                createdAt: reponse.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des réponses par point:', error);
            throw error;
        }
    }

}

export default new ReponseService();
