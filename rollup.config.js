import customUMD from "./rollup/rollup-plugin-gumd";

const name = "ubs.my-app-bundle";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "umd",
    name,
    amd: {
      id: name
    },
    sourcemap: true
  },
  plugins: [customUMD()]
};
