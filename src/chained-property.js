export function chainedProperty(subject, chainString) {
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