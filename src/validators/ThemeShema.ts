import { z } from 'zod';

// Schéma pour la création d'un thème
export const createThemeSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis').max(255, 'Le titre ne peut pas dépasser 255 caractères'),
});

// Schéma pour la mise à jour d'un thème
export const updateThemeSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis').max(255, 'Le titre ne peut pas dépasser 255 caractères').optional(),
});

// Schéma pour l'ID du thème (pour les routes qui nécessitent un ID)
export const themeIdSchema = z.object({
  id: z.number().int().positive('L\'ID doit être un entier positif'),
});

// Types dérivés des schémas
export type CreateThemeInput = z.infer<typeof createThemeSchema>;
export type UpdateThemeInput = z.infer<typeof updateThemeSchema>;
export type ThemeIdInput = z.infer<typeof themeIdSchema>;