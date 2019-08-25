export function toArray(subject) {
  return Array.isArray(subject)
    ? subject
    : subject !== null && subject !== undefined
      ? [subject]
      : [];
}
