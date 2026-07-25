"use client";

import { useEffect, useRef, useState } from "react";

/** Um prefixo opcional, um número, um sufixo opcional — e nada mais. */
const RE = /^(\D*)(\d+(?:[.,]\d+)?)(\D*)$/;

/**
 * Conta de 0 até o número quando entra na viewport, preservando prefixo/sufixo
 * (ex.: "40%+", "~130", "~5%"). Se o texto não tem exatamente um número
 * (ex.: "240h → 3h"), renderiza estático.
 *
 * AGEO-safe: o HTML da 1ª resposta já traz o número real (não "0") — a animação
 * é só enriquecimento no cliente. Sob prefers-reduced-motion, não anima.
 *
 * O efeito depende só de `text` e é guardado por `startedRef`: o `setVal` de cada
 * frame re-renderiza, e sem essas duas travas o cleanup cancelaria o próprio
 * requestAnimationFrame em curso, reiniciando a contagem para sempre e deixando
 * um número errado na tela.
 */
export function CountUp({ text, className }: { text: string; className?: string }) {
  const m = text.match(RE);
  const prefix = m?.[1] ?? "";
  const numStr = m?.[2] ?? "";
  const suffix = m?.[3] ?? "";
  const target = numStr ? parseFloat(numStr.replace(",", ".")) : 0;
  const decimals = (numStr.split(/[.,]/)[1] ?? "").length;

  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  /** Valor final desde o SSR — nunca mostra "0" para crawler nem sem JS. */
  const [val, setVal] = useState(target);

  useEffect(() => {
    const match = text.match(RE);
    if (!match) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const to = parseFloat((match[2] ?? "0").replace(",", "."));

    let raf = 0;
    let io: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        if (startedRef.current) return;
        startedRef.current = true;
        io?.disconnect();
        io = null;

        const dur = 1400;
        let t0: number | null = null;
        const step = (t: number) => {
          if (t0 === null) t0 = t;
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) raf = requestAnimationFrame(step);
          else setVal(to); // garante o valor exato no último frame
        };
        setVal(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  if (!m) return <span className={className}>{text}</span>;

  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("pt-BR");
  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
