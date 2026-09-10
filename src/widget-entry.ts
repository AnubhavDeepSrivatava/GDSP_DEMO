// Entry point for the standalone widget build (npm run build:widget). It
// registers all three custom elements, including <app-shell> — which now
// carries the wiring logic itself. An embedding page just needs:
//   <app-shell>
//     <employee-form></employee-form>
//     <employee-list></employee-list>
//   </app-shell>
// plus this bundle's <script> tag — no separate glue script required.
export * from './components/app-shell/app-shell.ts'
export * from './components/employee-form/employee-form.ts'
export * from './components/employee-list/employee-list.ts'
