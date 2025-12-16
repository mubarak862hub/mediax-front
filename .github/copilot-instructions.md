# Copilot Instructions — MediaX Frontend

Purpose
- Help AI coding agents be immediately productive editing this Vanilla JS + static HTML prototype.

Big picture
- This is a static, client-side UI (no backend in this repo). Pages are HTML files (index.html, movies.html, details.html, login.html, etc.) and behavior is implemented in plain JS under `js/`.
- Main UI surface & shared behaviors live in `js/main.js`. Page-specific logic lives in files like `js/auth.js`, `js/details.js`, and `js/movies.js`.
- Global runtime surface: `window.MediaX` exposes a small API (`showNotification`, `openSearch`, `closeSearch`, `scrollSlider`) for cross-file interactions.

Dev / run workflow
- There is no build step — open `index.html` in a browser or use the provided dev script: `npm run dev` (starts `live-server`). See `package.json`.
- Tests are not configured; do not add test frameworks without asking the maintainers.

Project-specific conventions (important for edits)
- DOM-first patterns: scripts query DOM directly (e.g., `document.getElementById`, `querySelectorAll`) and attach listeners on DOMContentLoaded.
- Global state objects: `main.js` uses a `state` object and an `elements` map; follow that style when adding cross-component state for consistency.
- Class toggle UX: interactive states are represented by CSS classes: `active`, `scrolled`, `favorited`, `loading`. Use `classList.toggle/add/remove` rather than inline styles unless temporary visual feedback is required.
- Lazy images use `data-src` attributes; `initializeLazyLoading()` copies `data-src`→`src` when intersecting.
- Strings: UI text is primarily Arabic inside JS/HTML. Preserve RTL semantics and existing wording unless instructed otherwise.

Data flows & integrations
- No real API calls in this repo: `js/auth.js` uses `simulateApiCall()` for mocked network latency and stores data locally (e.g., `localStorage` for "remember me"). If implementing real endpoints, centralize fetch logic and avoid sprinkling `fetch` across many files.
- External deps: only devDependency is `live-server` (see `package.json`). Avoid adding heavy toolchains (bundlers) unless requested.

Files to inspect when changing UI/behavior
- Root HTML pages: index.html, movies.html, details.html, login.html.
- Shared JS: `js/main.js` (global behaviors, sliders, notifications, lazy-loading).
- Auth logic: `js/auth.js` (login/register flows, form validation, simulated API calls).
- Styles: `css/style.css`, `css/pages.css` (RTL layout, variables for colors and radii).

Examples of common edits
- To add a new page interaction, register listeners inside `DOMContentLoaded` at top of the page-specific JS file (follow `js/auth.js` pattern).
- To expose a helper globally, add it to `window.MediaX` in `js/main.js` (pattern already used for `showNotification`).
- To show a notification, call `window.MediaX.showNotification('message', 'success')`.

Guidelines for AI agents
- Keep changes minimal and local: this repo is a simple static UI — prefer small, focused edits to individual JS/CSS/HTML files.
- Preserve Arabic/RTL layout: when changing markup or classes, verify layout in an RTL browser viewport.
- Avoid introducing build tooling or tests without explicit user approval.
- When implementing API calls, add a single adapter module (e.g., `js/api.js`) and keep `simulateApiCall()` until backend details are provided.

When in doubt / PR notes
- Mention which pages you tested (e.g., `index.html` + `login.html`) and whether you used `npm run dev` or opened files directly.
- If you modify strings, note whether translations/RTL adjustments are needed.

Request for feedback
- If any of these sections are unclear or you want more detailed examples (selectors, class names, or lines to edit), tell me which area to expand.
