"use client";

import { Box } from "@mui/material";
import LoginHero from "./LoginHero";
import LoginForm from "./LoginForm";
import * as S from "./style";

export default function LoginPage() {
  return (
    <Box sx={S.Page}>
      <LoginHero />
      <Box sx={S.FormSide}>
        <LoginForm />
      </Box>
    </Box>
  );
}
