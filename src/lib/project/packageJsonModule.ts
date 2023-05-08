import fs from "fs";
import path from "path";
import { CommanderError } from "commander";
import { CONFIG_PREFIX, Module } from "./global.js";
import { fileURLToPath } from "url";
import { TConfig, Template } from "../global.js";

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
  public init(config: TConfig): void {
    fs.writeFileSync(
      path.join(config.rootPath, "/package.json"),
      JSON.stringify(this.config)
    );
  }
}

class reactPackageJsonModule extends PackageJsonModule {
  constructor() {
    super();
    this.config.dependencies = {
      react: "*",
    };
    this.config.devDependencies = {
      "@types/react": "*",
    };
  }
}

export function createPackageJsonModule(template: string) {
  if (template === Template.REACT) {
    return new reactPackageJsonModule();
  } else {
    throw new CommanderError(500, "500", "没有对应的template");
  }
}
