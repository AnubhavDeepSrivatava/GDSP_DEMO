import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '../components/employee-form/employee-form.ts'
import '../components/employee-list/employee-list.ts'
import type { Employee } from '../types/employee.types.ts'

@customElement('employee-app')
export class EmployeeApp extends LitElement {
  @state()
  private _employees: Employee[] = []

  @state()
  private _editing: Employee | null = null

  private _onSave(e: CustomEvent<Employee>) {
    const emp = e.detail
    const idx = this._employees.findIndex((x) => x.id === emp.id)
    this._employees =
      idx >= 0
        ? [
            ...this._employees.slice(0, idx),
            emp,
            ...this._employees.slice(idx + 1),
          ]
        : [...this._employees, emp]
    this._editing = null
  }

  private _onClear() {
    this._editing = null
  }

  private _onEdit(e: CustomEvent<Employee>) {
    this._editing = e.detail
  }

  private _onDelete(e: CustomEvent<string>) {
    this._employees = this._employees.filter((emp) => emp.id !== e.detail)
  }

  render() {
    return html`
      <div class="wrapper">
        <employee-form
          .employee=${this._editing}
          @save-employee=${this._onSave}
          @clear-employee=${this._onClear}
        ></employee-form>
        <employee-list
          .employees=${this._employees}
          @edit-employee=${this._onEdit}
          @delete-employee=${this._onDelete}
        ></employee-list>
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }

    .wrapper {
      max-width: 960px;
      margin: 40px auto;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'employee-app': EmployeeApp
  }
}
