"use client";

import { useEffect, useRef, useState } from "react";

/** Um prefixo opcional, um número, um sufixo opcional — e nada mais. */
const RE = /^(\D*)(\d+(?:[.,]\d+)?)(\D*)$/;

/**
 * Conta de 0 até o número quando entra na viewport, preservando prefixo/sufixo
 * (ex.: "42+", "~130", "40%"). Se o texto não tem exatamente um número
 * (ex.: "240h → 3h"), renderiza estático.
 *
 * AGEO-safe: o HTML da 1ª resposta já traz o número real (não "0") — a animação
 * é só enriquecimento no cliente. Sob prefers-reduced-motion, não anima.
 */
export function CountUp({ text, className }: { text: string; className?: string }) {
  const m = text.match(RE);
  const prefix = m?.[1] ?? "";
  const numStr = m?.[2] ?? "";
  const suffix = m?.[3] ?? "";
  const target = numStr ? parseFloat(numStr.replace(",", ".")) : 0;
  const decimals = (numStr.split(/[.,]/)[1] ?? "").length;

  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(target);

  useEffect(() => {
    if (!m) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const dur = 1100;
        let t0: number | null = null;
        const step = (t: number) => {
          if (t0 === null) t0 = t;
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(target * eased);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        setVal(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [m, target]);

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
