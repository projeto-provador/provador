"use client";

import { useEffect, useState } from "react";
import { FILTRO_4_MAIS_1 } from "@/lib/site";
import {
  classificar,
  QUIZ_STORAGE_KEY,
  type Classificacao,
  type LeadQuiz,
} from "@/lib/quiz";
import { trackGa4, trackConversaQualificada } from "@/lib/analytics";
import { capturarUtm, calendlyComUtm } from "@/lib/utm";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/quipeai/15min";
const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

type Etapa = "perguntas" | "dados" | "resultado";

const PERGUNTAS_SIM_NAO = FILTRO_4_MAIS_1.slice(0, 4);
const PERGUNTA_OURO = FILTRO_4_MAIS_1[4];

export default function QuizFiltro() {
  const [etapa, setEtapa] = useState<Etapa>("perguntas");
  const [respostas, setRespostas] = useState<Record<string, boolean | null>>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
  });
  const [recusados, setRecusados] = useState<string>("");
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [classificacao, setClassificacao] = useState<Classificacao | null>(null);
  const [comecou, setComecou] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [erroForm, setErroForm] = useState("");

  // Fluxo A: resposta 5 pré preenchida via ?recusados=X e captura de UTM.
  useEffect(() => {
    setUtm(capturarUtm());
    const params = new URLSearchParams(window.location.search);
    const pre = params.get("recusados");
    if (pre !== null && /^\d+$/.test(pre)) {
      setRecusados(pre);
    }
  }, []);

  function marcarInicio() {
    if (!comecou) {
      setComecou(true);
      trackGa4("quiz_start");
    }
  }

  function responder(id: string, valor: boolean) {
    marcarInicio();
    setRespostas((atual) => ({ ...atual, [id]: valor }));
  }

  const perguntasCompletas =
    Object.values(respostas).every((v) => v !== null) && /^\d+$/.test(recusados);

  function irParaDados() {
    if (!perguntasCompletas) {
      setErroForm("Responda as 4 perguntas e informe o número de projetos recusados.");
      return;
    }
    setErroForm("");
    setEtapa("dados");
  }

  async function concluir(evento: React.FormEvent) {
    evento.preventDefault();
    if (!nome.trim() || !empresa.trim() || !whatsapp.trim()) {
      setErroForm("Preencha nome, empresa e WhatsApp.");
      return;
    }
    setErroForm("");

    const dados = {
      q1: respostas.q1 === true,
      q2: respostas.q2 === true,
      q3: respostas.q3 === true,
      q4: respostas.q4 === true,
      projetosRecusados: Number(recusados),
    };
    const resultado = classificar(dados);
    setClassificacao(resultado);

    const lead: LeadQuiz = {
      nome: nome.trim(),
      empresa: empresa.trim(),
      cargo: cargo.trim(),
      whatsapp: whatsapp.trim(),
      respostas: dados,
      classificacao: resultado,
      utm,
      criadoEm: new Date().toISOString(),
    };

    // Salva no localStorage.
    try {
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(lead));
    } catch {
      // storage indisponível não bloqueia o fluxo
    }

    // Envia para webhook n8n > HubSpot ou Sheets.
    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        keepalive: true,
      }).catch(() => {
        // falha de rede no webhook não bloqueia o usuário
      });
    }

    trackGa4("quiz_complete", { classificacao: resultado });
    if (resultado === "ICP-A") {
      // Dispara apenas quando recusados >=1 e passa nas 4 perguntas.
      trackConversaQualificada({ projetos_recusados: dados.projetosRecusados });
    } else if (resultado === "ICP-B") {
      trackGa4("icp_b");
    }

    setEtapa("resultado");
  }

  function clicarAgenda() {
    trackGa4("agenda_click", { origem: "quiz" });
  }

  return (
    <div id="quiz" className="card scroll-mt-24">
      <p className="eyebrow">Teste 4+1</p>
      <h2 className="mt-2 text-2xl font-extrabold">
        Descubra em 60s se você é ICP-A da Onda 1
      </h2>

      {etapa === "perguntas" ? (
        <div className="mt-6 space-y-5">
          {PERGUNTAS_SIM_NAO.map((pergunta, index) => (
            <fieldset key={pergunta.id} className="card-2">
              <legend className="sr-only">{pergunta.curto}</legend>
              <p className="text-sm font-semibold text-white">
                {index + 1}. {pergunta.pergunta}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => responder(pergunta.id, true)}
                  aria-pressed={respostas[pergunta.id] === true}
                  className={`rounded-card2 border px-5 py-2 text-sm font-semibold transition ${
                    respostas[pergunta.id] === true
                      ? "border-neural bg-neural text-obsidian"
                      : "border-borda bg-card text-white hover:border-neural"
                  }`}
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={() => responder(pergunta.id, false)}
                  aria-pressed={respostas[pergunta.id] === false}
                  className={`rounded-card2 border px-5 py-2 text-sm font-semibold transition ${
                    respostas[pergunta.id] === false
                      ? "border-rose bg-rose text-obsidian"
                      : "border-borda bg-card text-white hover:border-rose"
                  }`}
                >
                  Não
                </button>
              </div>
            </fieldset>
          ))}

          <div className="card-2 border-amber">
            <label htmlFor="recusados" className="text-sm font-semibold text-white">
              +1. {PERGUNTA_OURO.pergunta}
            </label>
            <input
              id="recusados"
              inputMode="numeric"
              pattern="\d*"
              value={recusados}
              onFocus={marcarInicio}
              onChange={(e) => setRecusados(e.target.value.replace(/\D/g, ""))}
              placeholder="Digite só o número"
              className="mt-3 w-full rounded-card2 border border-borda bg-obsidian px-4 py-3 text-white placeholder:text-muted focus:border-neural focus:outline-none"
            />
          </div>

          {erroForm ? <p className="text-sm text-rose">{erroForm}</p> : null}

          <button type="button" onClick={irParaDados} className="btn-primary w-full">
            Ver meu resultado
          </button>
        </div>
      ) : null}

      {etapa === "dados" ? (
        <form onSubmit={concluir} className="mt-6 space-y-4">
          <p className="text-sm text-muted">
            Último passo antes do resultado. Usamos esses dados só para a
            conversa de piloto.
          </p>
          <div>
            <label htmlFor="quiz-nome" className="text-sm font-semibold">
              Nome
            </label>
            <input
              id="quiz-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full rounded-card2 border border-borda bg-obsidian px-4 py-3 text-white focus:border-neural focus:outline-none"
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="quiz-empresa" className="text-sm font-semibold">
              Empresa
            </label>
            <input
              id="quiz-empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="mt-2 w-full rounded-card2 border border-borda bg-obsidian px-4 py-3 text-white focus:border-neural focus:outline-none"
              autoComplete="organization"
            />
          </div>
          <div>
            <label htmlFor="quiz-cargo" className="text-sm font-semibold">
              Cargo
            </label>
            <input
              id="quiz-cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              className="mt-2 w-full rounded-card2 border border-borda bg-obsidian px-4 py-3 text-white focus:border-neural focus:outline-none"
              autoComplete="organization-title"
            />
          </div>
          <div>
            <label htmlFor="quiz-whatsapp" className="text-sm font-semibold">
              WhatsApp
            </label>
            <input
              id="quiz-whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="DDD e número"
              className="mt-2 w-full rounded-card2 border border-borda bg-obsidian px-4 py-3 text-white placeholder:text-muted focus:border-neural focus:outline-none"
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          {erroForm ? <p className="text-sm text-rose">{erroForm}</p> : null}

          <button type="submit" className="btn-primary w-full">
            Concluir teste
          </button>
        </form>
      ) : null}

      {etapa === "resultado" && classificacao === "ICP-A" ? (
        <div className="mt-6 space-y-5">
          <div className="card-2 border-neural">
            <p className="eyebrow">Resultado</p>
            <h3 className="mt-2 text-xl font-extrabold text-neural">
              Você é ICP-A da Onda 1
            </h3>
            <p className="mt-3 text-sm text-muted">
              Demanda represada com Reforma CBS IBS. O trabalho-commodity vai
              para o motor. Você decide e assina no ponto de responsabilidade.
              Agende 15 minutos, toque 1.
            </p>
          </div>
          <a
            href={calendlyComUtm(CALENDLY_URL, utm)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={clicarAgenda}
            className="btn-primary block text-center"
          >
            Agendar 15 min agora
          </a>
          <iframe
            src={calendlyComUtm(CALENDLY_URL, utm)}
            title="Agenda de 15 minutos com a QuipeAI"
            className="h-[640px] w-full rounded-card border border-borda bg-white"
            loading="lazy"
          />
        </div>
      ) : null}

      {etapa === "resultado" && classificacao === "ICP-B" ? (
        <div className="card-2 mt-6 border-amber">
          <p className="eyebrow">Resultado</p>
          <h3 className="mt-2 text-xl font-extrabold text-amber">Você é ICP-B</h3>
          <p className="mt-3 text-sm text-muted">
            Passa nas 4 perguntas, mas sem fila de projetos recusados o gargalo
            é demanda, não capacidade. Vamos nutrir: acompanhe o método e o
            número medido da cunha. Quando a fila aparecer, a conversa muda.
          </p>
        </div>
      ) : null}

      {etapa === "resultado" && classificacao === "FORA" ? (
        <div className="card-2 mt-6">
          <p className="eyebrow">Resultado</p>
          <h3 className="mt-2 text-xl font-extrabold">Fora do perfil, sem constrangimento</h3>
          <p className="mt-3 text-sm text-muted">
            O método serve para operação com trabalho-commodity caro, curadoria
            que é selo, erro com consequência e vazão que vira margem. Se esse
            não é o seu caso, uma ferramenta pronta resolve melhor e mais
            barato.
          </p>
        </div>
      ) : null}
    </div>
  );
}
