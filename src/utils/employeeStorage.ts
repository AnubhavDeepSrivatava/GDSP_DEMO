import type { Employee } from '../types/employee.types.ts'

const employeesStorageKey = 'employee-manager:employees'
const logPrefix = '[employeeStorage]'

// localStorage can fail (private browsing, storage disabled, quota
// exceeded, corrupted JSON from an older version of this app) — every
// call is wrapped so a storage problem never crashes the app, it just
// falls back to an empty/unsaved state.

export function loadStoredEmployees(): Employee[] {
  try {
    const rawValue = localStorage.getItem(employeesStorageKey)
    if (rawValue === null) {
      return []
    }
    const parsedValue: unknown = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? (parsedValue as Employee[]) : []
  } catch (error) {
    console.warn(`${logPrefix} failed to read stored employees`, error)
    return []
  }
}

export function saveStoredEmployees(employees: Employee[]): void {
  try {
    localStorage.setItem(employeesStorageKey, JSON.stringify(employees))
  } catch (error) {
    console.warn(`${logPrefix} failed to save employees`, error)
  }
}
