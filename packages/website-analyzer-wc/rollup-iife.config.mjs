import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "rollup-plugin-html";
import css from "rollup-plugin-import-css";
import EN from "./src/translations/en.json" with { type: "json" };
import FR from "./src/translations/fr.json" with { type: "json" };

const LANG = process.env.LANG === "fr" ? FR : EN;
const file = process.env.LANG === "fr" ? "main-iife-fr.js" : "main-iife-en.js";

export default {
  input: "src/main.ts",
  output: {
    file: `dist-script/${file}`,
    format: "iife",
    intro: `const html = String.raw;const TRANSLATIONS = ${JSON.stringify(LANG)};`,
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig-iife.json",
    }),
    html({
      include: ["src/**/*.html"],
    }),
    css({
      include: ["src/**/*.css"],
    }),
    terser(),
  ],
};
