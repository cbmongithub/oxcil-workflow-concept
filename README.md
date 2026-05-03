# oxcil-workflow-concept

Oxcil is currently a landing-page concept with interactive demos for an AI workflows SaaS.

The project started as a product direction for a lead infrastructure platform, but I am moving in another direction. This repo now serves as a concept/demo build rather than an active product foundation.

## What This Repo Is

- a marketing landing page
- a set of interactive workflow demos
- a visual concept for AI-assisted workflow operations
- a sandbox for exploring product direction, motion, and storytelling

## What Is Finished

- Next.js App Router project structure
- Landing page shell with section-based composition
- Interactive demo components for workflow concepts
- Custom visual styling system in `styles/`
- Reusable UI primitives in `components/ui/`
- Motion and background effects
- Basic site header/footer and page sections
- TypeScript + Bun + Tailwind v4 setup
- Shadcn-style component layer

## What Is Not Finished

- no production backend
- no database
- no auth system
- no lead capture or routing engine
- no billing
- no buyer/admin dashboard
- no CRM functionality
- no API surface for real users
- no deployment-specific infrastructure

## Current Stack

- Next.js 16
- React 19
- TypeScript
- Bun
- Tailwind CSS v4
- shadcn/ui-style components
- Motion
- Lucide icons
- Radix UI primitives
- Vercel Analytics
- AI-related demo/UI packages for concept work

## Project Structure

- `app/` - App Router entry points, layout, and homepage
- `components/sections/` - landing page sections
- `components/previews/` - interactive product/workflow demo cards
- `components/workflow/` - workflow-specific visual components
- `components/ai-elements/` - AI canvas and related concept UI
- `components/ui/` - reusable UI primitives
- `styles/` - global styling, tokens, theme, and utility layers
- `lib/` - shared helpers and small utilities

## Development

```bash
bun install
bun run dev
```

If port `3000` is already taken, Next.js will fall back to another free port.

## Notes

- The GitHub repo name was changed to `oxcil-workflow-concept`.
- This codebase should be treated as a concept build, not the final product direction.
- Future work should focus on presentation and interaction, not backend platform implementation.

## Status

Concept phase. The landing page and demos are the main deliverable.
