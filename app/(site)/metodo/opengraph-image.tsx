import { brandOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "O Método (Revolução 5.0) — QuipeAI";

export default function OgImage() {
  return brandOgImage(
    "O Método (Revolução 5.0)",
    "Autonomia limitada, humano no ponto de responsabilidade, cobrança por resultado.",
  );
}
