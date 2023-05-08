import fs from "fs";
import path from "path";
import { CommanderError } from "commander";
import { CONFIG_PREFIX, Module, Template } from "./global.js";
import { fileURLToPath } from "url";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class TSModule implements Module {
  public config: Record<string, any> = {};
  constructor() {
    let template = fs.readFileSync(
      path.join(__dirname, `${CONFIG_PREFIX}/tsconfig.json`)
    );
    this.config = JSON.parse(template.toString());
  }
  public init(rootPath: string): void {
    fs.writeFileSync(
      path.join(rootPath, "/tsconfig.json"),
      JSON.stringify(this.config)
    );
  }
}

class reactTsModule extends TSModule {
  constructor() {
    super();
    this.config?.compilerOptions &&
      (this.config.compilerOptions.jsx = "react-jsx");
    this.config?.compilerOptions &&
      (this.config.compilerOptions.paths = { "@/*": ["./src/*"] });
  }
}

export function createTSModule(template: string) {
  if (template === Template.REACT) {
    return new reactTsModule();
  } else {
    throw new CommanderError(500, "500", "没有对应的template");
  }
}
