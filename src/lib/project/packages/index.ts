import { CommanderError } from "commander";
import { GetArrayValueType } from "../../types/utils.js";
import { TConfig } from "../../types/index.js";

export class Package {
  static createInstance: () => Package;
  constructor(
    public name: string,
    public value: GetArrayValueType<TConfig["deps"]>
  ) {}
}

class AntdPackage extends Package {
  static createInstance(): AntdPackage {
    const name = "antd";
    const value = { dependencies: { antd: "*" } };
    return new AntdPackage(name, value);
  }

  constructor(name: string, value: GetArrayValueType<TConfig["deps"]>) {
    super(name, value);
  }
}

/**
 * 依赖列表工厂
 * @param template 模板参数
 * @returns 依赖列表
 */
export function createPackagesByTemplate(template: string): Package[] {
  const dependence: Record<string, () => Package[]> = {
    react: () => {
      return [AntdPackage.createInstance()];
    },
  };
  if (!dependence[template]) {
    throw new CommanderError(500, "500", `无${template}对应的依赖模板`);
  }
  return dependence[template]();
}
