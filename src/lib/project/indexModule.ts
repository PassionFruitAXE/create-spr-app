import fs from "fs";

export default class IndexModule {
  constructor() {}
  public init(path: string): void {
    fs.writeFileSync(`${path}/index.html`, "");
  }
}
