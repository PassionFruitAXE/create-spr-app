import fs from "fs";
import path from "path";
import { Builder } from "../enum.js";
import { CommanderError } from "commander";
import { fileURLToPath } from "url";
import { GetArrayValueType } from "../types/utils.js";
import { Package } from "./packageList/package.js";
import { Project } from "./index.js";
import { REACT_PREFIX } from "./global.js";
import { TConfig } from "../types/index.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export abstract class BuilderPackage extends Package {
  getScript: () => Record<string, string> = () => ({});
}

abstract class ViteBuilder extends BuilderPackage {
  constructor(newValue?: GetArrayValueType<TConfig["deps"]>) {
    const name: string = "vite";
    const value: GetArrayValueType<TConfig["deps"]> = {
      devDependencies: {
        vite: "*",
        "vite-plugin-eslint": "*",
        "vite-plugin-mkcert": "*",
        "vite-plugin-stylelint": "*",
        "vite-tsconfig-paths": "*",
        "@vitejs/plugin-legacy": "*",
        ...newValue?.devDependencies,
      },
      callback: newValue?.callback,
    };
    super(name, value);
  }
}

class ViteBuilderForReact extends ViteBuilder {
  static createInstance(): ViteBuilder {
    return new ViteBuilderForReact();
  }

  getScript: () => Record<string, string> = () => ({
    build: "vite build",
    dev: "vite",
    preview: "vite preview",
    commit: "git-cz",
    prepare: "husky install",
    lint: "npm run lint:script && npm run lint:style",
    "lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./",
    "lint:style": 'stylelint --fix "src/**/*.{css,scss}"',
  });

  constructor() {
    const value: GetArrayValueType<TConfig["deps"]> = {
      devDependencies: {
        "@vitejs/plugin-react": "*",
      },
      callback: (project: Project) => {
        fs.copyFileSync(
          path.join(__dirname, REACT_PREFIX, "/vite.config.ts"),
          path.join(project.config.rootPath, "/vite.config.ts")
        );
      },
    };
    super(value);
  }
}

export function createBuilder(template: Builder): BuilderPackage {
  if (template === Builder.VITE) {
    return ViteBuilderForReact.createInstance();
  } else {
    throw new CommanderError(500, "500", `无${template}对应的依赖模板`);
  }
}
