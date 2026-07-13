"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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

const INPUT_CLASS =
  "mt-2 w-full rounded-card2 border border-borda bg-obsidian px-4 py-3 text-white placeholder:text-muted focus:border-neural focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neural";

const BOTAO_SIM_NAO_FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// WhatsApp brasileiro: DDD + número, 10 ou 11 dígitos.
export function whatsappValido(valor: string): boolean {
  const digitos = valor.replace(/\D/g, "");
  return digitos.length >= 10 && digitos.length <= 11;
}

export default function QuizFiltro() {
  const searchParams = useSearchParams();
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
  const [honeypot, setHoneypot] = useState("");
  const [classificacao, setClassificacao] = useState<Classificacao | null>(null);
  const [comecou, setComecou] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [erroForm, setErroForm] = useState("");

  const tituloDadosRef = useRef<HTMLHeadingElement>(null);
  const tituloResultadoRef = useRef<HTMLHeadingElement>(null);

  // Fluxo A: resposta 5 pré preenchida via ?recusados=X e captura de UTM.
  useEffect(() => {
    setUtm(capturarUtm());
    const pre = searchParams.get("recusados");
    if (pre !== null && /^\d+$/.test(pre)) {
      setRecusados(pre);
    }
  }, [searchParams]);

  // Gestão de foco nas transições de etapa.
  useEffect(() => {
    if (etapa === "dados") tituloDadosRef.current?.focus();
    if (etapa === "resultado") tituloResultadoRef.current?.focus();
  }, [etapa]);

  // Agendamento concluído dentro do embed do Calendly.
  useEffect(() => {
    if (etapa !== "resultado" || classificacao !== "ICP-A") return;
    function aoReceberMensagem(evento: MessageEvent) {
      if (evento.origin !== "https://calendly.com") return;
      if (
        typeof evento.data === "object" &&
        evento.data !== null &&
        (evento.data as { event?: string }).event === "calendly.event_scheduled"
      ) {
        trackGa4("agenda_click", { origem: "calendly_embed_agendado" });
      }
    }
    window.addEventListener("message", aoReceberMensagem);
    return () => window.removeEventListener("message", aoReceberMensagem);
  }, [etapa, classificacao]);

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

  function voltarParaPerguntas() {
    setErroForm("");
    setEtapa("perguntas");
  }

  function refazerTeste() {
    setRespostas({ q1: null, q2: null, q3: null, q4: null });
    setRecusados("");
    setClassificacao(null);
    setErroForm("");
    setEtapa("perguntas");
  }

  async function concluir(evento: React.FormEvent) {
    evento.preventDefault();
    if (enviando) return;
    if (!nome.trim() || !empresa.trim() || !cargo.trim()) {
      setErroForm("Preencha nome, empresa e cargo.");
      return;
    }
    if (!whatsappValido(whatsapp)) {
      setErroForm("Informe um WhatsApp válido com DDD, 10 ou 11 dígitos.");
      return;
    }
    setErroForm("");
    setEnviando(true);

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
      whatsapp: whatsapp.replace(/\D/g, ""),
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

    // Honeypot preenchido indica bot: não envia webhook nem dispara eventos.
    const pareceBot = honeypot.trim().length > 0;

    // Envia para webhook n8n > HubSpot ou Sheets.
    if (WEBHOOK_URL && !pareceBot) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        keepalive: true,
      }).catch(() => {
        // falha de rede no webhook não bloqueia o usuário
      });
    } else if (!WEBHOOK_URL && process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_N8N_WEBHOOK_URL não definida: lead do quiz não será enviado."
      );
    }

    if (!pareceBot) {
      trackGa4("quiz_complete", { classificacao: resultado });
      if (resultado === "ICP-A") {
        // Dispara apenas quando recusados >=1 e passa nas 4 perguntas.
        trackConversaQualificada({ projetos_recusados: dados.projetosRecusados });
      } else if (resultado === "ICP-B") {
        trackGa4("icp_b");
      }
    }

    setEnviando(false);
    setEtapa("resultado");
  }

  function clicarAgenda() {
    trackGa4("agenda_click", { origem: "quiz" });
  }

  return (
    <div id="quiz" className="card relative scroll-mt-24">
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
                  className={`rounded-card2 border px-5 py-2 text-sm font-semibold transition ${BOTAO_SIM_NAO_FOCUS} ${
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
                  className={`rounded-card2 border px-5 py-2 text-sm font-semibold transition ${BOTAO_SIM_NAO_FOCUS} ${
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
              maxLength={4}
              value={recusados}
              onFocus={marcarInicio}
              onChange={(e) => setRecusados(e.target.value.replace(/\D/g, ""))}
              placeholder="Digite só o número"
              className={INPUT_CLASS}
            />
          </div>

          {erroForm ? (
            <p role="alert" className="text-sm text-rose">
              {erroForm}
            </p>
          ) : null}

          <button type="button" onClick={irParaDados} className="btn-primary w-full">
            Continuar
          </button>
        </div>
      ) : null}

      {etapa === "dados" ? (
        <form onSubmit={concluir} className="mt-6 space-y-4">
          <h3
            ref={tituloDadosRef}
            tabIndex={-1}
            className="text-lg font-bold outline-none"
          >
            Último passo antes do resultado
          </h3>
          <p className="text-sm text-muted">
            Usamos esses dados só para a conversa de piloto.
          </p>
          <div>
            <label htmlFor="quiz-nome" className="text-sm font-semibold">
              Nome
            </label>
            <input
              id="quiz-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
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
              className={INPUT_CLASS}
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          {/* Honeypot anti-spam: invisível para humanos, bots preenchem. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
          >
            <label htmlFor="quiz-site">Não preencha este campo</label>
            <input
              id="quiz-site"
              name="site"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {erroForm ? (
            <p role="alert" className="text-sm text-rose">
              {erroForm}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={voltarParaPerguntas}
              className="btn-secondary flex-1"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Concluir teste"}
            </button>
          </div>
        </form>
      ) : null}

      {etapa === "resultado" ? (
        <div className="mt-6 space-y-5">
          {classificacao === "ICP-A" ? (
            <>
              <div className="card-2 border-neural">
                <p className="eyebrow">Resultado</p>
                <h3
                  ref={tituloResultadoRef}
                  tabIndex={-1}
                  className="mt-2 text-xl font-extrabold text-neural outline-none"
                >
                  Você é ICP-A da Onda 1
                </h3>
                <p className="mt-3 text-sm text-muted">
                  Demanda represada com Reforma CBS IBS. O trabalho-commodity
                  vai para o motor. Você decide e assina no ponto de
                  responsabilidade. Agende 15 minutos, toque 1.
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
            </>
          ) : null}

          {classificacao === "ICP-B" ? (
            <div className="card-2 border-amber">
              <p className="eyebrow">Resultado</p>
              <h3
                ref={tituloResultadoRef}
                tabIndex={-1}
                className="mt-2 text-xl font-extrabold text-amber outline-none"
              >
                Você é ICP-B
              </h3>
              <p className="mt-3 text-sm text-muted">
                Passa nas 4 perguntas, mas sem fila de projetos recusados o
                gargalo é demanda, não capacidade. Vamos nutrir: acompanhe o
                método e o número medido da cunha. Quando a fila aparecer, a
                conversa muda.
              </p>
            </div>
          ) : null}

          {classificacao === "FORA" ? (
            <div className="card-2">
              <p className="eyebrow">Resultado</p>
              <h3
                ref={tituloResultadoRef}
                tabIndex={-1}
                className="mt-2 text-xl font-extrabold outline-none"
              >
                Fora do perfil, sem constrangimento
              </h3>
              <p className="mt-3 text-sm text-muted">
                O método serve para operação com trabalho-commodity caro,
                curadoria que é selo, erro com consequência e vazão que vira
                margem. Se esse não é o seu caso, uma ferramenta pronta resolve
                melhor e mais barato.
              </p>
            </div>
          ) : null}

          {classificacao !== "ICP-A" ? (
            <button type="button" onClick={refazerTeste} className="btn-secondary">
              Refazer o teste
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
