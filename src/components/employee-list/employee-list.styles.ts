import { css } from 'lit'
import { brandTheme } from '../../styles/brand-theme.ts'

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

  .employee-list {
    display: flex;
    flex-direction: column;
    gap: var(--brand-spacing-extra-small, 6px);
  }

  /* Each row wraps its own cells with flexbox — on a narrow host, cells
     drop to new lines instead of the row needing a media-query breakpoint. */
  .employee-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--brand-spacing-medium, 16px);
    padding: var(--brand-spacing-small, 10px) 0;
    border-bottom: 1px solid var(--brand-color-border, #e5e4e7);
  }

  .employee-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 140px;
    min-width: 120px;
    font-size: var(--brand-font-size-body, 14px);
  }

  .employee-cell-label {
    font-size: var(--brand-font-size-caption, 11px);
    text-transform: uppercase;
    letter-spacing: 0.3px;
    color: var(--brand-color-text-subtle, #9ca3af);
  }

  .employee-cell-value {
    color: var(--brand-color-text, #111827);
  }

  .employee-cell-actions {
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    gap: var(--brand-spacing-extra-small, 6px);
    margin-left: auto;
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
`

export const employeeListStyles = [brandTheme, employeeListComponentStyles]
