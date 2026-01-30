import { z } from "zod";

export const createRecommandationSchema = z.object({
  description: z
    .string()
    .min(1, "La description est requise")
    .max(5000, "La description ne peut pas dépasser 5000 caractères"),
});

export const updateRecommandationSchema = createRecommandationSchema.partial();

export type CreateRecommandationInput = z.infer<typeof createRecommandationSchema>;
export type UpdateRecommandationInput = z.infer<typeof updateRecommandationSchema>;
