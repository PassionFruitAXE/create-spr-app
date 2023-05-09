import legacy from "@vitejs/plugin-legacy";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import viteEslint from "vite-plugin-eslint";
import viteStylelint from "vite-plugin-stylelint";
import type { UserConfigFn, UserConfig } from "vite";

const defineConfig: UserConfigFn = () => {
  const config: UserConfig = {
    server: {
      https: true,
    },
    plugins: [
      react(),
      tsconfigPaths(),
      legacy(),
      viteEslint(),
      viteStylelint({
        // 对某些文件排除检查
        exclude: "/windicss|node_modules/",
      }),
      mkcert({
        source: "coding",
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
          },
        },
      },
    },
  };
  return config;
};

export default defineConfig;
