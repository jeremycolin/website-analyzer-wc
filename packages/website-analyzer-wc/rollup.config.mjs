import typescript from "@rollup/plugin-typescript";
import html from "rollup-plugin-html";
import css from "rollup-plugin-import-css";
import EN from "./src/translations/en.json" with { type: "json" };

export default {
  input: "src/main.ts",
  output: {
    file: "dist/main.js",
    intro: `const html = String.raw;const TRANSLATIONS = ${JSON.stringify(EN)};`,
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    html({
      include: ["src/**/*.html"],
    }),
    css({
      include: ["src/**/*.css"],
    }),
  ],
};
