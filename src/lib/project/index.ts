import fs from "fs";
import GitModule from "./gitModule.js";
import IndexModule from "./indexModule.js";
import ReadmeModule from "./readmeModule.js";
import SrcModule from "./srcModule.js";
import { CommanderError } from "commander";
import { createTSModule, TSModule } from "./tsModule.js";
import { TConfig, Template } from "../global.js";
import {
  createPackageJsonModule,
  PackageJsonModule,
} from "./packageJsonModule.js";

abstract class Project {
  /** src模块 */
  public srcModule: SrcModule | null = null;
  /** git模块 */
  public gitModule: GitModule | null = null;
  /** index.html模块 */
  public indexModule: IndexModule | null = null;
  /** README.md模块 */
  public readmeModule: ReadmeModule | null = null;
  /** ts模块 */
  public tsModule: TSModule | null = null;
  /** package.json模块 */
  public packageJsonModule: PackageJsonModule | null = null;

  /**
   * Project类构造函数
   * @param config 项目配置对象
   */
  constructor(public config: TConfig) {
    this.srcModule = new SrcModule();
    this.gitModule = new GitModule();
    this.indexModule = new IndexModule();
    this.readmeModule = new ReadmeModule();
    this.tsModule = new TSModule();
    this.packageJsonModule = new PackageJsonModule();
  }

  public init(): void {
    /** 创建项目文件夹 */
    fs.mkdirSync(this.config.rootPath);
    /** 创建子模块 */
    this.srcModule?.init(this.config);
    this.gitModule?.init(this.config);
    this.indexModule?.init(this.config);
    this.readmeModule?.init(this.config);
    this.tsModule?.init(this.config);
    this.packageJsonModule?.init(this.config);
  }
}

class reactProject extends Project {
  constructor(config: TConfig) {
    super(config);
    this.tsModule = createTSModule(Template.REACT);
    this.packageJsonModule = createPackageJsonModule(Template.REACT);
  }
}

/**
 * 项目工厂
 * @param props TProps
 * @returns Project的子类
 */
export default function createProject(props: TConfig) {
  if (props.template === Template.REACT) {
    return new reactProject(props);
  } else {
    throw new CommanderError(500, "500", "没有对应的template");
  }
}
