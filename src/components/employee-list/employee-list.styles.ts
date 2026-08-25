import { css } from 'lit'

// Same theming pattern as employee-form: every color is a CSS custom
// property with a fallback baked into the var() call, so this component
// can be re-themed from outside just by setting these properties, and
// still looks right if the host page never sets anything.
export const employeeListStyles = css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    width: 100%;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    color: var(--color-text, #111827);

    --color-primary: #2563eb;
    --color-primary-hover: #1d4ed8;
    --color-danger: #b91c1c;
    --color-danger-background: #fee2e2;
    --color-danger-background-hover: #fecaca;
    --color-text: #111827;
    --color-text-muted: #6b6375;
    --color-text-subtle: #9ca3af;
    --color-border: #e5e4e7;
    --color-surface: #ffffff;

    --spacing-extra-small: 6px;
    --spacing-small: 10px;
    --spacing-medium: 16px;
    --spacing-large: 24px;

    --radius-small: 6px;
    --radius-medium: 10px;
  }

  .employee-list-card {
    background: var(--color-surface, #ffffff);
    border: 1px solid var(--color-border, #e5e4e7);
    border-radius: var(--radius-medium, 10px);
    padding: var(--spacing-large, 24px);
  }

  .section-heading {
    margin: 0 0 var(--spacing-medium, 16px);
    font-size: 18px;
    color: var(--color-text, #111827);
  }

  .empty-state-message {
    text-align: center;
    color: var(--color-text-subtle, #9ca3af);
    padding: var(--spacing-large, 24px);
    margin: 0;
  }

  .employee-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-extra-small, 6px);
  }

  /* Each row wraps its own cells with flexbox — on a narrow host, cells
     drop to new lines instead of the row needing a media-query breakpoint. */
  .employee-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-medium, 16px);
    padding: var(--spacing-small, 10px) 0;
    border-bottom: 1px solid var(--color-border, #e5e4e7);
  }

  .employee-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 140px;
    min-width: 120px;
    font-size: 14px;
  }

  .employee-cell-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--color-text-subtle, #9ca3af);
  }

  .employee-cell-value {
    color: var(--color-text, #111827);
  }

  .employee-cell-actions {
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-extra-small, 6px);
    margin-left: auto;
  }

  button {
    font: inherit;
    font-size: 13px;
    border: none;
    border-radius: var(--radius-small, 6px);
    cursor: pointer;
    padding: 6px 14px;
  }

  .edit-button {
    background: var(--color-primary, #2563eb);
    color: var(--color-surface, #ffffff);
  }

  .edit-button:hover {
    background: var(--color-primary-hover, #1d4ed8);
  }

  .delete-button {
    background: var(--color-danger-background, #fee2e2);
    color: var(--color-danger, #b91c1c);
  }

  .delete-button:hover {
    background: var(--color-danger-background-hover, #fecaca);
  }
`
