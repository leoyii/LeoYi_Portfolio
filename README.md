# Leo Yi — Portfolio

A concise personal portfolio for Leo Yi, an Electrical Engineering student at UBC. The design uses Library of Ruina-inspired navigation, antique-gold corner flourishes, and an angled ink nameplate, with an original illustration based on Leo's silver Owlab Spring with black keycaps and a pink paw accent.

## Run locally

No installation or build step is needed. From this directory, run:

```sh
python -m http.server 4173
```

Open `http://localhost:4173`.

## Contents

- About, Projects, Awards, and Contact.
- Six project selections in a non-sticky list. Images preserve their proportions; composite game screenshots display in separate frames, stacking on narrow screens.
- Three Q-SITE Hacks 2026 certificates.
- A short interests paragraph, one link per external destination. The space beside About is reserved for a future portrait.
- A silver Spring SVG with smooth case contours, a centered black-and-white braided coil cable, Alice geometry and a build-specification panel that opens on hover, focus, or click. Details include broken-in Cherry MX Hyperglide Blacks, gold-plated 65 g replacement springs, WoB keycaps, and Durock screw-in stabilizers.
- Bottom-right page curls on navigation and project tabs show the selected color underneath. Clicking continues the curl across the tab to reveal that color. The current tab is disabled; section links and project content update normally.
- Responsive navigation, visible focus states, certificate dialog focus restoration, reduced-motion support, and local fonts.

Edit `index.html` for profile/contact text, the `projects` array in `script.js` for project content, and `styles.css` for layout and colors.

## Assets and references

Project photos, game screenshots, and award certificates come from the materials supplied by Leo. The Pen Planter is identified as a concept with an AI-generated rendering, as in its original source.

The keyboard illustration uses key positions from [Owlab's published Spring layout](https://cdn.shopify.com/s/files/1/0508/8716/4061/files/spring.json?v=1682343966). The silver finish and build specifications were provided by Leo. All key press feedback is silent.

The panel and navigation structure takes inspiration from the [Library of Ruina official Steam gallery](https://store.steampowered.com/app/1256670/Library_Of_Ruina/). The corner flourishes and ink label are original SVG artwork; the name and program remain selectable text. No game UI artwork is used. Self-hosted fonts and their SIL Open Font Licenses are in `assets/`.

## Hosting

Serve this repository root as a static site. Relative asset paths support GitHub Pages beneath `/LeoYi_Portfolio/`. `.nojekyll` is included. If Pages already serves the `master` branch root, merging the redesign updates the site; otherwise configure Pages separately.

The previous homepage is preserved as `legacy.html`. Existing coursework pages and their assets are retained.

## Validation

JavaScript syntax, asset references, unique external destinations, project selection, certificate dialogs, and desktop/mobile layouts were checked. No backend or external runtime dependency is required.
