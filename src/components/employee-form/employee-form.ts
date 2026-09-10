import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { successToastDurationMs } from '../shared/toast.templates.ts'
import type { Employee } from '../../types/employee.types.ts'
import { getInputElementValue } from '../../utils/dom.ts'
import { generateId } from '../../utils/id.ts'
import { isValidEmailFormat } from '../../utils/validation.ts'
import { employeeFormStyles } from './employee-form.styles.ts'
import { renderEmployeeFormView } from './employee-form.templates.ts'

const logPrefix = '[employee-form]'

/**
 * Standalone form component. It owns nothing about the employee list —
 * a parent page sets `.employee` to prefill it for editing, and listens
 * for the `save-employee` event to actually persist the result. See
 * the <app-shell> component (app-shell.ts) for how it's wired up to
 * <employee-list>.
 */
@customElement('employee-form')
export class EmployeeForm extends LitElement {
  static styles = employeeFormStyles

  @property({ type: Object })
  employee: Employee | null = null

  @state()
  private employeeNameInput = ''
  @state()
  private employeeDepartmentInput = ''
  @state()
  private employeeDesignationInput = ''
  @state()
  private employeeEmailInput = ''
  @state()
  private formErrorMessage = ''
  @state()
  private successToastMessage: string | null = null

  private successToastTimeoutId: ReturnType<typeof setTimeout> | null = null

  willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('employee')) {
      this.employeeNameInput = this.employee?.name ?? ''
      this.employeeDepartmentInput = this.employee?.department ?? ''
      this.employeeDesignationInput = this.employee?.designation ?? ''
      this.employeeEmailInput = this.employee?.email ?? ''
      this.formErrorMessage = ''
    }
  }

  private handleSaveButtonClick = (): void => {
    // Required-field check runs first so "Name and Email are required" wins
    // over a format complaint when both are actually missing.
    if (!this.employeeNameInput.trim() || !this.employeeEmailInput.trim()) {
      this.formErrorMessage = 'Name and Email are required.'
      console.warn(`${logPrefix} save blocked: missing required field(s)`)
      return
    }

    if (!isValidEmailFormat(this.employeeEmailInput)) {
      this.formErrorMessage = 'Enter a valid email address.'
      console.warn(`${logPrefix} save blocked: invalid email format`, {
        email: this.employeeEmailInput,
      })
      return
    }

    const isUpdatingExistingEmployee = this.employee !== null

    const employeeToSave: Employee = {
      id: this.employee?.id ?? generateId(),
      name: this.employeeNameInput.trim(),
      department: this.employeeDepartmentInput.trim(),
      designation: this.employeeDesignationInput.trim(),
      email: this.employeeEmailInput.trim(),
    }

    console.log(
      `${logPrefix} ${isUpdatingExistingEmployee ? 'updated' : 'added'} employee`,
      employeeToSave,
    )

    this.dispatchEvent(
      new CustomEvent<Employee>('save-employee', {
        detail: employeeToSave,
        bubbles: true,
        composed: true,
      }),
    )

    this.resetFormFields()
    this.showSuccessToast(
      isUpdatingExistingEmployee
        ? 'Employee updated successfully'
        : 'Employee added successfully',
    )
  }

  private resetFormFields(): void {
    this.employee = null
    this.employeeNameInput = ''
    this.employeeDepartmentInput = ''
    this.employeeDesignationInput = ''
    this.employeeEmailInput = ''
    this.formErrorMessage = ''
  }

  private handleClearButtonClick = (): void => {
    this.resetFormFields()
  }

  private showSuccessToast(message: string): void {
    this.successToastMessage = message
    // Clear any timer from a previous toast so a fast second save doesn't
    // get its toast cut short by the first one's timeout firing early.
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
    // Without this, a pending toast timeout fires after the element is gone
    // and writes to a @state property nothing is listening to any more.
    if (this.successToastTimeoutId !== null) {
      clearTimeout(this.successToastTimeoutId)
    }
  }

  private handleNameInput = (event: Event): void => {
    this.employeeNameInput = getInputElementValue(event)
    this.formErrorMessage = ''
  }

  private handleDepartmentInput = (event: Event): void => {
    this.employeeDepartmentInput = getInputElementValue(event)
  }

  private handleDesignationInput = (event: Event): void => {
    this.employeeDesignationInput = getInputElementValue(event)
  }

  private handleEmailInput = (event: Event): void => {
    this.employeeEmailInput = getInputElementValue(event)
    this.formErrorMessage = ''
  }

  render(): TemplateResult {
    return html`
      ${renderEmployeeFormView({
        nameValue: this.employeeNameInput,
        departmentValue: this.employeeDepartmentInput,
        designationValue: this.employeeDesignationInput,
        emailValue: this.employeeEmailInput,
        errorMessage: this.formErrorMessage,
        successMessage: this.successToastMessage,
        onNameInput: this.handleNameInput,
        onDepartmentInput: this.handleDepartmentInput,
        onDesignationInput: this.handleDesignationInput,
        onEmailInput: this.handleEmailInput,
        onSaveButtonClick: this.handleSaveButtonClick,
        onClearButtonClick: this.handleClearButtonClick,
      })}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-form': EmployeeForm
  }
}
