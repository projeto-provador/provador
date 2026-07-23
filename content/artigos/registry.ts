import type { FaqItem } from "@/components/ui/Faq";

/**
 * Registro tipado dos artigos (SPEC.md §5). Corpo em content/artigos/<slug>.mdx.
 * Regras: answer-first (SEO-AGEO §7), dado só com fonte nomeada, FAQ 1:1 com schema.
 * Autor fixo: Curva C (Person de /founder).
 */
export type ArtigoMeta = {
  slug: string;
  title: string;
  description: string;
  theme: string;
  keywords: ReadonlyArray<string>;
  publishedAt: string;
  updatedAt?: string;
  faq: ReadonlyArray<FaqItem>;
  published: boolean;
};

export const ARTIGOS: ReadonlyArray<ArtigoMeta> = [
  {
    slug: "por-que-pilotos-de-ia-falham",
    title: "Por que a maioria dos pilotos de IA falha — e o que os que funcionam têm em comum",
    description:
      "Segundo o MIT NANDA, só cerca de 5% dos pilotos de GenAI aceleram receita. O problema não é o modelo: é arquitetura sem dono do erro e preço desalinhado do resultado.",
    theme: "IA com responsabilidade humana",
    keywords: [
      "por que 95% dos pilotos de IA falham",
      "agent washing",
      "IA para profissões reguladas",
    ],
    publishedAt: "2026-07-13",
    faq: [
      {
        question: "Quantos pilotos de IA falham?",
        answer:
          "O MIT NANDA aponta que só cerca de 5% dos pilotos de GenAI aceleram receita. A Gartner projeta mais de 40% dos projetos de IA agêntica cancelados até 2027.",
      },
      {
        question: "O que os pilotos que funcionam têm em comum?",
        answer:
          "Autonomia limitada da IA, um humano nomeado no ponto de responsabilidade — que revisa, decide e assina — e cobrança atrelada ao resultado, não à licença.",
      },
    ],
    published: true,
  },
  {
    slug: "agente-autonomo-vs-humano-no-loop",
    title: "Agente autônomo ou humano no loop? A arquitetura certa para verticais reguladas",
    description:
      "Em vertical regulada, errar tem dono por lei. Autonomia total é a arquitetura errada; a certa é autonomia limitada com um especialista que decide e assina.",
    theme: "IA com responsabilidade humana",
    keywords: [
      "agente autônomo vs humano no loop",
      "agente de IA com responsabilidade humana",
      "IA para laudos / perícia / auditoria",
    ],
    publishedAt: "2026-07-13",
    faq: [
      {
        question: "O que é autonomia limitada?",
        answer:
          "A IA executa o trabalho-commodity em escala, mas não fecha o ciclo sozinha: um especialista humano revisa, decide e assina. A autonomia dela termina onde começa a responsabilidade.",
      },
      {
        question: "Humano no loop não mata o ganho de escala?",
        answer:
          "Não — o gargalo muda de lugar. O especialista deixa de produzir o volume e passa a curar o volume. É a curadoria dele que o cliente paga; o resto a IA aposenta.",
      },
    ],
    published: true,
  },
  {
    slug: "service-as-a-software",
    title: "Service-as-a-Software: o que muda quando a IA entrega desfecho, não dashboard",
    description:
      "Service-as-a-Software é vender o resultado do serviço, não a ferramenta. O software carrega o conhecimento e os limites; o humano carrega o julgamento e a assinatura.",
    theme: "Cobrança por resultado",
    keywords: ["service as a software", "cobrança por resultado IA", "fábrica de produto IA"],
    publishedAt: "2026-07-13",
    faq: [
      {
        question: "O que é Service-as-a-Software?",
        answer:
          "Um modelo em que se entrega o desfecho do serviço (o laudo revisado, o risco mapeado, o lote processado) em vez de licenciar uma ferramenta para o cliente operar. Cobra-se pelo resultado.",
      },
      {
        question: "Como fica o preço nesse modelo?",
        answer:
          "Atrelado ao resultado — o fornecedor cobra pelo desfecho, não por uma licença fixa.",
      },
    ],
    published: true,
  },
];

export const ARTIGOS_PUBLICADOS = ARTIGOS.filter((a) => a.published);

export const TEMAS = [...new Set(ARTIGOS_PUBLICADOS.map((a) => a.theme))];
