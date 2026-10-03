"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import NotificationsNoneRounded from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import Logo from "@/components/Svg/Logo";
import { useUser } from "@/context/user/AppProvider";
import { useMenu } from "@/context/menuCollapsed/MenuProvider";
import { UserRole } from "@/enums";
import { COLORS } from "@/styles/colors";
import * as S from "./style";

const ROLES = [
  { role: UserRole.Gestor, label: "Visão do Gestor" },
  { role: UserRole.Funcionario, label: "Visão do Funcionário" },
];

export default function Header() {
  const router = useRouter();
  const { user, setRole } = useUser();
  const { openMenu } = useMenu();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);

  return (
    <Box component="header" sx={S.Container}>
      <IconButton onClick={openMenu} sx={{ display: { xs: "inline-flex", md: "none" } }} aria-label="Abrir menu">
        <MenuRounded />
      </IconButton>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Logo variant="dark" size={28} />
      </Box>

      <TextField
        size="small"
        placeholder="Buscar processos, documentos..."
        sx={S.Search}
        onKeyDown={(e) => e.key === "Enter" && router.push("/busca")}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded sx={{ fontSize: 18, color: COLORS.gray[500] }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={S.Right}>
        <IconButton aria-label="Notificações">
          <Badge variant="dot" color="error" overlap="circular">
            <NotificationsNoneRounded sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>

        <ButtonBase onClick={handleOpen} sx={S.UserButton}>
          <Avatar sx={S.UserAvatar}>{user.iniciais}</Avatar>
          <Box sx={S.UserInfo}>
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1.2 }}>{user.nome}</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{user.cargo}</Typography>
          </Box>
          <KeyboardArrowDownRounded sx={{ ...S.UserInfo, fontSize: 18, color: COLORS.gray[500] }} />
        </ButtonBase>

        <Menu
          anchorEl={anchor}
          open={!!anchor}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{ paper: { sx: { mt: 1, minWidth: 220 } } }}
        >
          {ROLES.map(({ role, label }) => (
            <MenuItem
              key={role}
              onClick={() => {
                setRole(role);
                handleClose();
              }}
            >
              <ListItemIcon>{user.role === role && <CheckRounded fontSize="small" />}</ListItemIcon>
              {label}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem onClick={() => router.push("/login")}>
            <ListItemIcon>
              <LogoutRounded fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
