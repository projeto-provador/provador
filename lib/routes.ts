// Fonte única das rotas do site, por onda de implementação.
// Usada pelo sitemap e pelos testes de aceite.
// atualizadoEm: data real da última edição de conteúdo da rota. Atualizar ao
// editar a página, para o lastmod do sitemap ser um sinal verdadeiro.
export type Rota = {
  path: string;
  onda: 1 | 2 | 3;
  prioridade: number;
  atualizadoEm: string;
};

export const ROTAS: Rota[] = [
  // Onda 1. Camada 0, Core.
  { path: "/", onda: 1, prioridade: 1.0, atualizadoEm: "2026-07-13" },
  { path: "/metodo", onda: 1, prioridade: 0.9, atualizadoEm: "2026-07-13" },
  {
    path: "/ponto-de-responsabilidade",
    onda: 1,
    prioridade: 0.8,
    atualizadoEm: "2026-07-13",
  },
  {
    path: "/trabalho-commodity",
    onda: 1,
    prioridade: 0.8,
    atualizadoEm: "2026-07-13",
  },
  { path: "/motor", onda: 1, prioridade: 0.9, atualizadoEm: "2026-07-13" },

  // Onda 2. Camada 1, Caixa.
  { path: "/cunha-contabil", onda: 2, prioridade: 0.9, atualizadoEm: "2026-07-13" },
  { path: "/auditoria-ia", onda: 2, prioridade: 0.7, atualizadoEm: "2026-07-13" },
  { path: "/cases/contabil", onda: 2, prioridade: 0.7, atualizadoEm: "2026-07-13" },

  // Onda 3. Camadas 2 e 3 e blog.
  { path: "/fabrica", onda: 3, prioridade: 0.7, atualizadoEm: "2026-07-13" },
  {
    path: "/modelo-30-porcento",
    onda: 3,
    prioridade: 0.8,
    atualizadoEm: "2026-07-13",
  },
  { path: "/rfee", onda: 3, prioridade: 0.6, atualizadoEm: "2026-07-13" },
  { path: "/manifesto", onda: 3, prioridade: 0.6, atualizadoEm: "2026-07-13" },
  { path: "/blog", onda: 3, prioridade: 0.7, atualizadoEm: "2026-07-13" },
];

// Onda atual implementada. Atualizar ao fechar cada onda.
export const ONDA_ATUAL: 1 | 2 | 3 = 3;

export function rotasImplementadas(): Rota[] {
  return ROTAS.filter((rota) => rota.onda <= ONDA_ATUAL);
}
