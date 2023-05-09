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

abstract class ViteBuilder extends Package {
  static createInstance: () => ViteBuilder;

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
    };
    super(name, value);
  }
}

class ViteBuilderForReact extends ViteBuilder {
  static createInstance(): ViteBuilder {
    return new ViteBuilderForReact();
  }

  constructor() {
    const value: GetArrayValueType<TConfig["deps"]> = {
      devDependencies: {
        "@vitejs/plugin-react": "*",
      },
      callback: (project: Project) => {
        const template = fs.readFileSync(
          path.join(__dirname, REACT_PREFIX, "/vite.config.ts")
        );
        fs.writeFileSync(
          path.join(project.config.rootPath, "/vite.config.ts"),
          template
        );
      },
    };
    super(value);
  }
}

export function createBuilder(template: Builder): Package {
  if (template === Builder.VITE) {
    return ViteBuilderForReact.createInstance();
  } else {
    throw new CommanderError(500, "500", `无${template}对应的依赖模板`);
  }
}
