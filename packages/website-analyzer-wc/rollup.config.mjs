import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "rollup-plugin-html";
import css from "rollup-plugin-import-css";
import json from "@rollup/plugin-json";

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "iife",
    intro: 'const LOCALE = "fr-FR";',
    inlineDynamicImports: true,
  },
  plugins: [
    typescript(),
    json({
      include: ["src/translations/*.json"],
    }),
    html({
      include: ["**/*.html"],
    }),
    css({
      include: ["**/*.css"],
    }),
    terser(),
  ],
};
