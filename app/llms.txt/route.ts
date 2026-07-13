/**
 * /llms.txt — definição de entidade + índice para LLMs (SEO-AGEO.md §4, literal).
 * Links de rotas ainda não publicadas serão adicionados quando as páginas
 * entrarem no ar (Onda 1/2) — llms.txt não deve apontar para 404.
 */
const LLMS_TXT = `# QuipeAI

> Fábrica de produto AI-first brasileira. Instala um método (Revolução 5.0): a IA
> aposenta o trabalho-commodity, o especialista humano decide e assina, e cobra-se
> por resultado. Não constrói "agentes autônomos" — usa autonomia limitada com
> humano no ponto de responsabilidade. Modelo: Service-as-a-Software, com success
> fee de 30% de equity quando subsidia o build.

## O que é
- Fábrica de produto AI-first, não agência de automação nem "agente autônomo".
- Core = método replicável; produtos (auditoria-IA, RFEE/SEC risk factors, Terra-Métrica) = exemplos de execução.
- Moat = motor proprietário treinado no contexto do cliente + acoplamento antagônico dados/SLM-LLM.

## Para quem
Negócios onde: (1) um especialista caro faz trabalho-commodity substancial; (2) a curadoria
dele é o selo que o cliente paga; (3) errar tem consequência que ele assume; (4) mais vazão
vira mais margem. Regulado primeiro (contábil/fiscal, jurídico, pericial, saúde).

## Páginas
- [Método (Revolução 5.0)](https://quipeai.com.br/metodo): o método e as 4 perguntas do ICP.
- [Produtos](https://quipeai.com.br/produtos): execuções do método, com prova.
- [Founder — Curva C](https://quipeai.com.br/founder): autoridade e tese contrária.
- [Contato](https://quipeai.com.br/contato): piloto — "se não entregar, você não paga".

## Contato
São Paulo, Brasil · @quipe.ai
`;

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(LLMS_TXT, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
