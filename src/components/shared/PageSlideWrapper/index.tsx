"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/** Anima a entrada de uma view do "roteador interno" dos módulos. */
export default function PageSlideWrapper({ children, viewKey }: { children: ReactNode; viewKey: string }) {
  return (
    <motion.div
      key={viewKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
