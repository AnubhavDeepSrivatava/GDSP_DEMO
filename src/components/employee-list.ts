import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Employee } from './employee.types.ts'

@customElement('employee-list')
export class EmployeeList extends LitElement {
  @property({ type: Array })
  employees: Employee[] = []

  private _onEdit(emp: Employee) {
    this.dispatchEvent(
      new CustomEvent<Employee>('edit-employee', {
        detail: emp,
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _onDelete(id: string) {
    this.dispatchEvent(
      new CustomEvent<string>('delete-employee', {
        detail: id,
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
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
          ${this.employees.length === 0
            ? html`<tr>
                <td class="empty" colspan="5">No employees yet</td>
              </tr>`
            : this.employees.map(
                (emp) => html`
                  <tr>
                    <td data-label="Name">${emp.name}</td>
                    <td data-label="Department">${emp.department}</td>
                    <td data-label="Designation">${emp.designation}</td>
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

    h3 {
      margin: 0 0 16px;
      font-size: 18px;
      color: #111827;
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

    button {
      font: inherit;
      font-size: 13px;
      padding: 6px 14px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
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
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-list': EmployeeList
  }
}
