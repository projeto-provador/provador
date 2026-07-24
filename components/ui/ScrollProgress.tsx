"use client";

import { useEffect, useState } from "react";

/** Barra de progresso de leitura no topo (DESIGN.md §10). Decorativa. */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        className="h-full bg-accent transition-[width] duration-75 ease-linear motion-reduce:transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
