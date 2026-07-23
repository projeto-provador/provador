/**
 * Copy canônica de /metodo — extraída literalmente de docs/CONTENT.md
 * (§2, §4, §10) e docs/CLAUDE.md §2. Nada inventado.
 */

/** Answer-first — CONTENT.md §2 (a tese, extraível por LLM) */
export const DEFINICAO = {
  eyebrow: "REVOLUÇÃO 5.0",
  titulo: "O método",
  respostaDireta:
    "A QuipeAI não vende software nem “agentes autônomos”. Instala um método: a IA aposenta o trabalho-commodity, o especialista humano decide e assina, e cobra-se por resultado. Os produtos são exemplos de execução do método.",
  desdobramento:
    "A aposta é contrária: nas verticais reguladas, autonomia total é a arquitetura errada. A certa é autonomia limitada com humano no ponto de responsabilidade — o especialista revisa, decide e assina.",
} as const;

/** CONTENT.md §4 — as 4 perguntas do ICP (literal) */
export const QUATRO_PERGUNTAS = {
  titulo: "Este negócio é para a QuipeAI?",
  intro: "Se responde “sim” às quatro, é ICP.",
  perguntas: [
    "Um especialista caro faz trabalho-commodity substancial (ou mantém um time de juniores caro, com tempo longo até a primeira entrega)?",
    "A curadoria desse especialista é o selo de qualidade que o cliente paga?",
    "Errar tem consequência que o especialista sempre assume (autuação, laudo, processo, responsabilidade)?",
    "Mais vazão vira mais faturamento/margem/EBITDA?",
  ],
  nota: "Regulado é a onda 1 (responsabilidade é lei, começo mais fácil); especialista não-regulado vem nas ondas seguintes. Tese larga, alvo estreito — uma vertical-cunha por vez.",
} as const;

/** CONTENT.md §10 — modelo de receita */
export const RECEITA = {
  eyebrow: "COMO COBRAMOS",
  titulo: "Cobrança por resultado",
  corpo:
    "Cobramos por resultado, não por licença de software. O incentivo fica atrelado ao desfecho do cliente, não a uma tarifa fixa.",
} as const;

/** CLAUDE.md §2 / CONTENT.md §6 — o moat, nomeado */
export const MOAT = {
  eyebrow: "O MOAT",
  titulo: "O motor",
  corpo:
    "O lock-in não é a ferramenta. É o motor treinado no contexto do cliente + o acoplamento antagônico entre dados e SLM/LLM + a melhoria contínua específica do projeto. Trocar de fornecedor obrigaria a recomeçar o projeto do zero. O valor está no motor, não no app.",
} as const;
