import { ReactElement } from "react";
import MovieOutlined from "@mui/icons-material/MovieOutlined";
import GraphicEqRounded from "@mui/icons-material/GraphicEqRounded";
import TableChartOutlined from "@mui/icons-material/TableChartOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import ImageOutlined from "@mui/icons-material/ImageOutlined";
import { TipoAnexo } from "@/enums";

export const ICONE_ANEXO: Record<TipoAnexo, ReactElement> = {
  [TipoAnexo.Video]: <MovieOutlined />,
  [TipoAnexo.Audio]: <GraphicEqRounded />,
  [TipoAnexo.Planilha]: <TableChartOutlined />,
  [TipoAnexo.Documento]: <DescriptionOutlined />,
  [TipoAnexo.Imagem]: <ImageOutlined />,
};
