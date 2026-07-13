type CardProps = {
  /** Hover de elevação/borda — só com motion permitido (DESIGN.md §9). */
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Card({ interactive = false, className, children }: CardProps) {
  return (
    <div
      className={`rounded-md border border-border bg-surface p-6 shadow-card ${
        interactive
          ? "transition-[border-color,transform] hover:-translate-y-1 hover:border-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          : ""
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
