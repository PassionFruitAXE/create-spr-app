import { globalDependencies } from "../global.js";
import { Package } from "./package.js";
import { TDependence } from "../../types/index.js";

export class AxiosPackage extends Package {
  static createInstance(): AxiosPackage {
    return new AxiosPackage();
  }

  constructor() {
    const name: string = "axios";
    const value: TDependence = {
      dependencies: { ...globalDependencies.axios },
    };
    super(name, value);
  }
}
