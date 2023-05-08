import fs from "fs";
import path from "path";
import { Module } from "./global.js";
import { TConfig } from "../global.js";

export default class SrcModule implements Module {
  constructor() {}
  public init(config: TConfig): void {
    fs.mkdirSync(`${config.rootPath}/src`);
  }
}
