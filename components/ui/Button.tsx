import Link from "next/link";
import type { AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-sans text-sm font-semibold transition-colors motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast hover:brightness-110",
  secondary: "border border-border text-text hover:border-accent",
  ghost: "text-accent-ink hover:underline",
};

type CommonProps = {
  variant?: Variant;
  /** Evento de analytics emitido no clique (data-event). */
  event?: AnalyticsEvent;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string; type?: never };
type ButtonAsButton = CommonProps & { href?: never; type?: "button" | "submit" };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** `<a>` quando navega, `<button>` quando ação — DESIGN.md §9. */
export function Button({ variant = "primary", event, className, children, ...rest }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className ?? ""}`;

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link href={rest.href} data-event={event} className={cls}>
        {children}
      </Link>
    );
  }

  const { type = "button" } = rest as ButtonAsButton;
  return (
    <button type={type} data-event={event} className={cls}>
      {children}
    </button>
  );
}
