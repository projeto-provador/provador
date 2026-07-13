import { brandOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Peça um piloto — QuipeAI. Se não entregar, você não paga.";

export default function OgImage() {
  return brandOgImage("Topa um piloto?", "Se não entregar, você não paga.");
}
