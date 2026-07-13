"use client";

// Error boundary global: falha inesperada em componente client não pode
// derrubar a jornada de conversão inteira.
export default function ErroGlobal({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container-site py-24 text-center">
      <p className="eyebrow">Erro inesperado</p>
      <h1 className="mt-4 text-3xl font-extrabold">Algo falhou por aqui</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        A página encontrou um erro. Tente de novo. Se persistir, fale com a
        QuipeAI pelo Instagram @quipe.ai.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button type="button" onClick={reset} className="btn-primary">
          Tentar de novo
        </button>
        <a href="/" className="btn-secondary">
          Voltar para a home
        </a>
      </div>
    </section>
  );
}
