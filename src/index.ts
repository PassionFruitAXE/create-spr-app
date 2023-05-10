import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import { Builder, PackageManager, Template } from "./lib/enum.js";
import { createPackagesByTemplate } from "./lib/project/packages/index.js";
import { program } from "commander";
import { Project } from "./lib/project/index.js";

async function action() {
  /** write code here */
  console.log(chalk.cyan("欢迎使用create-spr-app~~~"));

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

  /** 创建项目实例 */
  const project = new Project({
    rootPath,
    projectName,
    packageManager,
    template,
    builder,
    deps,
  });
  /** 生成项目 */
  await project.run();

  console.log(chalk.cyan(`项目已生成 输入: cd ${projectName} 进入项目`));
}

program.version("1.0.0");
program.command("start").description("启动cli").action(action);
program.parse(process.argv);
