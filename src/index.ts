import { program } from "commander";

program.version("1.0.0");

program
  .command("start")
  .description("start cli")
  .action(() => {
    console.log("cli starting");
  });

program.parse(process.argv);
