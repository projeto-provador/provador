import type { MDXComponents } from "mdx/types";

/**
 * Mapeamento global de elementos MDX → estilos de token.
 * O corpo de artigo/case herda a escala tipográfica de globals.css;
 * aqui só o que precisa de classe própria.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <a {...props} className="text-accent-ink underline underline-offset-2" />,
    ul: (props) => <ul {...props} className="my-4 list-disc space-y-2 pl-6" />,
    ol: (props) => <ol {...props} className="my-4 list-decimal space-y-2 pl-6" />,
    p: (props) => <p {...props} className="my-4 leading-relaxed" />,
    h2: (props) => <h2 {...props} className="mt-12 mb-4" />,
    h3: (props) => <h3 {...props} className="mt-8 mb-3" />,
    blockquote: (props) => (
      <blockquote
        {...props}
        className="my-6 rounded-md bg-surface-alt px-6 py-4 font-display font-semibold italic"
      />
    ),
    strong: (props) => <strong {...props} className="font-semibold text-text" />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table {...props} className="w-full border-collapse text-sm" />
      </div>
    ),
    th: (props) => (
      <th
        {...props}
        className="border-b border-border px-3 py-2 text-left font-display font-semibold text-text"
      />
    ),
    td: (props) => <td {...props} className="border-b border-border px-3 py-2 align-top" />,
    ...components,
  };
}
