import {
  LitElement,
  html,
  type PropertyValues,
  type TemplateResult,
} from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { successToastDurationMs } from '../shared/toast.templates.ts'
import type { Employee } from '../../types/employee.types.ts'
import { employeeListStyles } from './employee-list.styles.ts'
import { renderEmployeeListView } from './employee-list.templates.ts'

const logPrefix = '[employee-list]'
const rowsPerPage = 5

/**
 * Standalone list component. It owns nothing about the form — a parent
 * page sets `.employees` to show data, and listens for `edit-employee`
 * and `delete-employee` events to react to the buttons in each row. See
 * the <app-shell> component (app-shell.ts) for how it's wired up to
 * <employee-form>.
 *
 * Pagination and delete-confirmation are both display concerns of this
 * component alone: the parent always hands over the full list and only
 * finds out about a delete once it's actually confirmed.
 */
@customElement('employee-list')
export class EmployeeList extends LitElement {
  static styles = employeeListStyles

  @property({ type: Array })
  employees: Employee[] = []

  @state()
  private currentPageNumber = 1

  @state()
  private pendingDeleteEmployeeId: string | null = null

  @state()
  private successToastMessage: string | null = null

  private successToastTimeoutId: ReturnType<typeof setTimeout> | null = null

  willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('employees')) {
      const totalPageCount = this.getTotalPageCount()
      // If a delete (or a shorter restored list) leaves fewer pages than
      // where the user was, step back onto the last real page instead of
      // showing an empty one.
      if (this.currentPageNumber > totalPageCount) {
        this.currentPageNumber = totalPageCount
      }

      // If the row pending confirmation was removed some other way (e.g.
      // a fresh list handed down from the parent), don't leave a stale
      // "delete this employee?" prompt with nothing behind it.
      const pendingEmployeeStillExists = this.employees.some(
        (employee) => employee.id === this.pendingDeleteEmployeeId,
      )
      if (!pendingEmployeeStillExists) {
        this.pendingDeleteEmployeeId = null
      }
    }
  }

  private getTotalPageCount(): number {
    return Math.max(1, Math.ceil(this.employees.length / rowsPerPage))
  }

  private getVisibleEmployees(): Employee[] {
    const pageStartIndex = (this.currentPageNumber - 1) * rowsPerPage
    return this.employees.slice(pageStartIndex, pageStartIndex + rowsPerPage)
  }

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

  // Clicking Delete doesn't delete anything yet — it just asks the row to
  // switch into "are you sure?" mode.
  private handleDeleteButtonClick = (employeeId: string): void => {
    this.pendingDeleteEmployeeId = employeeId
  }

  private handleCancelDeleteButtonClick = (): void => {
    this.pendingDeleteEmployeeId = null
  }

  private handleConfirmDeleteButtonClick = (employeeId: string): void => {
    console.log(`${logPrefix} deleting employee`, { id: employeeId })
    this.dispatchEvent(
      new CustomEvent<string>('delete-employee', {
        detail: employeeId,
        bubbles: true,
        composed: true,
      }),
    )
    this.pendingDeleteEmployeeId = null
    this.showSuccessToast('Employee deleted successfully')
  }

  private showSuccessToast(message: string): void {
    this.successToastMessage = message
    // Clear any timer from a previous toast so a fast second delete
    // doesn't get its toast cut short by the first one's timeout firing.
    if (this.successToastTimeoutId !== null) {
      clearTimeout(this.successToastTimeoutId)
    }
    this.successToastTimeoutId = setTimeout(() => {
      this.successToastMessage = null
      this.successToastTimeoutId = null
    }, successToastDurationMs)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    if (this.successToastTimeoutId !== null) {
      clearTimeout(this.successToastTimeoutId)
    }
  }

  private handlePreviousPageButtonClick = (): void => {
    this.currentPageNumber = Math.max(1, this.currentPageNumber - 1)
  }

  private handleNextPageButtonClick = (): void => {
    this.currentPageNumber = Math.min(
      this.getTotalPageCount(),
      this.currentPageNumber + 1,
    )
  }

  render(): TemplateResult {
    return html`
      ${renderEmployeeListView({
        employees: this.getVisibleEmployees(),
        currentPageNumber: this.currentPageNumber,
        totalPageCount: this.getTotalPageCount(),
        pendingDeleteEmployeeId: this.pendingDeleteEmployeeId,
        successMessage: this.successToastMessage,
        onEditButtonClick: this.handleEditButtonClick,
        onDeleteButtonClick: this.handleDeleteButtonClick,
        onConfirmDeleteButtonClick: this.handleConfirmDeleteButtonClick,
        onCancelDeleteButtonClick: this.handleCancelDeleteButtonClick,
        onPreviousPageButtonClick: this.handlePreviousPageButtonClick,
        onNextPageButtonClick: this.handleNextPageButtonClick,
      })}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-list': EmployeeList
  }
}
