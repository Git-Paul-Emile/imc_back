import { z } from "zod";

export const createEvaluationReponseSchema = z.object({
  evaluationId: z
    .number()
    .int("L'ID de l'évaluation doit être un entier")
    .positive("L'ID de l'évaluation doit être positif"),
  questionId: z
    .number()
    .int("L'ID de la question doit être un entier")
    .positive("L'ID de la question doit être positif"),
  reponseId: z
    .number()
    .int("L'ID de la réponse doit être un entier")
    .positive("L'ID de la réponse doit être positif"),
  pointObtenu: z
    .number()
    .int("Le point obtenu doit être un entier")
    .nonnegative("Le point obtenu doit être positif ou zéro"),
});

export const updateEvaluationReponseSchema = createEvaluationReponseSchema.partial();

export type CreateEvaluationReponseInput = z.infer<typeof createEvaluationReponseSchema>;
export type UpdateEvaluationReponseInput = z.infer<typeof updateEvaluationReponseSchema>;
