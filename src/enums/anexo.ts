/** Categoria do arquivo enviado para a IA ler. */
export enum TipoAnexo {
  Video = "video",
  Audio = "audio",
  Planilha = "planilha",
  Documento = "documento",
  Imagem = "imagem",
}

/** Ciclo de vida do anexo: envio → leitura pela IA → pronto (ou erro). */
export enum AnexoStatus {
  Enviando = "enviando",
  Analisando = "analisando",
  Lido = "lido",
  Erro = "erro",
}
