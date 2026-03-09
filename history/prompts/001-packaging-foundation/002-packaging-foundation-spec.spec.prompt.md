---
id: 002
title: Packaging Website Foundation Specification
stage: spec
date: 2026-03-05
surface: agent
model: claude-opus-4-6
feature: packaging-foundation
branch: 001-packaging-foundation
user: Owais Abdullah
command: /sp.specify
labels: ["specification","foundation","nextjs","sanity-cms","whatsapp-integration"]
links:
  spec: specs/001-packaging-foundation/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-packaging-foundation/spec.md
  - specs/001-packaging-foundation/checklists/requirements.md
tests:
  - none
---

## Prompt

# Packaging Website Spec Kit Prompt

You are an expert Frontend Architect and Next.js Developer. We are building a B2B/B2C packaging materials catalog website for the UAE market (packaging.nextlevelmarketerz.com). The site focuses on lead generation via WhatsApp and phone calls, with no traditional e-commerce checkout.

**MANDATORY**: You must read and strictly follow the project constitution located at module_prompts/constitution.md. You must also strictly apply the following skills throughout this initialization:
1. @vercel-react-best-practices
2. @frontend-designer
3. @web-design-guidelines

Your task is to initialize the project and create the core technical foundation exactly based on our comprehensive implementation plan.

## Technical Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4 + Semantic Design Tokens
- UI Components: shadcn/ui
- CMS: Sanity CMS
- Animations: GSAP (scroll storytelling) + Motion.dev (micro-interactions)
- Deployment: Vercel

## Key Requirements

### 1. Design System & Premium Aesthetics
- Implement a world-class, premium industrial aesthetic with glassmorphism overlays (avoid generic flat templates).
- Typography Integration: Clash Display or Outfit (Headings) and Plus Jakarta Sans (Body).
- Semantic Tokens: Configure Tailwind config using detailed CSS variables for --bg-base, --surface-glass, --brand-primary, and --accent-whatsapp.

### 2. Next.js & React Best Practices (Vercel Guidelines)
- Use Suspense boundaries around dynamic data fetches to eliminate waterfalls.
- Lazily load heavy interactive UI components using next/dynamic.
- Enforce strict server-side processing for Sanity fetching, utilizing React.cache() and next/cache.
- Strictly adhere to SSR-safe component patterns.

### 3. Sanity CMS Schemas
Configure the initial Sanity v3 structure with:
- Product: SKU, name, localized descriptions, specs array, pricing (range/MOQ), category references, SEO metadata.
- Post (Blog): Titles, Portable Text content, author refs, main image, publication date, SEO metadata.
- Settings: WhatsApp number, phone, physical address, social links.

### 4. SEO & Content Infrastructure
- Architect routing structure including (marketing), blog, and products groups.
- Set up ISR for blog and products pages (revalidate = 60).
- Construct dynamic sitemap.ts and robots.ts.
- Provide JSON-LD components (Article, Product, Organization).

### 5. Conversion Workflow
- Develop WhatsAppCTA logic: module that accepts product context (Name, SKU, MOQ) and formats URL-encoded redirect to wa.me for instant quoting.

## Response snapshot

Created feature specification for packaging website foundation at specs/001-packaging-foundation/spec.md including:

- 3 prioritized user stories (Browse Products P1, Blog Content P2, General Contact P3)
- 20 functional requirements covering product catalog, CMS, lead generation, SEO, performance, and UX
- 8 measurable success criteria (load times, CTR, Core Web Vitals, accessibility scores)
- Complete entity definitions (Product, Category, Blog Post, Settings)
- Scope boundaries (in/out of scope), dependencies, assumptions, and risks

Quality checklist created and validated - all items PASSED. Specification ready for planning phase.

## Outcome

- ✅ Impact: Complete specification establishes foundation for packaging website development with clear requirements and success criteria
- 🧪 Tests: none
- 📁 Files: specs/001-packaging-foundation/spec.md, specs/001-packaging-foundation/checklists/requirements.md
- 🔁 Next prompts: Run /sp.plan to create implementation plan
- 🧠 Reflection: Spec successfully avoids implementation details while capturing all user-facing requirements and measurable outcomes

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASSED - All checklist items validated successfully
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): Proceed to planning phase with /sp.plan command
