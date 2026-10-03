"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type MenuContextValue = {
  mobileOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export default function MenuProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        mobileOpen,
        openMenu: () => setMobileOpen(true),
        closeMenu: () => setMobileOpen(false),
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu deve ser usado dentro de <MenuProvider>");
  return ctx;
}
