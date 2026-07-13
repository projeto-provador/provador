import type { Metadata } from "next";
import Link from "next/link";
import { CtaPiloto } from "@/components/sections/CtaPiloto";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/ui/JsonLd";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { PRODUTOS } from "@/content/produtos/registry";
import { produtosItemListSchema } from "@/lib/schema";

/* SEO-AGEO.md §5 — rota /produtos */
export const metadata: Metadata = {
  title: "Produtos — execuções do método QuipeAI",
  description:
    "Auditoria-IA, risk factors (SEC) e mais: cada produto é uma aplicação do mesmo método, com prova de resultado.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <>
      <JsonLd data={produtosItemListSchema} />

      {/* ===== Intro answer-first — CLAUDE.md §2, literal ===== */}
      <section className="section-pad">
        <div className="container-site flex flex-col items-start gap-6">
          <Breadcrumbs items={[{ name: "Produtos", path: "/produtos" }]} />
          <p className="eyebrow flex items-center gap-3">
            <NodeGlow size={8} />
            PORTFÓLIO
          </p>
          <h1 className="max-w-[18ch] text-balance">Execuções do método</h1>
          <p className="prose-width text-lg text-text-muted">
            Os produtos são <strong className="text-text">exemplos de execução do método</strong>,
            não o negócio em si. O core da QuipeAI é o método replicável: a IA aposenta o
            trabalho-commodity, o especialista decide e assina, e cobra-se por resultado.
          </p>
        </div>
      </section>

      {/* ===== Grid — cases publicam com prova; sem número, sem link (CLAUDE §3.6) ===== */}
      <section aria-labelledby="grid" className="section-pad border-t border-border">
        <div className="container-site">
          <h2 id="grid" className="sr-only">
            Produtos
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {PRODUTOS.map((produto) => (
              <li key={produto.slug}>
                <Card interactive={produto.published} className="flex h-full flex-col gap-3">
                  <h3 className="text-lg">{produto.title}</h3>
                  {produto.summary ? (
                    <p className="text-sm leading-relaxed text-text-muted">{produto.summary}</p>
                  ) : null}
                  {produto.published ? (
                    <Link
                      href={`/produtos/${produto.slug}`}
                      className="mt-auto text-sm font-semibold text-accent-ink hover:underline"
                    >
                      Ver o case e a prova
                    </Link>
                  ) : (
                    <p className="mt-auto text-sm text-text-muted">
                      Case com números em preparação.
                      {/* TODO(prova): publicar quando houver número real (registry.ts) */}
                    </p>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPiloto />
    </>
  );
}
