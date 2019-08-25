const assert = require("assert");
const path = require("path");
const { rollup } = require("rollup");
const customUMD = require("..");

process.chdir(__dirname);

describe("rollup-plugin-custom-umd", () => {
  it("should transform for minimal config", async () => {
    const expected = "(0);(global = global || self, global.app = factory())";

    const bundle = await rollup({
      input: "samples/main.js",
      plugins: [customUMD()]
    });

    const { output } = await bundle.generate({
      format: "umd",
      name: "app"
    });

    const { code } = output[0];

    assert.ok(code.indexOf(expected) !== -1);
  });

  it("should transform for chained app name config", async () => {
    const expected =
      "(0);(global = global || self, (global.org = global.org || {}, global.org.app = factory()))";

    const bundle = await rollup({
      input: "samples/main.js",
      plugins: [customUMD()]
    });

    const { output } = await bundle.generate({
      format: "umd",
      name: "org.app"
    });

    const { code } = output[0];

    assert.ok(code.indexOf(expected) !== -1, code);
  });

  it("should transform for chained app name and named amd config", async () => {
    const expected =
      "(0);(global = global || self, (global.org = global.org || {}, global.org.app = factory()))";

    const bundle = await rollup({
      input: "samples/main.js",
      plugins: [customUMD()]
    });

    const { output } = await bundle.generate({
      format: "umd",
      name: "org.app",
      amd: {
        id: "app"
      }
    });

    const { code } = output[0];

    assert.ok(code.indexOf(expected) !== -1, code);
  });

  it("should transform for chained app name, named amd and external modules config", async () => {
    const expected =
      "(0);(global = global || self, (global.org = global.org || {}, global.org.app = factory(global.external)))";

    const bundle = await rollup({
      input: "samples/main.js",
      plugins: [customUMD()],
      external: ["./module-1"]
    });

    const { output } = await bundle.generate({
      format: "umd",
      name: "org.app",
      amd: {
        id: "app"
      },
      globals: {
        [path.resolve("./samples/module-1")]: "external"
      }
    });

    const { code } = output[0];

    assert.ok(code.indexOf(expected) !== -1, code);
  });

  it("should transform along terser", async () => {
    const expected =
      ",(e=e||self).org=e.org||{},e.org.app=n(e.external)";

    const bundle = await rollup({
      input: "samples/main.js",
      plugins: [customUMD(), require('rollup-plugin-terser').terser()],
      external: ["./module-1"]
    });

    const { output } = await bundle.generate({
      format: "umd",
      name: "org.app",
      amd: {
        id: "app"
      },
      globals: {
        [path.resolve("./samples/module-1")]: "external"
      }
    });

    const { code } = output[0];

    assert.ok(code.indexOf(expected) !== -1, code);
  });
});
