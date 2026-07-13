import type { Metadata } from "next";
import { Suspense } from "react";
import { NodeGlow } from "@/components/ui/NodeGlow";
import { CONTATO } from "@/content/contato";
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
          {/* TODO(copy): "O que acontece depois" — 2–3 passos do processo pós-lead (SPEC §6.3) */}
        </div>

        <Suspense>
          <LeadForm />
        </Suspense>
      </div>
    </section>
  );
}
