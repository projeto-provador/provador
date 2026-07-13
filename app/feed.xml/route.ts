import { ARTIGOS_PUBLICADOS } from "@/content/artigos/registry";
import { SITE_NAME, SITE_URL, TESE_UMA_LINHA } from "@/lib/site";

/** RSS 2.0 — TASKS.md 2.6 (descoberta de conteúdo). */
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET(): Response {
  const items = [...ARTIGOS_PUBLICADOS]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/conteudo/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/conteudo/${a.slug}</guid>
      <description>${esc(a.description)}</description>
      <pubDate>${new Date(`${a.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(a.theme)}</category>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(SITE_NAME)} — Conteúdo</title>
    <link>${SITE_URL}/conteudo</link>
    <description>${esc(TESE_UMA_LINHA)}</description>
    <language>pt-BR</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
