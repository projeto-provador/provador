import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Crumb = { name: string; path: string };

/** Trilha crawlable + schema BreadcrumbList (1:1 com o visível). */
export function Breadcrumbs({ items }: { items: ReadonlyArray<Crumb> }) {
  const all: ReadonlyArray<Crumb> = [{ name: "Início", path: "/" }, ...items];
  return (
    <nav aria-label="Trilha de navegação" className="text-sm text-text-muted">
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-text">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.path}
                    className="transition-colors hover:text-text motion-reduce:transition-none"
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
