import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/*
 * OG por página — DESIGN.md §11: fundo obsidian, logo-node, título em Poppins,
 * verde de acento. Imagem não lê CSS vars: os hex vêm da paleta base (DESIGN.md §2).
 */
const OBSIDIAN = "#0B1120";
const OBSIDIAN_3 = "#17203A";
const NEURAL = "#00DC82";
const TEXT_MUTED = "#9AA7BD";

export async function brandOgImage(title: string, subtitle?: string): Promise<ImageResponse> {
  const poppins = await readFile(path.join(process.cwd(), "assets/fonts/Poppins-Bold.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: OBSIDIAN,
        backgroundImage: `radial-gradient(circle at 85% 20%, ${OBSIDIAN_3} 0%, ${OBSIDIAN} 55%)`,
        fontFamily: "Poppins",
        color: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            backgroundColor: NEURAL,
            boxShadow: `0 0 0 12px rgba(0,220,130,.14)`,
          }}
        />
        <div style={{ fontSize: 34, fontWeight: 700 }}>QuipeAI</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
        {subtitle ? (
          <div style={{ fontSize: 26, color: TEXT_MUTED, maxWidth: 900 }}>{subtitle}</div>
        ) : null}
      </div>

      <div style={{ display: "flex", fontSize: 22, color: NEURAL }}>quipeai.com.br</div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [{ name: "Poppins", data: poppins, weight: 700, style: "normal" }],
    },
  );
}
