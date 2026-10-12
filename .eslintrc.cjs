module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "jsx-a11y"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "MemberExpression[object.type='MetaProperty'][property.name='env']",
        message: "Переменные окружения читаются только через @/config/env",
      },
    ],
  },
  overrides: [
    {
      files: ["src/config/env.ts"],
      rules: { "no-restricted-syntax": "off" },
    },
  ],
};
