import { z } from "zod";

export const createEntrepriseSchema = z.object({
  nom: z
    .string()
    .min(1, "Le nom est requis")
    .max(255, "Le nom ne peut pas dépasser 255 caractères"),
  domaineActivite: z
    .string()
    .min(1, "Le domaine d'activité est requis")
    .max(255, "Le domaine d'activité ne peut pas dépasser 255 caractères"),
  tel: z
    .string()
    .min(1, "Le téléphone est requis")
    .max(20, "Le téléphone ne peut pas dépasser 20 caractères"),
  email: z
    .string()
    .email("L'email doit être valide")
    .min(1, "L'email est requis"),
  adresse: z
    .string()
    .min(1, "L'adresse est requise")
    .max(500, "L'adresse ne peut pas dépasser 500 caractères"),
  motif: z
    .string()
    .min(1, "Le motif est requis")
    .max(5000, "Le motif ne peut pas dépasser 5000 caractères"),
});

export const updateEntrepriseSchema = createEntrepriseSchema.partial();

export type CreateEntrepriseInput = z.infer<typeof createEntrepriseSchema>;
export type UpdateEntrepriseInput = z.infer<typeof updateEntrepriseSchema>;
