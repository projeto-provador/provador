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

/** "O que acontece depois" — reduz o atrito de preencher (SPEC §6.3). */
export const PROCESSO = {
  titulo: "O que acontece depois",
  passos: [
    {
      titulo: "1. Conversa de diagnóstico",
      texto: "Em até 1 dia útil, uma call curta para entender o caso real e ver se é ICP.",
    },
    {
      titulo: "2. Piloto sobre um caso seu",
      texto:
        "Em uma semana mostramos o resultado num caso real — com o seu especialista revisando e assinando.",
    },
    {
      titulo: "3. Você decide",
      texto:
        "Entregou, seguimos: cobrança por resultado, com financiamento em até 36x. Não entregou, você não paga.",
    },
  ],
} as const;
