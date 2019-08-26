# rollup-plugin-global-umd

A custom Rollup plugin to generate UMD package where the app is always exposed as global variable. Rollup does not provide hooks to modify UMD definitions.

Usage

_rollup.config.js_
```javascript
import customUMD from "rollup-plugin-global-umd";

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
### with plugin
```javascript
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./module-1')) :
  typeof define === 'function' && define.amd ? define('app', ['./module-1'], factory) :
  (0);(global = global || self, (global.org = global.org || {}, global.org.app = factory(global.external)))
}(this, function (externalModule) { 'use strict';

  // code

}));
```

### without plugin
```javascript
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./module-1')) :
  typeof define === 'function' && define.amd ? define('app', ['./module-1'], factory) :
  (global = global || self, (global.org = global.org || {}, global.org.app = factory(global.external)));
}(this, function (externalModule) { 'use strict';

  // code

}));

```


## test
```
npm install
npm test
```
