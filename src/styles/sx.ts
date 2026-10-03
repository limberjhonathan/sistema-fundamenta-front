import type { Theme } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";

/** Objeto de estilo `sx` puro — pode ser espalhado (`{ ...S.Item, mt: 1 }`) e passado direto em `sx`. */
export type Sx = SystemStyleObject<Theme>;
