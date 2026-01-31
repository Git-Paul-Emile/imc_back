import themeRepository from "../repositories/theme.repository.js";
import type { CreateCategorieInput } from "../validators/CategorieSchema.js";
import type { UpdateThemeInput } from "../validators/ThemeShema.js";

class ThemeService {

    async countTheme() {
        try {
            const themes = await themeRepository.findAll();
            return themes.length;
        } catch (error) {
            console.error('Erreur dans le service lors du comptage des thèmes:', error);
            throw error;
        }
    }

    async createTheme(data: CreateCategorieInput) {
        try {
            const theme = await themeRepository.create(data);
            return {
                id: theme.id.toString(),
                title: theme.titre,
                createdAt: theme.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création du thème:', error);
            throw error;
        }
    }

    async getAllThemes() {
        try {
            
            const themes = await themeRepository.findAll();

            if (!themes || themes.length === 0) {
                throw new Error('Aucun thème existant');
            }

            return themes.map(theme => ({
                id: theme.id.toString(),
                title: theme.titre,
                createdAt: theme.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des thèmes:', error);
            throw error;
        }
    }

    async getThemeById(id: string) {
        try {
            const existingTheme = await themeRepository.findById(id);
            if (!existingTheme) {
                throw new Error('Thème non trouvé');
            }
            return {
                id: existingTheme.id.toString(),
                title: existingTheme.titre,
                createdAt: existingTheme.createdAt
            }
        } catch(error){
            console.error('Erreur dans le service lors de la récupération du thème par ID:', error);
            throw error;
        }
    }

    async updateTheme(id: string, data: UpdateThemeInput) {
        try {
            // Vérifier si le thème existe
            const existingTheme = await themeRepository.findById(id);
            if (!existingTheme) {
                throw new Error('Thème non trouvé');
            }

            const updated = await themeRepository.update(id, data);
            return {
                id: updated.id.toString(),
                title: updated.titre,
                createdAt: updated.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour du thème:', error);
            throw error;
        }
    }

    async deleteTheme(id: string) {
        try {
            const existingTheme = await themeRepository.findById(id);
            if (!existingTheme) {
                throw new Error('Thème non trouvé');
            }
            await themeRepository.delete(id);

            return { message: 'Thème supprimé avec succès' };

        } catch (error) {
            console.error('Erreur dans le service lors de la suppression du thème:', error);
            throw error;
        }
    }

    
}

export default new ThemeService();
