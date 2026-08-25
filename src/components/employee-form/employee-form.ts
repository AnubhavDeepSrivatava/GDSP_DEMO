import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { Employee } from '../../types/employee.types.ts'
import { generateId } from '../../utils/id.ts'
import { isValidEmailFormat } from '../../utils/validation.ts'
import { employeeFormStyles } from './employee-form.styles.ts'
import { renderEmployeeFormView } from './employee-form.templates.ts'

const SUCCESS_TOAST_DURATION_MS = 3000
const LOG_PREFIX = '[employee-form]'

/**
 * Standalone form component. It owns nothing about the employee list —
 * a parent page sets `.employee` to prefill it for editing, and listens
 * for the `save-employee` event to actually persist the result. See
 * main.ts for how it's wired up to <employee-list>.
 */
@customElement('employee-form')
export class EmployeeForm extends LitElement {
  static styles = employeeFormStyles

  @property({ type: Object })
  employee: Employee | null = null

  @state()
  private _employeeNameInput = ''
  @state()
  private _employeeDepartmentInput = ''
  @state()
  private _employeeDesignationInput = ''
  @state()
  private _employeeEmailInput = ''
  @state()
  private _formErrorMessage = ''
  @state()
  private _successToastMessage: string | null = null

  private _successToastTimeoutId: ReturnType<typeof setTimeout> | null = null

  willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('employee')) {
      this._employeeNameInput = this.employee?.name ?? ''
      this._employeeDepartmentInput = this.employee?.department ?? ''
      this._employeeDesignationInput = this.employee?.designation ?? ''
      this._employeeEmailInput = this.employee?.email ?? ''
      this._formErrorMessage = ''
    }
  }

  private _handleSaveButtonClick = () => {
    // Required-field check runs first so "Name and Email are required" wins
    // over a format complaint when both are actually missing.
    if (!this._employeeNameInput.trim() || !this._employeeEmailInput.trim()) {
      this._formErrorMessage = 'Name and Email are required.'
      console.warn(`${LOG_PREFIX} save blocked: missing required field(s)`)
      return
    }

    if (!isValidEmailFormat(this._employeeEmailInput)) {
      this._formErrorMessage = 'Enter a valid email address.'
      console.warn(`${LOG_PREFIX} save blocked: invalid email format`, {
        email: this._employeeEmailInput,
      })
      return
    }

    const isUpdatingExistingEmployee = this.employee !== null

    const employeeToSave: Employee = {
      id: this.employee?.id ?? generateId(),
      name: this._employeeNameInput.trim(),
      department: this._employeeDepartmentInput.trim(),
      designation: this._employeeDesignationInput.trim(),
      email: this._employeeEmailInput.trim(),
    }

    console.log(
      `${LOG_PREFIX} ${isUpdatingExistingEmployee ? 'updated' : 'added'} employee`,
      employeeToSave,
    )

    this.dispatchEvent(
      new CustomEvent<Employee>('save-employee', {
        detail: employeeToSave,
        bubbles: true,
        composed: true,
      }),
    )

    this._resetFormFields()
    this._showSuccessToast(
      isUpdatingExistingEmployee
        ? 'Employee updated successfully'
        : 'Employee added successfully',
    )
  }

  private _resetFormFields() {
    this.employee = null
    this._employeeNameInput = ''
    this._employeeDepartmentInput = ''
    this._employeeDesignationInput = ''
    this._employeeEmailInput = ''
    this._formErrorMessage = ''
  }

  private _handleClearButtonClick = () => {
    this._resetFormFields()
  }

  private _showSuccessToast(message: string) {
    this._successToastMessage = message
    // Clear any timer from a previous toast so a fast second save doesn't
    // get its toast cut short by the first one's timeout firing early.
    if (this._successToastTimeoutId !== null) {
      clearTimeout(this._successToastTimeoutId)
    }
    this._successToastTimeoutId = setTimeout(() => {
      this._successToastMessage = null
      this._successToastTimeoutId = null
    }, SUCCESS_TOAST_DURATION_MS)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    // Without this, a pending toast timeout fires after the element is gone
    // and writes to a @state property nothing is listening to any more.
    if (this._successToastTimeoutId !== null) {
      clearTimeout(this._successToastTimeoutId)
    }
  }

  private _handleNameInput = (event: Event) => {
    this._employeeNameInput = (event.target as HTMLInputElement).value
    this._formErrorMessage = ''
  }

  private _handleDepartmentInput = (event: Event) => {
    this._employeeDepartmentInput = (event.target as HTMLInputElement).value
  }

  private _handleDesignationInput = (event: Event) => {
    this._employeeDesignationInput = (event.target as HTMLInputElement).value
  }

  private _handleEmailInput = (event: Event) => {
    this._employeeEmailInput = (event.target as HTMLInputElement).value
    this._formErrorMessage = ''
  }

  render() {
    return html`
      ${renderEmployeeFormView({
        nameValue: this._employeeNameInput,
        departmentValue: this._employeeDepartmentInput,
        designationValue: this._employeeDesignationInput,
        emailValue: this._employeeEmailInput,
        errorMessage: this._formErrorMessage,
        successMessage: this._successToastMessage,
        onNameInput: this._handleNameInput,
        onDepartmentInput: this._handleDepartmentInput,
        onDesignationInput: this._handleDesignationInput,
        onEmailInput: this._handleEmailInput,
        onSaveButtonClick: this._handleSaveButtonClick,
        onClearButtonClick: this._handleClearButtonClick,
      })}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-form': EmployeeForm
  }
}
