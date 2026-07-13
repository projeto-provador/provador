// Fonte única das rotas do site, por onda de implementação.
// Usada pelo sitemap e pelos testes de aceite.
export type Rota = {
  path: string;
  onda: 1 | 2 | 3;
  prioridade: number;
};

export const ROTAS: Rota[] = [
  // Onda 1. Camada 0, Core.
  { path: "/", onda: 1, prioridade: 1.0 },
  { path: "/metodo", onda: 1, prioridade: 0.9 },
  { path: "/ponto-de-responsabilidade", onda: 1, prioridade: 0.8 },
  { path: "/trabalho-commodity", onda: 1, prioridade: 0.8 },
  { path: "/motor", onda: 1, prioridade: 0.9 },

  // Onda 2. Camada 1, Caixa.
  { path: "/cunha-contabil", onda: 2, prioridade: 0.9 },
  { path: "/auditoria-ia", onda: 2, prioridade: 0.7 },
  { path: "/cases/contabil", onda: 2, prioridade: 0.7 },

  // Onda 3. Camadas 2 e 3 e blog.
  { path: "/fabrica", onda: 3, prioridade: 0.7 },
  { path: "/modelo-30-porcento", onda: 3, prioridade: 0.8 },
  { path: "/rfee", onda: 3, prioridade: 0.6 },
  { path: "/manifesto", onda: 3, prioridade: 0.6 },
  { path: "/blog", onda: 3, prioridade: 0.7 },
];

// Onda atual implementada. Atualizar ao fechar cada onda.
export const ONDA_ATUAL: 1 | 2 | 3 = 3;

export function rotasImplementadas(): Rota[] {
  return ROTAS.filter((rota) => rota.onda <= ONDA_ATUAL);
}
