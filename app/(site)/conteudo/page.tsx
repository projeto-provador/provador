import type { Metadata } from "next";
import Link from "next/link";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { ARTIGOS_PUBLICADOS, TEMAS } from "@/content/artigos/registry";

/* SEO-AGEO.md §5 — rota /conteudo */
export const metadata: Metadata = {
  title: "Conteúdo — IA com responsabilidade humana",
  description:
    "Artigos answer-first sobre service-as-a-software, cobrança por resultado e IA em profissões reguladas.",
  alternates: { canonical: "/conteudo" },
};

const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" });

export default function ConteudoPage() {
  return (
    <>
      <section className="section-pad">
        <div className="container-site flex flex-col items-start gap-6">
          <Breadcrumbs items={[{ name: "Conteúdo", path: "/conteudo" }]} />
          <p className="eyebrow flex items-center gap-3">
            <NodeGlow size={8} />
            CONTEÚDO
          </p>
          <h1 className="max-w-[20ch] text-balance">IA com responsabilidade humana</h1>
          <p className="prose-width text-lg text-text-muted">
            Artigos answer-first sobre service-as-a-software, cobrança por resultado e IA em
            profissões reguladas.
          </p>
        </div>
      </section>

      {/* Agrupado por tema — filtro navegável sem JS */}
      {TEMAS.map((tema) => (
        <section
          key={tema}
          id={`tema-${tema.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          aria-label={tema}
          className="section-pad border-t border-border"
        >
          <div className="container-site">
            <p className="eyebrow mb-8">{tema}</p>
            <ul className="grid gap-4 md:grid-cols-2">
              {ARTIGOS_PUBLICADOS.filter((a) => a.theme === tema).map((artigo) => (
                <li key={artigo.slug}>
                  <Card interactive className="flex h-full flex-col gap-3">
                    <h2 className="text-xl">
                      <Link
                        href={`/conteudo/${artigo.slug}`}
                        className="hover:text-accent-ink motion-reduce:transition-none"
                      >
                        {artigo.title}
                      </Link>
                    </h2>
                    <p className="flex-1 text-sm leading-relaxed text-text-muted">
                      {artigo.description}
                    </p>
                    <p className="text-sm text-text-muted">
                      <time dateTime={artigo.publishedAt}>
                        {dateFmt.format(new Date(artigo.publishedAt))}
                      </time>
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaPiloto />
    </>
  );
}
