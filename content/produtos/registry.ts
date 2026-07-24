/**
 * Registro tipado dos produtos/cases (SPEC.md §4).
 * `published: false` = draft — fora do build, do sitemap e do índice linkado.
 * Conteúdo publicado é descritivo do que a aplicação faz hoje (verificável nos
 * produtos ao vivo), mais casos reais de resultado de cliente — fornecidos
 * pelo owner (2026-07-24), anonimizados (sem nome de cliente).
 */
export type ProdutoMeta = {
  slug: string;
  title: string;
  /** Uma linha factual. */
  summary?: string;
  vertical?: string;
  /** URL do produto ao vivo, quando houver. */
  url?: string;
  published: boolean;
  publishedAt?: string;
};

export const PRODUTOS: ReadonlyArray<ProdutoMeta> = [
  {
    slug: "auditoria-ia",
    title: "Auditoris",
    summary: "Auditoria contábil com IA — anomalias e validações normativas (IFRS/CPC) em minutos.",
    vertical: "Contábil · Auditoria",
    url: "https://auditoris.app",
    published: true,
    publishedAt: "2026-07-24",
  },
  {
    slug: "rfee",
    title: "RiskFactor",
    summary:
      "Extração e benchmarking de risk factors a partir de filings SEC EDGAR (S-1/F-1/10-K).",
    vertical: "Mercado de capitais · IPO/M&A",
    url: "https://riskfactorsreport.com",
    published: true,
    publishedAt: "2026-07-24",
  },
  {
    slug: "terra-metrica",
    title: "Terra-Métrica",
    summary: "Due diligence fundiária e pré-validação de georreferenciamento INCRA/SIGEF.",
    vertical: "Agro · Real estate rural",
    url: "https://terra-metrica.com",
    published: true,
    publishedAt: "2026-07-24",
  },
];

export const PRODUTOS_PUBLICADOS = PRODUTOS.filter((p) => p.published);
