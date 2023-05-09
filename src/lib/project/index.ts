import fs from "fs";
import GitModule from "./gitModule.js";
import HtmlModule from "./htmlModule.js";
import ReadmeModule from "./readmeModule.js";
import SrcModule from "./srcModule.js";
import { CommanderError } from "commander";
import { createBuilder } from "./builder.js";
import { createTSModule, TSModule } from "./tsModule.js";
import { Package } from "./packageList/package.js";
import { TConfig } from "../types/index.js";
import { Template } from "../enum.js";
import { useCommand } from "../utils/execa.js";
import {
  createPackageJsonModule,
  PackageJsonModule,
} from "./packageJsonModule.js";

export abstract class Project {
  /** src模块 */
  public srcModule: SrcModule | null = null;
  /** git模块 */
  public gitModule: GitModule | null = null;
  /** index.html模块 */
  public htmlModule: HtmlModule | null = null;
  /** README.md模块 */
  public readmeModule: ReadmeModule | null = null;
  /** ts模块 */
  public tsModule: TSModule | null = null;
  /** package.json模块 */
  public packageJsonModule: PackageJsonModule | null = null;
  /** 构建工具 */
  public builder: Package | null = null;

  /**
   * Project类构造函数
   * @param config 项目配置对象
   */
  constructor(public config: TConfig) {
    this.srcModule = new SrcModule();
    this.gitModule = new GitModule();
    this.htmlModule = new HtmlModule();
    this.readmeModule = new ReadmeModule();
    this.tsModule = new TSModule();
    this.packageJsonModule = new PackageJsonModule();
  }

  public async run(): Promise<void> {
    await this.init();
    await this.packageInstall();
    this.useCallbackExecutor();
  }

  /**
   * 项目模块初始化
   */
  private async init(): Promise<void> {
    /** 创建项目文件夹 */
    fs.mkdirSync(this.config.rootPath);
    /** 创建子模块 */
    await this.srcModule?.init(this.config);
    await this.gitModule?.init(this.config);
    await this.htmlModule?.init(this.config);
    await this.readmeModule?.init(this.config);
    await this.tsModule?.init(this.config);
    await this.packageJsonModule?.init(this.config);
    /** 添加构建工具 */
    this.packageJsonModule?.addDeps(this.builder?.value ?? {});
  }

  /**
   * 安装依赖
   */
  private async packageInstall(): Promise<void> {
    console.log("安装依赖中~~~");
    await useCommand(
      `${this.config.packageManager} install`,
      this.config.rootPath
    );
    console.log("依赖安装完成");
  }

  /**
   * 执行依赖回调
   */
  private useCallbackExecutor(): void {
    this.config.deps.forEach((dep) => {
      dep.callback && dep.callback(this);
    });
  }
}

class reactProject extends Project {
  constructor(config: TConfig) {
    super(config);
    this.tsModule = createTSModule(Template.REACT);
    this.packageJsonModule = createPackageJsonModule(Template.REACT);
    this.builder = createBuilder(config.builder);
  }
}

/**
 * 项目工厂
 * @param props TProps
 * @returns Project的子类
 */
export function createProject(props: TConfig) {
  if (props.template === Template.REACT) {
    return new reactProject(props);
  } else {
    throw new CommanderError(500, "500", "没有对应的template");
  }
}
