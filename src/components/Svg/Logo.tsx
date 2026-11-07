import { Box } from "@mui/material";
import { BRAND } from "@/styles/colors";

type LogoProps = {
  /** light = logo claro (para fundos escuros); dark = logo escuro (para fundos claros) */
  variant?: "light" | "dark";
  /** Altura do símbolo em px; a palavra "FUNDAMENTA" acompanha a proporção do Figma */
  size?: number;
  showText?: boolean;
};

// Proporções originais do Figma (símbolo 51.48×100.12, palavra 366.68×66.75, gap 33.37)
const SIMBOLO_RATIO = 51.4814 / 100.119;
const PALAVRA_RATIO = 366.678 / 66.7463;
const PALAVRA_ALTURA = 66.7463 / 100.119;
const GAP = 33.373 / 100.119;

// Os SVGs são monocromáticos: usamos como máscara para pintar na cor da variante
const mascara = (src: string, cor: string) => ({
  bgcolor: cor,
  maskImage: `url(${src})`,
  maskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskImage: `url(${src})`,
  WebkitMaskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  flexShrink: 0,
});

export default function Logo({ variant = "light", size = 32, showText = true }: LogoProps) {
  const cor = variant === "light" ? BRAND.light : BRAND.dark;
  const alturaPalavra = size * PALAVRA_ALTURA;

  return (
    <Box
      role="img"
      aria-label="Fundamenta"
      sx={{ display: "flex", alignItems: "center", gap: `${size * GAP}px` }}
    >
      <Box sx={{ ...mascara("/brand/simbolo.svg", cor), width: size * SIMBOLO_RATIO, height: size }} />
      {showText && (
        <Box
          sx={{ ...mascara("/brand/fundamenta.svg", cor), width: alturaPalavra * PALAVRA_RATIO, height: alturaPalavra }}
        />
      )}
    </Box>
  );
}
