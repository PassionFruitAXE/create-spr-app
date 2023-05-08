import fs from "fs";
import path from "path";
import { Module } from "./global.js";

export default class SrcModule implements Module {
  constructor() {}
  public init(rootPath: string): void {
    fs.mkdirSync(`${rootPath}/src`);
  }
}
