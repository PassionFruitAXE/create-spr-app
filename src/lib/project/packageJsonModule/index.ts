import fs from "fs";
export default class PackageJsonModule {
  constructor() {}
  public init(path: string): void {
    fs.writeFileSync(`${path}/package.json`, "");
  }
}
