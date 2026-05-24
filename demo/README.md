# Static Demo Bundle

This folder contains a standalone static build of the interactive timezone map for static hosting (for example Cloudflare Pages).

## Contents

- `index.html`
- `static/css/style.min.css`
- `static/js/main.min.js`
- `static/favicon.svg`
- `static/world_timezones.svg`
- `static/world_timezones_theme_2.svg`

## Deploy

Upload the contents of this `demo` folder as your site root.

On Cloudflare Pages, set the project output directory to:

`demo`

## Notes

- No Flask server is required for this demo bundle.
- The demo JS in this folder is configured to load map SVGs using relative paths (`./static/...`).
