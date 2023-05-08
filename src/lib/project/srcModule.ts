import fs from "fs";

export default class SrcModule {
  constructor() {}
  public init(path: string): void {
    fs.mkdirSync(`${path}/src`);
  }
}
