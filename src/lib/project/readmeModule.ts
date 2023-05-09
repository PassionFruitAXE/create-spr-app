import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Module, TConfig } from "../types/index.js";
import { TEMPLATE_PREFIX } from "./global.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ReadmeModule implements Module {
  constructor(public config: TConfig) {}
  public async init() {
    fs.copyFileSync(
      path.join(__dirname, TEMPLATE_PREFIX, "/README.md"),
      path.join(this.config.rootPath, "/README.md")
    );
  }
}
