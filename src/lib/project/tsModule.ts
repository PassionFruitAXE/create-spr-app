import fs from "fs";
export default class TSModule {
  constructor() {}
  public init(path: string): void {
    fs.writeFileSync(`${path}/tsconfig.json`, "");
  }
}
