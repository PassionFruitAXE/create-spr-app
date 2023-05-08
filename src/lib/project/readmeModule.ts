import fs from "fs";

export default class ReadmeModule {
  constructor() {}
  public init(path: string): void {
    fs.writeFileSync(`${path}/README.md`, "");
  }
}
