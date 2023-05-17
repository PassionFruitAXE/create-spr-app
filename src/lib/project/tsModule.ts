import fs from "fs";
import path from "path";
import { Builder, Template } from "../enum.js";
import { CommanderError } from "commander";
import { fileURLToPath } from "url";
import { IModule, TConfig } from "../types/index.js";
import { mergeObject } from "../utils/common.js";
import { TEMPLATE_PREFIX } from "../constant/global.js";

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

  /**
   * 合并config
   * @param config 新配置
   */
  public mergeConfig(config: Record<string, any>): void {
    this.tsConfig = mergeObject(this.tsConfig, config);
  }

  public async init() {
    fs.writeFileSync(
      path.join(this.config.rootPath, "/tsconfig.json"),
      JSON.stringify(this.tsConfig, null, 2)
    );
  }
}

class reactWithViteTsModule extends TSModule {
  constructor(config: TConfig) {
    super(config);
    this.mergeConfig({
      compilerOptions: {
        jsx: "react-jsx",
        paths: { "@/*": ["./src/*"] },
      },
    });
  }
}

export function createTSModule(config: TConfig) {
  if (config.template === Template.REACT && config.builder === Builder.VITE) {
    return new reactWithViteTsModule(config);
  } else {
    throw new CommanderError(500, "500", `无${config.template}对应的依赖模板`);
  }
}
