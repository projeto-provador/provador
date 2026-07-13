import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog. Cluster Reforma Tributária CBS IBS",
  description:
    "Artigos sobre reforma tributária contabilidade 2026 CBS IBS, escassez de contadores, auditoria contábil e demanda represada. Sem hype, com número.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="border-b border-borda">
        <div className="container-site py-16 md:py-24">
          <p className="eyebrow">Cluster Reforma Tributária</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
            Reforma CBS IBS, contabilidade e o fim do trabalho-commodity
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Artigos tersos e técnicos para quem decide e assina. Sem hype de
            guru, com fonte e número medido.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card block transition hover:border-neural"
            >
              <p className="eyebrow">{post.keyword}</p>
              <h2 className="mt-2 text-lg font-bold">{post.titulo}</h2>
              <p className="mt-2 text-sm text-muted">{post.descricao}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/cunha-contabil" className="btn-primary">
            Ir para o hub da cunha contábil
          </Link>
        </div>
      </section>
    </>
  );
}
