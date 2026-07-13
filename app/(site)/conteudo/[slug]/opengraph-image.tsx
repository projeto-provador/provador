import { ARTIGOS_PUBLICADOS } from "@/content/artigos/registry";
import { brandOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Artigo — QuipeAI";

export function generateStaticParams(): Array<{ slug: string }> {
  return ARTIGOS_PUBLICADOS.map((a) => ({ slug: a.slug }));
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = ARTIGOS_PUBLICADOS.find((a) => a.slug === slug);
  return brandOgImage(artigo?.title ?? "Conteúdo QuipeAI", artigo?.theme);
}
