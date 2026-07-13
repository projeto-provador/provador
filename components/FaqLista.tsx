import type { Faq } from "@/lib/faq";

// Accordion de FAQ reutilizável com affordance de expansão (chevron).
export default function FaqLista({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.pergunta} className="card-2 group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-title font-semibold text-white [&::-webkit-details-marker]:hidden">
            {faq.pergunta}
            <span
              aria-hidden="true"
              className="shrink-0 text-neural transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted">{faq.resposta}</p>
        </details>
      ))}
    </div>
  );
}
