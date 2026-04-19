import { z } from "zod";

export const ChoiceSchema = z.object({
  id: z.string(),
  label: z.string().trim().min(1).max(60),
});

export const ChoicesArraySchema = z.array(ChoiceSchema).min(2).max(5);

export const SupportSchema = z.union([
  z.literal(3),
  z.literal(2),
  z.literal(1),
  z.literal(-1),
  z.literal("unknown"),
]);
