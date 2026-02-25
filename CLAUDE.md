# SB Burger Week Map — Project Rules

## Stack & Architecture

- Pure HTML/CSS/JS — no build step, no npm, no frameworks
- CDN dependencies only (Leaflet, MarkerCluster, CARTO tiles)
- Single-page app: `index.html` + `app.js` + `style.css`
- Embeddable map lives in `embed/` with its own JS/CSS (does NOT share app.js/style.css)
- Config-driven theming via `config.js` (`THEME` object) — forkable for other food events
- Data in `data-2026.js` (production) and `data.js` (skeleton)

## Code Style

- No TypeScript, no JSX, no transpilation
- Vanilla JS with `const`/`let`, template literals, arrow functions
- CSS in dedicated `.css` files — no inline styles, no CSS-in-JS
- Keep functions short and focused; avoid deep nesting
- Use semantic HTML elements where appropriate

## File Conventions

- Feature plans go in `plans/` as `YY-mm-dd-<feature-name>.md` before implementation
- No new npm/pip dependencies unless absolutely unavoidable
- Python scripts use stdlib only (no pip installs)
- GitHub Actions: Python 3 is pre-installed on runners, no setup step needed

## When Adding Features

- Add to both `app.js` AND `embed/map/embed.js` if the feature should appear in embeds
- If embed-only or main-only, note that explicitly
- New Leaflet controls: use `L.Control.extend` pattern with `L.DomEvent.disableClickPropagation`
- New UI elements should be config-driven where possible (read from `THEME`)
- Mobile responsive: main breakpoint at 768px, embed at 600px
- Test that sidebar, popups, and modals work on mobile drawer layout

## Data Patterns

- Restaurant data: `{name, address, area, lat, lng, mapUrl, appleMapsUrl, website, phone, menuItems}`
- `menuItems` is an array of `{name, description}` — empty array `[]` means no info yet
- Area colors defined in data file — markers are color-coded CircleMarkers
- Hours data in `hours.json` (fetched at runtime, graceful degradation if missing)

## Tracking & Analytics

- Click tracking via Cloudflare Worker (`track.js` + `workers/track/`)
- `window.track(action, label)` — no-ops if `THEME.trackUrl` is null
- Cloudflare Web Analytics token in `config.js` — managed by `apply-theme.py`

## CSS Gotchas

- Trunk linter reformats HTML attributes to multi-line — don't fight it
- Use 2-class specificity (`.base.modifier`) when a modifier needs to override base flex/width
- Sticky headers need `overflow: visible` on parent (not `auto/scroll`)
- `z-index: -1` on pseudo-elements to render behind sibling controls

## Regex / Scripting Gotchas

- `sed` doesn't support non-greedy `.*?` (POSIX) — use Python for HTML parsing
- Favicon regex: match `href="data:image/svg+xml` prefix to avoid hitting JS template strings
- Badge URL regex: use lazy `+?` with lookahead to not consume `.svg` extension

## Git & Deployment

- Hosted on GitHub Pages with custom domain (sbburgerweekmap.com)
- Cloudflare DNS proxy must be OFF for GitHub Pages SSL
- Clean URLs: `folder/index.html` serves at `domain/folder`
- Don't commit secrets — API keys go in GitHub Secrets, not in code
- `apply-theme.py` must be run after editing `config.js` (updates OG image, CNAME, HTML, README)
