import fs from "fs";
import path from "path";

export function deepCopyFile(rootPath: string, toPath: string) {
  fs.readdirSync(rootPath).forEach((filename) => {
    const newRootPath = path.join(rootPath, `/${filename}`);
    const newToPath = path.join(toPath, `/${filename}`);
    if (fs.lstatSync(newRootPath).isDirectory()) {
      fs.mkdirSync(newToPath);
      deepCopyFile(newRootPath, newToPath);
    } else {
      fs.copyFileSync(newRootPath, newToPath);
    }
  });
}
