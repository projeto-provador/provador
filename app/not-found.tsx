import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site py-24 text-center">
      <p className="eyebrow">Erro 404</p>
      <h1 className="mt-4 text-4xl font-extrabold">Página não encontrada</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        O caminho não existe. O método existe. Volte para a home ou faça o
        teste 4+1.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/" className="btn-secondary">
          Voltar para a home
        </Link>
        <Link href="/cunha-contabil#quiz" className="btn-primary">
          Fazer teste 4+1
        </Link>
      </div>
    </section>
  );
}
