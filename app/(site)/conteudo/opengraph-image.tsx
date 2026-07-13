import { brandOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Conteúdo — IA com responsabilidade humana";

export default function OgImage() {
  return brandOgImage(
    "IA com responsabilidade humana",
    "Artigos answer-first sobre service-as-a-software e cobrança por resultado.",
  );
}
