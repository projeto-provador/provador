type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Nível do heading no documento (default h2). */
  as?: "h1" | "h2";
  className?: string;
};

/** Eyebrow + título — padrão de toda seção (DESIGN.md §9). */
export function SectionHeading({
  eyebrow,
  title,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <Heading className="max-w-[24ch] text-balance">{title}</Heading>
    </div>
  );
}
