"use client";

import { useEffect, useRef } from "react";
import { METODO_ETAPAS } from "@/lib/site";

// Diagrama do motor em 5 etapas. CSS puro, reveal on scroll, sem SVG externo.
// O conteúdo é visível por padrão no HTML do servidor; a classe "reveal"
// (opacity 0) só entra via JS no mount, imediatamente antes de observar.
// Sem JS, as etapas ficam sempre visíveis.
export default function MotorDiagram() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const raiz = ref.current;
    if (!raiz || typeof IntersectionObserver === "undefined") return;

    const itens = raiz.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itens.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={ref} className="grid gap-4 md:grid-cols-5" aria-label="Método em 5 etapas">
      {METODO_ETAPAS.map((etapa, index) => (
        <li
          key={etapa.numero}
          data-reveal
          className="card flex flex-col"
          style={{ transitionDelay: `${index * 120}ms` }}
        >
          <span className="numero-serif">{etapa.numero}</span>
          <h3 className="mt-2 text-base font-bold">{etapa.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{etapa.texto}</p>
        </li>
      ))}
    </ol>
  );
}
