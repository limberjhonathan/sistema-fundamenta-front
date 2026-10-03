"use client";

import { Box } from "@mui/material";
import CustomContainer from "@/components/shared/CustomContainer";
import PortalHero from "./PortalHero";
import PortalCategorias from "./PortalCategorias";
import PortalCtaIa from "./PortalCtaIa";
import PortalLinks from "./PortalLinks";

export default function PortalPage() {
  return (
    <Box>
      <PortalHero />
      <CustomContainer>
        <PortalCategorias />
        <PortalCtaIa />
        <PortalLinks />
      </CustomContainer>
    </Box>
  );
}
