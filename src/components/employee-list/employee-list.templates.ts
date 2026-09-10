// Pure render functions, same pattern as employee-form.templates.ts: plain
// data in, HTML out, no access to component state.
import { html, nothing, type TemplateResult } from 'lit'
import { renderSuccessToast } from '../shared/toast.templates.ts'
import type { Employee } from '../../types/employee.types.ts'

export interface EmployeeListViewModel {
  employees: Employee[]
  currentPageNumber: number
  totalPageCount: number
  pendingDeleteEmployeeId: string | null
  successMessage: string | null
  onEditButtonClick: (employee: Employee) => void
  onDeleteButtonClick: (employeeId: string) => void
  onConfirmDeleteButtonClick: (employeeId: string) => void
  onCancelDeleteButtonClick: () => void
  onPreviousPageButtonClick: () => void
  onNextPageButtonClick: () => void
}

export function renderEmployeeListView(
  viewModel: EmployeeListViewModel,
): TemplateResult {
  return html`
    <div class="employee-list-layout">
      ${viewModel.successMessage
        ? renderSuccessToast(viewModel.successMessage)
        : nothing}
      <section class="employee-list-card">
        <h3 class="section-heading">Employee List</h3>
        ${viewModel.employees.length === 0
          ? html`<p class="empty-state-message">No employees yet</p>`
          : html`<div class="employee-table" role="table">
              ${renderEmployeeTableHeader()}
              ${viewModel.employees.map((employee) =>
                renderEmployeeRow(employee, viewModel),
              )}
            </div>`}
        ${renderPaginationControls(viewModel)}
      </section>
    </div>
  `
}

function renderPaginationControls(
  viewModel: EmployeeListViewModel,
): TemplateResult {
  const isOnFirstPage = viewModel.currentPageNumber <= 1
  const isOnLastPage = viewModel.currentPageNumber >= viewModel.totalPageCount

  return html`
    <div class="pagination-controls">
      <button
        type="button"
        class="pagination-button"
        ?disabled=${isOnFirstPage}
        @click=${viewModel.onPreviousPageButtonClick}
      >
        Previous
      </button>
      <span class="pagination-status">
        Page ${viewModel.currentPageNumber} of ${viewModel.totalPageCount}
      </span>
      <button
        type="button"
        class="pagination-button"
        ?disabled=${isOnLastPage}
        @click=${viewModel.onNextPageButtonClick}
      >
        Next
      </button>
    </div>
  `
}

function renderEmployeeTableHeader(): TemplateResult {
  return html`
    <div class="employee-table-header" role="row">
      <span role="columnheader">Name</span>
      <span role="columnheader">Department</span>
      <span role="columnheader">Designation</span>
      <span role="columnheader">Email</span>
      <span role="columnheader">Actions</span>
    </div>
  `
}

function renderEmployeeRow(
  employee: Employee,
  viewModel: EmployeeListViewModel,
): TemplateResult {
  const isConfirmingDeleteForThisRow =
    viewModel.pendingDeleteEmployeeId === employee.id

  return html`
    <div class="employee-row" role="row">
      <span class="employee-cell-value" role="cell">${employee.name}</span>
      <span class="employee-cell-value" role="cell"
        >${employee.department}</span
      >
      <span class="employee-cell-value" role="cell"
        >${employee.designation}</span
      >
      <span class="employee-cell-value" role="cell">${employee.email}</span>
      <span class="employee-cell-actions" role="cell">
        ${isConfirmingDeleteForThisRow
          ? renderDeleteConfirmation(employee, viewModel)
          : renderRowActionButtons(employee, viewModel)}
      </span>
    </div>
  `
}

function renderRowActionButtons(
  employee: Employee,
  viewModel: EmployeeListViewModel,
): TemplateResult {
  return html`
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
  `
}

function renderDeleteConfirmation(
  employee: Employee,
  viewModel: EmployeeListViewModel,
): TemplateResult {
  return html`
    <span class="delete-confirm-message">Delete this employee?</span>
    <button
      type="button"
      class="confirm-delete-button"
      @click=${() => viewModel.onConfirmDeleteButtonClick(employee.id)}
    >
      Yes, delete
    </button>
    <button
      type="button"
      class="cancel-delete-button"
      @click=${viewModel.onCancelDeleteButtonClick}
    >
      Cancel
    </button>
  `
}
