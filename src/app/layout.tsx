import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import MuiThemeProvider from "@/providers/theme/MuiThemeProvider";
import AppProvider from "@/context/user/AppProvider";
import MenuProvider from "@/context/menuCollapsed/MenuProvider";
import LayoutContent from "./LayoutContent";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fundamenta",
  description: "Processos conectados, resultados reais.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
