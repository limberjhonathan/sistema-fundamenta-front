import { AnexoStatus, TipoAnexo } from "@/enums";
import { mockResumoPorTipo } from "@/mocks/anexos";
import type { Anexo } from "@/types/anexo";
import { lerDuracao, tipoDoArquivo } from "@/utils/anexo";

type SetAnexos = (atualizar: (prev: Anexo[]) => Anexo[]) => void;

/** Vídeo e áudio precisam de transcrição, então "demoram" mais na simulação. */
const TEMPO_ANALISE_MS: Record<TipoAnexo, number> = {
  [TipoAnexo.Video]: 4500,
  [TipoAnexo.Audio]: 3200,
  [TipoAnexo.Planilha]: 1800,
  [TipoAnexo.Documento]: 2400,
  [TipoAnexo.Imagem]: 1600,
};

const PASSO_ENVIO_MS = 120;

/** Timers por anexo, fora do React: a simulação continua mesmo se a etapa for desmontada (o estado vive no store). */
const timers = new Map<string, ReturnType<typeof setTimeout>[]>();

const cancelar = (id: string) => {
  timers.get(id)?.forEach(clearTimeout);
  timers.delete(id);
};

const agendar = (id: string, fn: () => void, ms: number) => {
  const t = setTimeout(fn, ms);
  timers.set(id, [...(timers.get(id) ?? []), t]);
};

const gerarId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Gerencia anexos lidos pela IA. Hoje é uma simulação estática:
 * Enviando (0→100%) → Analisando → Lido, com resumo do mock.
 * Quando a API existir, só este hook troca os timers pelo upload real e pela consulta de status.
 * Simulação: arquivos com "erro" no nome falham, para visualizar o estado de erro.
 * Recebe o setter de fora para funcionar tanto com store (zustand) quanto com useState.
 */
export function useAnexos(setAnexos: SetAnexos) {
  const atualizar = (id: string, patch: Partial<Anexo>) =>
    setAnexos((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const processar = (anexo: Anexo) => {
    cancelar(anexo.id);
    // Envio: progresso proporcional ao tamanho, entre ~0,6s e ~2,5s
    const passos = Math.min(20, Math.max(5, Math.round(anexo.tamanho / (2 * 1024 ** 2))));
    for (let i = 1; i <= passos; i++) {
      agendar(anexo.id, () => atualizar(anexo.id, { progresso: Math.round((i / passos) * 100) }), i * PASSO_ENVIO_MS);
    }
    const fimEnvio = (passos + 1) * PASSO_ENVIO_MS;
    agendar(anexo.id, () => atualizar(anexo.id, { status: AnexoStatus.Analisando }), fimEnvio);

    const falha = anexo.nome.toLowerCase().includes("erro");
    agendar(
      anexo.id,
      () => {
        timers.delete(anexo.id);
        atualizar(
          anexo.id,
          falha
            ? { status: AnexoStatus.Erro, erro: "Não foi possível ler o conteúdo do arquivo." }
            : { status: AnexoStatus.Lido, resumoIa: mockResumoPorTipo[anexo.tipo] },
        );
      },
      fimEnvio + (falha ? 1200 : TEMPO_ANALISE_MS[anexo.tipo]),
    );
  };

  const adicionar = (files: File[]) => {
    const novos: Anexo[] = files.flatMap((file) => {
      const tipo = tipoDoArquivo(file.name);
      if (!tipo) return [];
      return [
        {
          id: gerarId(),
          nome: file.name,
          tamanho: file.size,
          tipo,
          status: AnexoStatus.Enviando,
          progresso: 0,
          previewUrl: tipo === TipoAnexo.Imagem ? URL.createObjectURL(file) : undefined,
          file,
        },
      ];
    });
    if (!novos.length) return;

    setAnexos((prev) => [...prev, ...novos]);
    novos.forEach((anexo) => {
      processar(anexo);
      if (anexo.tipo === TipoAnexo.Video || anexo.tipo === TipoAnexo.Audio) {
        lerDuracao(anexo.file!, anexo.tipo === TipoAnexo.Video ? "video" : "audio").then((duracao) => {
          if (duracao) atualizar(anexo.id, { duracao });
        });
      }
    });
  };

  /** Remove e devolve o anexo e sua posição, para permitir "Desfazer". */
  const remover = (anexo: Anexo, lista: Anexo[]) => {
    cancelar(anexo.id);
    setAnexos((prev) => prev.filter((a) => a.id !== anexo.id));
    return { anexo, indice: lista.findIndex((a) => a.id === anexo.id) };
  };

  const restaurar = ({ anexo, indice }: { anexo: Anexo; indice: number }) => {
    setAnexos((prev) => {
      const copia = [...prev];
      copia.splice(Math.max(0, Math.min(indice, copia.length)), 0, anexo);
      return copia;
    });
    // Se foi removido no meio da leitura, recomeça do zero
    if (anexo.status === AnexoStatus.Enviando || anexo.status === AnexoStatus.Analisando) {
      tentarNovamente(anexo);
    }
  };

  /** Chamar quando a remoção virar definitiva (fim do prazo de desfazer). */
  const descartar = (anexo: Anexo) => {
    if (anexo.previewUrl) URL.revokeObjectURL(anexo.previewUrl);
  };

  const tentarNovamente = (anexo: Anexo) => {
    const reiniciado = { ...anexo, status: AnexoStatus.Enviando, progresso: 0, erro: undefined, resumoIa: undefined };
    atualizar(anexo.id, reiniciado);
    processar(reiniciado);
  };

  return { adicionar, remover, restaurar, descartar, tentarNovamente };
}
