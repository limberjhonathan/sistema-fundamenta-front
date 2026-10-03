import { Avatar, Box, Typography } from "@mui/material";
import CheckCircleOutlineRounded from "@mui/icons-material/CheckCircleOutlineRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import Logo from "@/components/Svg/Logo";
import { COLORS } from "@/styles/colors";
import * as S from "./style";

const BENEFICIOS = ["Modelagem BPMN 2.0", "Gestão de riscos", "Assistente de IA", "Portal do conhecimento"];

export default function LoginHero() {
  return (
    <>
      <Box sx={S.Container}>
        <Logo />

        <Box>
          <Typography variant="h1" sx={S.Title}>
            Sua organização,
            <br />
            potencializada por IA.
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: 440, color: "rgba(255,255,255,0.7)" }}>
            Mapeie, otimize e automatize seus processos de negócio com o poder da inteligência artificial de ponta a
            ponta.
          </Typography>
        </Box>

        <Box sx={S.Illustration}>
          <Box sx={S.Base("28%")} />
          <Box sx={S.Base("62%")} />
          <Box sx={S.Pill("36%", "#A3D65C")} />
          <Box sx={S.Pill("70%", "#8CC8DA")} />
        </Box>

        <Box sx={S.Checks}>
          {BENEFICIOS.map((b) => (
            <Box key={b} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleOutlineRounded sx={{ fontSize: 16, color: COLORS.accent.green }} />
              <Typography sx={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.8)" }}>{b}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={S.Testimonial}>
          <Box sx={{ display: "flex", color: COLORS.accent.gold, mb: 1.5 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarRounded key={i} sx={{ fontSize: 18 }} />
            ))}
          </Box>
          <Typography sx={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", mb: 2 }}>
            &quot;O Fundamenta mudou a forma como documentamos nossos processos. A IA reduziu o tempo de mapeamento em
            mais de 60%.&quot;
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "transparent", border: "1px solid rgba(255,255,255,0.5)" }} />
            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>Ricardo Cavalcanti</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={S.MobileHero}>
        <Box sx={{ p: 1, borderRadius: 2, bgcolor: "rgba(255,255,255,0.15)" }}>
          <Logo showText={false} size={36} />
        </Box>
        <Typography variant="h3" sx={{ color: COLORS.white }}>
          Fundamenta
        </Typography>
        <Typography sx={{ fontSize: "0.8125rem", maxWidth: 260, opacity: 0.85 }}>
          Gestão de Processos Inteligente para Organizações de Alta Performance
        </Typography>
      </Box>
    </>
  );
}
