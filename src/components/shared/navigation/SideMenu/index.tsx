"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import Logo from "@/components/Svg/Logo";
import { MENU_SECTIONS } from "@/consts/menu";
import { useUser } from "@/context/user/AppProvider";
import * as S from "./style";

type SideMenuProps = { onNavigate?: () => void };

export default function SideMenu({ onNavigate }: SideMenuProps) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Box component="nav" sx={S.Container}>
      <Box sx={S.LogoArea}>
        <Logo />
      </Box>

      {MENU_SECTIONS.map((secao) => (
        <Box key={secao.titulo} sx={{ mb: 1 }}>
          <Typography sx={S.SectionTitle}>{secao.titulo}</Typography>
          <List disablePadding>
            {secao.itens.map(({ label, href, icon: Icon }) => (
              <ListItemButton
                key={href}
                component={Link}
                href={href}
                onClick={onNavigate}
                sx={S.Item(pathname.startsWith(href))}
              >
                <Icon />
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ))}

      <Box sx={S.Footer}>
        <Avatar sx={S.FooterAvatar}>AD</Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }} noWrap>
            Administrador
          </Typography>
          <Typography sx={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.55)" }} noWrap>
            {user.email}
          </Typography>
        </Box>
        <KeyboardArrowDownRounded sx={{ fontSize: 18, color: "rgba(255,255,255,0.55)" }} />
      </Box>
    </Box>
  );
}
