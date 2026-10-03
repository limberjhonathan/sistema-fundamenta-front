"use client";

import { AnimatePresence } from "framer-motion";
import PageSlideWrapper from "@/components/shared/PageSlideWrapper";
import { NovoComIaView, useNovoComIaStore } from "@/components/store/useNovoComIaStore";
import NovoComIaForm from "./NovoComIaForm";
import IaGerando from "./IaGerando";

/** Roteador interno: formulário em etapas → tela de geração por IA. */
export default function NovoComIaPage() {
  const view = useNovoComIaStore((s) => s.view);

  return (
    <AnimatePresence mode="wait">
      <PageSlideWrapper key={view} viewKey={view}>
        {view === NovoComIaView.Formulario ? <NovoComIaForm /> : <IaGerando />}
      </PageSlideWrapper>
    </AnimatePresence>
  );
}
