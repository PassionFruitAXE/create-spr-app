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
  constructor() {}
  public async init(config: TConfig) {
    fs.mkdirSync(path.join(config.rootPath, "/src"));
  }
}

class ReactFileModule extends FileModule {
  constructor() {
    super();
  }
  public async init() {
    deepCopyFile(path.join(__dirname, REACT_PREFIX), path.join(`./test`));
  }
}

export function createFileModule(template: Template) {
  if (template === Template.REACT) {
    return new ReactFileModule();
  } else {
    throw new CommanderError(500, "500", "没有对应的template");
  }
}
