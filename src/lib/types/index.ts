import { Builder, PackageManager, Template } from "../enum.js";
import { Project } from "../project/index.js";

export interface Module {
  init: (config: TConfig) => Promise<void>;
}

export type TConfig = {
  rootPath: string;
  projectName: string;
  packageManager: PackageManager;
  template: Template;
  builder: Builder;
  deps: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    callback?: (project: Project) => void;
  }[];
};
