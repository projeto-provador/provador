import type { MetadataRoute } from "next";
import { PRODUTOS_PUBLICADOS } from "@/content/produtos/registry";
import { SITE_URL } from "@/lib/site";

/**
 * SEO-AGEO.md §3 — todas as rotas públicas, com prioridade alta para
 * /, /metodo e /produtos. Drafts (produtos sem prova) ficam fora.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/metodo`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/produtos`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/founder`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contato`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...PRODUTOS_PUBLICADOS.map((p) => ({
      url: `${SITE_URL}/produtos/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
