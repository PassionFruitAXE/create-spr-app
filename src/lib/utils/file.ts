import fs from "fs";
import path from "path";

/**
 * 文件深拷贝
 * @param rootPath 模板路径
 * @param toPath 目标路径
 */
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
