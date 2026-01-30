import { z } from "zod";
import { statutPaiementSchema, moyenPaiementSchema } from "./enums.js"
export const createPaiementSchema = z.object({
	evaluationId: z
		.number()
		.int("L'ID de l'évaluation doit être un entier")
		.positive("L'ID de l'évaluation doit être positif"),
	montant: z
		.number()
		.nonnegative("Le montant doit être positif ou zéro")
		.refine((n) => Number.isFinite(n) && Math.round(n * 100) === Math.round(n * 100), {
			message: "Le montant doit avoir au maximum 2 décimales",
		}),
	statut: statutPaiementSchema.default("EN_ATTENTE"),
	moyenPaiement: moyenPaiementSchema.optional().nullable(),
	reference: z
		.string()
		.min(1, "La référence est requise")
		.max(255, "La référence ne peut pas dépasser 255 caractères"),
});

export const updatePaiementSchema = createPaiementSchema.partial();

export type CreatePaiementInput = z.infer<typeof createPaiementSchema>;
export type UpdatePaiementInput = z.infer<typeof updatePaiementSchema>;