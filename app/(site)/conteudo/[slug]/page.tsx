import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { ARTIGOS_PUBLICADOS } from "@/content/artigos/registry";
import { articleSchema, faqPageSchema } from "@/lib/schema";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return ARTIGOS_PUBLICADOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const artigo = ARTIGOS_PUBLICADOS.find((a) => a.slug === slug);
  if (!artigo) return {};
  return {
    title: `${artigo.title} — QuipeAI`,
    description: artigo.description,
    alternates: { canonical: `/conteudo/${slug}` },
    openGraph: { type: "article", publishedTime: artigo.publishedAt },
  };
}

const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" });

export default async function ArtigoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const artigo = ARTIGOS_PUBLICADOS.find((a) => a.slug === slug);
  if (!artigo) notFound();

  const { default: Corpo } = await import(`@/content/artigos/${slug}.mdx`);

  return (
    <>
      <JsonLd data={articleSchema(artigo)} />
      <JsonLd data={faqPageSchema(artigo.faq)} />

      <article className="section-pad">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { name: "Conteúdo", path: "/conteudo" },
              { name: artigo.title, path: `/conteudo/${slug}` },
            ]}
          />
          <p className="eyebrow mt-8">{artigo.theme}</p>
          <h1 className="mt-4 max-w-[28ch] text-balance">{artigo.title}</h1>
          <p className="mt-4 text-sm text-text-muted">
            Por{" "}
            <Link href="/founder" className="font-medium text-accent-ink hover:underline">
              Curva C
            </Link>{" "}
            ·{" "}
            <time dateTime={artigo.publishedAt}>
              {dateFmt.format(new Date(artigo.publishedAt))}
            </time>
          </p>

          <div className="prose-width mt-10 text-text-muted">
            <Corpo />
          </div>

          {/* FAQ — 1:1 com o schema FAQPage acima (SEO-AGEO §6) */}
          <div className="prose-width mt-14">
            <h2 className="mb-6">Perguntas frequentes</h2>
            <Faq items={artigo.faq} />
          </div>
        </div>
      </article>

      <CtaPiloto />
    </>
  );
}
