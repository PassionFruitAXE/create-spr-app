import { Builder, PackageManager, Template } from "../enum.js";

export interface Module {
  init: (config: TConfig) => void;
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
    callback?: () => void;
  }[];
};
