export const CONFIG_PREFIX = "../../../config";

export enum Template {
  REACT = "react",
}

export interface Module {
  init: (rootPath: string) => void;
}
