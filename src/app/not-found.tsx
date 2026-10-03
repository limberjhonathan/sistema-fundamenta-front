"use client";

import Link from "next/link";
import { Box, Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center", p: 3 }}>
      <Box>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Página não encontrada
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 3 }}>O endereço acessado não existe ou foi movido.</Typography>
        <Button variant="contained" component={Link} href="/dashboard">
          Voltar ao Dashboard
        </Button>
      </Box>
    </Box>
  );
}
