import Link from "next/link";
import { NAV_ITEMS } from "@/lib/site";

const LINKS_METODO = [
  { label: "Ponto de responsabilidade", href: "/ponto-de-responsabilidade" },
  { label: "Trabalho-commodity", href: "/trabalho-commodity" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "RFEE", href: "/rfee" },
];

export default function Footer() {
  return (
    <footer className="border-t border-borda bg-card">
      <div className="container-site grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="font-title text-lg font-extrabold text-white">
            Quipe<span className="text-neural">AI</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Método replicável de IA com autonomia limitada. O especialista
            decide e assina no ponto de responsabilidade. A assinatura é o
            produto.
          </p>
        </div>

        <div>
          <p className="font-title text-sm font-bold text-white">Navegação</p>
          <ul className="mt-3 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-title text-sm font-bold text-white">Definições</p>
          <ul className="mt-3 space-y-2">
            {LINKS_METODO.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-borda">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>QuipeAI. Service as a Software. @quipe.ai</p>
          <p>Não vendemos software. Viramos sócios do resultado.</p>
        </div>
      </div>
    </footer>
  );
}
