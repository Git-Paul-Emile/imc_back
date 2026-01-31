import {prisma} from "../config/database.js"
import type { Theme } from "../../src/generated/prisma/client.js"
import type { CreateThemeInput, UpdateThemeInput } from "../validators/ThemeShema.js"

class ThemeRepository {
    async create(data: CreateThemeInput): Promise<Theme> {
        try {
            const theme = await prisma.theme.create({
                data: {
                    titre: data.titre
                }
            });
            return theme;
        } catch (error) {
            console.error('Erreur lors de la création du thème:', error);
            throw new Error(`Impossible de créer le thème: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Theme[]> {
        try {
            const themes = await prisma.theme.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return themes;
        } catch (error) {
            console.error('Erreur lors de la récupération des thèmes:', error);
            throw new Error('Impossible de récupérer les thèmes');
        }
            
    }

    async findById(id: string): Promise<Theme | null> {
        try {
            const theme = await prisma.theme.findUnique({
                where: {id: parseInt(id)}
            });
            return theme;
        } catch (error) {
            console.error('Erreur lors de la récupération du thème:', error);
            throw new Error('Impossible de récupérer le thème');
        }
    }

    async update(id: string, data: Partial<Theme>):
    Promise<Theme> {
        try {
            const theme = await prisma.theme.update({
                where: {id: parseInt(id)},
                data,
            });
            return theme;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du thème:', error);
            throw new Error('Impossible de mettre à jour le thème');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.theme.delete({
                where: {id: parseInt(id)}
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du thème:', error);
            throw new Error('Impossible de supprimer le thème');
        }
    }

    async count(): Promise<number> {
        try {
            const count = await prisma.theme.count();
            return count;
        } catch (error) {
            console.error('Erreur lors du comptage des thèmes:', error);
            throw new Error('Impossible de compter les thèmes');
        }
    }

    
}

export default new ThemeRepository();