import { z } from "zod";

export const createQuestionSchema = z.object({
  libelle: z
    .string()
    .min(1, "Le libellé est requis")
    .max(500, "Le libellé ne peut pas dépasser 500 caractères"),
  categorieId: z
    .number()
    .int("L'ID de la catégorie doit être un entier")
    .positive("L'ID de la catégorie doit être positif"),
  ordre: z
    .number()
    .int("L'ordre doit être un entier")
    .nonnegative("L'ordre doit être positif ou zéro")
    .optional()
    .default(0),
});

export const updateQuestionSchema = createQuestionSchema.partial();

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
