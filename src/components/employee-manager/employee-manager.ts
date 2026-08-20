import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import type { Employee } from '../../types/employee.types.ts'
import { generateId } from '../../utils/id.ts'

@customElement('employee-manager')
export class EmployeeManager extends LitElement {
  @state()
  private _employees: Employee[] = []

  @state()
  private _editingId: string | null = null

  @state()
  private _name = ''
  @state()
  private _department = ''
  @state()
  private _designation = ''
  @state()
  private _email = ''
  @state()
  private _error = ''

  private _onSave() {
    if (!this._name.trim() || !this._email.trim()) {
      this._error = 'Name and Email are required.'
      return
    }

    const detail: Employee = {
      id: this._editingId ?? generateId(),
      name: this._name.trim(),
      department: this._department.trim(),
      designation: this._designation.trim(),
      email: this._email.trim(),
    }

    const idx = this._employees.findIndex((emp) => emp.id === detail.id)
    this._employees =
      idx >= 0
        ? [
            ...this._employees.slice(0, idx),
            detail,
            ...this._employees.slice(idx + 1),
          ]
        : [...this._employees, detail]

    this._resetForm()
  }

  private _resetForm() {
    this._editingId = null
    this._name = ''
    this._department = ''
    this._designation = ''
    this._email = ''
    this._error = ''
  }

  private _onClear() {
    this._resetForm()
  }

  private _onEdit(emp: Employee) {
    this._editingId = emp.id
    this._name = emp.name
    this._department = emp.department
    this._designation = emp.designation
    this._email = emp.email
    this._error = ''
  }

  private _onDelete(id: string) {
    this._employees = this._employees.filter((emp) => emp.id !== id)
    if (this._editingId === id) {
      this._resetForm()
    }
  }

  render() {
    const nameInvalid = Boolean(this._error) && !this._name.trim()
    const emailInvalid = Boolean(this._error) && !this._email.trim()

    return html`
      <div class="wrapper">
        <section class="card">
          <h2>Employee Management</h2>
          ${this._error
            ? html`<p class="error" role="alert">${this._error}</p>`
            : ''}
          <div class="fields">
            <label>
              <span>Name <span class="required">*</span></span>
              <input
                type="text"
                placeholder="Enter name"
                class=${classMap({ invalid: nameInvalid })}
                aria-invalid=${nameInvalid}
                .value=${this._name}
                @input=${(e: Event) => {
                  this._name = (e.target as HTMLInputElement).value
                  this._error = ''
                }}
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
              <span>Email <span class="required">*</span></span>
              <input
                type="email"
                placeholder="Enter email"
                class=${classMap({ invalid: emailInvalid })}
                aria-invalid=${emailInvalid}
                .value=${this._email}
                @input=${(e: Event) => {
                  this._email = (e.target as HTMLInputElement).value
                  this._error = ''
                }}
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
        </section>

        <section class="card">
          <h3>Employee List</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this._employees.length === 0
                ? html`<tr>
                    <td class="empty" colspan="5">No employees yet</td>
                  </tr>`
                : this._employees.map(
                    (emp) => html`
                      <tr>
                        <td data-label="Name">${emp.name}</td>
                        <td data-label="Department">${emp.department}</td>
                        <td data-label="Designation">
                          ${emp.designation}
                        </td>
                        <td data-label="Email">${emp.email}</td>
                        <td class="row-actions" data-label="Actions">
                          <button
                            type="button"
                            class="edit"
                            @click=${() => this._onEdit(emp)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="delete"
                            @click=${() => this._onDelete(emp.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    `,
                  )}
            </tbody>
          </table>
        </section>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
      color-scheme: light;
      font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
      color: #111827;
    }

    .wrapper {
      max-width: 960px;
      margin: 40px auto;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .card {
      background: #fff;
      border: 1px solid #e5e4e7;
      border-radius: 10px;
      padding: 24px;
    }

    h2 {
      margin: 0 0 20px;
      font-size: 20px;
      color: #111827;
    }

    h3 {
      margin: 0 0 16px;
      font-size: 18px;
      color: #111827;
    }

    .error {
      margin: 0 0 16px;
      padding: 10px 14px;
      background: #fee2e2;
      color: #b91c1c;
      border: 1px solid #fca5a5;
      border-radius: 6px;
      font-size: 13px;
    }

    .required {
      color: #dc2626;
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

    input.invalid {
      border-color: #dc2626;
    }

    button {
      font: inherit;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .actions {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }

    .actions button {
      font-size: 14px;
      padding: 8px 20px;
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

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    th,
    td {
      text-align: left;
      padding: 10px 12px;
      border-bottom: 1px solid #e5e4e7;
      color: #111827;
    }

    th {
      color: #6b6375;
      font-weight: 500;
    }

    .empty {
      text-align: center;
      color: #9ca3af;
      padding: 24px;
    }

    .row-actions {
      display: flex;
      gap: 8px;
    }

    .row-actions button {
      font-size: 13px;
      padding: 6px 14px;
    }

    .edit {
      background: #2563eb;
      color: #fff;
    }

    .edit:hover {
      background: #1d4ed8;
    }

    .delete {
      background: #fee2e2;
      color: #b91c1c;
    }

    .delete:hover {
      background: #fecaca;
    }

    @media (max-width: 720px) {
      .fields {
        grid-template-columns: 1fr 1fr;
      }

      table,
      thead,
      tbody,
      th,
      td,
      tr {
        display: block;
      }

      thead {
        display: none;
      }

      tr {
        margin-bottom: 12px;
        border: 1px solid #e5e4e7;
        border-radius: 8px;
        padding: 8px;
      }

      td {
        border: none;
        padding: 6px 8px;
      }

      td::before {
        content: attr(data-label);
        display: block;
        font-size: 11px;
        color: #9ca3af;
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
    'employee-manager': EmployeeManager
  }
}
