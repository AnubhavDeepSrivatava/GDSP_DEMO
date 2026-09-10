import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../employee-form/employee-form.ts'
import '../employee-list/employee-list.ts'
import { brandTheme } from '../../styles/brand-theme.ts'
import type { Employee } from '../../types/employee.types.ts'
import type { EmployeeForm } from '../employee-form/employee-form.ts'
import type { EmployeeList } from '../employee-list/employee-list.ts'
import {
  getCustomEventDetail,
  getRequiredChildElement,
} from '../../utils/dom.ts'
import {
  loadStoredEmployees,
  saveStoredEmployees,
} from '../../utils/employeeStorage.ts'

const logPrefix = '[app-shell]'

/**
 * The shell: a real custom element that receives <employee-form> and
 * <employee-list> as slotted (light-DOM) children, and connects them by
 * listening for their bubbled, composed custom events
 * (save-employee / edit-employee / delete-employee). Neither widget knows
 * this element exists — they only fire events and accept data through
 * their own properties, exactly as before.
 *
 * Usage:
 *   <app-shell>
 *     <employee-form></employee-form>
 *     <employee-list></employee-list>
 *   </app-shell>
 *
 * Deliberately does NOT import styles/global.css: this component ships
 * inside the standalone widget bundle (widget-entry.ts), so anything it
 * pulled in would land on whatever page embeds it. global.css is this
 * app's own page-level styling (index.html), loaded separately there.
 */
const appShellComponentStyles = css`
  :host {
    display: block;
    /* Without an explicit width, this host (a direct flex child of a
       centering body) sizes to its content, leaving descendant grid
       columns with an indefinite container width — the same bug that
       previously collapsed the employee-form grid to a single column. */
    width: 100%;
  }

  .app-shell-layout {
    max-width: 960px;
    margin: 40px auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
  }

  .app-shell-banner {
    background: linear-gradient(
      135deg,
      var(--brand-color-accent-gradient-start, #7c3aed),
      var(--brand-color-accent-gradient-end, #db2777)
    );
    border-radius: var(--brand-radius-medium, 10px);
    padding: var(--brand-spacing-large, 24px);
    text-align: center;
    box-shadow: 0 10px 24px rgba(147, 51, 234, 0.3);
  }

  .app-shell-banner-title {
    margin: 0;
    color: var(--brand-color-surface, #ffffff);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }
`

@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = [brandTheme, appShellComponentStyles]

  // Plain field, not @state() — app-shell's own render() never reads this
  // (it only renders a <slot>); the data flows out to <employee-list>'s
  // own `.employees` property instead, so there's nothing here for Lit's
  // reactivity to re-render.
  private employees: Employee[] = loadStoredEmployees()

  private employeeFormElement!: EmployeeForm
  private employeeListElement!: EmployeeList

  connectedCallback(): void {
    super.connectedCallback()

    this.employeeFormElement = getRequiredChildElement(this, 'employee-form')
    this.employeeListElement = getRequiredChildElement(this, 'employee-list')

    this.addEventListener('save-employee', this.handleSaveEmployee)
    this.addEventListener('edit-employee', this.handleEditEmployee)
    this.addEventListener('delete-employee', this.handleDeleteEmployee)

    // Render whatever was loaded from storage immediately, without
    // waiting for a save/edit/delete event to trigger the first render.
    this.updateEmployeeListElement()
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('save-employee', this.handleSaveEmployee)
    this.removeEventListener('edit-employee', this.handleEditEmployee)
    this.removeEventListener('delete-employee', this.handleDeleteEmployee)
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
      <div class="app-shell-layout">
        <div class="app-shell-banner">
          <h1 class="app-shell-banner-title">Employee Management</h1>
        </div>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-shell': AppShell
  }
}
