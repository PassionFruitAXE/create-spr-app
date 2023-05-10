import { TDependence } from "../../types/index.js";

export abstract class Package {
  static createInstance: () => Package;
  constructor(public name: string, public value: TDependence) {}
}
