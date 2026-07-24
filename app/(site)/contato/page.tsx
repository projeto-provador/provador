import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { CONTATO, PROCESSO } from "@/content/contato";
import { WHATSAPP } from "@/lib/site";
import { LeadForm } from "./LeadForm";

/* SEO-AGEO.md §5 — rota /contato */
export const metadata: Metadata = {
  title: "Peça um piloto — QuipeAI",
  description:
    "Um caso real, uma semana, seu especialista assinando. Se não entregar, você não paga.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <section className="section-pad">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col items-start gap-5">
          <p className="eyebrow flex items-center gap-3">
            <NodeGlow size={8} />
            {CONTATO.eyebrow}
          </p>
          <h1 className="max-w-[16ch] text-balance">{CONTATO.titulo}</h1>
          <p className="prose-width text-lg text-text-muted">
            {CONTATO.corpo} <strong className="text-text">{CONTATO.destaque}</strong>
          </p>

          {/* O que acontece depois — reduz o atrito de preencher o form */}
          <h2 className="mt-2 text-xl">{PROCESSO.titulo}</h2>
          <dl className="flex flex-col gap-4">
            {PROCESSO.passos.map((passo) => (
              <div key={passo.titulo}>
                <dt className="font-display font-semibold">{passo.titulo}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-text-muted">{passo.texto}</dd>
              </div>
            ))}
          </dl>

          {/* WhatsApp — canal direto de baixo atrito */}
          <a
            href={WHATSAPP.url}
            target="_blank"
            rel="noopener"
            className="mt-2 inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent motion-reduce:transition-none"
          >
            <MessageCircle aria-hidden className="size-4 text-accent-ink" />
            Prefere WhatsApp? {WHATSAPP.numero}
          </a>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
