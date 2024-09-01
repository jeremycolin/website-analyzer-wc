import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const __dirname = import.meta.dirname;
const ROOT_DIR = resolve(__dirname, "..", "..", "..");
const SOURCE_DIR = resolve(__dirname, "..");
const DIST_SCRIPT_DIR = resolve(__dirname, "..", "dist-script");

// copy root repository README file inside published package
copyFileSync(resolve(ROOT_DIR, "README.md"), resolve(SOURCE_DIR, "README.md"));

// create ready to copy script tag and write it to disk
const sourceCodeIIFE = readFileSync(resolve(DIST_SCRIPT_DIR, "main-iife.js"), "utf8").toString();

writeFileSync(
  resolve(DIST_SCRIPT_DIR, "main-script.html"),
  `<script>
${sourceCodeIIFE}</script>`
);
