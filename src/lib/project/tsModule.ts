import fs from "fs";
import path from "path";
import { CommanderError } from "commander";
import { fileURLToPath } from "url";
import { IModule, TConfig } from "../types/index.js";
import { Template } from "../enum.js";
import { TEMPLATE_PREFIX } from "./global.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class TSModule implements IModule {
  public tsConfig: Record<string, any> = {};
  constructor(public config: TConfig) {
    let template = fs.readFileSync(
      path.join(__dirname, TEMPLATE_PREFIX, "/tsconfig.json")
    );
    this.tsConfig = JSON.parse(template.toString());
  }
  public async init() {
    fs.writeFileSync(
      path.join(this.config.rootPath, "/tsconfig.json"),
      JSON.stringify(this.tsConfig, null, 2)
    );
  }
}

class reactTsModule extends TSModule {
  constructor(config: TConfig) {
    super(config);
    this.tsConfig?.compilerOptions &&
      (this.tsConfig.compilerOptions.jsx = "react-jsx");
    this.tsConfig?.compilerOptions &&
      (this.tsConfig.compilerOptions.paths = { "@/*": ["./src/*"] });
  }
}

export function createTSModule(config: TConfig) {
  if (config.template === Template.REACT) {
    return new reactTsModule(config);
  } else {
    throw new CommanderError(500, "500", `无${config.template}对应的依赖模板`);
  }
}
