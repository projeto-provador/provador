export const SITE_URL = "https://quipeai.com.br";
export const SITE_NAME = "QuipeAI";

/** A tese — CONTENT.md §2 (literal; também é o bloco de entidade do footer, DESIGN.md §9) */
export const TESE =
  "A QuipeAI não vende software nem “agentes autônomos”. Instala um método: a IA aposenta o trabalho-commodity, o especialista humano decide e assina, e cobra-se por resultado. Os produtos são exemplos de execução do método.";

/** O arco (frase-âncora) — CONTENT.md §3 (usar literal, não parafrasear) */
export const ARCO =
  "O software carrega o conhecimento e os limites. O humano carrega o julgamento e a assinatura.";

/** Versão de uma linha da tese (meta/hero) — CONTENT.md §2 */
export const TESE_UMA_LINHA = "IA que assume o resultado — com um humano que decide e assina.";

/** Navegação principal — só rotas publicadas (links mortos são proibidos, CLAUDE.md §7). */
export const NAV_ITEMS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/metodo", label: "Método" },
  { href: "/produtos", label: "Produtos" },
  { href: "/founder", label: "Founder" },
  { href: "/conteudo", label: "Conteúdo" },
  { href: "/contato", label: "Contato" },
];

/** Redes canônicas — SEO-AGEO.md §11 (apenas perfis atuais, nada de marca legada) */
export const SOCIAL = {
  instagram: { handle: "@quipe.ai", url: "https://instagram.com/quipe.ai" },
} as const;

/** WhatsApp de contato direto — canal de conversão de baixo atrito. */
export const WHATSAPP = {
  numero: "+55 11 93084-5999",
  /** wa.me com mensagem pré-preenchida (o texto reduz o atrito da 1ª mensagem). */
  url: "https://wa.me/5511930845999?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20QuipeAI%20e%20quero%20conversar%20sobre%20um%20piloto.",
} as const;
