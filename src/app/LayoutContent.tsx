"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Box, Drawer } from "@mui/material";
import Header from "@/components/shared/Header";
import SideMenu from "@/components/shared/navigation/SideMenu";
import MobileBottomNav from "@/components/shared/navigation/MobileBottomNav";
import { MOBILE_NAV_HEIGHT } from "@/components/shared/navigation/MobileBottomNav/style";
import { useMenu } from "@/context/menuCollapsed/MenuProvider";

const ROTAS_SEM_LAYOUT = ["/login"];

export default function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { mobileOpen, closeMenu } = useMenu();

  if (ROTAS_SEM_LAYOUT.includes(pathname)) return <>{children}</>;

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Box
        component="aside"
        sx={{ display: { xs: "none", md: "block" }, position: "sticky", top: 0, height: "100dvh", flexShrink: 0 }}
      >
        <SideMenu />
      </Box>

      <Drawer open={mobileOpen} onClose={closeMenu} sx={{ display: { md: "none" } }}>
        <SideMenu onNavigate={closeMenu} />
      </Drawer>

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box component="main" sx={{ flex: 1, pb: { xs: `${MOBILE_NAV_HEIGHT}px`, md: 0 } }}>
          {children}
        </Box>
      </Box>

      <MobileBottomNav />
    </Box>
  );
}
