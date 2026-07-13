// Selo Quem assina: avatar, nome, registro profissional e texto padrão.
// ANTES DE PRODUÇÃO: substituir o placeholder "Especialista Veritum" pelo
// nome real do profissional e pelo número de registro CRC verificável, com
// aprovação de Luiz Guilherme. Registro CFC é público e checável; um selo
// genérico enfraquece a prova.
type SeloQuemAssinaProps = {
  nome: string;
  registro: string;
  iniciais: string;
  cargo?: string;
};

export default function SeloQuemAssina({
  nome,
  registro,
  iniciais,
  cargo,
}: SeloQuemAssinaProps) {
  return (
    <figure className="card-2 flex items-center gap-4 border-neural/60">
      <span
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-neural bg-obsidian font-title text-lg font-extrabold text-neural"
      >
        {iniciais}
      </span>
      <figcaption>
        <p className="text-xs uppercase tracking-widest text-muted">Quem assina</p>
        <p className="mt-1 font-title font-bold text-white">{nome}</p>
        <p className="text-sm text-neural">{registro}</p>
        {cargo ? <p className="text-xs text-muted">{cargo}</p> : null}
        <p className="mt-2 text-xs text-muted">
          Este trabalho foi revisado, decidido e assinado por profissional
          habilitado no ponto de responsabilidade.
        </p>
      </figcaption>
    </figure>
  );
}
