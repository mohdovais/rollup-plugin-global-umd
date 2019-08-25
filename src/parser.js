import { toArray } from "./to-array";
import { chainedProperty } from "./chained-property";
const { parse } = require("acorn");

const expressionStatement = node => node.type === "ExpressionStatement";

function firstExpressionStatement(node) {
  return toArray(node).filter(expressionStatement)[0];
}

export function getIIFECallee(code) {
  const node = parse(code);
  return firstExpressionStatement(
    chainedProperty(
      firstExpressionStatement(node.body),
      "expression.callee.body.body"
    )
  );
}

export function getExpressionLastAlternate(node) {
  return chainedProperty(node, "expression.alternate.alternate");
}
