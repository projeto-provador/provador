"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS, CTA_PILOTO } from "@/lib/site";

export default function Nav() {
  const [aberto, setAberto] = useState(false);

  // Fecha o menu mobile com Escape.
  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") setAberto(false);
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <header className="sticky top-0 z-50 border-b border-borda bg-obsidian/95 backdrop-blur">
      <nav
        className="container-site flex items-center justify-between py-4"
        aria-label="Navegação primária"
      >
        <Link href="/" className="font-title text-lg font-extrabold text-white">
          Quipe<span className="text-neural">AI</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link href={CTA_PILOTO.href} className="btn-primary py-2 text-sm">
            {CTA_PILOTO.label}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-card2 border border-borda p-2 text-white lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto(!aberto)}
        >
          <span
            aria-hidden="true"
            className={`block h-0.5 w-5 bg-white transition-transform ${
              aberto ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`mt-1 block h-0.5 w-5 bg-white transition-opacity ${
              aberto ? "opacity-0" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`mt-1 block h-0.5 w-5 bg-white transition-transform ${
              aberto ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        id="menu-mobile"
        hidden={!aberto}
        className="border-t border-borda lg:hidden"
      >
        <div className="container-site flex flex-col gap-4 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted"
              onClick={() => setAberto(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={CTA_PILOTO.href}
            className="btn-primary text-center text-sm"
            onClick={() => setAberto(false)}
          >
            {CTA_PILOTO.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
