import { z } from "zod";
import { StatutPaiement, MoyenPaiement, Code } from "../generated/prisma/enums.js";

export const statutPaiementSchema = z.enum(StatutPaiement);
export const moyenPaiementSchema = z.enum(MoyenPaiement);
export const codeSchema = z.enum(Code);
