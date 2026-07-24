"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Atraso em ms para escalonar itens de uma grade. */
  delay?: number;
};

/**
 * Reveal-on-scroll (fade + translateY) — DESIGN.md §10. Sem dependência extra
 * (IntersectionObserver). Sob prefers-reduced-motion aparece imediatamente.
 * O conteúdo está sempre no HTML (só a opacidade muda) — seguro para SEO/AGEO.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className ?? ""}`}
      style={delay && visible ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
