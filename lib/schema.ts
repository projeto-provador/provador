import type { FaqItem } from "@/components/ui/Faq";
import { PRODUTOS_PUBLICADOS, type ProdutoMeta } from "@/content/produtos/registry";
import { SITE_URL, SOCIAL } from "@/lib/site";

/** Organization — SEO-AGEO.md §6 (no layout, toda página). */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuipeAI",
  url: SITE_URL,
  description:
    "Fábrica de produto AI-first. A IA aposenta o trabalho-commodity, o especialista assina, cobra-se por resultado.",
  founder: { "@type": "Person", name: "Luiz Guilherme Ramos Guimarães" },
  areaServed: "BR",
  sameAs: [SOCIAL.instagram.url],
} as const;

/** ItemList de /produtos — lista só o que está publicado (com página real). */
export const produtosItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Produtos QuipeAI — execuções do método",
  itemListElement: PRODUTOS_PUBLICADOS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    url: `${SITE_URL}/produtos/${p.slug}`,
  })),
};

/** Product — /produtos/[slug] (SEO-AGEO.md §6). */
export function productSchema(produto: ProdutoMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.title,
    description: produto.summary ?? "",
    url: `${SITE_URL}/produtos/${produto.slug}`,
    brand: { "@type": "Organization", name: "QuipeAI", url: SITE_URL },
  };
}

/** Person — /founder (SEO-AGEO.md §6). */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luiz Guilherme Ramos Guimarães",
  url: `${SITE_URL}/founder`,
  worksFor: { "@type": "Organization", name: "QuipeAI", url: SITE_URL },
  jobTitle: "Founder",
  sameAs: ["https://instagram.com/yo.gui.ia"],
} as const;

/** BreadcrumbList — onde houver hierarquia (SEO-AGEO.md §6). */
export function breadcrumbSchema(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** FAQPage — deve casar 1:1 com o FAQ visível na página (SEO-AGEO.md §6). */
export function faqPageSchema(items: ReadonlyArray<FaqItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
