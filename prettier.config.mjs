/** @type {import("prettier").Config} */
const config = {
  arrowParens: "always",
  singleQuote: false,
  trailingComma: "es5",
  semi: true,
  tabWidth: 2,
  printWidth: 90,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn", "cva"],
};

export default config;
