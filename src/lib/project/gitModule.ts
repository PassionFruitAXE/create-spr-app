import fs from "fs";

export default class GitModule {
  constructor() {}
  public init(path: string): void {
    fs.writeFileSync(`${path}/.gitignore`, "");
  }
}
