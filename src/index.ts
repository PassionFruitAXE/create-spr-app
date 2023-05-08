import createProject from "./lib/project/index.js";
import inquirer from "inquirer";
import path from "path";
import { createDependenceByTemplate } from "./lib/dependence.js";
import { execa } from "execa";
import { program } from "commander";

program.version("1.0.0");
program
  .command("start")
  .description("启动cli")
  .action(async () => {
    /** write code here */
    console.log("cli start");

    /** 获取项目名 包管理器 模板 */
    const { projectName, packageManager, template } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "输入项目名称",
      },
      {
        type: "list",
        name: "packageManager",
        message: "选择包管理器",
        choices: ["pnpm", "yarn", "npm"],
      },
      {
        type: "list",
        name: "template",
        message: "选择模板",
        choices: ["react"],
      },
    ]);
    /** 获取用户选择打包工具 默认依赖 是否需要GitHub Action */
    const { builder, dependence, isGithubActionRequired } =
      await inquirer.prompt([
        {
          type: "list",
          name: "builder",
          message: "选择打包工具",
          choices: ["vite"],
        },
        {
          type: "checkbox",
          name: "dependence",
          message: "默认依赖包",
          choices: createDependenceByTemplate(template),
        },
        {
          type: "confirm",
          name: "isGithubActionRequired",
          message: "是否需要Github Action",
        },
      ]);
    /** 创建项目文件夹 */

    const project = createProject(projectName, template);
    project.init();

    // const projectPath = "";
    // // /** 安装依赖 */
    // execa(`${packageManager} install`, [], {
    //   cwd: path.join(process.cwd(), projectPath),
    //   stdio: ["inherit", "pipe", "inherit"],
    // });

    // console.log("cli end");
  });

program.parse(process.argv);
