import createProject from "./lib/project/index.js";
import inquirer from "inquirer";
import path from "path";
import { Builder, PackageManager, Template } from "./lib/enum.js";
import { createPackagesByTemplate } from "./lib/project/packages/index.js";
import { execa } from "execa";
import { program } from "commander";
import { TConfig } from "./lib/types/index.js";

async function action() {
  /** write code here */
  console.log("cli start");

  /** 获取项目名 包管理器 模板 打包工具 */
  const { projectName, packageManager, template, builder } =
    await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "输入项目名称",
      },
      {
        type: "list",
        name: "packageManager",
        message: "选择包管理器",
        choices: [PackageManager.PNPM, PackageManager.YARN, PackageManager.NPM],
      },
      {
        type: "list",
        name: "template",
        message: "选择模板",
        choices: [Template.REACT],
      },
      {
        type: "list",
        name: "builder",
        message: "选择打包工具",
        choices: [Builder.VITE],
      },
    ]);

  /** 获取默认依赖包 */
  const { deps } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "deps",
      message: "默认依赖包",
      choices: createPackagesByTemplate(template),
    },
  ]);

  /** 创建项目目录 */
  const rootPath = path.join(process.cwd(), `/${projectName}`);

  const props: TConfig = {
    rootPath,
    projectName,
    packageManager,
    template,
    builder,
    deps,
  };
  const project = createProject(props);
  project.init();

  /** 安装依赖 */
  console.log("安装依赖中~~~");
  await execa(`${packageManager} install`, [], {
    cwd: rootPath,
    stdio: ["inherit", "pipe", "inherit"],
  });
  console.log("依赖安装完成");

  console.log("cli end");
}

program.version("1.0.0");
program.command("start").description("启动cli").action(action);
program.parse(process.argv);
