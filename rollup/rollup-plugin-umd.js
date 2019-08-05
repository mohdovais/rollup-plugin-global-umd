const { parse } = require("acorn");

const expressionStatement = node => node.type === "ExpressionStatement";

function chainedProperty(subject, chainString) {
  const chain = Array.isArray(chainString)
    ? chainString
    : chainString.split(".");
  const count = chain.length;

  let index = 0;
  let property = subject;

  for (; index < count; index++) {
    property = property[chain[index]];
    if (property === null || property === undefined) {
      break;
    }
  }

  return property;
}

function toArray(subject) {
  return Array.isArray(subject)
    ? subject
    : subject !== null && subject !== undefined
    ? [subject]
    : [];
}

function firstExpressionStatement(node) {
  return toArray(node).filter(expressionStatement)[0];
}

function getIIFECallee(node) {
  return firstExpressionStatement(
    chainedProperty(
      firstExpressionStatement(node.body),
      "expression.callee.body.body"
    )
  );
}

function getExpressionLastAlternate(node) {
  return chainedProperty(node, "expression.alternate.alternate");
}

function transform(code) {
  const ast = parse(code);
  const iifeCalleeExpression = getIIFECallee(ast);

  if (iifeCalleeExpression === undefined) {
    throw new Error('Could not find IIFE callee expression');
  }

  const alternateExpression = getExpressionLastAlternate(iifeCalleeExpression);

  if (alternateExpression === undefined) {
    throw new Error('Could not find last alternate to condition expression');
  }

  const {
    start: sequenceExpressionStart,
    end: sequenceExpressionEnd
  } = alternateExpression;

  const { start: iifeCalleeStart, end: iifeCalleeEnd } = iifeCalleeExpression;

  const sequenceExpressionString = code.substring(
    sequenceExpressionStart - 1,
    sequenceExpressionEnd + 1
  );

  return (
    code.substring(0, sequenceExpressionStart) +
    "0" +
    code.substring(sequenceExpressionEnd, iifeCalleeEnd) +
    sequenceExpressionString +
    code.substring(iifeCalleeEnd)
  );
}

export default function globalUMD() {
  return {
    name: "custom-umd",
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
