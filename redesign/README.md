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

Run `npm ci`, `npm run build`, then `npm test` (25 functionality checks using jsdom).

Checks cover project/style selection, calculator links, input validation, budgeting, persistence, text rendering, brief download content, temporary photo handling, plan clearing, navigation interaction, keyboard tabs, all four calculator formulas, quote comparison, TXT quote checking, internal assets/links and SEO output. Browser rendering, actual device layouts and externally loaded PDF/OCR libraries still need browser verification.

The original quote checker embedded regexes in a normal template string, losing escapes during generation. `String.raw` now preserves the intended patterns; a TXT quote regression check verifies dollar extraction.

## Assets

Built-in image generation produced illustrative architectural concepts, not actual customer renovation photos. Full prompts in this conversation requested: (1) a warm oak/plaster living room opening to a garden, (2) an ivory-tile bathroom with floating oak vanity, (3) a limestone garden patio with timber pergola, (4) a warm oak kitchen with pale counters, and (5) a cedar privacy fence with planted garden. All requested premium, natural-light architectural editorial photography, no people, text, logos or watermarks. The outputs are saved in `redesign/assets/{living,bathroom,patio,kitchen,fence}.webp`; `-640.webp` siblings are responsive variants. The website labels imagery as illustrative. Original generated PNGs are not needed for the static build.

No paid AI API, backend, runtime service or account system was added. Google Fonts has system/Georgia fallbacks. The jsdom dependency is development-only.


## Inspiration and simpler planning revision

The planner now displays one of three steps at a time: choose a project, explore looks, and receive a starting plan. Project cards open inspiration directly. A complete first brief needs no measurements or costs. Project notes, budgeting, timing, measurements and contractor confirmations are optional progressive disclosures; saved text from the first preview is retained.

Each of the five supported projects has three genuinely different visual concepts (15 total). The homepage style tabs also change their image. Users can compare styles side by side and save individual finish ideas from different looks into their brief. Custom projects use explicitly labelled general interior inspiration; their description does not generate an image.

Ten new assets were created with the built-in image generation tool, using each original concept as an editing reference. All prompts requested the same camera, geometry and composition with changed finishes, realistic editorial photography, no people, text or watermarks. The project/style prompts were:

- Bathroom modern: charcoal vanity, pale porcelain, black fittings; classic: white shaker vanity, pale marble/checkerboard, nickel and soft blue walls.
- Patio modern: large concrete pavers, charcoal furniture, black pergola and grasses; classic: herringbone brick, white pergola, green garden furniture and flowering borders.
- Room painting modern: sage walls, contemporary cream furnishings and dark accents; classic: dusty blue walls, white trim, traditional moulding and brass.
- Fence modern: vertical charcoal slats, minimalist gate and grasses; classic: white painted boards, lattice, classic gate and flowering borders.
- Kitchen modern: forest-green flat fronts, pale quartz and black fittings; classic: ivory shaker cabinetry, muted-blue island, pale stone and traditional metal details.

Final assets are `redesign/assets/{bathroom,patio,paint,fence,kitchen}-{modern,classic}.webp`, with `-640.webp` responsive siblings. These are pre-made illustrative concepts, not live transformations of user photos.

The seven additional checks cover step visibility/navigation, all 15 visual combinations, side-by-side selection, persisted mixed-style details and exports, a brief without form input, custom-project honesty and validation of collapsed optional inputs. Actual browser rendering and external PDF/OCR remain outside the DOM test coverage.

## Visual PDF export

The primary plan download is a PDF with the selected concept image, embedded fonts, readable section hierarchy, budget/timing cards, selected details, scope checklist and links to the existing tools. Empty notes are omitted and unentered costs are not shown as zero. Budget targets remain distinct from cost estimates. A plain-text copy remains available in the optional contractor-details section.

The PDF libraries and fonts are self-hosted and loaded only when the PDF button is used. Image conversion, PDF rendering and download happen in the visitor's browser; no planning notes or photos are sent to a server. A failed resource load restores the action and preserves local notes. The exporter snapshots the selected project/style and inputs before asynchronous rendering.

`npm test` now runs 27 functionality checks plus real PDF byte/font/image/pagination checks. `tests/pdf-export.mjs` defaults to an intentionally tiny fixture image and writes ignored QA files under `tmp/pdf-qa/`. For visual QA with an actual concept photograph, provide `PDF_QA_IMAGE` pointing to a JPEG and optionally `PDF_QA_DIR`. A fencing sample matching a $15,000 target and 3–6 month timing was rendered and inspected with Poppler/PyMuPDF. Long notes and Unicode text were checked with text extraction and page-margin checks.

The renderer uses pdf-lib and @pdf-lib/fontkit with DejaVu fonts. Font licence information is included in the font directory; pdf-lib's licence is copied into the built vendor assets. The export does not perform live image transformations or estimate project costs.

## Useful material planning and quote requests

The ready-plan step now offers optional project measurements. Fence results are a straight-run baseline (zero gates), paint results cover rectangular room walls, and patio results require an explicit poured-concrete/gravel selection. Arithmetic follows the existing calculators; each output carries inputs, assumptions and exclusions into the PDF and text brief. Kitchen, bathroom and custom projects receive tailored quote scopes without fabricated renovation takeoffs or prices. Values persist separately per project in the existing browser-only saved plan.

Every project PDF now includes five items to price/confirm, three questions to resolve, comparable-bid requirements and a small contractor response area. A 100 ft fence with 8 ft spacing produces 14 baseline posts / 13 sections, with gates, corners, footings and boards explicitly excluded. An ordinary sample remains three pages. The optional form does not prevent downloading without measurements. Invalid entered measurements reveal the section for correction. Tests cover saved values, project isolation, PDF/text snapshots, legacy arithmetic examples and invalid inputs; PDF rendering was inspected locally. Browser/device rendering remains unverified in this environment.
