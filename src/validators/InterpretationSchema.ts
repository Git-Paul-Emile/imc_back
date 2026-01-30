import { z } from "zod";

export const createInterpretationSchema = z.object({
  titre: z
    .string()
    .min(1, "Le titre est requis")
    .max(255, "Le titre ne peut pas dépasser 255 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .max(5000, "La description ne peut pas dépasser 5000 caractères"),
  recommandationId: z
    .number()
    .int("L'ID de la recommandation doit être un entier")
    .positive("L'ID de la recommandation doit être positif"),
  scoreMin: z
    .number()
    .int("Le score minimum doit être un entier")
    .nonnegative("Le score minimum doit être positif ou zéro"),
  scoreMax: z
    .number()
    .int("Le score maximum doit être un entier")
    .nonnegative("Le score maximum doit être positif ou zéro"),
  themeId: z
    .number()
    .int("L'ID du thème doit être un entier")
    .positive("L'ID du thème doit être positif"),
}).refine((data) => data.scoreMax >= data.scoreMin, {
  message: "Le score maximum doit être supérieur ou égal au score minimum",
  path: ["scoreMax"],
});

export const updateInterpretationSchema = createInterpretationSchema.partial();

export type CreateInterpretationInput = z.infer<typeof createInterpretationSchema>;
export type UpdateInterpretationInput = z.infer<typeof updateInterpretationSchema>;
