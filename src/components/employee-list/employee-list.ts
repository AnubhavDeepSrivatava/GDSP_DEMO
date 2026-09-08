import { LitElement, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Employee } from '../../types/employee.types.ts'
import { employeeListStyles } from './employee-list.styles.ts'
import { renderEmployeeListView } from './employee-list.templates.ts'

const logPrefix = '[employee-list]'

/**
 * Standalone list component. It owns nothing about the form — a parent
 * page sets `.employees` to show data, and listens for `edit-employee`
 * and `delete-employee` events to react to the buttons in each row. See
 * main.ts for how it's wired up to <employee-form>.
 */
@customElement('employee-list')
export class EmployeeList extends LitElement {
  static styles = employeeListStyles

  @property({ type: Array })
  employees: Employee[] = []

  private handleEditButtonClick = (employee: Employee): void => {
    console.log(`${logPrefix} editing employee`, employee)
    this.dispatchEvent(
      new CustomEvent<Employee>('edit-employee', {
        detail: employee,
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleDeleteButtonClick = (employeeId: string): void => {
    console.log(`${logPrefix} deleting employee`, { id: employeeId })
    this.dispatchEvent(
      new CustomEvent<string>('delete-employee', {
        detail: employeeId,
        bubbles: true,
        composed: true,
      }),
    )
  }

  render(): TemplateResult {
    return html`
      ${renderEmployeeListView({
        employees: this.employees,
        onEditButtonClick: this.handleEditButtonClick,
        onDeleteButtonClick: this.handleDeleteButtonClick,
      })}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-list': EmployeeList
  }
}
