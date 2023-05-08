import fs from "fs";
import path from "path";
import { CONFIG_PREFIX, Module } from "./global.js";
import { fileURLToPath } from "url";

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
  public init(rootPath: string): void {
    fs.writeFileSync(path.join(rootPath, "/index.html"), this.value);
  }
}
