import { z } from "zod";
import { StatutPaiement, MoyenPaiement, Code } from "../generated/prisma/enums.js";

export const statutPaiementSchema = z.enum(Object.values(StatutPaiement));
export const moyenPaiementSchema = z.enum(Object.values(MoyenPaiement));
export const codeSchema = z.enum(Object.values(Code) as ["A", "B", "C"]);
