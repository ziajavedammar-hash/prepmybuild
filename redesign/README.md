# Renovation planning preview

This redesign is isolated on `redesign/renovation-planning-v1`. Do not merge or publish to production without the owner's explicit approval.

## Experience

- Editorial homepage, responsive project navigation and a dedicated `/inspiration/` workspace.
- Bathroom, patio, painting, fencing, kitchen and custom project briefs.
- Three material/style palettes, illustrative concepts and example transformation briefs.
- Temporary local photo preview with type/size validation. No uploads or AI transformation calls.
- Browser-local text notes, manually entered budget arithmetic, project-specific scope confirmations and a downloadable text brief.
- Relevant existing materials calculators and quote tools remain linked and functional.
- Existing guides, canonical URLs, redirects, sitemap, production-only GA measurement and quote document code remain in the build.

## Validation

Run `npm ci`, `npm run build`, then `npm test` (18 functionality checks using jsdom).

Checks cover project/style selection, calculator links, input validation, budgeting, persistence, text rendering, brief download content, temporary photo handling, plan clearing, navigation interaction, keyboard tabs, all four calculator formulas, quote comparison, TXT quote checking, internal assets/links and SEO output. Browser rendering, actual device layouts and externally loaded PDF/OCR libraries still need browser verification.

The original quote checker embedded regexes in a normal template string, losing escapes during generation. `String.raw` now preserves the intended patterns; a TXT quote regression check verifies dollar extraction.

## Assets

Built-in image generation produced illustrative architectural concepts, not actual customer renovation photos. Full prompts in this conversation requested: (1) a warm oak/plaster living room opening to a garden, (2) an ivory-tile bathroom with floating oak vanity, (3) a limestone garden patio with timber pergola, (4) a warm oak kitchen with pale counters, and (5) a cedar privacy fence with planted garden. All requested premium, natural-light architectural editorial photography, no people, text, logos or watermarks. The outputs are saved in `redesign/assets/{living,bathroom,patio,kitchen,fence}.webp`; `-640.webp` siblings are responsive variants. The website labels imagery as illustrative. Original generated PNGs are not needed for the static build.

No paid AI API, backend, runtime service or account system was added. Google Fonts has system/Georgia fallbacks. The jsdom dependency is development-only.
