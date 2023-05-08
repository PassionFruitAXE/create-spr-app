import fs from "fs";
import path from "path";
import { CONFIG_PREFIX, Module } from "./global.js";
import { fileURLToPath } from "url";

// @ts-ignore 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PackageJsonModule implements Module {
  public config: Record<string, any> = {};
  constructor() {
    let template = fs.readFileSync(
      path.join(__dirname, `${CONFIG_PREFIX}/package.json`)
    );
    this.config = JSON.parse(template.toString());
  }
  public init(rootPath: string): void {
    fs.writeFileSync(
      path.join(rootPath, "/package.json"),
      JSON.stringify(this.config)
    );
  }
}
