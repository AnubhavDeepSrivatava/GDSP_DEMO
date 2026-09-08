// Deliberately simple (not full RFC 5322): just enough to catch the common
// mistake of leaving out "@" or a domain, without rejecting valid addresses
// a stricter pattern might miss.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmailFormat(value: string): boolean {
  return emailPattern.test(value.trim())
}
