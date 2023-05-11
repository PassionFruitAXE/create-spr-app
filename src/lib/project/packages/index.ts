import { AntdPackage } from "./antd.js";
import { AxiosPackage } from "./axios.js";
import { CommanderError } from "commander";
import { Package } from "./package.js";

/**
 * 依赖列表工厂
 * @param template 模板参数
 * @returns 依赖列表
 */
export function createPackagesByTemplate(template: string): Package[] {
  const dependence: Record<string, () => Package[]> = {
    react: () => {
      return [AntdPackage.createInstance(), AxiosPackage.createInstance()];
    },
  };
  if (!dependence[template]) {
    throw new CommanderError(500, "500", `无${template}对应的依赖模板`);
  }
  return dependence[template]();
}
