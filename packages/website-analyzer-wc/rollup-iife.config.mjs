import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "rollup-plugin-html";
import css from "rollup-plugin-import-css";
import EN from "./src/translations/en.json" assert { type: "json" };
import FR from "./src/translations/fr.json" assert { type: "json" };

export default {
  input: "src/main.ts",
  output: {
    file: "dist-script/main-iife.js",
    format: "iife",
    intro: `const TRANSLATIONS = ${JSON.stringify(EN)};`,
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
