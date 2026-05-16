export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/g, '')
    .replace(/\s+/g, ' ')
}

export function answersMatch(
  userInput: string,
  expected: string | string[],
): boolean {
  const normalized = normalizeAnswer(userInput)
  const expectedList = Array.isArray(expected) ? expected : [expected]
  return expectedList.some((a) => normalizeAnswer(a) === normalized)
}
