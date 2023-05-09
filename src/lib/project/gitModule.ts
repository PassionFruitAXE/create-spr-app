import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Module, TConfig } from "../types/index.js";
import { TEMPLATE_PREFIX } from "./global.js";
import { useCommand } from "../utils/execa.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class GitModule implements Module {
  public value: Buffer = Buffer.from("");
  constructor() {
    this.value = fs.readFileSync(
      path.join(__dirname, TEMPLATE_PREFIX, "/.gitignore")
    );
  }
  public async init(config: TConfig) {
    await useCommand("git init", config.rootPath);
    fs.writeFileSync(path.join(config.rootPath, "/.gitignore"), this.value);
  }
}
