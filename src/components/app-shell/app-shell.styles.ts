import { css } from 'lit'
import { brandTheme } from '../../styles/brand-theme.ts'

// Deliberately does NOT import styles/global.css: this component ships
// inside the standalone widget bundle (widget-entry.ts), so anything it
// pulled in would land on whatever page embeds it. global.css is this
// app's own page-level styling (index.html), loaded separately there.
const appShellComponentStyles = css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    width: 100%;
    font-family: system-ui, 'Segoe UI', Roboto, sans-serif;
    color: var(--brand-color-text, #111827);
  }

  .shell-root {
    display: flex;
    flex-direction: column;
  }

  .shell-topbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--brand-spacing-large, 24px);
    padding: var(--brand-spacing-medium, 16px) var(--brand-spacing-large, 24px);
    background: var(--brand-color-shell-navy, #1e2a5e);
    color: var(--brand-color-surface, #ffffff);
  }

  .shell-brand {
    display: flex;
    align-items: center;
    gap: var(--brand-spacing-small, 10px);
    font-size: var(--brand-font-size-heading, 20px);
    font-weight: 700;
    flex: 0 0 auto;
  }

  .shell-brand-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--brand-radius-small, 6px);
    background: var(--brand-color-primary, #7c3aed);
    font-size: var(--brand-font-size-caption, 11px);
  }

  .shell-topnav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--brand-spacing-small, 10px);
    flex: 1 1 auto;
  }

  .shell-topnav-item {
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    border: none;
    font: inherit;
    font-size: var(--brand-font-size-small, 13px);
    color: rgba(255, 255, 255, 0.75);
    padding: var(--brand-spacing-extra-small, 6px) var(--brand-spacing-small, 10px);
    border-radius: var(--brand-radius-small, 6px);
    cursor: pointer;
  }

  .shell-topnav-item:hover,
  .shell-topnav-item.shell-nav-item-active {
    background: var(--brand-color-shell-navy-hover, #29397a);
    color: var(--brand-color-surface, #ffffff);
  }

  .shell-topbar-actions {
    display: flex;
    align-items: center;
    gap: var(--brand-spacing-medium, 16px);
    flex: 0 0 auto;
  }

  .shell-search-input {
    font: inherit;
    font-size: var(--brand-font-size-small, 13px);
    padding: var(--brand-spacing-extra-small, 6px) var(--brand-spacing-small, 10px);
    border-radius: var(--brand-radius-small, 6px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: var(--brand-color-surface, #ffffff);
    min-width: 220px;
  }

  .shell-search-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .shell-icon-button {
    font-size: var(--brand-font-size-body, 14px);
  }

  .shell-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: var(--brand-color-accent-gradient-end, #db2777);
    font-size: var(--brand-font-size-caption, 11px);
    font-weight: 700;
  }

  .shell-body {
    display: flex;
    flex: 1 1 auto;
  }

  .shell-sidebar {
    flex: 0 0 220px;
    background: var(--brand-color-surface, #ffffff);
    border-right: 1px solid var(--brand-color-border, #e5e4e7);
    padding: var(--brand-spacing-large, 24px) var(--brand-spacing-medium, 16px);
  }

  .shell-sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .shell-sidebar-item {
    display: flex;
    align-items: center;
    gap: var(--brand-spacing-small, 10px);
    background: transparent;
    border: none;
    font: inherit;
    font-size: var(--brand-font-size-body, 14px);
    color: var(--brand-color-text-muted, #6b6375);
    padding: var(--brand-spacing-small, 10px) var(--brand-spacing-medium, 16px);
    border-radius: var(--brand-radius-small, 6px);
    cursor: pointer;
    text-align: left;
  }

  .shell-sidebar-item:hover,
  .shell-sidebar-item.shell-nav-item-active {
    background: var(--brand-color-shell-active-background, #eef2ff);
  }

  .shell-sidebar-item.shell-nav-item-active {
    color: var(--brand-color-primary, #7c3aed);
    font-weight: 600;
  }

  .shell-nav-icon {
    font-size: var(--brand-font-size-body, 14px);
  }

  /* min-width: 0 lets flex content (like the employee table's own
     overflow-x scroll container) shrink below its intrinsic width
     instead of forcing this whole column wider than the viewport. */
  .shell-main {
    flex: 1 1 auto;
    min-width: 0;
    padding: var(--brand-spacing-large, 24px);
    background: var(--brand-color-shell-page-background, #f1f5f9);
  }

  .shell-page-card {
    background: var(--brand-color-surface, #ffffff);
    border: 1px solid var(--brand-color-border, #e5e4e7);
    border-radius: var(--brand-radius-medium, 10px);
    padding: var(--brand-spacing-large, 24px);
  }

  .shell-page-heading {
    margin: 0 0 var(--brand-spacing-extra-small, 6px);
    font-size: var(--brand-font-size-heading, 20px);
    color: var(--brand-color-text, #111827);
  }

  .shell-page-subtext {
    margin: 0;
    color: var(--brand-color-text-muted, #6b6375);
    font-size: var(--brand-font-size-body, 14px);
  }

  .shell-placeholder {
    text-align: center;
  }

  .shell-placeholder-message {
    margin: 0;
    color: var(--brand-color-text-subtle, #9ca3af);
    font-size: var(--brand-font-size-body, 14px);
  }
`

export const appShellStyles = [brandTheme, appShellComponentStyles]
