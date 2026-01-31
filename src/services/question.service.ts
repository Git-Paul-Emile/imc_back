import questionRepository from "../repositories/question.repository.js";
import categorieRepository from "../repositories/categorie.repository.js";
import type { CreateQuestionInput, UpdateQuestionInput } from "../validators/QuestionSchema.js";

class QuestionService {

    async countQuestions() {
        try {
            const count = await questionRepository.count();
            return count;
        } catch (error) {
            console.error('Erreur dans le service lors du comptage des questions:', error);
            throw error;
        }
    }

    async createQuestion(data: CreateQuestionInput) {
        try {
            // Récupérer le themeId de la catégorie
            const categorie = await categorieRepository.findById(data.categorieId.toString());
            if (!categorie) {
                throw new Error('Catégorie non trouvée');
            }

            // Vérifier si une question avec le même libellé existe déjà dans ce thème
            const existingQuestion = await questionRepository.findByLibelleAndThemeId(
                data.libelle,
                categorie.themeId
            );
            if (existingQuestion) {
                throw new Error('Une question avec ce libellé existe déjà dans ce thème');
            }

            const question = await questionRepository.create(data);
            return {
                id: question.id.toString(),
                libelle: question.libelle,
                categorieId: question.categorieId,
                themeId: categorie.themeId,
                ordre: question.ordre,
                createdAt: question.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création de la question:', error);
            throw error;
        }
    }

    async getAllQuestions() {
        try {
            const questions = await questionRepository.findAll();

            if (!questions || questions.length === 0) {
                throw new Error('Aucune question existante');
            }

            return questions.map(question => ({
                id: question.id.toString(),
                libelle: question.libelle,
                categorieId: question.categorieId,
                themeId: (question as any).categorie?.themeId,
                ordre: question.ordre,
                createdAt: question.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des questions:', error);
            throw error;
        }
    }

    async getQuestionById(id: string) {
        try {
            const existingQuestion = await questionRepository.findById(id);
            if (!existingQuestion) {
                throw new Error('Question non trouvée');
            }
        return {
                id: existingQuestion.id.toString(),
                libelle: existingQuestion.libelle,
                categorieId: existingQuestion.categorieId,
                themeId: (existingQuestion as any).categorie?.themeId,
                ordre: existingQuestion.ordre,
                createdAt: existingQuestion.createdAt,
                updatedAt: existingQuestion.updatedAt
            };
        } catch(error){
            console.error('Erreur dans le service lors de la récupération de la question par ID:', error);
            throw error;
        }
    }

    async getQuestionsByCategorieId(categorieId: string) {
        try {
            const existingCategorie = await categorieRepository.findById(categorieId);

            if (!existingCategorie) {
                throw new Error('Catégorie non trouvée');
            }
            
            const questions = await questionRepository.findByCategorieId(categorieId);
            return questions.map(question => ({
                id: question.id.toString(),
                libelle: question.libelle,
                categorieId: question.categorieId,
                themeId: existingCategorie.themeId,
                ordre: question.ordre,
                createdAt: question.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des questions par catégorie:', error);
            throw error;
        }
    }

    async updateQuestion(id: string, data: UpdateQuestionInput) {
        try {
            const existingQuestion = await questionRepository.findById(id);
            if (!existingQuestion) {
                throw new Error('Question non trouvée');
            }

            // Si le libelle est modifié, vérifier l'unicité
            if (data.libelle && data.libelle !== existingQuestion.libelle) {
                // Récupérer le themeId de la catégorie (nouvelle ou existante)
                const categorieId = data.categorieId ?? existingQuestion.categorieId;
                const categorie = await categorieRepository.findById(categorieId.toString());
                if (!categorie) {
                    throw new Error('Catégorie non trouvée');
                }

                const questionWithSameLibelle = await questionRepository.findByLibelleAndThemeId(
                    data.libelle,
                    categorie.themeId
                );
                if (questionWithSameLibelle && questionWithSameLibelle.id !== existingQuestion.id) {
                    throw new Error('Une question avec ce libellé existe déjà dans ce thème');
                }
            }

            const updated = await questionRepository.update(id, data);
            // Récupérer le themeId pour la réponse
            const updatedCategorie = await categorieRepository.findById(updated.categorieId.toString());
            return {
                id: updated.id.toString(),
                libelle: updated.libelle,
                categorieId: updated.categorieId,
                themeId: updatedCategorie?.themeId,
                ordre: updated.ordre,
                createdAt: updated.createdAt,
                updatedAt: updated.updatedAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour de la question:', error);
            throw error;
        }
    }

    async deleteQuestion(id: string) {
        try {
            const existingQuestion = await questionRepository.findById(id);
            if (!existingQuestion) {
                throw new Error('Question non trouvée');
            }
            await questionRepository.delete(id);

            return { message: 'Question supprimée avec succès' };

        } catch (error) {
            console.error('Erreur dans le service lors de la suppression de la question:', error);
            throw error;
        }
    }

}

export default new QuestionService();
