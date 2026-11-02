/**
 * TIPOGRAFIA
 * ----------
 * As fontes são baixadas no build e servidas pelo próprio site (sem chamadas
 * ao Google no navegador do visitante).
 *
 * Para trocar: substitua `Fraunces` e/ou `Inter` por outra fonte do Google Fonts
 * (ex.: `Lora`, `Playfair_Display`, `Manrope`, `DM_Sans`) nos imports e nas
 * chamadas abaixo. Mantenha as propriedades `variable` iguais — o restante do
 * site continua funcionando sem nenhuma outra alteração.
 */
import { Fraunces, Inter } from "next/font/google";

/** Fonte dos títulos (serifada, elegante). */
export const displayFont = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  /** Tamanho óptico: a serifa se ajusta sozinha em títulos grandes. */
  axes: ["opsz"],
  variable: "--font-display-family",
  display: "swap",
});

/** Fonte dos textos e botões (muito legível em telas pequenas). */
export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
});
