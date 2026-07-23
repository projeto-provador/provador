/**
 * Copy de /founder — derivada de docs/CLAUDE.md §2, CONTENT.md §7, §9, §11.
 * TODO(copy): tom "yogue no corporativo" aguarda aprovação do owner (CONTENT §11).
 * TODO(prova): prova social (eventos, publicações, projetos) aguarda o owner.
 */

export const FOUNDER = {
  eyebrow: "CURVA C",
  nome: "Luiz Guilherme Ramos Guimarães",
  /* Factual, derivado de CLAUDE.md §2 e CONTENT.md §11 (autoridade) */
  bio: "Founder da QuipeAI — fábrica de produto AI-first brasileira, com portfólio em várias verticais e um método documentado: a Revolução 5.0.",
  instagram: { handle: "@yo.gui.ia", url: "https://instagram.com/yo.gui.ia" },
} as const;

/** Tese contrária — CONTENT.md §7 (ecossistema) + CLAUDE.md §2, literal */
export const TESE_CONTRARIA = {
  eyebrow: "A TESE CONTRÁRIA",
  titulo: "Escolhemos, de propósito, não construir agentes autônomos.",
  corpo:
    "Na maioria das verticais que importam, agente autônomo é a arquitetura errada. A certa é mais chata, mais difícil de fazer — e muito mais lucrativa. Autonomia limitada, humano no ponto certo.",
} as const;

/** Ponto de vista — as ideias-âncora (CONTENT.md §9, literal da tabela de jargões) */
export const IDEIAS_ANCORA = [
  {
    termo: "Trabalho-commodity",
    definicao: "A parte repetível e sem julgamento que a IA aposenta.",
  },
  {
    termo: "Ponto de responsabilidade",
    definicao: "Onde o especialista decide e assina.",
  },
  {
    termo: "Autonomia limitada",
    definicao: "A arquitetura certa — contra o agente autônomo.",
  },
] as const;
