import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import '../employee-form/employee-form.ts'
import '../employee-list/employee-list.ts'
import { brandTheme } from '../../styles/brand-theme.ts'
import type { Employee } from '../../types/employee.types.ts'
import type { EmployeeForm } from '../employee-form/employee-form.ts'
import type { EmployeeList } from '../employee-list/employee-list.ts'
import { getCustomEventDetail } from '../../utils/dom.ts'
import {
  loadStoredEmployees,
  saveStoredEmployees,
} from '../../utils/employeeStorage.ts'

const logPrefix = '[employee-widget]'

/**
 * All the interaction logic between <employee-form> and <employee-list>
 * lives here, and only here: this component renders both directly in its
 * own template, holds the shared employee list, and connects the two by
 * listening for their bubbled, composed custom events
 * (save-employee / edit-employee / delete-employee). Neither widget knows
 * this element exists — they only fire events and accept data through
 * their own properties.
 *
 * Usage: <employee-widget></employee-widget> — no children needed, it
 * creates and wires up both widgets itself. app-shell.ts just renders
 * this one tag and otherwise carries no employee-specific logic at all.
 */
@customElement('employee-widget')
export class EmployeeWidget extends LitElement {
  static styles = [
    brandTheme,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--brand-spacing-large, 24px);
      }
    `,
  ]

  @query('employee-form')
  private employeeFormElement!: EmployeeForm

  @query('employee-list')
  private employeeListElement!: EmployeeList

  // Plain field, not @state() — this component's own render() never reads
  // it (the template is fixed: one form, one list); the data flows out to
  // <employee-list>'s own `.employees` property instead, so there's
  // nothing here for Lit's reactivity to re-render.
  private employees: Employee[] = loadStoredEmployees()

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('save-employee', this.handleSaveEmployee)
    this.addEventListener('edit-employee', this.handleEditEmployee)
    this.addEventListener('delete-employee', this.handleDeleteEmployee)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('save-employee', this.handleSaveEmployee)
    this.removeEventListener('edit-employee', this.handleEditEmployee)
    this.removeEventListener('delete-employee', this.handleDeleteEmployee)
  }

  firstUpdated(): void {
    // @query-resolved elements only exist once this component's own first
    // render has happened. Render whatever was loaded from storage
    // immediately, without waiting for a save/edit/delete event.
    this.updateEmployeeListElement()
  }

  private updateEmployeeListElement(): void {
    this.employeeListElement.employees = this.employees
    saveStoredEmployees(this.employees)
  }

  private handleSaveEmployee = (event: Event): void => {
    const employeeToSave = getCustomEventDetail<Employee>(event)
    const existingEmployeeIndex = this.employees.findIndex(
      (employee) => employee.id === employeeToSave.id,
    )

    // A brand-new employee goes to the front, so the most recently added
    // entry is the first thing visible. An edit keeps its existing
    // position instead of jumping to the top just because a field changed.
    this.employees =
      existingEmployeeIndex >= 0
        ? [
            ...this.employees.slice(0, existingEmployeeIndex),
            employeeToSave,
            ...this.employees.slice(existingEmployeeIndex + 1),
          ]
        : [employeeToSave, ...this.employees]

    console.log(`${logPrefix} employee list is now`, this.employees)
    this.updateEmployeeListElement()
  }

  private handleEditEmployee = (event: Event): void => {
    const employeeToEdit = getCustomEventDetail<Employee>(event)
    this.employeeFormElement.employee = employeeToEdit
  }

  private handleDeleteEmployee = (event: Event): void => {
    const employeeIdToDelete = getCustomEventDetail<string>(event)
    this.employees = this.employees.filter(
      (employee) => employee.id !== employeeIdToDelete,
    )
    this.updateEmployeeListElement()

    // If the row being deleted is the one currently loaded into the form,
    // the form would otherwise keep showing data for an employee that no
    // longer exists — clearing it avoids saving a "resurrected" record.
    if (this.employeeFormElement.employee?.id === employeeIdToDelete) {
      this.employeeFormElement.employee = null
    }
  }

  render(): TemplateResult {
    return html`
      <employee-form></employee-form>
      <employee-list></employee-list>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-widget': EmployeeWidget
  }
}
