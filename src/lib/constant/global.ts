export const TEMPLATE_PREFIX = "../../../template";
export const REACT_VITE_PREFIX = `${TEMPLATE_PREFIX}/react_vite`;

/** 依赖列表 */
export const globalDependencies = {
  axios: { axios: "^1.4.0" },
  antd: { antd: "5.4.7" },
  react: { react: "18.2.0" },
  reactDom: { "react-dom": "18.2.0" },
  reactRouterDom: { "react-router-dom": "^6.11.1" },

  eslintPluginReact: { "eslint-plugin-react": "7.32.2" },
  vite: { vite: "^4.3.5" },
  vitePluginEslint: { "vite-plugin-eslint": "^1.8.1" },
  vitePluginMkcert: { "vite-plugin-mkcert": "1.15.0" },
  vitePluginStylelint: { "vite-plugin-stylelint": "^4.3.0" },
  viteTsconfigPaths: { "vite-tsconfig-paths": "4.2.0" },
  vitejsPluginLegacy: { "@vitejs/plugin-legacy": "^4.0.3" },
  rollup: { rollup: "^3.21.6" },
  terser: { terser: "^5.17.3" },

  typesNode: { "@types/node": "^20.1.1" },
  typesReact: { "@types/react": "^18.2.6" },
  typesReactDom: { "@types/react-dom": "^18.2.4" },
};
