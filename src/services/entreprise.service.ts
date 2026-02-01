import entrepriseRepository from "../repositories/entreprise.repository.js";
import type { CreateEntrepriseInput, UpdateEntrepriseInput } from "../validators/EntrepriseSchema.js";

class EntrepriseService {

    async countEntreprise() {
        try {
            const count = await entrepriseRepository.count();
            return count;
        } catch (error) {
            console.error('Erreur dans le service lors du comptage des entreprises:', error);
            throw error;
        }
    }

    async createEntreprise(data: CreateEntrepriseInput) {
        try {
            // Vérifier si l'email existe déjà
            const existingByEmail = await entrepriseRepository.findByEmail(data.email);
            if (existingByEmail) {
                throw new Error('Une entreprise avec cet email existe déjà');
            }

            // Vérifier si le téléphone existe déjà
            const existingByTel = await entrepriseRepository.findByTel(data.tel);
            if (existingByTel) {
                throw new Error('Une entreprise avec ce numéro de téléphone existe déjà');
            }

            const entreprise = await entrepriseRepository.create(data);
            return {
                id: entreprise.id.toString(),
                nom: entreprise.nom,
                domaineActivite: entreprise.domaineActivite,
                tel: entreprise.tel,
                email: entreprise.email,
                adresse: entreprise.adresse,
                createdAt: entreprise.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création de l\'entreprise:', error);
            throw error;
        }
    }

    async getAllEntreprises() {
        try {
            const entreprises = await entrepriseRepository.findAll();

            if (!entreprises || entreprises.length === 0) {
                throw new Error('Aucune entreprise existante');
            }

            return entreprises.map(entreprise => ({
                id: entreprise.id.toString(),
                nom: entreprise.nom,
                domaineActivite: entreprise.domaineActivite,
                tel: entreprise.tel,
                email: entreprise.email,
                adresse: entreprise.adresse,
                createdAt: entreprise.createdAt
            }));
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des entreprises:', error);
            throw error;
        }
    }

    async getEntrepriseById(id: string) {
        try {
            const existingEntreprise = await entrepriseRepository.findById(id);
            if (!existingEntreprise) {
                throw new Error('Entreprise non trouvée');
            }
            return {
                id: existingEntreprise.id.toString(),
                nom: existingEntreprise.nom,
                domaineActivite: existingEntreprise.domaineActivite,
                tel: existingEntreprise.tel,
                email: existingEntreprise.email,
                adresse: existingEntreprise.adresse,
                createdAt: existingEntreprise.createdAt
            };
        } catch(error){
            console.error('Erreur dans le service lors de la récupération de l\'entreprise par ID:', error);
            throw error;
        }
    }

    async updateEntreprise(id: string, data: UpdateEntrepriseInput) {
        try {
            // Vérifier si l'entreprise existe
            const existingEntreprise = await entrepriseRepository.findById(id);
            if (!existingEntreprise) {
                throw new Error('Entreprise non trouvée');
            }

            // Vérifier si le nouvel email existe déjà (si modifié)
            if (data.email && data.email !== existingEntreprise.email) {
                const existingByEmail = await entrepriseRepository.findByEmail(data.email);
                if (existingByEmail) {
                    throw new Error('Une entreprise avec cet email existe déjà');
                }
            }

            // Vérifier si le nouveau téléphone existe déjà (si modifié)
            if (data.tel && data.tel !== existingEntreprise.tel) {
                const existingByTel = await entrepriseRepository.findByTel(data.tel);
                if (existingByTel) {
                    throw new Error('Une entreprise avec ce numéro de téléphone existe déjà');
                }
            }

            const updated = await entrepriseRepository.update(id, data);
            return {
                id: updated.id.toString(),
                nom: updated.nom,
                domaineActivite: updated.domaineActivite,
                tel: updated.tel,
                email: updated.email,
                adresse: updated.adresse,
                createdAt: updated.createdAt
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la mise à jour de l\'entreprise:', error);
            throw error;
        }
    }

    async deleteEntreprise(id: string) {
        try {
            const existingEntreprise = await entrepriseRepository.findById(id);
            if (!existingEntreprise) {
                throw new Error('Entreprise non trouvée');
            }
            await entrepriseRepository.delete(id);

            return { message: 'Entreprise supprimée avec succès' };

        } catch (error) {
            console.error('Erreur dans le service lors de la suppression de l\'entreprise:', error);
            throw error;
        }
    }

    async getEvaluations(id: string) {
        try {
            const existingEntreprise = await entrepriseRepository.findById(id);
            if (!existingEntreprise) {
                throw new Error('Entreprise non trouvée');
            }

            const evaluations = await entrepriseRepository.getEvaluations(id);
            return evaluations;
        } catch (error) {
            console.error('Erreur dans le service lors de la récupération des évaluations:', error);
            throw error;
        }
    }

    // Crée ou récupère une entreprise existante par email
    async createOrFind(data: CreateEntrepriseInput) {
        try {
            // Chercher par email d'abord
            const existingByEmail = await entrepriseRepository.findByEmail(data.email);
            if (existingByEmail) {
                return {
                    id: existingByEmail.id.toString(),
                    nom: existingByEmail.nom,
                    domaineActivite: existingByEmail.domaineActivite,
                    tel: existingByEmail.tel,
                    email: existingByEmail.email,
                    adresse: existingByEmail.adresse,
                    createdAt: existingByEmail.createdAt,
                    isNew: false
                };
            }

            // Vérifier le téléphone
            const existingByTel = await entrepriseRepository.findByTel(data.tel);
            if (existingByTel) {
                return {
                    id: existingByTel.id.toString(),
                    nom: existingByTel.nom,
                    domaineActivite: existingByTel.domaineActivite,
                    tel: existingByTel.tel,
                    email: existingByTel.email,
                    adresse: existingByTel.adresse,
                    createdAt: existingByTel.createdAt,
                    isNew: false
                };
            }

            // Créer nouvelle entreprise
            const entreprise = await entrepriseRepository.create(data);
            return {
                id: entreprise.id.toString(),
                nom: entreprise.nom,
                domaineActivite: entreprise.domaineActivite,
                tel: entreprise.tel,
                email: entreprise.email,
                adresse: entreprise.adresse,
                createdAt: entreprise.createdAt,
                isNew: true
            };
        } catch (error) {
            console.error('Erreur dans le service lors de la création/récupération de l\'entreprise:', error);
            throw error;
        }
    }

}

export default new EntrepriseService();
