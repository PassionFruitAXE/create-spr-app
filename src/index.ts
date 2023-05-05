import { program } from "commander";

program.version("1.0.0");

program
  .command("build")
  .description("打包cli命令")
  .action(() => {
    console.log(123);
  });

program.parse(process.argv);
