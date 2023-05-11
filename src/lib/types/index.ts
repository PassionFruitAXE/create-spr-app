import { Builder, PackageManager, Template } from "../enum.js";
import { Project } from "../project/index.js";

export interface Module {
  /** 生成模块文件 */
  init: () => Promise<void>;
}

export type TDependence = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  beforeInstallCallback?: (project: Project) => void;
  afterInstallCallback?: (project: Project) => void;
};

export type TConfig = {
  rootPath: string;
  projectName: string;
  packageManager: PackageManager;
  template: Template;
  builder: Builder;
  deps: TDependence[];
};
