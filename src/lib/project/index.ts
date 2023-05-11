import chalk from "chalk";
import fs from "fs";
import GitModule from "./gitModule.js";
import HtmlModule from "./htmlModule.js";
import ReadmeModule from "./readmeModule.js";
import { createBuilder } from "./builder.js";
import { createFileModule, FileModule } from "./srcModule.js";
import { createTSModule, TSModule } from "./tsModule.js";
import { Package } from "./packages/package.js";
import { TConfig } from "../types/index.js";
import { useCommand } from "../utils/command.js";
import {
  createPackageJsonModule,
  PackageJsonModule,
} from "./packageJsonModule.js";

export class Project {
  /** git模块 */
  public gitModule: GitModule | null = null;
  /** index.html模块 */
  public htmlModule: HtmlModule | null = null;
  /** README.md模块 */
  public readmeModule: ReadmeModule | null = null;
  /** 配置文件模块 */
  public fileModule: FileModule | null = null;
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
    this.gitModule = new GitModule(config);
    this.htmlModule = new HtmlModule(config);
    this.readmeModule = new ReadmeModule(config);
    this.fileModule = createFileModule(config);
    this.tsModule = createTSModule(config);
    this.builder = createBuilder(config);
    /** 添加构建工具到依赖中 */
    this.addBuilder(this.builder);
    /** package.json模块必须在最后生成 */
    this.packageJsonModule = createPackageJsonModule(config);
  }

  public addBuilder(builder: Package) {
    this.config.deps.push(builder.value);
  }

  public async run(): Promise<void> {
    this.useBeforeInstallCallbackExecutor();
    await this.init();
    await this.packageInstall();
    this.useAfterInstallCallbackExecutor();
    useCommand("npx husky install", this.config.rootPath);
  }

  /**
   * 执行安装依赖前回调
   */
  private useBeforeInstallCallbackExecutor(): void {
    this.config.deps.forEach((dep) => {
      dep.beforeInstallCallback && dep.beforeInstallCallback(this);
    });
  }

  /**
   * 项目模块文件生成
   */
  private async init(): Promise<void> {
    /** 创建项目文件夹 */
    fs.mkdirSync(this.config.rootPath);
    /** 创建子模块 */
    await this.fileModule?.init();
    await this.gitModule?.init();
    await this.htmlModule?.init();
    await this.readmeModule?.init();
    await this.tsModule?.init();
    await this.packageJsonModule?.init();
  }

  /**
   * 安装依赖
   */
  private async packageInstall(): Promise<void> {
    console.log(chalk.cyan("安装依赖中~~~"));
    await useCommand(
      `${this.config.packageManager} install`,
      this.config.rootPath
    );
    console.log(chalk.cyan("依赖安装完成"));
  }

  /**
   * 执行安装依赖后回调
   */
  private useAfterInstallCallbackExecutor(): void {
    this.config.deps.forEach((dep) => {
      dep.afterInstallCallback && dep.afterInstallCallback(this);
    });
  }
}
