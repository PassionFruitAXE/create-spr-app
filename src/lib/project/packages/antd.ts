import { GetArrayValueType } from "../../types/utils.js";
import { Package } from "./package.js";
import { TConfig } from "../../types/index.js";

export class AntdPackage extends Package {
  static createInstance(): AntdPackage {
    return new AntdPackage();
  }

  constructor() {
    const name: string = "antd";
    const value: GetArrayValueType<TConfig["deps"]> = {
      dependencies: { antd: "5.4.7" },
    };
    super(name, value);
  }
}
