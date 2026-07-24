import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Newsletter } from "@/components/sections/Newsletter";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { NAV_ITEMS, SITE_NAME, SOCIAL, TESE, WHATSAPP } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Newsletter />
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1fr_auto_auto]">
        {/* Bloco de entidade — reforça AGEO (DESIGN.md §9) */}
        <div className="max-w-md">
          <p className="flex items-center gap-2.5 font-display text-lg font-bold">
            <NodeGlow size={8} />
            {SITE_NAME}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">{TESE}</p>
          <p className="mt-2 text-sm text-text-muted">São Paulo, Brasil</p>
        </div>

        <nav aria-label="Navegação do rodapé" className="flex flex-col gap-2 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-text-muted transition-colors hover:text-text motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SOCIAL.instagram.url}
            rel="me noopener"
            className="text-text-muted transition-colors hover:text-text motion-reduce:transition-none"
          >
            Instagram · {SOCIAL.instagram.handle}
          </a>
          <a
            href={WHATSAPP.url}
            target="_blank"
            rel="noopener"
            className="text-text-muted transition-colors hover:text-text motion-reduce:transition-none"
          >
            WhatsApp · {WHATSAPP.numero}
          </a>
        </nav>

        {/* Repetição do CTA piloto — CONTENT.md §8 */}
        <div className="flex flex-col items-start gap-3">
          <p className="font-display font-bold">Topa um piloto?</p>
          <Button href="/contato" event="cta_piloto">
            Começar o piloto
          </Button>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-site py-5 text-xs text-text-muted">
          © {new Date().getFullYear()} {SITE_NAME}
        </div>
      </div>
    </footer>
  );
}
