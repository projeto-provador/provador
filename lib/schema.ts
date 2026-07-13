import type { FaqItem } from "@/components/ui/Faq";
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
