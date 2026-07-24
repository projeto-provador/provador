/**
 * A escada de ofertas (Fosso de Marketing, G1/F2 — Hormozi $100M Offers).
 * Resolve o gap "oferta única para todos": um degrau de baixo atrito (isca),
 * um de entrada com risco invertido, e o core por resultado.
 * Copy factual — nada de número de resultado inventado (CLAUDE.md §3.6).
 */

export const OFERTA = {
  eyebrow: "COMO COMEÇAR",
  titulo: "Três degraus — do risco zero ao resultado",
  intro:
    "Você não precisa apostar alto para começar. Cada degrau reduz o risco do próximo — e a assinatura é sempre do seu especialista.",
  degraus: [
    {
      nome: "Diagnóstico com IA",
      preco: "Gratuito",
      texto:
        "A IA mapeia onde o trabalho-commodity consome o seu especialista caro — e quanto disso dá para aposentar. Sem compromisso, sem cartão.",
      // TODO(feature): motor do diagnóstico automatizado (lead magnet). Hoje CTA → conversa.
      cta: { label: "Pedir o diagnóstico", href: "/contato?p=cliente" },
      destaque: false,
    },
    {
      nome: "Piloto de resultado",
      preco: "Se não entregar, você não paga",
      texto:
        "Um caso real seu, uma semana. Mostramos o resultado com o seu especialista revisando e assinando embaixo. O risco é nosso até a entrega.",
      cta: { label: "Começar o piloto", href: "/contato" },
      destaque: true,
    },
    {
      nome: "Operação por resultado",
      preco: "Cobrança por resultado · financiamento em até 36x",
      texto:
        "O motor treinado no seu contexto assume a vazão do commodity em produção. Cobra-se pelo desfecho entregue, não por licença — e o investimento pode ser parcelado em até 36x.",
      cta: { label: "Falar sobre a operação", href: "/contato?p=cliente" },
      destaque: false,
    },
  ],
  rodape:
    "Financiamento em até 36x nos degraus pagos. A cobrança fica atrelada ao resultado do cliente, não a uma tarifa fixa.",
} as const;
