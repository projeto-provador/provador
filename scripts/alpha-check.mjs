// Testes de aceite automatizados do site QuipeAI.
// Roda sobre o output prerenderizado de `next build` (.next/server/app).
// Critérios: doc técnico seções 6 e 8. Zero erros é o gate para fechar a onda.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const RAIZ = process.cwd();
const APP_BUILD = join(RAIZ, ".next", "server", "app");

const erros = [];
const avisos = [];

function erro(pagina, mensagem) {
  erros.push(`[ERRO] ${pagina}: ${mensagem}`);
}

function aviso(pagina, mensagem) {
  avisos.push(`[AVISO] ${pagina}: ${mensagem}`);
}

// Rotas e ondas. Espelho de lib/routes.ts (o script roda sem transpilar TS).
const ROTAS = [
  { path: "/", onda: 1 },
  { path: "/metodo", onda: 1 },
  { path: "/ponto-de-responsabilidade", onda: 1 },
  { path: "/trabalho-commodity", onda: 1 },
  { path: "/motor", onda: 1 },
  { path: "/cunha-contabil", onda: 2 },
  { path: "/auditoria-ia", onda: 2 },
  { path: "/cases/contabil", onda: 2 },
  { path: "/fabrica", onda: 3 },
  { path: "/modelo-30-porcento", onda: 3 },
  { path: "/rfee", onda: 3 },
  { path: "/manifesto", onda: 3 },
  { path: "/blog", onda: 3 },
];

const ondaAtualTexto = readFileSync(join(RAIZ, "lib", "routes.ts"), "utf8")
  .match(/ONDA_ATUAL[^=]*=\s*(\d)/);
const ONDA_ATUAL = ondaAtualTexto ? Number(ondaAtualTexto[1]) : 1;

// Páginas core que precisam mencionar ponto de responsabilidade e assinatura.
const PAGINAS_CORE = [
  "/",
  "/metodo",
  "/ponto-de-responsabilidade",
  "/trabalho-commodity",
  "/motor",
];

// Páginas de definição que precisam de blocos dl dt dd para AEO.
const PAGINAS_DEFINICAO = ["/metodo", "/ponto-de-responsabilidade", "/trabalho-commodity"];

function arquivoHtml(path) {
  const nome = path === "/" ? "index" : path.replace(/^\//, "");
  return join(APP_BUILD, `${nome}.html`);
}

function textoVisivel(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ");
}

function coletarJsonLd(html) {
  const blocos = [];
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = regex.exec(html)) !== null) blocos.push(m[1]);
  return blocos;
}

const rotasDaOnda = ROTAS.filter((rota) => rota.onda <= ONDA_ATUAL);
const pathsImplementados = new Set(rotasDaOnda.map((rota) => rota.path));

// Coleta slugs do blog prerenderizados para validar links de artigos.
const blogDir = join(APP_BUILD, "blog");
if (existsSync(blogDir)) {
  for (const item of readdirSync(blogDir)) {
    if (item.endsWith(".html")) {
      pathsImplementados.add(`/blog/${item.replace(/\.html$/, "")}`);
    }
  }
}

// 1. Toda rota implementada precisa ter HTML prerenderizado.
for (const rota of rotasDaOnda) {
  if (!existsSync(arquivoHtml(rota.path))) {
    erro(rota.path, "rota da onda atual sem HTML prerenderizado no build");
  }
}

// 2. Arquivos de sistema.
if (!existsSync(join(RAIZ, "public", "llms.txt"))) {
  erro("/llms.txt", "arquivo public/llms.txt não existe");
} else {
  const llms = readFileSync(join(RAIZ, "public", "llms.txt"), "utf8");
  if (!llms.startsWith("# QuipeAI")) erro("/llms.txt", "precisa começar com # QuipeAI");
  if (!llms.includes("## Docs")) erro("/llms.txt", "sem seção ## Docs");
  if (!llms.includes("## Opt-out")) erro("/llms.txt", "sem seção ## Opt-out");
  if (!/\[.+\]\(https:\/\/www\.quipeai\.com\.br\/.+\):/.test(llms)) {
    erro("/llms.txt", "sem lista de URLs com descrição de uma linha");
  }
}

if (!existsSync(join(RAIZ, "public", "docs", "llms-full.md"))) {
  erro("/docs/llms-full.md", "arquivo não existe");
} else {
  const full = readFileSync(join(RAIZ, "public", "docs", "llms-full.md"), "utf8");
  const secoes = [
    "# O que é QuipeAI",
    "## Definições canônicas",
    "## Método 5 etapas",
    "## Filtro ICP 4+1",
    "## Anti-perfil",
    "## Moat e lock-in",
    "## Modelo 30% equity",
    "## Onda 1 cunha contábil Reforma CBS IBS",
    "## Perguntas frequentes para IA",
    "## Fontes",
  ];
  for (const secao of secoes) {
    if (!full.includes(secao)) erro("/docs/llms-full.md", `sem seção obrigatória "${secao}"`);
  }
  if (/<[a-z][^>]*>/i.test(full)) erro("/docs/llms-full.md", "contém HTML, precisa ser markdown puro");
  if (!/\|\s*#\s*\|/.test(full)) erro("/docs/llms-full.md", "tabela markdown do filtro 4+1 ausente");
}

if (!existsSync(join(APP_BUILD, "robots.txt.body"))) {
  erro("/robots.txt", "robots.txt não gerado no build");
} else {
  const robots = readFileSync(join(APP_BUILD, "robots.txt.body"), "utf8");
  if (!robots.includes("Disallow: /api/")) erro("/robots.txt", "precisa bloquear /api");
  if (!robots.includes("Allow: /")) erro("/robots.txt", "precisa liberar /");
  if (!robots.includes("sitemap.xml")) erro("/robots.txt", "precisa apontar o sitemap");
}

if (!existsSync(join(APP_BUILD, "sitemap.xml.body"))) {
  erro("/sitemap.xml", "sitemap.xml não gerado no build");
} else {
  const sitemap = readFileSync(join(APP_BUILD, "sitemap.xml.body"), "utf8");
  for (const rota of rotasDaOnda) {
    const base = "https://www.quipeai.com.br";
    const comBarra = `<loc>${base}${rota.path}</loc>`;
    const semBarra = `<loc>${base}${rota.path === "/" ? "" : rota.path}</loc>`;
    if (!sitemap.includes(comBarra) && !sitemap.includes(semBarra)) {
      erro("/sitemap.xml", `rota implementada ${rota.path} ausente do sitemap`);
    }
  }
}

// 3. Checagens por página prerenderizada.
const regexEmoji = /\p{Extended_Pictographic}/u;

for (const rota of rotasDaOnda) {
  const arquivo = arquivoHtml(rota.path);
  if (!existsSync(arquivo)) continue;
  const html = readFileSync(arquivo, "utf8");
  const visivel = textoVisivel(html);

  // H1 único por página.
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) erro(rota.path, `precisa de exatamente 1 h1, encontrei ${h1s.length}`);

  // Sem travessão e sem emoji no texto visível.
  if (/[—–]/.test(visivel)) erro(rota.path, "texto visível contém travessão");
  if (regexEmoji.test(visivel)) erro(rota.path, "texto visível contém emoji");

  // Sem promessa de autonomia total: toda ocorrência precisa estar em contexto de negação ou anti-perfil.
  const ocorrencias = visivel.match(/.{0,60}autonomia total.{0,40}/gi) || [];
  for (const trecho of ocorrencias) {
    if (!/não|nao|quer|sem|anti|elimina/i.test(trecho)) {
      erro(rota.path, `possível promessa de autonomia total: "${trecho.trim()}"`);
    }
  }

  // Menção obrigatória nas páginas core.
  if (PAGINAS_CORE.includes(rota.path)) {
    if (!/ponto de responsabilidade/i.test(visivel)) {
      erro(rota.path, "página core sem menção a ponto de responsabilidade");
    }
    if (!/assina/i.test(visivel)) {
      erro(rota.path, "página core sem menção a assinatura");
    }
  }

  // Blocos definicionais dl dt dd nas páginas de definição.
  if (PAGINAS_DEFINICAO.includes(rota.path)) {
    if (!/<dl[\s>]/.test(html) || !/<dt[\s>]/.test(html) || !/<dd[\s>]/.test(html)) {
      erro(rota.path, "página de definição sem bloco dl dt dd para AEO");
    }
  }

  // JSON-LD precisa parsear e ter @context schema.org.
  const blocos = coletarJsonLd(html);
  if (blocos.length === 0) erro(rota.path, "sem nenhum bloco JSON-LD");
  for (const bloco of blocos) {
    try {
      const dado = JSON.parse(bloco);
      if (dado["@context"] !== "https://schema.org") {
        erro(rota.path, "JSON-LD sem @context schema.org");
      }
      if (!dado["@type"]) erro(rota.path, "JSON-LD sem @type");
      if (dado["@type"] === "FAQPage") {
        const qtd = (dado.mainEntity || []).length;
        if (rota.path === "/" && qtd < 8) {
          erro(rota.path, `FAQ AEO da home precisa de 8 perguntas no mínimo, tem ${qtd}`);
        }
        for (const q of dado.mainEntity || []) {
          if (!q.name || !q.acceptedAnswer?.text) {
            erro(rota.path, "FAQPage com pergunta sem name ou sem resposta");
          }
        }
      }
      if (dado["@type"] === "HowTo") {
        if ((dado.step || []).length !== 5) {
          erro(rota.path, "HowTo do método precisa de exatamente 5 etapas");
        }
      }
    } catch {
      erro(rota.path, "JSON-LD inválido, não parseia como JSON");
    }
  }

  // Título e descrição.
  const titulo = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  if (!titulo) erro(rota.path, "sem tag title");
  if (titulo.length > 65) aviso(rota.path, `title com ${titulo.length} chars, alvo 55 a 60`);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  if (!desc) erro(rota.path, "sem meta description");
  if (desc.length > 165) aviso(rota.path, `description com ${desc.length} chars, alvo 150 a 160`);

  // Links internos precisam apontar para rota implementada ou planejada.
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
  for (const href of hrefs) {
    if (href.startsWith("/_next") || href.startsWith("/docs/") || href === "/llms.txt") continue;
    const limpo = href.replace(/\/$/, "") || "/";
    const conhecida = ROTAS.some((r) => r.path === limpo) || pathsImplementados.has(limpo);
    if (!conhecida) {
      erro(rota.path, `link interno para rota desconhecida: ${href}`);
    } else if (!pathsImplementados.has(limpo)) {
      const alvo = ROTAS.find((r) => r.path === limpo);
      aviso(rota.path, `link para rota da onda ${alvo?.onda} ainda não implementada: ${href}`);
    }
  }

  // Idioma e viewport.
  if (!html.includes('lang="pt-BR"')) erro(rota.path, 'html sem lang="pt-BR"');
  if (!/<meta name="viewport"/.test(html)) erro(rota.path, "sem meta viewport");
}

// 4. Tabela-verdade do quiz 4+1 (a partir da Onda 2).
if (ONDA_ATUAL >= 2) {
  const { classificar } = await import(join(RAIZ, "lib", "quiz-core.mjs"));
  const casos = [
    // 5 sins: ICP-A.
    [{ q1: true, q2: true, q3: true, q4: true, projetosRecusados: 1 }, "ICP-A"],
    [{ q1: true, q2: true, q3: true, q4: true, projetosRecusados: 12 }, "ICP-A"],
    // 4 sins com gargalo de capacidade incerto: ICP-B.
    [{ q1: true, q2: true, q3: true, q4: true, projetosRecusados: 0 }, "ICP-B"],
    // Menos de 4 sins: FORA, mesmo com fila.
    [{ q1: false, q2: true, q3: true, q4: true, projetosRecusados: 5 }, "FORA"],
    [{ q1: true, q2: false, q3: true, q4: true, projetosRecusados: 0 }, "FORA"],
    [{ q1: true, q2: true, q3: false, q4: true, projetosRecusados: 3 }, "FORA"],
    [{ q1: true, q2: true, q3: true, q4: false, projetosRecusados: 1 }, "FORA"],
    [{ q1: false, q2: false, q3: false, q4: false, projetosRecusados: 9 }, "FORA"],
  ];
  for (const [entrada, esperado] of casos) {
    const obtido = classificar(entrada);
    if (obtido !== esperado) {
      erro(
        "quiz 4+1",
        `classificar(${JSON.stringify(entrada)}) devolveu ${obtido}, esperado ${esperado}`
      );
    }
  }

  // Componentes obrigatórios da Onda 2 presentes no HTML da cunha.
  const cunhaHtml = arquivoHtml("/cunha-contabil");
  if (existsSync(cunhaHtml)) {
    const html = readFileSync(cunhaHtml, "utf8");
    if (!html.includes('id="quiz"')) erro("/cunha-contabil", "âncora #quiz ausente");
    if (!/calculadora/i.test(html)) erro("/cunha-contabil", "calculadora de vazão ausente");
    if (!/Quem assina/.test(html)) erro("/cunha-contabil", "selo Quem assina ausente");
  }
}

// Relatório.
console.log(`Onda atual: ${ONDA_ATUAL}. Rotas checadas: ${rotasDaOnda.length}.`);
if (avisos.length) {
  console.log(`\nAvisos (${avisos.length}):`);
  for (const a of avisos) console.log(`  ${a}`);
}
if (erros.length) {
  console.log(`\nFalhas (${erros.length}):`);
  for (const e of erros) console.log(`  ${e}`);
  process.exit(1);
}
console.log(`\nZero falhas. Gate da onda ${ONDA_ATUAL} liberado.`);
