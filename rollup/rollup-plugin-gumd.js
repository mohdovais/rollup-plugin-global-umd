const { parse } = require("acorn");

function getIIFECallee(node) {
  return node.body[0].expression.callee.body.body[0];
}

function getExpressionLastAlternate(node) {
  return node.expression.alternate.alternate;
}

function transform(code) {
  const ast = parse(code);
  const iifeCalleeExpression = getIIFECallee(ast);

  const {
    start: sequenceExpressionStart,
    end: sequenceExpressionEnd
  } = getExpressionLastAlternate(iifeCalleeExpression);

  const { start: iifeCalleeStart, end: iifeCalleeEnd } = iifeCalleeExpression;

  const sequenceExpressionString = code.substring(
    sequenceExpressionStart - 1,
    sequenceExpressionEnd + 1
  );

  return (
    code.substring(0, sequenceExpressionStart - 1) +
    "0" +
    code.substring(sequenceExpressionEnd + 1, iifeCalleeEnd) +
    sequenceExpressionString +
    code.substring(iifeCalleeEnd)
  );
}

export default function globalUMD() {
  return {
    name: "custom-gumd", // this name will show up in warnings and errors
    generateBundle: function(options, bundles, isWrite) {
      Object.keys(bundles).forEach(function(bundleName) {
        const bundle = bundles[bundleName];
        const { code, isAsset, isEntry } = bundle;

        if (options.format === "umd" && !isAsset && isEntry && isWrite) {
          bundle.code = transform(code);
        }
      });
    }
  };
}
