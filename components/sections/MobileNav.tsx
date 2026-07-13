"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_ITEMS } from "@/lib/site";

/**
 * Menu mobile (disclosure). Os mesmos links existem server-rendered no nav
 * desktop e no footer — crawlers e no-JS não dependem deste componente.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="inline-flex size-9 items-center justify-center rounded-sm border border-border text-text-muted"
      >
        {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
      </button>

      {open ? (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal (mobile)"
          className="absolute inset-x-0 top-16 border-b border-border shadow-card"
          style={{ backgroundColor: "var(--overlay-header)", backdropFilter: "blur(10px)" }}
        >
          <ul className="container-site flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-2.5 text-sm font-medium text-text-muted hover:bg-surface hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-3 pb-2">
              <Button href="/contato" event="cta_piloto" className="w-full">
                Peça um piloto
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
