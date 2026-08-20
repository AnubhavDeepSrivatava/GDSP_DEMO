import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { Employee } from './employee.types.ts'

@customElement('employee-form')
export class EmployeeForm extends LitElement {
  @property({ type: Object })
  employee: Employee | null = null

  @state()
  private _name = ''
  @state()
  private _department = ''
  @state()
  private _designation = ''
  @state()
  private _email = ''

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('employee')) {
      this._name = this.employee?.name ?? ''
      this._department = this.employee?.department ?? ''
      this._designation = this.employee?.designation ?? ''
      this._email = this.employee?.email ?? ''
    }
  }

  private _onSave() {
    if (!this._name.trim() || !this._email.trim()) return

    const detail: Employee = {
      id: this.employee?.id ?? crypto.randomUUID(),
      name: this._name.trim(),
      department: this._department.trim(),
      designation: this._designation.trim(),
      email: this._email.trim(),
    }

    this.dispatchEvent(
      new CustomEvent<Employee>('save-employee', {
        detail,
        bubbles: true,
        composed: true,
      }),
    )

    this._reset()
  }

  private _reset() {
    this._name = ''
    this._department = ''
    this._designation = ''
    this._email = ''
    this.employee = null
  }

  private _onClear() {
    this._reset()
    this.dispatchEvent(
      new CustomEvent('clear-employee', { bubbles: true, composed: true }),
    )
  }

  render() {
    return html`
      <h2>Employee Management</h2>
      <div class="fields">
        <label>
          Name
          <input
            type="text"
            placeholder="Enter name"
            .value=${this._name}
            @input=${(e: Event) =>
              (this._name = (e.target as HTMLInputElement).value)}
          />
        </label>
        <label>
          Department
          <input
            type="text"
            placeholder="Enter department"
            .value=${this._department}
            @input=${(e: Event) =>
              (this._department = (e.target as HTMLInputElement).value)}
          />
        </label>
        <label>
          Designation
          <input
            type="text"
            placeholder="Enter designation"
            .value=${this._designation}
            @input=${(e: Event) =>
              (this._designation = (e.target as HTMLInputElement).value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            placeholder="Enter email"
            .value=${this._email}
            @input=${(e: Event) =>
              (this._email = (e.target as HTMLInputElement).value)}
          />
        </label>
      </div>
      <div class="actions">
        <button type="button" class="save" @click=${this._onSave}>
          Save
        </button>
        <button type="button" class="clear" @click=${this._onClear}>
          Clear
        </button>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      color-scheme: light;
      font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
      background: #fff;
      color: #111827;
      border: 1px solid #e5e4e7;
      border-radius: 10px;
      padding: 24px;
    }

    h2 {
      margin: 0 0 20px;
      font-size: 20px;
      color: #111827;
    }

    .fields {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 13px;
      color: #6b6375;
    }

    input {
      font: inherit;
      font-size: 14px;
      padding: 8px 10px;
      border: 1px solid #d8d7dc;
      border-radius: 6px;
      outline: none;
      background: #fff;
      color: #111827;
    }

    input:focus-visible {
      border-color: #3b82f6;
    }

    .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }

    button {
      font: inherit;
      font-size: 14px;
      padding: 8px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }

    .save {
      background: #2563eb;
      color: #fff;
    }

    .save:hover {
      background: #1d4ed8;
    }

    .clear {
      background: #e5e7eb;
      color: #111827;
    }

    .clear:hover {
      background: #d1d5db;
    }

    @media (max-width: 720px) {
      .fields {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 480px) {
      .fields {
        grid-template-columns: 1fr;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-form': EmployeeForm
  }
}
