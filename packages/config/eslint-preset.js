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
  ignorePatterns: ["next.config.mjs"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "no-explicit-any": "off",
    "no-console": "off",
  },
};
