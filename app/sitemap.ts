import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * SEO-AGEO.md §3 — todas as rotas públicas, com prioridade alta para
 * /, /metodo e /produtos. Rotas MDX (produtos/conteúdo) entram quando
 * publicarem (Onda 1/2), com lastModified real do frontmatter.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/contato`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
