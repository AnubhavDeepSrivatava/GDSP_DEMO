// Pure render functions, same pattern as employee-form.templates.ts: plain
// data in, HTML out, no access to component state.
import { html, type TemplateResult } from 'lit'
import type { Employee } from '../../types/employee.types.ts'

export interface EmployeeListViewModel {
  employees: Employee[]
  onEditButtonClick: (employee: Employee) => void
  onDeleteButtonClick: (employeeId: string) => void
}

export function renderEmployeeListView(
  viewModel: EmployeeListViewModel,
): TemplateResult {
  return html`
    <section class="employee-list-card">
      <h3 class="section-heading">Employee List</h3>
      ${viewModel.employees.length === 0
        ? html`<p class="empty-state-message">No employees yet</p>`
        : html`<div class="employee-list" role="list">
            ${viewModel.employees.map((employee) =>
              renderEmployeeRow(employee, viewModel),
            )}
          </div>`}
    </section>
  `
}

function renderEmployeeRow(
  employee: Employee,
  viewModel: EmployeeListViewModel,
): TemplateResult {
  return html`
    <div class="employee-row" role="listitem">
      <div class="employee-cell">
        <span class="employee-cell-label">Name</span>
        <span class="employee-cell-value">${employee.name}</span>
      </div>
      <div class="employee-cell">
        <span class="employee-cell-label">Department</span>
        <span class="employee-cell-value">${employee.department}</span>
      </div>
      <div class="employee-cell">
        <span class="employee-cell-label">Designation</span>
        <span class="employee-cell-value">${employee.designation}</span>
      </div>
      <div class="employee-cell">
        <span class="employee-cell-label">Email</span>
        <span class="employee-cell-value">${employee.email}</span>
      </div>
      <div class="employee-cell employee-cell-actions">
        <button
          type="button"
          class="edit-button"
          @click=${() => viewModel.onEditButtonClick(employee)}
        >
          Edit
        </button>
        <button
          type="button"
          class="delete-button"
          @click=${() => viewModel.onDeleteButtonClick(employee.id)}
        >
          Delete
        </button>
      </div>
    </div>
  `
}
