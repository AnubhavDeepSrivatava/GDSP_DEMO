import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../employee-widget/employee-widget.ts'
import { brandTheme } from '../../styles/brand-theme.ts'

/**
 * The shell: page-level chrome only — a banner and a layout container.
 * All the employee-specific interaction logic lives in <employee-widget>
 * (see employee-widget.ts), not here. This component doesn't know how
 * <employee-form> and <employee-list> talk to each other, and doesn't
 * need to — it just renders the one widget tag.
 *
 * Usage: <app-shell></app-shell> — no children needed.
 *
 * Deliberately does NOT import styles/global.css: this component ships
 * inside the standalone widget bundle (widget-entry.ts), so anything it
 * pulled in would land on whatever page embeds it. global.css is this
 * app's own page-level styling (index.html), loaded separately there.
 */
const appShellComponentStyles = css`
  :host {
    display: block;
    /* Without an explicit width, this host (a direct flex child of a
       centering body) sizes to its content, leaving descendant grid
       columns with an indefinite container width — the same bug that
       previously collapsed the employee-form grid to a single column. */
    width: 100%;
  }

  .app-shell-layout {
    max-width: 960px;
    margin: 40px auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-sizing: border-box;
  }

  .app-shell-banner {
    background: linear-gradient(
      135deg,
      var(--brand-color-accent-gradient-start, #7c3aed),
      var(--brand-color-accent-gradient-end, #db2777)
    );
    border-radius: var(--brand-radius-medium, 10px);
    padding: var(--brand-spacing-large, 24px);
    text-align: center;
    box-shadow: 0 10px 24px rgba(147, 51, 234, 0.3);
  }

  .app-shell-banner-title {
    margin: 0;
    color: var(--brand-color-surface, #ffffff);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }
`

@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = [brandTheme, appShellComponentStyles]

  render(): TemplateResult {
    return html`
      <div class="app-shell-layout">
        <div class="app-shell-banner">
          <h1 class="app-shell-banner-title">Employee Management</h1>
        </div>
        <employee-widget></employee-widget>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-shell': AppShell
  }
}
