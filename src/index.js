import { transform } from "./transform";

export default function globalUMD() {
  return {
    name: "custom-umd",
    renderChunk: function(code, chunk, outputOptions) {
      return outputOptions.format === "umd" && chunk.isEntry
        ? transform(code)
        : null;
    }
  };
}
