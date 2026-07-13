// Núcleo da classificação 4+1 em JS puro, compartilhado entre o app e os
// testes de aceite. Regra: 4 sins com capacidade represada (5 sins) é ICP-A.
// 4 sins sem capacidade represada é ICP-B. Menos de 4 sins é FORA.

/**
 * @param {{q1: boolean, q2: boolean, q3: boolean, q4: boolean, projetosRecusados: number}} r
 * @returns {"ICP-A" | "ICP-B" | "FORA"}
 */
export function classificar(r) {
  const sinsBase = [r.q1, r.q2, r.q3, r.q4].filter(Boolean).length;
  const capacidadeRepresada = r.projetosRecusados >= 1;

  if (sinsBase === 4 && capacidadeRepresada) return "ICP-A";
  if (sinsBase === 4 && !capacidadeRepresada) return "ICP-B";
  return "FORA";
}
