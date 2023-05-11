import { Builder, PackageManager, Template } from "../enum.js";
import { PackageJsonModule } from "../project/packageJsonModule.js";
import { Project } from "../project/index.js";

export interface IModule {
  /** 生成模块文件 */
  init: () => Promise<void>;
}

export type TDependence = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  beforeInitCallback?: (project: Project) => void;
  afterInitCallback?: (project: Project) => void;
};

export type TConfig = {
  rootPath: string;
  projectName: string;
  packageManager: PackageManager;
  template: Template;
  builder: Builder;
  deps: TDependence[];
};
