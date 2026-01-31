import categorieRepository from "../repositories/categorie.repository.js";
import type { CreateCategorieInput, UpdateCategorieInput } from "../validators/CategorieSchema.js";

class CategorieService {

    async createCategorie(data: CreateCategorieInput) {
        try {
            const categorie = await categorieRepository.create(data);
            return {
                id: categorie.id.toString(),
                titre: categorie.titre,
                code: categorie.code,
                themeId: categorie.themeId,
                createdAt: categorie.createdAt
            };
        } catch(error) {
            console.error('Erreur dans le service lors de la création de la catégorie:', error);
            throw error;
        }
    }

    async getAllCategories() {
        try {
            const categories = await categorieRepository.findAll();

            if (!categories || categories.length === 0) {
                throw new Error('Aucune catégorie existante');
            }

            return categories.map(categorie => ({
                id: categorie.id.toString(),
                titre: categorie.titre,
                code: categorie.code,
                themeId: categorie.themeId,
                createdAt: categorie.createdAt
            }));
        } catch(error) {
            console.error('Erreur dans le service lors de la récupération des catégories:', error);
            throw error;
        }
    }

    async getCategorieById(id: string) {
        try {
            const existingCategorie = await categorieRepository.findById(id);

            if (!existingCategorie) {
                throw new Error('Catégorie non trouvée');
            }

            return {
                id: existingCategorie.id.toString(),
                titre: existingCategorie.titre,
                code: existingCategorie.code,
                themeId: existingCategorie.themeId,
                createdAt: existingCategorie.createdAt
            };
        } catch(error) {
            console.error('Erreur dans le service lors de la récupération de la catégorie:', error);
            throw error;
        }
    }

    async updateCategorie(id: string, data: UpdateCategorieInput) {
        try {
            const existingCategorie = await categorieRepository.findById(id);

            if (!existingCategorie) {
                throw new Error('Catégorie non trouvée');
            }

            const updatedCategorie = await categorieRepository.update(id, data);

            return {
                id: updatedCategorie.id.toString(),
                titre: updatedCategorie.titre,
                code: updatedCategorie.code,
                themeId: updatedCategorie.themeId,
                createdAt: updatedCategorie.createdAt
            };
        } catch(error) {
            console.error('Erreur dans le service lors de la mise à jour de la catégorie:', error);
            throw error;
        }
    }
    async deleteCategorie(id: string) {
        try {
            const existingCategorie = await categorieRepository.findById(id);
            if (!existingCategorie) {
                throw new Error('Catégorie non trouvée');
            }
            await categorieRepository.delete(id);
        } catch(error) {
            console.error('Erreur dans le service lors de la suppression de la catégorie:', error);
            throw error;
        }
    }
}

export default new CategorieService();