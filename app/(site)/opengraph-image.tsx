import { brandOgImage, OG_SIZE } from "@/lib/og";
import { TESE_UMA_LINHA } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "QuipeAI — IA que assume o resultado, com um humano que decide e assina.";

export default function OgImage() {
  return brandOgImage(TESE_UMA_LINHA, "Fábrica de produto AI-first · São Paulo, Brasil");
}
