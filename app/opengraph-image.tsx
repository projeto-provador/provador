import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "QuipeAI. O método é a ponta de lança. Não vendemos software. Viramos sócios do resultado.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG image 1200x630 com o selo Quem assina, gerada no build sem asset externo.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0B1120",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#00DC82", letterSpacing: 4 }}>
            SERVICE AS A SOFTWARE · @QUIPE.AI
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            O método é a ponta de lança. Não vendemos software. Viramos sócios
            do resultado.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #243154",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, color: "#94A3B8", letterSpacing: 2 }}>
              QUEM ASSINA
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, marginTop: 6 }}>
              Especialista no ponto de responsabilidade
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
            <span>Quipe</span>
            <span style={{ color: "#00DC82" }}>AI</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
