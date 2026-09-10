import { css } from 'lit'
import { brandTheme } from '../../styles/brand-theme.ts'
import { toastStyles } from '../../styles/toast.styles.ts'

// Same theming pattern as employee-form: every color and font size is a
// CSS custom property with a fallback baked into the var() call, and the
// tokens themselves come from the shared brand-theme.ts rather than being
// redeclared here.
const employeeListComponentStyles = css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    width: 100%;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    color: var(--brand-color-text, #111827);
  }

  .employee-list-layout {
    position: relative;
  }

  .employee-list-card {
    background: var(--brand-color-surface, #ffffff);
    border: 1px solid var(--brand-color-border, #e5e4e7);
    border-radius: var(--brand-radius-medium, 10px);
    padding: var(--brand-spacing-large, 24px);
  }

  .section-heading {
    margin: 0 0 var(--brand-spacing-medium, 16px);
    font-size: var(--brand-font-size-subheading, 18px);
    color: var(--brand-color-text, #111827);
  }

  .empty-state-message {
    text-align: center;
    color: var(--brand-color-text-subtle, #9ca3af);
    padding: var(--brand-spacing-large, 24px);
    margin: 0;
  }

  /* Horizontal scroll is the escape hatch on a narrow host instead of a
     media-query breakpoint — the same way a real table would behave, since
     this is deliberately shaped like one (one header row, columns stay
     aligned down every data row) via CSS Grid rather than a <table> tag. */
  .employee-table {
    overflow-x: auto;
  }

  .employee-table-header,
  .employee-row {
    display: grid;
    grid-template-columns:
      minmax(120px, 1.4fr) minmax(100px, 1fr) minmax(120px, 1.2fr)
      minmax(160px, 1.6fr) minmax(140px, auto);
    align-items: center;
    gap: var(--brand-spacing-medium, 16px);
    padding: var(--brand-spacing-small, 10px) 0;
    border-bottom: 1px solid var(--brand-color-border, #e5e4e7);
  }

  .employee-table-header {
    font-size: var(--brand-font-size-caption, 11px);
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: var(--brand-color-text-subtle, #9ca3af);
  }

  .employee-row {
    font-size: var(--brand-font-size-body, 14px);
  }

  .employee-cell-value {
    color: var(--brand-color-text, #111827);
    overflow-wrap: anywhere;
  }

  .employee-cell-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: var(--brand-spacing-extra-small, 6px);
  }

  button {
    font: inherit;
    font-size: var(--brand-font-size-small, 13px);
    border: none;
    border-radius: var(--brand-radius-small, 6px);
    cursor: pointer;
    padding: 6px 14px;
  }

  .edit-button {
    background: var(--brand-color-primary, #2563eb);
    color: var(--brand-color-surface, #ffffff);
  }

  .edit-button:hover {
    background: var(--brand-color-primary-hover, #1d4ed8);
  }

  .delete-button {
    background: var(--brand-color-danger-background, #fee2e2);
    color: var(--brand-color-danger, #b91c1c);
  }

  .delete-button:hover {
    background: var(--brand-color-danger-background-hover, #fecaca);
  }

  .delete-confirm-message {
    font-size: var(--brand-font-size-small, 13px);
    color: var(--brand-color-text, #111827);
  }

  .confirm-delete-button {
    background: var(--brand-color-danger, #b91c1c);
    color: var(--brand-color-surface, #ffffff);
  }

  .confirm-delete-button:hover {
    background: var(--brand-color-danger-background-hover, #fecaca);
    color: var(--brand-color-danger, #b91c1c);
  }

  .cancel-delete-button {
    background: var(--brand-color-neutral, #e5e7eb);
    color: var(--brand-color-text, #111827);
  }

  .cancel-delete-button:hover {
    background: var(--brand-color-neutral-hover, #d1d5db);
  }

  .pagination-controls {
    margin-top: var(--brand-spacing-medium, 16px);
    padding-top: var(--brand-spacing-medium, 16px);
    border-top: 1px solid var(--brand-color-border, #e5e4e7);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--brand-spacing-medium, 16px);
  }

  .pagination-status {
    font-size: var(--brand-font-size-small, 13px);
    color: var(--brand-color-text-muted, #6b6375);
  }

  .pagination-button {
    background: var(--brand-color-neutral, #e5e7eb);
    color: var(--brand-color-text, #111827);
  }

  .pagination-button:hover:not(:disabled) {
    background: var(--brand-color-neutral-hover, #d1d5db);
  }

  .pagination-button:disabled {
    color: var(--brand-color-text-subtle, #9ca3af);
    cursor: not-allowed;
  }
`

export const employeeListStyles = [
  brandTheme,
  toastStyles,
  employeeListComponentStyles,
]
