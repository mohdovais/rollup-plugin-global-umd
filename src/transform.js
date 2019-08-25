import { getIIFECallee, getExpressionLastAlternate } from "./parser";

export function transform(code) {
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
