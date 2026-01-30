import { z } from "zod";

export const createReponseSchema = z.object({
  libelle: z
    .string()
    .min(1, "Le libellé est requis")
    .max(500, "Le libellé ne peut pas dépasser 500 caractères"),
  point: z
    .number()
    .int("Les points doivent être un entier")
    .nonnegative("Les points doivent être positifs ou zéro"),
  ordre: z
    .number()
    .int("L'ordre doit être un entier")
    .nonnegative("L'ordre doit être positif ou zéro")
    .optional()
    .default(0),
});

export const updateReponseSchema = createReponseSchema.partial();

export type CreateReponseInput = z.infer<typeof createReponseSchema>;
export type UpdateReponseInput = z.infer<typeof updateReponseSchema>;
