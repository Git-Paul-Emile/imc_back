import { z } from "zod";
import { codeSchema } from "./enums.js";

export const createCategorieSchema = z.object({
  titre: z
    .string()
    .min(1, "Le titre est requis")
    .max(255, "Le titre ne peut pas dépasser 255 caractères"),
  code: codeSchema,
  themeId: z
    .number()
    .int("L'ID du thème doit être un entier")
    .positive("L'ID du thème doit être positif"),
});

export const updateCategorieSchema = createCategorieSchema.partial();

export type CreateCategorieInput = z.infer<typeof createCategorieSchema>;
export type UpdateCategorieInput = z.infer<typeof updateCategorieSchema>;
