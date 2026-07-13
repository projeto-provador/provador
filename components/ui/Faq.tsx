import { ChevronDown } from "lucide-react";

export type FaqItem = { question: string; answer: string };

/**
 * FAQ acessível com <details>/<summary> — abre sem JS, conteúdo sempre no HTML
 * (DESIGN.md §9). O schema FAQPage correspondente é emitido pela página (1:1).
 */
export function Faq({ items }: { items: ReadonlyArray<FaqItem> }) {
  return (
    <div className="divide-y divide-border rounded-md border border-border bg-surface shadow-card">
      {items.map((item) => (
        <details key={item.question} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden
              className="size-4 shrink-0 text-text-subtle transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <p className="prose-width mt-3 leading-relaxed text-text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
