// Deliberately simple (not full RFC 5322): just enough to catch the common
// mistake of leaving out "@" or a domain, without rejecting valid addresses
// a stricter pattern might miss.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmailFormat(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}
