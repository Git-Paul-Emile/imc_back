import { z } from "zod";

export const createEvaluationSchema = z.object({
  entrepriseId: z
    .number()
    .int("L'ID de l'entreprise doit être un entier")
    .positive("L'ID de l'entreprise doit être positif"),
  themeId: z
    .number()
    .int("L'ID du thème doit être un entier")
    .positive("L'ID du thème doit être positif"),
  motif: z
    .string()
    .min(2, "Le motif doit contenir au moins 2 caractères")
    .max(255, "Le motif ne doit pas dépasser 255 caractères"),
  scoreTotal: z
    .number()
    .int("Le score total doit être un entier")
    .nonnegative("Le score total doit être positif ou zéro")
    .optional()
    .default(0),
  interpretationId: z
    .number()
    .int("L'ID de l'interprétation doit être un entier")
    .positive("L'ID de l'interprétation doit être positif")
    .optional()
    .nullable(),
  isFree: z
    .boolean()
    .optional()
    .default(false),
});

export const updateEvaluationSchema = createEvaluationSchema.partial();

export type CreateEvaluationInput = z.infer<typeof createEvaluationSchema>;
export type UpdateEvaluationInput = z.infer<typeof updateEvaluationSchema>;
