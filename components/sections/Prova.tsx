import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { PROVA } from "@/content/home";
import { PRODUTOS_PUBLICADOS } from "@/content/produtos/registry";

/**
 * Prova própria (Fosso G3): os produtos ao vivo são a prova de execução do método.
 * Surfaça a prova que existe hoje na home, em vez de só dado de terceiros.
 */
export function Prova() {
  return (
    <section aria-labelledby="prova" className="section-pad border-t border-border">
      <div className="container-site">
        <p className="eyebrow mb-4">{PROVA.eyebrow}</p>
        <h2 id="prova" className="max-w-[24ch] text-balance">
          {PROVA.titulo}
        </h2>
        <p className="prose-width mt-3 text-text-muted">{PROVA.texto}</p>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {PRODUTOS_PUBLICADOS.map((produto, i) => (
            <li key={produto.slug}>
              <Reveal delay={i * 80} className="h-full">
                <Card interactive className="flex h-full flex-col gap-3">
                  {produto.vertical ? <p className="eyebrow">{produto.vertical}</p> : null}
                  <h3 className="text-lg">{produto.title}</h3>
                  {produto.summary ? (
                    <p className="flex-1 text-sm leading-relaxed text-text-muted">
                      {produto.summary}
                    </p>
                  ) : null}
                  <Link
                    href={`/produtos/${produto.slug}`}
                    className="mt-auto text-sm font-semibold text-accent-ink hover:underline"
                  >
                    Ver o case e a prova
                  </Link>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
