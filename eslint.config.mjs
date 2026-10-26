import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Skills y tooling de agentes (no son código del sitio):
    ".agents/**",
    "node_modules/**",
    // macOS AppleDouble en volúmenes externos:
    "**/._*",
    "**/__MACOSX/**",
  ]),
]);

export default eslintConfig;
