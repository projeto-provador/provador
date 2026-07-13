import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import FaqLista from "@/components/FaqLista";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { POSTS, postPorSlug } from "@/lib/posts";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = postPorSlug(params.slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.descricao,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function PostPage({ params }: Props) {
  const post = postPorSlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleSchema({
          titulo: post.titulo,
          descricao: post.descricao,
          path: `/blog/${post.slug}`,
          dataPublicacao: post.data,
        })}
      />
      <JsonLd data={faqSchema(post.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.titulo, path: `/blog/${post.slug}` },
        ])}
      />

      <article>
        <header className="border-b border-borda">
          <div className="container-site py-16 md:py-20">
            <p className="eyebrow">Cluster Reforma Tributária</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
              {post.titulo}
            </h1>
            <p className="mt-4 text-sm text-muted">
              QuipeAI · {new Date(`${post.data}T12:00:00`).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </header>

        <div className="container-site max-w-4xl py-12">
          {post.intro.map((paragrafo) => (
            <p key={paragrafo} className="mt-4 text-lg leading-relaxed text-muted">
              {paragrafo}
            </p>
          ))}

          {post.secoes.map((secao) => (
            <section key={secao.h2} className="mt-10">
              <h2 className="text-2xl font-extrabold text-white">{secao.h2}</h2>
              {secao.paragrafos.map((paragrafo) => (
                <p key={paragrafo} className="mt-4 leading-relaxed text-muted">
                  {paragrafo}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-10">
            <h2 className="text-2xl font-extrabold text-white">
              Perguntas frequentes
            </h2>
            <div className="mt-6">
              <FaqLista faqs={post.faqs} />
            </div>
          </section>

          <div className="card mt-12 border-neural">
            <h2 className="text-xl font-extrabold">
              Sua firma recusa projeto por falta de mão?
            </h2>
            <p className="mt-3 text-sm text-muted">
              Faça o teste 4+1 em 60 segundos. Se você é ICP-A, a conversa de
              piloto abre na hora, com métrica auditável e especialista que
              decide e assina.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link href="/cunha-contabil#quiz" className="btn-primary">
                Fazer teste 4+1 em 60s
              </Link>
              <Link href="/cunha-contabil#calculadora" className="btn-secondary">
                Calcular horas de commodity
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
