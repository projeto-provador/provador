import { z } from "zod";

/** Captura de newsletter — ativo de audiência (Fosso, Pulizzi/Content Inc.). */
export const newsletterSchema = z.object({
  email: z.email("Esse email não parece válido").min(1, "Faltou o email"),
  /** Honeypot — humano não vê nem preenche. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export type NewsletterResult = { ok: true } | { ok: false; error: string };
