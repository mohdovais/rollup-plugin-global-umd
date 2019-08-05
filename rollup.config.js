import customUMD from "./rollup/rollup-plugin-gumd";

const name = "ubs.my-app-bundle";
const moduleName = name.split(".").pop();

export default {
  input: "src/main.js",
  output: {
    file: `dist/${moduleName}.js`,
    format: "umd",
    name,
    amd: {
      id: moduleName
    },
  },
  plugins: [customUMD()]
};
