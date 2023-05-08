import fs from "fs";
import path from "path";
import { Module, TConfig } from "../types/index.js";
export default class SrcModule implements Module {
  constructor() {}
  public init(config: TConfig): void {
    fs.mkdirSync(`${config.rootPath}/src`);
  }
}
