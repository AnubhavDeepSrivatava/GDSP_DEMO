import { css } from 'lit'
import { brandTheme } from '../../styles/brand-theme.ts'
import { toastStyles } from '../../styles/toast.styles.ts'

// Every color and font size is a CSS custom property with a fallback value
// baked into each var() call, e.g. var(--brand-color-primary, #2563eb).
// That means a page embedding this component can re-theme it just by
// setting these properties from outside, and it still looks right even if
// the page never sets anything at all. The tokens themselves live once, in
// brand-theme.ts, not copy-pasted into every component.
const employeeFormComponentStyles = css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    width: 100%;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    color: var(--brand-color-text, #111827);
  }

  .employee-form-layout {
    position: relative;
  }

  .employee-form-card {
    background: var(--brand-color-surface, #ffffff);
    border: 1px solid var(--brand-color-border, #e5e4e7);
    border-radius: var(--brand-radius-medium, 10px);
    padding: var(--brand-spacing-large, 24px);
  }

  .section-heading {
    margin: 0 0 var(--brand-spacing-medium, 16px);
    font-size: var(--brand-font-size-heading, 20px);
    color: var(--brand-color-text, #111827);
  }

  .form-error-message {
    margin: 0 0 var(--brand-spacing-medium, 16px);
    padding: var(--brand-spacing-small, 10px) 14px;
    background: var(--brand-color-danger-background, #fee2e2);
    color: var(--brand-color-danger, #b91c1c);
    border: 1px solid var(--brand-color-danger-border, #fca5a5);
    border-radius: var(--brand-radius-small, 6px);
    font-size: var(--brand-font-size-small, 13px);
  }

  .required-marker {
    color: var(--brand-color-warning, #dc2626);
  }

  /* Grid reflows the field count on its own as the container shrinks —
     no media-query breakpoints needed. */
  .employee-form-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--brand-spacing-medium, 16px);
  }

  .employee-form-field {
    display: flex;
    flex-direction: column;
    gap: var(--brand-spacing-extra-small, 6px);
    font-size: var(--brand-font-size-small, 13px);
    color: var(--brand-color-text-muted, #6b6375);
  }

  .employee-form-field input {
    font: inherit;
    font-size: var(--brand-font-size-body, 14px);
    padding: var(--brand-spacing-extra-small, 6px) var(--brand-spacing-small, 10px);
    border: 1px solid var(--brand-color-input-border, #d8d7dc);
    border-radius: var(--brand-radius-small, 6px);
    outline: none;
    background: var(--brand-color-surface, #ffffff);
    color: var(--brand-color-text, #111827);
  }

  .employee-form-field input:focus-visible {
    border-color: var(--brand-color-primary, #2563eb);
  }

  .employee-form-field input.field-invalid {
    border-color: var(--brand-color-warning, #dc2626);
  }

  .field-hint {
    font-size: var(--brand-font-size-caption, 11px);
    color: var(--brand-color-text-subtle, #9ca3af);
  }

  .field-hint.field-hint-error {
    color: var(--brand-color-warning, #dc2626);
  }

  .employee-form-actions {
    margin-top: var(--brand-spacing-medium, 16px);
    display: flex;
    flex-wrap: wrap;
    gap: var(--brand-spacing-small, 10px);
  }

  button {
    font: inherit;
    font-size: var(--brand-font-size-body, 14px);
    border: none;
    border-radius: var(--brand-radius-small, 6px);
    cursor: pointer;
  }

  .employee-form-actions button {
    padding: var(--brand-spacing-extra-small, 6px) 20px;
  }

  .save-button {
    background: var(--brand-color-primary, #2563eb);
    color: var(--brand-color-surface, #ffffff);
  }

  .save-button:hover {
    background: var(--brand-color-primary-hover, #1d4ed8);
  }

  .clear-button {
    background: var(--brand-color-neutral, #e5e7eb);
    color: var(--brand-color-text, #111827);
  }

  .clear-button:hover {
    background: var(--brand-color-neutral-hover, #d1d5db);
  }
`

export const employeeFormStyles = [
  brandTheme,
  toastStyles,
  employeeFormComponentStyles,
]
