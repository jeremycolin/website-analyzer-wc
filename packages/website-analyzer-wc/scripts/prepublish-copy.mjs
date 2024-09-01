import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
const __dirname = import.meta.dirname;
const ROOT_DIR = resolve(__dirname, "..", "..", "..");
const SOURCE_DIR = resolve(__dirname, "..");

copyFileSync(resolve(ROOT_DIR, "README.md"), resolve(SOURCE_DIR, "README.md"));
