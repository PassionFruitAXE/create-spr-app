import fs from "fs";
import path from "path";
import { CommanderError } from "commander";
import { fileURLToPath } from "url";
import { GetArrayValueType } from "../types/utils.js";
import { mergeObject } from "../utils/common.js";
import { Module, TConfig } from "../types/index.js";
import { Template } from "../enum.js";
import { TEMPLATE_PREFIX } from "./global.js";

// @ts-ignore 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PackageJsonModule implements Module {
  public packageJsonConfig: Record<string, any> = {};
  constructor(public config: TConfig) {
    let template = fs.readFileSync(
      path.join(__dirname, TEMPLATE_PREFIX, "/package.json")
    );
    this.packageJsonConfig = JSON.parse(template.toString());
    this.config.deps.forEach(({ dependencies = {}, devDependencies = {} }) => {
      this.mergeConfig({ dependencies, devDependencies });
    });
  }

  /** 合并config */
  public mergeConfig(
    config: Record<string, Record<string, string> | string>
  ): void {
    this.packageJsonConfig = mergeObject(this.packageJsonConfig, config);
  }

  public async init() {
    fs.writeFileSync(
      path.join(this.config.rootPath, "/package.json"),
      JSON.stringify(this.packageJsonConfig)
    );
  }
}

class reactPackageJsonModule extends PackageJsonModule {
  constructor(config: TConfig) {
    super(config);
    this.mergeConfig({
      dependencies: {
        react: "18.2.0",
        "react-dom": "18.2.0",
        "react-router-dom": "^6.11.1",
      },
      devDependencies: {
        "@types/node": "^20.1.1",
        "@types/react": "^18.2.6",
        "@types/react-dom": "^18.2.4",
        "eslint-plugin-react": "7.32.2",
      },
    });
  }
}

export function createPackageJsonModule(config: TConfig) {
  if (config.template === Template.REACT) {
    return new reactPackageJsonModule(config);
  } else {
    throw new CommanderError(500, "500", `无${config.template}对应的依赖模板`);
  }
}
