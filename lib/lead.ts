import { z } from "zod";

/** Erros humanos e específicos — CONTENT.md §13 ("Faltou o email" > "Campo inválido"). */
export const leadSchema = z.object({
  nome: z.string().min(2, "Faltou o nome"),
  email: z.email("Esse email não parece válido").min(1, "Faltou o email"),
  empresa: z.string().optional(),
  // TODO(spec): default do segmento sem ?p= — assumido "cliente" até o owner confirmar
  segmento: z.enum(["cliente", "investidor", "ecossistema"]),
  mensagem: z.string().min(10, "Conta o caso em pelo menos uma frase"),
  /** SRA (Self-Reported Attribution) — a camada 0 de medição do dark funnel. */
  comoChegou: z.string().optional(),
  /** Honeypot — humano não vê nem preenche. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadResult = { ok: true } | { ok: false; error: string };
