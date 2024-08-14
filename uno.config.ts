import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

import { colors } from "unocss/preset-mini";

export default defineConfig({
  theme: {
    colors: {
      primary: colors.indigo,
      secondary: colors.teal,
      accent: colors.pink,
      success: colors.green,
      info: colors.blue,
      warning: colors.yellow,
      error: colors.red,
    },
    breakpoints: {
      sm: "240px",
      md: "768px",
      lg: "1024px",
    },
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: "Inter",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
