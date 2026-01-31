import {prisma} from "../config/database.js"
import type { Categorie } from "../../src/generated/prisma/client.js"
import type { CreateCategorieInput, UpdateCategorieInput } from "../validators/CategorieSchema.js"

class CategorieRepository {
    async create(data: CreateCategorieInput): Promise<Categorie>{
        try {
            const categorie = await prisma.categorie.create({
                data: {
                    titre: data.titre,
                    code: data.code as import("../generated/prisma/enums.js").Code,
                    themeId: data.themeId
                }
            });
            return categorie;
        } catch (error) {
            console.error('Erreur lors de la création de la catégorie:', error);
            throw new Error(`Impossible de créer la catégorie: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Categorie[]> {
        try {
            const categories = await prisma.categorie.findMany({
                include: {
                    theme: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return categories;
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
            throw new Error('Impossible de récupérer les catégories');
        }
    } 

    async findById(id: string): Promise<Categorie | null> {
        try {
            const categorie = await prisma.categorie.findUnique({
                where: {id: parseInt(id)},
                include: {
                    theme: true
                }
            });
            return categorie;
        } catch (error) {
            console.error('Erreur lors de la récupération de la catégorie:', error);
            throw new Error('Impossible de récupérer la catégorie');
        }
    }

    async update(id: string, data: UpdateCategorieInput): Promise<Categorie> {
        try {
            const categorie = await prisma.categorie.update({
                where: {id: parseInt(id)},
                data: {
                    titre: data.titre,
                    code: data.code as import("../generated/prisma/enums.js").Code,
                    themeId: data.themeId
                }
            });
            return categorie;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la catégorie:', error);
            throw new Error('Impossible de mettre à jour la catégorie');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.categorie.delete({
                where: {id: parseInt(id)}
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie:', error);
            throw new Error('Impossible de supprimer la catégorie');
        }
    }

}

export default new CategorieRepository();