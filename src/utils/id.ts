// Wrapped instead of calling crypto.randomUUID() inline, so every id in the
// app comes from one place if the generation strategy ever needs to change.
export function generateId(): string {
  return crypto.randomUUID()
}
