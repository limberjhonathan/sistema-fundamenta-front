import type { SvgIconComponent } from "@mui/icons-material";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import LanOutlined from "@mui/icons-material/LanOutlined";
import FactCheckOutlined from "@mui/icons-material/FactCheckOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import ApartmentOutlined from "@mui/icons-material/ApartmentOutlined";
import FormatListBulletedOutlined from "@mui/icons-material/FormatListBulletedOutlined";
import GppGoodOutlined from "@mui/icons-material/GppGoodOutlined";
import MemoryOutlined from "@mui/icons-material/MemoryOutlined";

export type MenuItem = { label: string; href: string; icon: SvgIconComponent };
export type MenuSection = { titulo: string; itens: MenuItem[] };

export const MENU_SECTIONS: MenuSection[] = [
  {
    titulo: "Gestão",
    itens: [
      { label: "Dashboard", href: "/dashboard", icon: GridViewOutlined },
      { label: "Processos", href: "/processos", icon: AccountTreeOutlined },
      { label: "Novo com IA", href: "/novo-com-ia", icon: AutoAwesomeOutlined },
      { label: "Modelagem", href: "/modelagem", icon: LanOutlined },
      { label: "Aprovações", href: "/aprovacoes", icon: FactCheckOutlined },
    ],
  },
  {
    titulo: "Conhecimento",
    itens: [
      { label: "Portal", href: "/portal", icon: MenuBookOutlined },
      { label: "Assistente", href: "/assistente", icon: ChatOutlined },
      { label: "Busca", href: "/busca", icon: SearchOutlined },
    ],
  },
  {
    titulo: "Administração",
    itens: [
      { label: "Usuários", href: "/usuarios", icon: PeopleOutlined },
      { label: "Departamentos", href: "/departamentos", icon: ApartmentOutlined },
      { label: "Macroprocessos", href: "/macroprocessos", icon: FormatListBulletedOutlined },
      { label: "Permissões", href: "/permissoes", icon: GppGoodOutlined },
      { label: "IA e cotas", href: "/ia-e-cotas", icon: MemoryOutlined },
    ],
  },
];

export const MOBILE_NAV: MenuItem[] = [
  { label: "Início", href: "/dashboard", icon: GridViewOutlined },
  { label: "Processos", href: "/processos", icon: AccountTreeOutlined },
  { label: "Portal", href: "/portal", icon: MenuBookOutlined },
  { label: "Busca", href: "/busca", icon: SearchOutlined },
];
