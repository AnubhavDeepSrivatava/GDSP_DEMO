import { css } from 'lit'

// Every color is a CSS custom property with a fallback value baked into
// each var() call, e.g. var(--color-primary, #2563eb). That means a page
// embedding this component can re-theme it just by setting these
// properties on the element from outside, and it still looks right even
// if the page never sets anything at all.
export const employeeFormStyles = css`
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
    --color-danger-border: #fca5a5;
    --color-required-marker: #dc2626;
    --color-success: #15803d;
    --color-success-background: #dcfce7;
    --color-success-border: #86efac;
    --color-text: #111827;
    --color-text-muted: #6b6375;
    --color-text-subtle: #9ca3af;
    --color-border: #e5e4e7;
    --color-input-border: #d8d7dc;
    --color-surface: #ffffff;
    --color-neutral: #e5e7eb;
    --color-neutral-hover: #d1d5db;

    --spacing-extra-small: 6px;
    --spacing-small: 10px;
    --spacing-medium: 16px;
    --spacing-large: 24px;

    --radius-small: 6px;
    --radius-medium: 10px;
  }

  .employee-form-layout {
    position: relative;
  }

  .employee-form-card {
    background: var(--color-surface, #ffffff);
    border: 1px solid var(--color-border, #e5e4e7);
    border-radius: var(--radius-medium, 10px);
    padding: var(--spacing-large, 24px);
  }

  .section-heading {
    margin: 0 0 var(--spacing-medium, 16px);
    font-size: 20px;
    color: var(--color-text, #111827);
  }

  .success-toast {
    position: absolute;
    top: var(--spacing-medium, 16px);
    right: var(--spacing-medium, 16px);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: var(--spacing-extra-small, 6px);
    padding: var(--spacing-small, 10px) var(--spacing-medium, 16px);
    background: var(--color-success-background, #dcfce7);
    color: var(--color-success, #15803d);
    border: 1px solid var(--color-success-border, #86efac);
    border-radius: var(--radius-small, 6px);
    font-size: 13px;
    box-shadow: 0 8px 20px rgba(17, 24, 39, 0.12);
    animation: employee-form-toast-in 0.2s ease-out;
  }

  .success-toast-icon {
    font-size: 14px;
    line-height: 1;
  }

  @keyframes employee-form-toast-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form-error-message {
    margin: 0 0 var(--spacing-medium, 16px);
    padding: var(--spacing-small, 10px) 14px;
    background: var(--color-danger-background, #fee2e2);
    color: var(--color-danger, #b91c1c);
    border: 1px solid var(--color-danger-border, #fca5a5);
    border-radius: var(--radius-small, 6px);
    font-size: 13px;
  }

  .required-marker {
    color: var(--color-required-marker, #dc2626);
  }

  /* Grid reflows the field count on its own as the container shrinks —
     no media-query breakpoints needed. */
  .employee-form-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--spacing-medium, 16px);
  }

  .employee-form-field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-extra-small, 6px);
    font-size: 13px;
    color: var(--color-text-muted, #6b6375);
  }

  .employee-form-field input {
    font: inherit;
    font-size: 14px;
    padding: var(--spacing-extra-small, 6px) var(--spacing-small, 10px);
    border: 1px solid var(--color-input-border, #d8d7dc);
    border-radius: var(--radius-small, 6px);
    outline: none;
    background: var(--color-surface, #ffffff);
    color: var(--color-text, #111827);
  }

  .employee-form-field input:focus-visible {
    border-color: var(--color-primary, #2563eb);
  }

  .employee-form-field input.field-invalid {
    border-color: var(--color-required-marker, #dc2626);
  }

  .field-hint {
    font-size: 12px;
    color: var(--color-text-subtle, #9ca3af);
  }

  .field-hint.field-hint-error {
    color: var(--color-required-marker, #dc2626);
  }

  .employee-form-actions {
    margin-top: var(--spacing-medium, 16px);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small, 10px);
  }

  button {
    font: inherit;
    font-size: 14px;
    border: none;
    border-radius: var(--radius-small, 6px);
    cursor: pointer;
  }

  .employee-form-actions button {
    padding: var(--spacing-extra-small, 6px) 20px;
  }

  .save-button {
    background: var(--color-primary, #2563eb);
    color: var(--color-surface, #ffffff);
  }

  .save-button:hover {
    background: var(--color-primary-hover, #1d4ed8);
  }

  .clear-button {
    background: var(--color-neutral, #e5e7eb);
    color: var(--color-text, #111827);
  }

  .clear-button:hover {
    background: var(--color-neutral-hover, #d1d5db);
  }
`
