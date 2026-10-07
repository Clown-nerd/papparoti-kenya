# Papparoti Kenya cinematic redesign

## Direction

Turn the existing Papparoti Kenya home experience into a cinematic, motion-led editorial landing page while preserving the current brand content, booking flow, ordering links, locations, routes, and mobile usability.

## Design system

- **Design movement:** coffee-film / editorial food cinema — dark stage lighting, warm amber highlights, oversized type, and composition that feels like a slow camera move through a café.
- **Core principles:** dramatic hierarchy, tactile warmth, controlled motion, and clarity at every viewport.
- **Color philosophy:** espresso-black creates the theatre; oat and bone surfaces give the eye a pause; Papparoti amber is the signature signal for heat, crust, and calls to action.
- **Layout paradigm:** asymmetric frames and long vertical scenes instead of centered card grids. Content enters as chapters, with large negative space and cinematic crop windows.
- **Signature elements:** amber focus ring / lens motif, oversized italic serif words, and a moving marquee band that behaves like film credits.
- **Interaction philosophy:** every interaction should feel physical and deliberate: hover crops shift, buttons lift subtly, navigation closes after selection, and mobile controls remain thumb-friendly.
- **Animation:** use Framer Motion for viewport reveals, scroll-linked image drift, and spring-like menu/nav transitions; keep transforms GPU-friendly; respect `prefers-reduced-motion`.
- **Typography:** DM Sans for navigation and body copy; Cormorant Garamond italic for sensory words and editorial emphasis; strong uppercase micro-labels for wayfinding.
- **Brand essence:** Nairobi’s warm coffee-bun ritual for people who want a memorable bite and a little more time together. Personality: warm, cinematic, assured.
- **Brand voice:** tactile, concise, and inviting. Example lines: “Follow the aroma.” / “A warm bun. A good cup. A little more time.”
- **Wordmark / mark:** preserve the supplied Papparoti logo; pair it with an amber pulse-dot / lens ring motif rather than redraw the existing mark.
- **Signature brand color:** Papparoti amber `#E6A04D`.

## Implementation

- Replace `client/src/pages/Home.tsx` with a motion-driven home page using existing external image sources and current business links.
- Replace `client/src/index.css` with the cinematic design tokens, responsive scene layouts, mobile navigation, modal styling, and reduced-motion fallback.
- Update `client/index.html` font preload and page metadata.
- Add `client/public/manus-routes.json` for the current client routes.
- Validate with `pnpm check` and `pnpm build`, then run Vite on the sandbox preview URL for visual review. No push until the user approves.

## Project structure

- `client/src/pages/Home.tsx`: home scene composition, motion, reservation dialog, and preserved business content.
- `client/src/index.css`: global design system and responsive presentation layer.
- `client/src/pages/SitePages.tsx`: existing secondary pages, retained.
- `client/public/manus-routes.json`: route manifest for preview tooling.
- `server/index.ts`: existing server entry, retained.
