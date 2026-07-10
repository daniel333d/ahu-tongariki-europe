import js from "./node_modules/.pnpm/@eslint+js@9.39.4/node_modules/@eslint/js/src/index.js";
import nextPlugin from "./node_modules/.pnpm/@next+eslint-plugin-next@15.5.20/node_modules/@next/eslint-plugin-next/dist/index.js";
import tsParser from "./node_modules/.pnpm/@typescript-eslint+parser@8_b222577ee2fbd2ad10b0efef6aeb24b9/node_modules/@typescript-eslint/parser/dist/index.js";
import tsPlugin from "./node_modules/.pnpm/@typescript-eslint+eslint-p_b2d17cdb18b59adfce7c5cc726bc6e5a/node_modules/@typescript-eslint/eslint-plugin/dist/index.js";

export default [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "sanity/**", ".preview-*/**", "docs/**"]
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        console: "readonly",
        process: "readonly",
        Request: "readonly",
        Response: "readonly",
        Headers: "readonly",
        URL: "readonly",
        HTMLImageElement: "readonly"
      }
    },
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }]
    }
  }
];
