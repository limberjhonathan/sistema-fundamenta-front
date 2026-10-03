import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import MuiThemeProvider from "@/providers/theme/MuiThemeProvider";
import AppProvider from "@/context/user/AppProvider";
import MenuProvider from "@/context/menuCollapsed/MenuProvider";
import LayoutContent from "./LayoutContent";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fundamenta",
  description: "Gestão de Processos e Inteligência Organizacional",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <MuiThemeProvider>
          <AppProvider>
            <MenuProvider>
              <LayoutContent>{children}</LayoutContent>
            </MenuProvider>
          </AppProvider>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
