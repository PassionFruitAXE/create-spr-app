import { TConfig } from "../global.js";

export const CONFIG_PREFIX = "../../../config";

export interface Module {
  init: (config: TConfig) => void;
}
