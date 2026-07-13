type NodeGlowProps = {
  /** Diâmetro do ponto em px (default 10). */
  size?: number;
  className?: string;
};

/** O nó — assinatura da marca (DESIGN.md §9). Sempre decorativo. */
export function NodeGlow({ size = 10, className }: NodeGlowProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block rounded-full bg-accent ${className ?? ""}`}
      style={{ width: size, height: size, boxShadow: "0 0 0 6px var(--color-glow)" }}
    />
  );
}
