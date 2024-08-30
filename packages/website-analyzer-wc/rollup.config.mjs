import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "rollup-plugin-html";
import css from "rollup-plugin-import-css";
import json from "@rollup/plugin-json";
import FR from "./src/translations/fr.json" assert { type: "json" };
import EN from "./src/translations/en.json" assert { type: "json" };

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    format: "iife",
    intro: `const TRANSLATIONS = ${JSON.stringify(FR)};`,
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
