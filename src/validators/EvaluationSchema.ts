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
