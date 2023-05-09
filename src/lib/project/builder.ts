import fs from "fs";
import path from "path";
import { Builder } from "../enum.js";
import { CommanderError } from "commander";
import { fileURLToPath } from "url";
import { GetArrayValueType } from "../types/utils.js";
import { Package } from "./packages/package.js";
import { Project } from "./index.js";
import { REACT_PREFIX } from "./global.js";
import { TConfig } from "../types/index.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

abstract class ViteBuilder extends Package {
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
        rollup: "*",
        terser: "*",
        ...newValue?.devDependencies,
      },
      beforeInstallCallback: newValue?.beforeInstallCallback,
      afterInstallCallback: newValue?.afterInstallCallback,
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
      beforeInstallCallback: (project: Project) => {
        project.packageJsonModule?.mergeConfig({
          scripts: {
            build: "vite build",
            dev: "vite",
            preview: "vite preview",
            commit: "git-cz",
            prepare: "husky install",
            lint: "npm run lint:script && npm run lint:style",
            "lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./",
            "lint:style": 'stylelint --fix "src/**/*.{css,scss}"',
          },
        });
      },
      afterInstallCallback: (project: Project) => {
        fs.copyFileSync(
          path.join(__dirname, REACT_PREFIX, "/vite.config.ts"),
          path.join(project.config.rootPath, "/vite.config.ts")
        );
      },
    };
    super(value);
  }
}

export function createBuilder(config: TConfig): Package {
  if (config.builder === Builder.VITE) {
    return ViteBuilderForReact.createInstance();
  } else {
    throw new CommanderError(500, "500", `无${config.builder}对应的依赖模板`);
  }
}
