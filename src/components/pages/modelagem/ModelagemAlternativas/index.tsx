import { Box, Card, Chip, Typography } from "@mui/material";
import { COLORS } from "@/styles/colors";

const XML_EXEMPLO = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="Definitions_1">
  <bpmn:process id="Credito_Imobiliario" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" />
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_0v9x2k1" />
    <bpmn:task id="Task_0v9x2k1" name="Analisar Documentação de Crédito">
      <bpmn:documentation>Verificar validade do RG/CPF em até 48h</bpmn:documentation>
    </bpmn:task>
  </bpmn:process>
</bpmn:definitions>`;

const VERSOES = [
  { versao: "v2.4.1", status: "Draft", autor: "João Duarte", data: "Hoje, 14:32" },
  { versao: "v2.4.0", status: "Publicada", autor: "Mariana Costa", data: "12/05/2024" },
  { versao: "v2.3.0", status: "Arquivada", autor: "Carlos Mendes", data: "02/03/2024" },
];

export function XmlView() {
  return (
    <Box sx={{ p: 3, overflow: "auto", bgcolor: COLORS.gray[50] }}>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2.5,
          borderRadius: 2,
          bgcolor: COLORS.primary[950],
          color: "#C7F0E8",
          fontSize: "0.8125rem",
          lineHeight: 1.7,
          overflowX: "auto",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        {XML_EXEMPLO}
      </Box>
    </Box>
  );
}

export function VersoesView() {
  return (
    <Box sx={{ p: 3, overflow: "auto", bgcolor: COLORS.gray[50] }}>
      {VERSOES.map((v) => (
        <Card key={v.versao} sx={{ p: 2, mb: 1.5, borderRadius: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Chip size="small" label={v.versao} sx={{ fontFamily: "ui-monospace, monospace", bgcolor: COLORS.gray[100] }} />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{v.status}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
              {v.autor} • {v.data}
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
