/**
 * Halo de nós animado (assinatura da marca) — recria a linguagem do logotipo
 * QuipeAI: anéis concêntricos + nós verde/azul orbitando o "nó" central.
 * SVG + CSS puro (sem JS, ótimo para CWV). Decorativo → aria-hidden.
 * Sob prefers-reduced-motion as animações não existem → composição estática.
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
      {/* Anéis concêntricos (o halo do logo) */}
      <g stroke="var(--color-border)">
        <circle
          cx="200"
          cy="200"
          r="62"
          style={{ animation: "qi-ring-pulse 7s ease-in-out infinite" }}
        />
        <circle cx="200" cy="200" r="110" opacity="0.5" />
        <circle
          cx="200"
          cy="200"
          r="158"
          opacity="0.32"
          style={{ animation: "qi-ring-pulse 9s ease-in-out infinite" }}
        />
        <circle cx="200" cy="200" r="196" opacity="0.18" />
      </g>

      {/* Nó central */}
      <circle cx="200" cy="200" r="16" fill="var(--color-glow)" />
      <circle cx="200" cy="200" r="7" fill="var(--color-accent)" />

      {/* Nó verde orbitando (raio 110) */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "200px 200px",
          animation: "qi-orbit 26s linear infinite",
        }}
      >
        <line x1="200" y1="200" x2="200" y2="90" stroke="var(--color-accent)" strokeOpacity="0.2" />
        <circle cx="200" cy="90" r="18" fill="var(--color-glow)" />
        <circle cx="200" cy="90" r="9" fill="var(--color-accent)" />
      </g>

      {/* Nó azul orbitando ao contrário (raio 158) */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "200px 200px",
          animation: "qi-orbit-rev 38s linear infinite",
        }}
      >
        <line
          x1="200"
          y1="200"
          x2="358"
          y2="200"
          stroke="var(--color-secondary)"
          strokeOpacity="0.18"
        />
        <circle cx="358" cy="200" r="8" fill="var(--color-secondary)" />
      </g>

      {/* Nó pequeno externo (raio 196) */}
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "200px 200px",
          animation: "qi-orbit 52s linear infinite",
        }}
      >
        <circle cx="200" cy="4" r="5" fill="var(--color-accent)" opacity="0.7" />
      </g>
    </svg>
  );
}
