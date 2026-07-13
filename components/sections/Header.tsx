import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ITEMS, SITE_NAME } from "@/lib/site";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{ backgroundColor: "var(--overlay-header)", backdropFilter: "blur(10px)" }}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold text-text"
        >
          <NodeGlow size={10} />
          {SITE_NAME}
        </Link>

        <nav aria-label="Navegação principal" className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition-colors hover:text-text motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href="/contato" event="cta_piloto" className="max-sm:hidden">
            Peça um piloto
          </Button>
        </div>
      </div>
    </header>
  );
}
