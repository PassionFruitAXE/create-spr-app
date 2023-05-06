class PackageJson {
  constructor() {}

  /**
   * 生成package.json文件
   * @param path 生成路径
   */
  generateFile(path: string) {}
}

/**
 * PackageJson工厂
 * @returns PackageJson实例
 */
export default function createPackageJson() {
  return new PackageJson();
}
