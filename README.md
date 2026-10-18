# Leo Yi — Portfolio

A concise personal portfolio for Leo Yi, an Electrical Engineering student at UBC. The design uses a Library of Ruina-inspired index and reading panel, with an original illustration based on Leo's cream-and-black split keyboard and pink paw keycap.

## Run locally

No installation or build step is needed. From this directory, run:

```sh
python -m http.server 4173
```

Open `http://localhost:4173`.

## Contents

- About, Projects, Awards, and Contact.
- Six project selections, with the selected project's images and technical contributions shown directly in one panel.
- Three Q-SITE Hacks 2026 certificates and the PEO admission scholarship.
- A short interests paragraph, one résumé link, one portfolio PDF link, and one link per external destination.
- A silent SVG keyboard illustration that briefly highlights physical key presses. No typing challenge, audio, switch picker, or color controls.
- Responsive navigation, visible focus states, certificate dialog focus restoration, reduced-motion support, and local fonts.

Edit `index.html` for profile/contact text, the `projects` array in `script.js` for project content, and `styles.css` for layout and colors.

## Assets and references

Project photos, game screenshots, and award certificates come from the materials supplied by Leo. The project portfolio PDF has been optimized for the web. The Pen Planter is identified as a concept with an AI-generated rendering, as in its original source.

The keyboard illustration is original SVG based on the supplied keyboard photograph; no keyboard model or switch specifications are assumed. All key press feedback is silent.

The panel and navigation structure takes inspiration from the [Library of Ruina official Steam gallery](https://store.steampowered.com/app/1256670/Library_Of_Ruina/). No game UI artwork is used. Self-hosted fonts and their SIL Open Font Licenses are in `assets/`.

## Hosting

Serve this repository root as a static site. Relative asset paths support GitHub Pages beneath `/LeoYi_Portfolio/`. `.nojekyll` is included. If Pages already serves the `master` branch root, merging the redesign updates the site; otherwise configure Pages separately.

The previous homepage is preserved as `legacy.html`. Existing coursework pages and their assets are retained.

## Validation

JavaScript syntax, asset references, unique external destinations, project selection, certificate dialogs, and desktop/mobile layouts were checked. No backend or external runtime dependency is required.
