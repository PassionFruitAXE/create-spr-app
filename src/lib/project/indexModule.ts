import fs from "fs";
import path from "path";
import { CONFIG_PREFIX } from "./global.js";
import { fileURLToPath } from "url";
import { Module, TConfig } from "../types/index.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class IndexModule implements Module {
  public value: Buffer = Buffer.from("");
  constructor() {
    this.value = fs.readFileSync(
      path.join(__dirname, `${CONFIG_PREFIX}/index.html`)
    );
  }
  public init(config: TConfig): void {
    fs.writeFileSync(path.join(config.rootPath, "/index.html"), this.value);
  }
}
