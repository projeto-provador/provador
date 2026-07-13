/**
 * Registro tipado dos produtos/cases (SPEC.md §4).
 * `published: false` = draft — fora do build, do sitemap e do índice linkado.
 * Um produto só publica quando o owner fornecer problema/método/PROVA reais
 * (CLAUDE.md §3.6: nenhuma promessa sem número).
 */
export type ProdutoMeta = {
  slug: string;
  title: string;
  /** Uma linha factual — TODO(copy) do owner para os drafts. */
  summary?: string;
  vertical?: string;
  published: boolean;
  publishedAt?: string;
};

export const PRODUTOS: ReadonlyArray<ProdutoMeta> = [
  // TODO(copy)/TODO(prova): owner fornece problema/desfecho/números de cada produto
  { slug: "auditoria-ia", title: "auditoria-IA", published: false },
  { slug: "rfee", title: "RFEE — risk factors (SEC)", published: false },
  { slug: "terra-metrica", title: "Terra-Métrica", published: false },
];

export const PRODUTOS_PUBLICADOS = PRODUTOS.filter((p) => p.published);
