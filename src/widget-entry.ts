// Entry point for the standalone widget build (npm run build:widget). It
// only registers both custom elements — it does not wire them together.
// A page embedding this bundle still needs its own small script (like
// main.ts here) to hold the shared employee list and connect the two
// components' events, the same way main.ts does for this app.
export * from './components/employee-form/employee-form.ts'
export * from './components/employee-list/employee-list.ts'
