import { SITE_URL, SITE_NAME, FOUNDER, METODO_ETAPAS } from "./site";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Método replicável de IA com autonomia limitada e especialista no ponto de responsabilidade. Cobrança por resultado, com 30% de equity quando subsidia o build.",
    founder: {
      "@type": "Person",
      name: FOUNDER,
    },
    sameAs: [
      "https://www.instagram.com/quipe.ai",
      "https://www.instagram.com/yo.gui.ia",
    ],
  };
}

export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: FOUNDER,
    url: `${SITE_URL}/manifesto`,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    knowsAbout: [
      "trabalho-commodity",
      "ponto de responsabilidade",
      "Service as a Software",
      "auditoria contábil com IA",
    ],
  };
}

export function howToMetodoSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Método QuipeAI em 5 etapas",
    description:
      "Método replicável: a IA assume o trabalho-commodity e o especialista decide e assina no ponto de responsabilidade.",
    step: METODO_ETAPAS.map((etapa) => ({
      "@type": "HowToStep",
      position: etapa.numero,
      name: etapa.titulo,
      text: etapa.texto,
    })),
  };
}

export function faqSchema(faqs: { pergunta: string; resposta: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.resposta,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleSchema(input: {
  titulo: string;
  descricao: string;
  path: string;
  dataPublicacao: string;
  dataModificacao?: string;
}): JsonLd {
  const url = `${SITE_URL}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.titulo,
    description: input.descricao,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/opengraph-image`,
    datePublished: input.dataPublicacao,
    dateModified: input.dataModificacao ?? input.dataPublicacao,
    author: {
      "@type": "Person",
      name: FOUNDER,
      url: `${SITE_URL}/manifesto`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
