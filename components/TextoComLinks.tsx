import Link from "next/link";
import { Fragment } from "react";

// Renderiza parágrafos com links internos no formato [texto](/caminho).
// Usado pelo blog para o interlinking do cluster sem HTML no conteúdo.
const REGEX_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export default function TextoComLinks({ texto }: { texto: string }) {
  const partes: React.ReactNode[] = [];
  let ultimoIndice = 0;
  let m: RegExpExecArray | null;
  const regex = new RegExp(REGEX_LINK.source, "g");

  while ((m = regex.exec(texto)) !== null) {
    if (m.index > ultimoIndice) {
      partes.push(texto.slice(ultimoIndice, m.index));
    }
    partes.push(
      <Link key={`${m.index}-${m[2]}`} href={m[2]} className="link-inline">
        {m[1]}
      </Link>
    );
    ultimoIndice = m.index + m[0].length;
  }
  if (ultimoIndice < texto.length) {
    partes.push(texto.slice(ultimoIndice));
  }

  return (
    <>
      {partes.map((parte, indice) => (
        <Fragment key={indice}>{parte}</Fragment>
      ))}
    </>
  );
}

// Versão texto puro, para superfícies sem link (JSON-LD, meta description).
export function removerLinks(texto: string): string {
  return texto.replace(REGEX_LINK, "$1");
}
