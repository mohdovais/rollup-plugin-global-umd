# rollup-plugin-global-umd

A custom Rollup plugin to generate UMD package where the app is always exposed as global variable. Rollup does not provide hooks to modify UMD definitions.

Usage

_rollup.config.js_
```javascript
import customUMD from "rollup-plugin-global-es6.cjs";

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
```

## test
```
npm install
npm test
```
