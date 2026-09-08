// This file is the only place that knows both <employee-form> and
// <employee-list> exist. Neither component imports or references the
// other — they only emit events (save-employee, edit-employee,
// delete-employee) and accept plain data through their own properties.
// This file's job is entirely to hold the shared employee list and pass
// data + events between the two.
import './styles/global.css'
import './components/employee-form/employee-form.ts'
import './components/employee-list/employee-list.ts'
import type { Employee } from './types/employee.types.ts'
import { getCustomEventDetail } from './utils/dom.ts'
import { loadStoredEmployees, saveStoredEmployees } from './utils/employeeStorage.ts'

const logPrefix = '[main]'

function getRequiredElement<TagName extends keyof HTMLElementTagNameMap>(
  tagName: TagName,
): HTMLElementTagNameMap[TagName] {
  const element = document.querySelector(tagName)
  if (element === null) {
    throw new Error(`${logPrefix} expected a <${tagName}> element in the page`)
  }
  return element
}

const employeeFormElement = getRequiredElement('employee-form')
const employeeListElement = getRequiredElement('employee-list')

// Restore whatever was saved from a previous visit, so a page reload
// doesn't wipe out the employee list.
let employees: Employee[] = loadStoredEmployees()

function updateEmployeeListElement(): void {
  employeeListElement.employees = employees
  saveStoredEmployees(employees)
}

// Render whatever was loaded from storage immediately, without waiting
// for a save/edit/delete event to trigger the first render.
updateEmployeeListElement()

employeeFormElement.addEventListener('save-employee', (event: Event): void => {
  const employeeToSave = getCustomEventDetail<Employee>(event)
  const existingEmployeeIndex = employees.findIndex(
    (employee) => employee.id === employeeToSave.id,
  )

  employees =
    existingEmployeeIndex >= 0
      ? [
          ...employees.slice(0, existingEmployeeIndex),
          employeeToSave,
          ...employees.slice(existingEmployeeIndex + 1),
        ]
      : [...employees, employeeToSave]

  console.log(`${logPrefix} employee list is now`, employees)
  updateEmployeeListElement()
})

employeeListElement.addEventListener('edit-employee', (event: Event): void => {
  const employeeToEdit = getCustomEventDetail<Employee>(event)
  employeeFormElement.employee = employeeToEdit
})

employeeListElement.addEventListener(
  'delete-employee',
  (event: Event): void => {
    const employeeIdToDelete = getCustomEventDetail<string>(event)
    employees = employees.filter(
      (employee) => employee.id !== employeeIdToDelete,
    )
    updateEmployeeListElement()

    // If the row being deleted is the one currently loaded into the form,
    // the form would otherwise keep showing data for an employee that no
    // longer exists — clearing it avoids saving a "resurrected" record.
    if (employeeFormElement.employee?.id === employeeIdToDelete) {
      employeeFormElement.employee = null
    }
  },
)
