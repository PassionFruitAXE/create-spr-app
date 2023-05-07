import fs from "fs";
import GitModule from "./gitModule";
import IndexModule from "./indexModule";
import PackageJsonModule from "./packageJsonModule";
import ReadmeModule from "./readmeModule";
import SrcModule from "./srcModule";
import TSModule from "./tsModule";
import { CommanderError } from "commander";

abstract class Project {
  /** src模块 */
  public srcModule: SrcModule = new SrcModule();
  /** git模块 */
  public gitModule: GitModule = new GitModule();
  /** index.html模块 */
  public indexModule: IndexModule = new IndexModule();
  /** README.md模块 */
  public readmeModule: ReadmeModule = new ReadmeModule();
  /** ts模块 */
  public tsModule: TSModule = new TSModule();
  /** package.json模块 */
  public packageJsonModule: PackageJsonModule = new PackageJsonModule();

  /**
   *
   * @param projectName 项目名称
   */
  constructor(public projectName: string) {}

  public init(): void {
    const path = `${this.projectName}`;
    /** 创建项目文件夹 */
    fs;
    /** 创建子模块 */
    this.srcModule.init(path);
    this.gitModule.init(path);
    this.indexModule.init(path);
    this.readmeModule.init(path);
    this.tsModule.init(path);
    this.packageJsonModule.init(path);
  }
}

class reactProject extends Project {}

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
