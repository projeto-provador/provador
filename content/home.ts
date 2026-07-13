/**
 * Copy canônica da Home — extraída literalmente de docs/CONTENT.md (seções indicadas).
 * Regra: nada aqui é inventado; alterações de texto passam por CONTENT.md primeiro.
 */

/** CONTENT.md §5 — Hero (copy aprovada) */
export const HERO = {
  eyebrow: "FÁBRICA DE PRODUTO AI-FIRST",
  h1: "IA que assume o resultado — com um humano que decide e assina.",
  subtitle:
    "Não vendemos software nem “agentes autônomos” que prometem e somem. Instalamos um método: a IA faz o trabalho-commodity, o especialista carrega o julgamento e a assinatura, e você paga por resultado.",
  ctaPrimary: { label: "Peça um piloto", href: "/contato" },
  // TODO: apontar para /metodo quando a rota publicar (Onda 1.1)
  ctaSecondary: { label: "Veja como o método funciona", href: "#como-funciona" },
} as const;

/** CLAUDE.md §2 (aposta contrária) + PLAN.md §3 (dados de mercado com fonte nomeada) */
export const TENSAO = {
  eyebrow: "A APOSTA CONTRÁRIA",
  claim:
    "Contra os “agentes de IA autônomos” que prometem e não entregam: nas verticais reguladas, a arquitetura certa é autonomia limitada com humano no ponto de responsabilidade.",
  dados: [
    {
      valor: "40%+",
      texto: "dos projetos de IA agêntica cancelados até 2027, projeta a Gartner.",
      fonte: "Gartner",
    },
    {
      valor: "~130",
      texto: "fornecedores “reais” de IA agêntica num mar de agent-washing, segundo a Gartner.",
      fonte: "Gartner",
    },
    {
      valor: "~5%",
      texto: "dos pilotos de GenAI aceleram receita, aponta o MIT NANDA.",
      fonte: "MIT NANDA",
    },
  ],
} as const;

/** CONTENT.md §3 — frase-âncora (literal, não parafrasear) */
export const ARCO =
  "O software carrega o conhecimento e os limites. O humano carrega o julgamento e a assinatura.";

/** CONTENT.md §6 — Como funciona (5 passos) + bloco de lock-in */
export const COMO_FUNCIONA = {
  titulo: "Como funciona",
  passos: [
    {
      titulo: "Mapeia o trabalho-commodity",
      texto: "O que hoje consome o especialista caro e não deveria.",
    },
    {
      titulo: "Constrói o motor",
      texto: "Engine treinado no contexto do cliente, com autonomia limitada.",
    },
    {
      titulo: "A IA executa a vazão",
      texto: "O volume que trava o time vira throughput.",
    },
    {
      titulo: "O especialista assina",
      texto:
        "Revisa, decide e assina. É o ponto de responsabilidade — o accountability sink que o cliente paga.",
    },
    {
      titulo: "Resultado + equity",
      texto:
        "Cobra-se pelo resultado, com 30% de equity quando a QuipeAI subsidia o build. Alinha risco: upside, não tarifa.",
    },
  ],
  lockIn:
    "O lock-in não é a ferramenta. É o motor treinado no contexto do cliente + o acoplamento antagônico entre dados e SLM/LLM. Trocar de fornecedor obrigaria a recomeçar o projeto do zero. O valor está no motor, não no app.",
} as const;

/** CONTENT.md §7 — Três caminhos por público */
export const CAMINHOS = [
  {
    publico: "Cliente",
    titulo: "Não viemos demitir seu time. Viemos fazer seu melhor especialista render por dez.",
    texto:
      "Toda vez que alguém fala “IA” na empresa, metade da sala pensa “vão me substituir”. A gente construiu a QuipeAI justamente para o contrário — e para provar.",
    cta: { label: "Peça um piloto", href: "/contato?p=cliente", event: "cta_cliente" },
  },
  {
    publico: "Investidor",
    titulo: "A aposta contrária que virou padrão.",
    texto:
      "Enquanto o mercado financiava “agentes autônomos”, apostamos no humano no ponto de responsabilidade e na cobrança por resultado. Não é um produto — é uma fábrica, com portfólio em várias verticais.",
    cta: { label: "Vamos conversar", href: "/contato?p=investidor", event: "cta_investidor" },
  },
  {
    publico: "Ecossistema tech",
    titulo: "Escolhemos, de propósito, não construir agentes autônomos.",
    texto:
      "Na maioria das verticais que importam, agente autônomo é a arquitetura errada. A certa é mais chata, mais difícil de fazer — e muito mais lucrativa. Autonomia limitada, humano no ponto certo.",
    cta: {
      label: "Construir ou discordar",
      href: "/contato?p=ecossistema",
      event: "cta_ecossistema",
    },
  },
] as const;

/** CONTENT.md §12 — FAQ semântico (answer-first, extraível) */
export const FAQ = [
  {
    question: "O que é a QuipeAI?",
    answer:
      "Fábrica de produto AI-first que instala um método: IA aposenta o trabalho-commodity, o especialista assina, cobra-se por resultado.",
  },
  {
    question: "Vocês fazem agentes de IA autônomos?",
    answer:
      "Não. Nas verticais que importam, autonomia total é a arquitetura errada. Usamos autonomia limitada com humano no ponto de responsabilidade.",
  },
  {
    question: "Como cobram?",
    answer: "Por resultado; com 30% de equity quando subsidiamos o build.",
  },
  {
    question: "Para quem serve?",
    answer:
      "Negócios onde um especialista caro faz trabalho-commodity, a curadoria dele é o selo pago, o erro tem consequência que ele assume, e mais vazão vira mais margem.",
  },
  {
    question: "Como começa?",
    answer:
      "Um piloto sobre um caso real: em uma semana mostramos o resultado, com o especialista assinando. Se não entregar, você não paga.",
  },
  {
    question: "O que impede de copiarem vocês?",
    answer:
      "O motor é treinado no contexto do cliente; o valor está nele, não na ferramenta. Trocar de fornecedor = recomeçar do zero.",
  },
] as const;

/** CONTENT.md §8 — CTA piloto (bloco final recorrente) */
export const CTA_PILOTO = {
  titulo: "Topa um piloto?",
  corpo: "Me dá um caso real — em uma semana mostro o resultado, com o seu especialista assinando.",
  destaque: "Se não entregar, você não paga.",
  botao: { label: "Começar o piloto", href: "/contato" },
} as const;
