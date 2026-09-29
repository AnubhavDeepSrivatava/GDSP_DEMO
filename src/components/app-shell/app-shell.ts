import { LitElement, type TemplateResult } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '../employee-widget/employee-widget.ts'
import { appShellStyles } from './app-shell.styles.ts'
import {
  renderAppShellView,
  type AppShellView,
} from './app-shell.templates.ts'

/**
 * The shell: page-level chrome only — a top nav bar, a sidebar, and a
 * simple Home / Employees / Departments / Reports view switcher. All the
 * employee-specific interaction logic lives in <employee-widget> (see
 * employee-widget.ts), not here — this component only tracks which "page"
 * is currently selected and delegates the rest to renderAppShellView.
 *
 * Usage: <app-shell></app-shell> — no children needed.
 */
@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = appShellStyles

  @state()
  private activeView: AppShellView = 'employees'

  private handleNavItemClick = (view: AppShellView): void => {
    this.activeView = view
  }

  render(): TemplateResult {
    return renderAppShellView({
      activeView: this.activeView,
      onNavItemClick: this.handleNavItemClick,
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-shell': AppShell
  }
}
