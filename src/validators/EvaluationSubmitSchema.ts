import { z } from "zod";

// Schema pour une réponse individuelle
export const reponseItemSchema = z.object({
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
    .min(1, "Le point minimum est 1")
    .max(4, "Le point maximum est 4"),
});

// Schema pour la soumission complète d'une évaluation
export const submitEvaluationSchema = z.object({
  entreprise: z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    domaineActivite: z.string().min(2, "Le domaine d'activité doit contenir au moins 2 caractères"),
    tel: z.string().min(8, "Le téléphone doit contenir au moins 8 caractères"),
    email: z.string().email("Email invalide"),
    adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  }),
  themeId: z
    .number()
    .int("L'ID du thème doit être un entier")
    .positive("L'ID du thème doit être positif"),
  motif: z
    .string()
    .min(2, "Le motif doit contenir au moins 2 caractères")
    .max(500, "Le motif ne doit pas dépasser 500 caractères"),
  isFree: z.boolean().optional().default(true),
  reponses: z
    .array(reponseItemSchema)
    .length(15, "Exactly 15 responses are required for a complete evaluation"),
});

export type SubmitEvaluationInput = z.infer<typeof submitEvaluationSchema>;
export type ReponseItemInput = z.infer<typeof reponseItemSchema>;
