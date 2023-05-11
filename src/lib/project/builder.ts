import fs from "fs";
import path from "path";
import { Builder } from "../enum.js";
import { CommanderError } from "commander";
import { fileURLToPath } from "url";
import { globalDependencies, REACT_PREFIX } from "./global.js";
import { mergeObject } from "../utils/common.js";
import { Package } from "./packages/package.js";
import { Project } from "./index.js";
import { TConfig, TDependence } from "../types/index.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

abstract class ViteBuilder extends Package {
  constructor() {
    const name: string = "vite";
    const {
      vite,
      vitePluginEslint,
      vitePluginMkcert,
      vitePluginStylelint,
      viteTsconfigPaths,
      vitejsPluginLegacy,
      rollup,
      terser,
    } = globalDependencies;
    const value: TDependence = {
      devDependencies: {
        ...vite,
        ...vitePluginEslint,
        ...vitePluginMkcert,
        ...vitePluginStylelint,
        ...viteTsconfigPaths,
        ...vitejsPluginLegacy,
        ...rollup,
        ...terser,
      },
    };
    super(name, value);
  }
}

class ViteBuilderForReact extends ViteBuilder {
  constructor() {
    super();
    const newValue: TDependence = {
      devDependencies: {
        "@vitejs/plugin-react": "^4.0.0",
      },
      beforeInitCallback: (project: Project) => {
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
      afterInitCallback: (project: Project) => {
        fs.copyFileSync(
          path.join(__dirname, REACT_PREFIX, "/vite.config.ts"),
          path.join(project.config.rootPath, "/vite.config.ts")
        );
      },
    };
    this.value = mergeObject<TDependence>(this.value, newValue);
  }
}

export function createBuilder(config: TConfig): Package {
  if (config.builder === Builder.VITE) {
    return new ViteBuilderForReact();
  } else {
    throw new CommanderError(500, "500", `无${config.builder}对应的依赖模板`);
  }
}
