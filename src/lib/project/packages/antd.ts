import { globalDependencies } from "../../constant/global.js";
import { Package } from "./package.js";
import { TDependence } from "../../types/index.js";

export class AntdPackage extends Package {
  static createInstance(): AntdPackage {
    return new AntdPackage();
  }

  constructor() {
    const name: string = "antd";
    const value: TDependence = {
      dependencies: { ...globalDependencies.antd },
    };
    super(name, value);
  }
}
