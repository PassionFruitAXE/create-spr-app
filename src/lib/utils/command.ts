import { execa } from "execa";

export async function useCommand(command: string, cwd: string) {
  await execa(`${command}`, [], {
    cwd,
    stdio: ["inherit", "pipe", "inherit"],
  });
}
