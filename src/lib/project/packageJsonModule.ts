import fs from "fs";
import path from "path";
import { CommanderError } from "commander";
import { fileURLToPath } from "url";
import { globalDependencies, TEMPLATE_PREFIX } from "./global.js";
import { IModule, TConfig, TDependence } from "../types/index.js";
import { mergeObject } from "../utils/common.js";
import { Project } from "./index.js";
import { Template } from "../enum.js";

// @ts-ignore 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PackageJsonModule implements IModule {
  public packageJsonConfig: Record<string, any> = {};
  constructor(public config: TConfig) {
    let template = fs.readFileSync(
      path.join(__dirname, TEMPLATE_PREFIX, "/package.json")
    );
    this.packageJsonConfig = JSON.parse(template.toString());
  }

  /**
   * 执行init前回调
   * @param project 当前project对象
   */
  public handleBeforeInstallCallbacks(project: Project): void {
    this.config.deps.forEach((dep) => {
      dep.beforeInitCallback && dep.beforeInitCallback(project);
    });
  }

  /**
   * 执行init前回调
   * @param project 当前project对象
   */
  public handleAfterInstallCallbacks(project: Project): void {
    this.config.deps.forEach((dep) => {
      dep.beforeInitCallback && dep.beforeInitCallback(project);
    });
  }

  /**
   * 添加依赖
   * @param deps 依赖数组
   */
  public addDependencies(...deps: TDependence[]): void {
    this.config.deps.push(...deps);
  }

  /**
   * 合并config
   * @param config 新配置
   */
  public mergeConfig(
    config: Record<string, Record<string, string> | string>
  ): void {
    this.packageJsonConfig = mergeObject(this.packageJsonConfig, config);
  }

  private mergeDependenciesConfig(): void {
    this.config.deps.forEach(({ dependencies = {}, devDependencies = {} }) => {
      this.mergeConfig({ dependencies, devDependencies });
    });
  }

  public async init() {
    this.mergeDependenciesConfig();
    fs.writeFileSync(
      path.join(this.config.rootPath, "/package.json"),
      JSON.stringify(this.packageJsonConfig, null, 2)
    );
  }
}

class reactPackageJsonModule extends PackageJsonModule {
  constructor(config: TConfig) {
    super(config);
    const {
      react,
      reactDom,
      reactRouterDom,
      typesNode,
      typesReact,
      typesReactDom,
      eslintPluginReact,
    } = globalDependencies;
    this.mergeConfig({
      dependencies: {
        ...react,
        ...reactDom,
        ...reactRouterDom,
      },
      devDependencies: {
        ...typesNode,
        ...typesReact,
        ...typesReactDom,
        ...eslintPluginReact,
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
