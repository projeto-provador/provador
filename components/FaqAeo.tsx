import JsonLd from "./JsonLd";
import FaqLista from "./FaqLista";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/lib/faq";

type FaqAeoProps = {
  faqs: Faq[];
  titulo?: string;
};

// Seção de FAQ com JSON-LD FAQPage para AEO.
export default function FaqAeo({ faqs, titulo = "Perguntas frequentes" }: FaqAeoProps) {
  return (
    <section aria-label="Perguntas frequentes" className="container-site py-16">
      <JsonLd data={faqSchema(faqs)} />
      <h2 className="text-3xl font-extrabold">{titulo}</h2>
      <div className="mt-8">
        <FaqLista faqs={faqs} />
      </div>
    </section>
  );
}
