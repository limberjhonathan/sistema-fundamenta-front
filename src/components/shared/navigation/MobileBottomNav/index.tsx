"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import { MOBILE_NAV } from "@/consts/menu";
import * as S from "./style";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [primeiro, segundo, ...resto] = MOBILE_NAV;

  const renderItem = ({ label, href, icon: Icon }: (typeof MOBILE_NAV)[number]) => (
    <Box key={href} component={Link} href={href} sx={S.Item(pathname.startsWith(href))}>
      <Icon />
      {label}
    </Box>
  );

  return (
    <Box component="nav" sx={S.Container}>
      {renderItem(primeiro)}
      {renderItem(segundo)}
      <Box component={Link} href="/novo-com-ia" sx={S.Fab} aria-label="Novo com IA">
        <AutoAwesomeRounded />
      </Box>
      {resto.map(renderItem)}
    </Box>
  );
}
