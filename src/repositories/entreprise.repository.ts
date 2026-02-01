import {prisma} from "../config/database.js"
import type { Entreprise } from "../../src/generated/prisma/client.js"
import type { CreateEntrepriseInput, UpdateEntrepriseInput } from "../validators/EntrepriseSchema.js"

class EntrepriseRepository {

    async count(): Promise<number> {
        try {
            const count = await prisma.entreprise.count();
            return count;
        } catch (error) {
            console.error('Erreur lors du comptage des entreprises:', error);
            throw new Error('Impossible de compter les entreprises');
        }
    }
    
    async create(data: CreateEntrepriseInput): Promise<Entreprise> {
        try {
            const entreprise = await prisma.entreprise.create({
                data: {
                    nom: data.nom,
                    domaineActivite: data.domaineActivite,
                    tel: data.tel,
                    email: data.email,
                    adresse: data.adresse
                }
            });
            return entreprise;
        } catch (error) {
            console.error('Erreur lors de la création de l\'entreprise:', error);
            throw new Error(`Impossible de créer l'entreprise: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        }
    }

    async findAll(): Promise<Entreprise[]> {
        try {
            const entreprises = await prisma.entreprise.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return entreprises;
        } catch (error) {
            console.error('Erreur lors de la récupération des entreprises:', error);
            throw new Error('Impossible de récupérer les entreprises');
        }
            
    }

    async findById(id: string): Promise<Entreprise | null> {
        try {
            const entreprise = await prisma.entreprise.findUnique({
                where: {id: parseInt(id)}
            });
            return entreprise;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'entreprise:', error);
            throw new Error('Impossible de récupérer l\'entreprise');
        }
    }

    async update(id: string, data: UpdateEntrepriseInput): Promise<Entreprise> {
        try {
            const entreprise = await prisma.entreprise.update({
                where: {id: parseInt(id)},
                data,
            });
            return entreprise;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
            throw new Error('Impossible de mettre à jour l\'entreprise');
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.entreprise.delete({
                where: {id: parseInt(id)}
            });
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'entreprise:', error);
            throw new Error('Impossible de supprimer l\'entreprise');
        }
    }

    async findByEmail(email: string): Promise<Entreprise | null> {
        try {
            const entreprise = await prisma.entreprise.findFirst({
                where: {email}
            });
            return entreprise;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'entreprise par email:', error);
            throw new Error('Impossible de récupérer l\'entreprise par email');
        }
    }

    async findByTel(tel: string): Promise<Entreprise | null> {
        try {
            const entreprise = await prisma.entreprise.findFirst({
                where: {tel}
            });
            return entreprise;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'entreprise par téléphone:', error);
            throw new Error('Impossible de récupérer l\'entreprise par téléphone');
        }
    }

    async getEvaluations(id: string): Promise<any> {
        try {
            const entreprise = await prisma.entreprise.findUnique({
                where: {id: parseInt(id)},
                include: {
                    evaluations: {
                        include: {
                            theme: true,
                            paiement: true,
                            reponses: {
                                include: {
                                    question: true,
                                    reponse: true
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
            });
            return entreprise?.evaluations || [];
        } catch (error) {
            console.error('Erreur lors de la récupération des évaluations de l\'entreprise:', error);
            throw new Error('Impossible de récupérer les évaluations de l\'entreprise');
        }
    }

}

export default new EntrepriseRepository();
