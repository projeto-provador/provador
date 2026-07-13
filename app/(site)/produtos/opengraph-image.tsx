import { brandOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Produtos — execuções do método QuipeAI";

export default function OgImage() {
  return brandOgImage(
    "Execuções do método",
    "Os produtos são exemplos de execução do método, não o negócio em si.",
  );
}
