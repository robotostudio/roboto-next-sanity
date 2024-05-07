module.exports = {
  extends: [
    "next",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["next.config.js"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "no-explicit-any": "off",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    // "sort-imports": [
    //   "error",
    //   {
    //     ignoreCase: false,
    //     ignoreDeclarationSort: false,
    //     ignoreMemberSort: false,
    //     memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
    //     allowSeparatedGroups: false,
    //   },
    // ],
  },
};
