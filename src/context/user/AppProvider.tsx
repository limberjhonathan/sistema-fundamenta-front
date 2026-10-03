"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { UserRole } from "@/enums";
import { mockUser } from "@/mocks/user";
import type { Usuario } from "@/types/usuario";

type UserContextValue = {
  user: Usuario;
  setRole: (role: UserRole) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario>(mockUser);

  const setRole = (role: UserRole) => setUser((prev) => ({ ...prev, role }));

  return <UserContext.Provider value={{ user, setRole }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser deve ser usado dentro de <AppProvider>");
  return ctx;
}
