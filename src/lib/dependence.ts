import { CommanderError } from "commander";

type Dependence = { name: string; value: string };

/**
 * 依赖列表工厂
 * @param template 模板参数
 * @returns 依赖列表
 */
export function createDependenceByTemplate(template: string): Dependence[] {
  const dependence: Record<string, () => Dependence[]> = {
    react: () => {
      return [
        {
          name: "antd",
          value: "antd",
        },
      ];
    },
  };
  if (!dependence[template]) {
    throw new CommanderError(500, "500", `无${template}对应的依赖模板`);
  }
  return dependence[template]();
}
