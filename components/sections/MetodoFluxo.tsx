"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";

type Passo = { titulo: string; texto: string };

/**
 * Método como fluxo interativo (proposta UX): os passos viram um trilho de nós
 * navegável — clicar/teclar acende o nó e mostra o detalhe. Padrão ARIA tabs.
 * AGEO-safe: todos os textos ficam no HTML (painéis inativos só com `hidden`).
 * Respeita prefers-reduced-motion (só troca de estado, transições suaves).
 */
export function MetodoFluxo({ passos }: { passos: ReadonlyArray<Passo> }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = passos.length - 1;
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Passos do método"
        aria-orientation="horizontal"
        className="relative grid grid-cols-1 gap-4 sm:grid-cols-5"
      >
        {/* Linha de interligação (desktop) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[18px] hidden h-px bg-border sm:block"
        />
        {passos.map((passo, i) => {
          const on = i === active;
          return (
            <button
              key={passo.titulo}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`passo-tab-${i}`}
              aria-selected={on}
              aria-controls={`passo-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="group flex flex-col items-center gap-2.5 rounded-sm p-1 text-center sm:items-start sm:text-left"
            >
              <span
                aria-hidden="true"
                className={`relative z-10 inline-flex size-9 items-center justify-center rounded-full border font-display text-sm font-bold transition-all duration-300 motion-reduce:transition-none ${
                  on
                    ? "border-accent bg-accent text-accent-contrast"
                    : "border-border bg-bg text-text-muted group-hover:border-accent"
                }`}
                style={on ? { boxShadow: "0 0 0 6px var(--color-glow)" } : undefined}
              >
                {i + 1}
              </span>
              <span
                className={`text-sm font-medium transition-colors motion-reduce:transition-none ${
                  on ? "text-text" : "text-text-muted group-hover:text-text"
                }`}
              >
                {passo.titulo}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {passos.map((passo, i) => (
          <div
            key={passo.titulo}
            role="tabpanel"
            id={`passo-panel-${i}`}
            aria-labelledby={`passo-tab-${i}`}
            hidden={i !== active}
          >
            <Card>
              <p className="font-display text-sm font-bold text-accent-ink">{`Passo 0${i + 1}`}</p>
              <h3 className="mt-2 text-xl">{passo.titulo}</h3>
              <p className="prose-width mt-3 leading-relaxed text-text-muted">{passo.texto}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
