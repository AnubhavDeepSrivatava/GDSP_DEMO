import { css } from 'lit'

// Single source of truth for design tokens, shared by every component via
// `static styles = [brandTheme, ...]`. Per the team's coding guideline:
// "Use variables from brand-theme.ts" instead of each component declaring
// its own copy of the same color/spacing values. Names are generic
// (--brand-color-danger, not --employee-form-red) so any component can
// reuse them, per "Theme Variable Naming".
export const brandTheme = css`
  :host {
    --brand-color-primary: #7c3aed;
    --brand-color-primary-hover: #6d28d9;
    --brand-color-danger: #b91c1c;
    --brand-color-danger-background: #fee2e2;
    --brand-color-danger-background-hover: #fecaca;
    --brand-color-danger-border: #fca5a5;
    --brand-color-warning: #dc2626;
    --brand-color-success: #15803d;
    --brand-color-success-background: #dcfce7;
    --brand-color-success-border: #86efac;
    --brand-color-text: #111827;
    --brand-color-text-muted: #6b6375;
    --brand-color-text-subtle: #9ca3af;
    --brand-color-border: #e5e4e7;
    --brand-color-input-border: #d8d7dc;
    --brand-color-surface: #ffffff;
    --brand-color-neutral: #e5e7eb;
    --brand-color-neutral-hover: #d1d5db;

    /* The banner's gradient end color — the start intentionally matches
       --brand-color-primary above, so the banner and the buttons read as
       one consistent accent, fading to pink for extra flair on the
       banner specifically. */
    --brand-color-accent-gradient-start: #7c3aed;
    --brand-color-accent-gradient-end: #db2777;

    --brand-spacing-extra-small: 6px;
    --brand-spacing-small: 10px;
    --brand-spacing-medium: 16px;
    --brand-spacing-large: 24px;

    --brand-radius-small: 6px;
    --brand-radius-medium: 10px;

    --brand-font-size-caption: 11px;
    --brand-font-size-small: 13px;
    --brand-font-size-body: 14px;
    --brand-font-size-subheading: 18px;
    --brand-font-size-heading: 20px;
  }
`
