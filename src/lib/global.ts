export enum PackageManager {
  NPM = "npm",
  YARN = "yarn",
  PNPM = "pnpm",
}

export enum Template {
  REACT = "react",
}

export enum Builder {
  VITE = "vite",
}

export type TConfig = {
  rootPath: string;
  projectName: string;
  packageManager: PackageManager;
  template: Template;
  builder: Builder;
  dependencies: string[];
};
