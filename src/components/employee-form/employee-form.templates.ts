// Pure render functions: each one takes a plain "view model" object and
// returns a template, with no access to component state or `this`. Keeping
// them here (separate from employee-form.ts) means the markup can be read
// and changed without touching the state/event-handling logic.
import { html, nothing, type TemplateResult } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { isValidEmailFormat } from '../../utils/validation.ts'

export interface EmployeeFormViewModel {
  nameValue: string
  departmentValue: string
  designationValue: string
  emailValue: string
  errorMessage: string
  successMessage: string | null
  onNameInput: (event: Event) => void
  onDepartmentInput: (event: Event) => void
  onDesignationInput: (event: Event) => void
  onEmailInput: (event: Event) => void
  onSaveButtonClick: () => void
  onClearButtonClick: () => void
}

function renderFieldHint(isInvalid: boolean, message: string): TemplateResult {
  return html`<span
    class=${classMap({ 'field-hint': true, 'field-hint-error': isInvalid })}
  >
    ${message}
  </span>`
}

function renderSuccessToast(message: string): TemplateResult {
  return html`
    <div class="success-toast" role="status" aria-live="polite">
      <span class="success-toast-icon" aria-hidden="true">✓</span>
      <span>${message}</span>
    </div>
  `
}

// A plain if/else chain instead of a nested ternary — the coding guideline
// explicitly calls out nested ternaries as something to avoid, since they
// read left-to-right but branch in a different order than they display.
function getEmailHintMessage(
  isEmailFieldInvalid: boolean,
  isEmailFormatInvalid: boolean,
): string {
  if (!isEmailFieldInvalid) {
    return 'e.g. name@example.com'
  }
  if (isEmailFormatInvalid) {
    return 'Enter a valid email address, e.g. name@example.com'
  }
  return 'Email is required'
}

export function renderEmployeeFormView(
  viewModel: EmployeeFormViewModel,
): TemplateResult {
  // "Required" errors only show once errorMessage is set (i.e. after a
  // failed Save attempt) — so the form doesn't greet an empty field with
  // red text before the user has done anything.
  const isNameFieldEmpty = !viewModel.nameValue.trim()
  const isNameFieldInvalid = Boolean(viewModel.errorMessage) && isNameFieldEmpty

  // Format checking, by contrast, runs live on every keystroke — it isn't
  // gated behind errorMessage, so typing an invalid email flags it
  // immediately instead of waiting for a Save click.
  const isEmailFieldEmpty = !viewModel.emailValue.trim()
  const isEmailFormatInvalid =
    !isEmailFieldEmpty && !isValidEmailFormat(viewModel.emailValue)
  const isEmailFieldInvalid =
    (Boolean(viewModel.errorMessage) && isEmailFieldEmpty) ||
    isEmailFormatInvalid

  const nameHintMessage = isNameFieldInvalid
    ? 'Name is required'
    : "Employee's full name"
  const emailHintMessage = getEmailHintMessage(
    isEmailFieldInvalid,
    isEmailFormatInvalid,
  )

  return html`
    <div class="employee-form-layout">
      ${viewModel.successMessage
        ? renderSuccessToast(viewModel.successMessage)
        : nothing}
      <section class="employee-form-card">
        <h2 class="section-heading">Employee Form</h2>
        ${viewModel.errorMessage
          ? html`<p class="form-error-message" role="alert">
              ${viewModel.errorMessage}
            </p>`
          : nothing}
        <div class="employee-form-fields">
          <label class="employee-form-field">
            <span>Name <span class="required-marker">*</span></span>
            <input
              type="text"
              placeholder="Enter name"
              class=${classMap({ 'field-invalid': isNameFieldInvalid })}
              aria-invalid=${isNameFieldInvalid}
              .value=${viewModel.nameValue}
              @input=${viewModel.onNameInput}
            />
            ${renderFieldHint(isNameFieldInvalid, nameHintMessage)}
          </label>
          <label class="employee-form-field">
            Department
            <input
              type="text"
              placeholder="Enter department"
              .value=${viewModel.departmentValue}
              @input=${viewModel.onDepartmentInput}
            />
            ${renderFieldHint(false, 'e.g. Engineering, Sales, Finance')}
          </label>
          <label class="employee-form-field">
            Designation
            <input
              type="text"
              placeholder="Enter designation"
              .value=${viewModel.designationValue}
              @input=${viewModel.onDesignationInput}
            />
            ${renderFieldHint(false, 'e.g. Software Engineer, Manager')}
          </label>
          <label class="employee-form-field">
            <span>Email <span class="required-marker">*</span></span>
            <input
              type="email"
              placeholder="Enter email"
              class=${classMap({ 'field-invalid': isEmailFieldInvalid })}
              aria-invalid=${isEmailFieldInvalid}
              .value=${viewModel.emailValue}
              @input=${viewModel.onEmailInput}
            />
            ${renderFieldHint(isEmailFieldInvalid, emailHintMessage)}
          </label>
        </div>
        <div class="employee-form-actions">
          <button
            type="button"
            class="save-button"
            @click=${viewModel.onSaveButtonClick}
          >
            Save
          </button>
          <button
            type="button"
            class="clear-button"
            @click=${viewModel.onClearButtonClick}
          >
            Clear
          </button>
        </div>
      </section>
    </div>
  `
}
