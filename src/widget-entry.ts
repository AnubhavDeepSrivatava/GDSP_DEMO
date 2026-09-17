// Entry point for the standalone widget build (npm run build:widget). It
// registers all four custom elements. An embedding page just needs:
//   <app-shell></app-shell>
// plus this bundle's <script> tag — no children, no separate glue script.
// (app-shell renders <employee-widget>, which renders and wires up
// <employee-form>/<employee-list> itself.)
export * from './components/app-shell/app-shell.ts'
export * from './components/employee-widget/employee-widget.ts'
export * from './components/employee-form/employee-form.ts'
export * from './components/employee-list/employee-list.ts'
