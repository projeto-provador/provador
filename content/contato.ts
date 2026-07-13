/** Copy canônica de /contato — CONTENT.md §7, §8 (literal). */

export const CONTATO = {
  eyebrow: "PILOTO",
  titulo: "Topa um piloto?",
  corpo: "Me dá um caso real — em uma semana mostro o resultado, com o seu especialista assinando.",
  destaque: "Se não entregar, você não paga.",
} as const;

/** Reforço para o público cliente (?p=cliente) — CONTENT.md §7 */
export const OFERTA_CLIENTE =
  "Me dá um caso real seu — um fechamento, um lote de leads, um contrato — e em uma semana mostro o resultado, com o seu especialista assinando embaixo. Se não entregar, você não paga.";

export const SEGMENTOS = [
  { value: "cliente", label: "Cliente" },
  { value: "investidor", label: "Investidor" },
  { value: "ecossistema", label: "Ecossistema tech" },
] as const;
