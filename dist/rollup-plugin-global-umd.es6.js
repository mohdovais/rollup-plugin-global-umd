function toArray(subject) {
  return Array.isArray(subject)
    ? subject
    : subject !== null && subject !== undefined
      ? [subject]
      : [];
}

function chainedProperty(subject, chainString) {
  if (chainString === undefined) {
    return subject;
  }

  const chain = chainString.split(".");
  const count = chain.length;

  let property = subject;
  for (let index = 0; index < count; index++) {
    property = property[chain[index]];
    if (property === null || property === undefined) {
      break;
    }
  }

  return property;
}

const { parse } = require("acorn");

const expressionStatement = node => node.type === "ExpressionStatement";

function firstExpressionStatement(node) {
  return toArray(node).filter(expressionStatement)[0];
}

function getIIFECallee(code) {
  const node = parse(code);
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
  const iifeCalleeExpression = getIIFECallee(code);

  if (iifeCalleeExpression === undefined) {
    throw new Error("Could not find IIFE callee expression");
  }

  const alternateExpression = getExpressionLastAlternate(iifeCalleeExpression);

  if (alternateExpression === undefined) {
    throw new Error("Could not find last alternate to condition expression");
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

function globalUMD() {
  return {
    name: "custom-umd",
    renderChunk: function(code, chunk, outputOptions) {
      return outputOptions.format === "umd" && chunk.isEntry
        ? transform(code)
        : null;
    }
  };
}

export default globalUMD;
