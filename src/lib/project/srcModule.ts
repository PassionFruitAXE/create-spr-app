import fs from "fs";
import path from "path";
import { Module, TConfig } from "../types/index.js";
export default class SrcModule implements Module {
  constructor() {}
  public async init(config: TConfig) {
    fs.mkdirSync(path.join(config.rootPath, "/src"));
  }
}
