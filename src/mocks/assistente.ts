export type MensagemChat = {
  id: number;
  autor: "ia" | "usuario";
  hora: string;
  texto: string;
  fontes?: { tipo: "documento" | "processo"; label: string }[];
};

export const mockMensagens: MensagemChat[] = [
  {
    id: 1,
    autor: "ia",
    hora: "14:30",
    texto:
      "Olá, João! Eu sou o Assistente Fundamenta. Estou aqui para ajudar você a entender nossos processos, políticas e documentações corporativas. O que gostaria de saber hoje?",
  },
  {
    id: 2,
    autor: "usuario",
    hora: "14:31",
    texto: "Como funciona o processo de reembolso de viagens internacionais?",
  },
  {
    id: 3,
    autor: "ia",
    hora: "14:31",
    texto: `O processo de reembolso de viagens internacionais segue a Política de Viagens e Despesas (POL-ADM-004). Aqui estão os pontos principais:

1. **Abertura de Solicitação:** Deve ser feita via ERP em até 5 dias úteis após o retorno.
2. **Documentação Necessária:** Todos os comprovantes originais devem ser digitalizados. Despesas acima de $50 exigem nota fiscal.
3. **Câmbio:** A conversão é feita com base na cotação do dia do gasto ou do fechamento do cartão corporativo.
4. **Aprovação:** Requer validação do gestor imediato e da diretoria financeira.

Você deseja que eu detalhe os limites de gastos por categoria ou os prazos de pagamento?`,
    fontes: [
      { tipo: "documento", label: "POL-ADM-004: Política de Viagens" },
      { tipo: "processo", label: "PRC-FIN-012: Fluxo de Reembolso" },
    ],
  },
];

export const mockHistoricoChat = [
  { grupo: "Hoje", itens: ["Reembolso de viagens", "Acesso ao VPN corporativa"] },
  { grupo: "Ontem", itens: ["Fluxo de aprovação de compras", "Manual do colaborador"] },
];

export const mockSugestoesRapidas = ["Como pedir férias?", "Política de Home Office", "Dashboard de KPIs"];
