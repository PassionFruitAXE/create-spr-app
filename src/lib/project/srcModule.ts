import fs from "fs";
import path from "path";
import { CommanderError } from "commander";
import { deepCopyFile } from "../utils/file.js";
import { fileURLToPath } from "url";
import { Module, TConfig } from "../types/index.js";
import { REACT_PREFIX } from "./global.js";
import { Template } from "../enum.js";

// @ts-ignore
// 防止IDE对import.meta.url报错
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileModule implements Module {
  constructor(public config: TConfig) {}
  public async init() {
    fs.mkdirSync(path.join(this.config.rootPath, "/src"));
  }
}

class ReactFileModule extends FileModule {
  constructor(config: TConfig) {
    super(config);
  }
  public async init() {
    /** 将REACT_PREFIX中的文件拷贝过去 */
    deepCopyFile(path.join(__dirname, REACT_PREFIX), this.config.rootPath);
  }
}

export function createFileModule(config: TConfig) {
  if (config.template === Template.REACT) {
    return new ReactFileModule(config);
  } else {
    throw new CommanderError(500, "500", `无${config.template}对应的依赖模板`);
  }
}
