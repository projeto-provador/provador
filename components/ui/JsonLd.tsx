type JsonLdProps = {
  /** Objeto schema.org já montado (ver lib/schema.ts). */
  data: Record<string, unknown>;
};

/** Emite JSON-LD server-rendered (presente no HTML da primeira resposta). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
