import { transform } from "./transform";
import { createFilter } from "rollup-pluginutils";

export default function globalUMD(userOptions = {}) {
  const filter = createFilter(userOptions.include, userOptions.exclude, {
    resolve: false
  });

  return {
    name: "custom-umd",
    renderChunk: function(code, chunk, outputOptions) {
      if (!filter(chunk.fileName)) {
        return null;
      }

      return outputOptions.format === "umd" && chunk.isEntry
        ? transform(code)
        : null;
    }
  };
}
