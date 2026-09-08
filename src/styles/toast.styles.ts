import { css } from 'lit'

// Shared with the shared toast.templates.ts render function — included via
// `static styles = [brandTheme, toastStyles, ...]` by any component that
// shows a success toast, instead of each one declaring its own copy.
export const toastStyles = css`
  .success-toast {
    position: absolute;
    top: var(--brand-spacing-medium, 16px);
    right: var(--brand-spacing-medium, 16px);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: var(--brand-spacing-extra-small, 6px);
    padding: var(--brand-spacing-small, 10px) var(--brand-spacing-medium, 16px);
    background: var(--brand-color-success-background, #dcfce7);
    color: var(--brand-color-success, #15803d);
    border: 1px solid var(--brand-color-success-border, #86efac);
    border-radius: var(--brand-radius-small, 6px);
    font-size: var(--brand-font-size-small, 13px);
    box-shadow: 0 8px 20px rgba(17, 24, 39, 0.12);
    animation: shared-toast-in 0.2s ease-out;
  }

  .success-toast-icon {
    font-size: var(--brand-font-size-body, 14px);
    line-height: 1;
  }

  @keyframes shared-toast-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
