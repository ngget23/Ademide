# AGENTS.md

## Cursor Cloud specific instructions

This is a static HTML/CSS/JS portfolio site with no build step, no package manager, and no external dependencies.

### Dev server

Run `python3 serve.py --host 0.0.0.0` from the repo root to start the dev server on port 4321. Note: use `python3` — the `python` alias is not available in this environment.

### Structure

- 10 HTML pages (index, about, work, services, stack, case-studies, process, lab, journal, contact)
- `assets/css/styles.css` — all styles
- `assets/js/site-data.js` — portfolio data object (`window.PORTFOLIO_DATA`)
- `assets/js/site.js` — renders page content from the data object
- `serve.py` — Python stdlib threaded HTTP server (no pip dependencies)

### Testing

There is no automated test suite or linter configured. Validation is manual: start the dev server and verify pages load in a browser. All 10 pages should return HTTP 200 and render with the cinematic dark theme.
