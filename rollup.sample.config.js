import customUMD from ".";

const moduleName = "my-app-bundle";

export default {
  input: "samples/main.js",
  output: {
    file: `samples/${moduleName}.js`,
    format: "umd",
    name: `org.${moduleName}`,
    amd: {
      id: moduleName
    }
  },
  plugins: [customUMD()],
  external: ["./module-1"]
};
