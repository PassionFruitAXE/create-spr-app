import { GetArrayValueType } from "../../types/utils.js";
import { TConfig } from "../../types/index.js";

export abstract class Package {
  static createInstance: () => Package;
  constructor(
    public name: string,
    public value: GetArrayValueType<TConfig["deps"]>
  ) {}
}
