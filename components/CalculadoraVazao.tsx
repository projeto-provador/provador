"use client";

import { useState } from "react";
import { trackGa4 } from "@/lib/analytics";

// Calculadora de vazão. Inputs: clientes ativos, tempo médio por entrega em
// horas, % commodity estimado. Output: horas commodity por mês e potencial de
// liberação com o motor.
const INPUT_CLASS =
  "mt-2 w-full rounded-card2 border border-borda bg-obsidian px-4 py-3 text-white focus:border-neural focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neural";

function limparNumero(valor: string, maxDigitos: number): string {
  return valor.replace(/\D/g, "").slice(0, maxDigitos);
}

export default function CalculadoraVazao() {
  const [clientes, setClientes] = useState("30");
  const [horasPorEntrega, setHorasPorEntrega] = useState("8");
  const [percentualCommodity, setPercentualCommodity] = useState("60");
  const [calculou, setCalculou] = useState(false);

  const numClientes = Number(clientes) || 0;
  const numHoras = Number(horasPorEntrega) || 0;
  const numPercentual = Math.min(100, Number(percentualCommodity) || 0);

  const horasTotais = numClientes * numHoras;
  const horasCommodity = Math.round(horasTotais * (numPercentual / 100));
  // Com o motor, o rascunho-commodity sai da mão do especialista. Estimativa
  // conservadora: 80% das horas commodity liberadas para revisão e assinatura.
  const horasLiberadas = Math.round(horasCommodity * 0.8);

  function calcular() {
    setCalculou(true);
    trackGa4("calculadora_vazao", {
      clientes: numClientes,
      horas_commodity: horasCommodity,
    });
  }

  return (
    <div className="card">
      <p className="eyebrow">Calculadora de vazão</p>
      <h2 className="mt-2 text-2xl font-extrabold">
        Quantas horas de commodity a sua operação queima por mês
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="calc-clientes" className="text-sm font-semibold">
            Clientes ativos
          </label>
          <input
            id="calc-clientes"
            inputMode="numeric"
            maxLength={5}
            value={clientes}
            onChange={(e) => setClientes(limparNumero(e.target.value, 5))}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="calc-horas" className="text-sm font-semibold">
            Horas por entrega no mês
          </label>
          <input
            id="calc-horas"
            inputMode="numeric"
            maxLength={4}
            value={horasPorEntrega}
            onChange={(e) => setHorasPorEntrega(limparNumero(e.target.value, 4))}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label htmlFor="calc-percentual" className="text-sm font-semibold">
            % commodity estimado
          </label>
          <input
            id="calc-percentual"
            inputMode="numeric"
            maxLength={3}
            value={percentualCommodity}
            onChange={(e) => {
              // Clampa em 100 já no input, para o valor exibido corresponder
              // sempre ao valor calculado.
              const limpo = limparNumero(e.target.value, 3);
              const numero = Number(limpo);
              setPercentualCommodity(
                limpo === "" ? "" : String(Math.min(100, numero))
              );
            }}
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <button type="button" onClick={calcular} className="btn-primary mt-6">
        Calcular
      </button>

      {/* Região de status sempre montada, para leitores de tela anunciarem
          o resultado quando ele for injetado. */}
      <div role="status" aria-live="polite">
        {calculou ? (
          <div className="card-2 mt-6 flex flex-wrap items-center gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Horas commodity por mês
              </p>
              <p className="numero-serif">{horasCommodity.toLocaleString("pt-BR")}h</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">
                Potencial de liberação com o motor
              </p>
              <p className="numero-serif">{horasLiberadas.toLocaleString("pt-BR")}h</p>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Horas que voltam para revisão, decisão e assinatura no ponto de
              responsabilidade. Vazão vira faturamento, margem e EBITDA.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
