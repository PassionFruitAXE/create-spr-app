import createPackageJson from "./lib/package";
import inquirer from "inquirer";
import path from "path";
import { createDependenceByTemplate } from "./lib/dependence";
import { execa } from "execa";
import { program } from "commander";

function init() {
  program.version("1.0.0");
  program
    .command("start")
    .description("启动cli")
    .action(async () => {
      /** write code here */
      console.log("cli start");
      /** 创建package.json对象 */
      const packageJson = createPackageJson();
      /** 获取用户选择包管理器 模板 */
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
      /** 创建package.json文件 */
      packageJson.generateFile("");
      // const projectPath = "";
      // /** 安装依赖 */
      // execa(`${packageManager} install`, [], {
      //   cwd: path.join(process.cwd(), projectPath),
      //   stdio: ["inherit", "pipe", "inherit"],
      // });

      console.log("cli end");
    });

  program.parse(process.argv);
}

init();
