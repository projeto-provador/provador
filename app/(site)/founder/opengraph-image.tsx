import { brandOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Curva C — founder da QuipeAI";

export default function OgImage() {
  return brandOgImage(
    "Curva C",
    "Luiz Guilherme Ramos Guimarães — founder da QuipeAI e a tese contrária.",
  );
}
