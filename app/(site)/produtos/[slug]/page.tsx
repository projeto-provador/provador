import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Carousel } from "@/components/ui/Carousel";
import { JsonLd } from "@/components/ui/JsonLd";
import { PRODUTOS_PUBLICADOS } from "@/content/produtos/registry";
import { productSchema } from "@/lib/schema";

type Params = { slug: string };

/** Só produtos publicados geram página (draft = fora do build). */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return PRODUTOS_PUBLICADOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const produto = PRODUTOS_PUBLICADOS.find((p) => p.slug === slug);
  if (!produto) return {};
  return {
    title: `${produto.title} — QuipeAI`,
    description: produto.summary,
    alternates: { canonical: `/produtos/${slug}` },
  };
}

export default async function ProdutoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const produto = PRODUTOS_PUBLICADOS.find((p) => p.slug === slug);
  if (!produto) notFound();

  const { default: Corpo } = await import(`@/content/produtos/${slug}.mdx`);

  return (
    <>
      <JsonLd data={productSchema(produto)} />
      <article className="section-pad">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { name: "Produtos", path: "/produtos" },
              { name: produto.title, path: `/produtos/${slug}` },
            ]}
          />
          <h1 className="mt-6 max-w-[20ch] text-balance">{produto.title}</h1>
          {produto.vertical ? <p className="eyebrow mt-4">{produto.vertical}</p> : null}
          {produto.imagens && produto.imagens.length > 0 ? (
            <Carousel images={produto.imagens} className="mt-8" />
          ) : null}
          <div className="prose-width mt-8 text-text-muted">
            <Corpo />
          </div>
        </div>
      </article>
      <CtaPiloto />
    </>
  );
}
