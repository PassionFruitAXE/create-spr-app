import fs from "fs";
import GitModule from "./gitModule.js";
import IndexModule from "./indexModule.js";
import PackageJsonModule from "./packageJsonModule/index.js";
import ReadmeModule from "./readmeModule.js";
import SrcModule from "./srcModule.js";
import TSModule from "./tsModule.js";
import { CommanderError } from "commander";

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
   * @param projectName 项目名称
   */
  constructor(public projectName: string) {
    this.srcModule = new SrcModule();
    this.gitModule = new GitModule();
    this.indexModule = new IndexModule();
    this.readmeModule = new ReadmeModule();
    this.tsModule = new TSModule();
    this.packageJsonModule = new PackageJsonModule();
  }

  public init(): void {
    const path = `${process.cwd()}/${this.projectName}`;
    /** 创建项目文件夹 */
    fs.mkdirSync(path);
    /** 创建子模块 */
    this.srcModule?.init(path);
    this.gitModule?.init(path);
    this.indexModule?.init(path);
    this.readmeModule?.init(path);
    this.tsModule?.init(path);
    this.packageJsonModule?.init(path);
  }
}

class reactProject extends Project {
  constructor(projectName: string) {
    super(projectName);
  }
}

export default function createProject(
  projectName: string,
  templateType: string
) {
  if (templateType === "react") {
    return new reactProject(projectName);
  } else {
    throw new CommanderError(500, "500", "没有对应的template");
  }
}
