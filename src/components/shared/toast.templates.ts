// Shared between employee-form (save/update) and employee-list (delete),
// so the same success-toast UI isn't built twice.
import { html, type TemplateResult } from 'lit'

export const successToastDurationMs = 3000

export function renderSuccessToast(message: string): TemplateResult {
  return html`
    <div class="success-toast" role="status" aria-live="polite">
      <span class="success-toast-icon" aria-hidden="true">✓</span>
      <span>${message}</span>
    </div>
  `
}
