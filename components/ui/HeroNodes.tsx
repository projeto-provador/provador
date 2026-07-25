/**
 * Halo de nós animado (assinatura da marca) — recria a linguagem do logotipo
 * QuipeAI: anéis concêntricos + nós verde/azul orbitando o "nó" central.
 *
 * A animação conta a tese da marca: o sinal nasce na borda, atravessa as camadas
 * e converge no nó central — o ponto de responsabilidade, onde o humano decide e
 * assina. Por isso o pulso vai de fora para dentro, não o contrário.
 *
 * SVG + CSS puro (sem JS, sem dependência de motion — ótimo para CWV).
 * Decorativo → aria-hidden. Sob prefers-reduced-motion os @keyframes não existem
 * (ver globals.css) → a composição fica estática, sem quebrar o layout.
 */
export function HeroNodes({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="presentation"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      {/* Pulso convergente: da borda para o nó central (3 ondas escalonadas) */}
      <g
        stroke="var(--color-accent)"
        style={{ transformBox: "view-box", transformOrigin: "200px 200px" }}
      >
        {[0, 1.9, 3.8].map((delay) => (
          <circle
            key={delay}
            cx="200"
            cy="200"
            r="190"
            strokeWidth="1.5"
            style={{ animation: `qi-converge 5.7s ease-in ${delay}s infinite` }}
          />
        ))}
      </g>

      {/* Anéis concêntricos (o halo do logo) */}
      <g stroke="var(--color-border)">
        <circle
          cx="200"
          cy="200"
          r="62"
          style={{ animation: "qi-ring-pulse 4s ease-in-out infinite" }}
        />
        <circle cx="200" cy="200" r="110" opacity="0.7" />
        <circle
          cx="200"
          cy="200"
          r="158"
          opacity="0.55"
          style={{ animation: "qi-ring-pulse 5.5s ease-in-out 1s infinite" }}
        />
        <circle cx="200" cy="200" r="196" opacity="0.35" />
      </g>

      {/* Nó verde orbitando (raio 110) — com sinal viajando pela conexão */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "200px 200px",
          animation: "qi-orbit 14s linear infinite",
        }}
      >
        <line
          x1="200"
          y1="200"
          x2="200"
          y2="90"
          stroke="var(--color-accent)"
          strokeOpacity="0.35"
        />
        <circle
          cx="200"
          cy="90"
          r="3.5"
          fill="var(--color-accent)"
          style={{
            transformBox: "view-box",
            transformOrigin: "200px 90px",
            animation: "qi-signal-in 2.2s ease-in infinite",
          }}
        />
        <circle cx="200" cy="90" r="18" fill="var(--color-glow)" />
        <circle cx="200" cy="90" r="9" fill="var(--color-accent)" />
      </g>

      {/* Nó azul orbitando ao contrário (raio 158) */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "200px 200px",
          animation: "qi-orbit-rev 21s linear infinite",
        }}
      >
        <line
          x1="200"
          y1="200"
          x2="358"
          y2="200"
          stroke="var(--color-secondary)"
          strokeOpacity="0.3"
        />
        <circle cx="358" cy="200" r="14" fill="var(--color-glow)" />
        <circle cx="358" cy="200" r="7" fill="var(--color-secondary)" />
      </g>

      {/* Nós pequenos externos (raio 196) */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "200px 200px",
          animation: "qi-orbit 28s linear infinite",
        }}
      >
        <circle cx="200" cy="4" r="5" fill="var(--color-accent)" opacity="0.8" />
        <circle cx="396" cy="200" r="3.5" fill="var(--color-secondary)" opacity="0.7" />
      </g>

      {/* Nó central — o ponto de responsabilidade. Pulsa: recebe e assina. */}
      <g style={{ transformBox: "view-box", transformOrigin: "200px 200px" }}>
        <circle
          cx="200"
          cy="200"
          r="22"
          fill="var(--color-glow)"
          style={{ animation: "qi-core-pulse 2.2s ease-out infinite" }}
        />
        <circle cx="200" cy="200" r="16" fill="var(--color-glow)" />
        <circle cx="200" cy="200" r="7.5" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
