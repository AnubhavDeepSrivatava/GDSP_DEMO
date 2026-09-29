// Pure render functions, same pattern as the other components: plain data
// in, HTML out, no access to component state.
import { html, type TemplateResult } from 'lit'
import { classMap } from 'lit/directives/class-map.js'

export type AppShellView = 'home' | 'employees' | 'departments' | 'reports'

interface NavItem {
  view: AppShellView
  label: string
  icon: string
}

// Drives both the top bar's nav links and the sidebar's nav links — one
// list, two renderings, so they can never drift out of sync with each
// other the way two hand-written copies could.
const navItems: NavItem[] = [
  { view: 'home', label: 'Home', icon: '⌂' },
  { view: 'employees', label: 'Employees', icon: '👤' },
  { view: 'departments', label: 'Departments', icon: '👥' },
  { view: 'reports', label: 'Reports', icon: '📊' },
]

export interface AppShellViewModel {
  activeView: AppShellView
  onNavItemClick: (view: AppShellView) => void
}

export function renderAppShellView(
  viewModel: AppShellViewModel,
): TemplateResult {
  return html`
    <div class="shell-root">
      ${renderTopBar(viewModel)}
      <div class="shell-body">
        ${renderSidebar(viewModel)}
        <main class="shell-main">${renderActiveView(viewModel.activeView)}</main>
      </div>
    </div>
  `
}

function renderTopBar(viewModel: AppShellViewModel): TemplateResult {
  return html`
    <header class="shell-topbar">
      <div class="shell-brand">
        <span class="shell-brand-mark" aria-hidden="true">EH</span>
        <span>Employee Hub</span>
      </div>
      <nav class="shell-topnav">
        ${navItems.map((item) =>
          renderNavButton(item, viewModel, 'shell-topnav-item'),
        )}
      </nav>
      <div class="shell-topbar-actions">
        <input
          class="shell-search-input"
          type="search"
          placeholder="Search employees, departments..."
        />
        <span class="shell-icon-button" aria-hidden="true">🔔</span>
        <span class="shell-avatar" aria-hidden="true">JD</span>
      </div>
    </header>
  `
}

function renderSidebar(viewModel: AppShellViewModel): TemplateResult {
  return html`
    <aside class="shell-sidebar">
      <nav class="shell-sidebar-nav">
        ${navItems.map((item) =>
          renderNavButton(item, viewModel, 'shell-sidebar-item'),
        )}
      </nav>
    </aside>
  `
}

function renderNavButton(
  item: NavItem,
  viewModel: AppShellViewModel,
  variantClassName: string,
): TemplateResult {
  const isActive = viewModel.activeView === item.view

  return html`
    <button
      type="button"
      class=${classMap({
        [variantClassName]: true,
        'shell-nav-item-active': isActive,
      })}
      @click=${() => viewModel.onNavItemClick(item.view)}
    >
      <span class="shell-nav-icon" aria-hidden="true">${item.icon}</span>
      <span>${item.label}</span>
    </button>
  `
}

function renderActiveView(activeView: AppShellView): TemplateResult {
  if (activeView === 'employees') {
    return html`<employee-widget></employee-widget>`
  }
  if (activeView === 'home') {
    return renderHomeView()
  }
  return renderPlaceholderView(activeView)
}

function renderHomeView(): TemplateResult {
  return html`
    <div class="shell-page-card">
      <h2 class="shell-page-heading">Good morning</h2>
      <p class="shell-page-subtext">
        Here's what's happening with your team today.
      </p>
    </div>
  `
}

function renderPlaceholderView(view: AppShellView): TemplateResult {
  const label = view.charAt(0).toUpperCase() + view.slice(1)

  return html`
    <div class="shell-page-card shell-placeholder">
      <p class="shell-placeholder-message">${label} coming soon</p>
    </div>
  `
}
