# Inventory Management (React) — Local Demo

Minimal inventory/job-sites demo built with Create React App.

Quick links
- App entry: [src/App.js](src/App.js)
- Job Sites page: [src/pages/JobSitesPage.jsx](src/pages/JobSitesPage.jsx)
- Inventory page: [src/pages/InventoryPage.jsx](src/pages/InventoryPage.jsx)
- Job site form: [src/components/JobSiteForm.jsx](src/components/JobSiteForm.jsx)
- Inventory table: [src/components/InventoryTable.jsx](src/pages/InventoryTable.jsx)
- Edit modal: [src/components/EditModal.jsx](src/components/EditModal.jsx)
- Job sites list: [src/components/JobSitesList.jsx](src/components/JobSitesList.jsx)
- Search: [src/components/SearchBar.jsx](src/components/SearchBar.jsx)
- In-memory + persistence API: [src/services/api.js](src/services/api.js) — functions: [`getJobSites`](src/services/api.js), [`addJobSite`](src/services/api.js), [`getInventory`](src/services/api.js), [`updateInventoryItem`](src/services/api.js)
- NPM scripts: [package.json](package.json)

Features
- Job sites list with search and summary badges.
- Create job site via modal (persisted to localStorage).
- Click job site name to navigate to its Inventory page.
- Inventory page:
  - Categories list on the left.
  - Centered card/table, search for items.
  - Double-click a row/cell to open edit modal; save updates persist to localStorage.
- Simple responsive styles in [src/App.css](src/App.css).

Run
1. Install deps:
```sh
npm install
```
2. Start dev server:
```sh
npm start
```
3. Open http://localhost:3000

Data persistence
- Job sites and inventories persist to localStorage via [src/services/api.js](src/services/api.js).
- To reset sample data, clear localStorage in the browser (or run `localStorage.clear()` in DevTools console).

Testing
- Add unit / integration tests with Jest and React Testing Library (already included as dev dependencies in this CRA template).
- Suggested tests:
  - Search filters on Job Sites page.
  - Creating a job site updates list and persists.
  - Opening Inventory, editing an item and saving updates the table and persists.
