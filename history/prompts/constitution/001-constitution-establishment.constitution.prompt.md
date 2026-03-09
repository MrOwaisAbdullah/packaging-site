---
id: 001
title: Constitution Establishment
stage: constitution
date: 2026-03-04
surface: agent
model: claude-opus-4-6
feature: packaging-site
branch: master
user: Owais Abdullah
command: /sp.constitution
labels: ["constitution","governance","architecture","skills","quality-standards"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - module_prompts/constitution.md
tests:
  - none
---

## Prompt

# Packaging Website Constitution

This constitution serves as the absolute source of truth for all AI agents, subagents, and developers working on `packaging.nextlevelmarketerz.com`. It enforces strict architectural, design, and performance guidelines to ensure a pristine, maintainable, and high-converting codebase.

## 1. Core Architectural Principles
- **DRY (Don't Repeat Yourself)**: Eliminate duplicated logic. Consolidate shared utilities (e.g., WhatsApp link generation, Sanity fetching wrappers) into the `lib/` directory.
- **SOLID Principles**:
  - **S**ingle Responsibility: Components should do one thing (e.g., `ProductCard` handles display, `WhatsAppCTA` handles the action).
  - **O**pen/Closed: Design UI components to be extensible without modifying their core logic.
  - **D**ependency Inversion: Abstract CMS data fetching so UI components rely on standardized interfaces, not raw CMS structures.
- **Subagent Collaboration**: Break down complex tasks. If a feature requires deep UI work and backend data structuring, delegate explicit scopes to specialized subagents to ensure focus and quality.

## 2. Mandatory Skill Integrations

You MUST actively utilize and adhere to the following project skills for every PR and feature:

### `@vercel-react-best-practices` (Performance & SSR)
- **Zero Waterfalls**: Enforce `async-defer-await` and `<Suspense>` boundaries (`async-suspense-boundaries`).
- **Optimal Bundling**: Never use barrel imports for heavy libraries (`bundle-barrel-imports`). Always `next/dynamic` import heavy client-side interactive components.
- **SSR-Safe State**: Never access `window` or `localStorage` during initial render. Use strict hydration-safe patterns.
- **Server Caching**: Utilize `React.cache()` and `next/cache` to deduplicate Sanity requests.

### `@frontend-designer` (Premium UI/UX & Motion)
- **Banned Typography**: Do not use Inter, Roboto, or Arial. Use **Clash Display/Outfit** (Headings) and **Plus Jakarta Sans** (Body).
- **Semantic Design Tokens**: Never hardcode hex values. Use the defined CSS variables (`--bg-base`, `--surface-glass`, `--brand-primary`, `--accent-whatsapp`).
- **Strategic Motion**:
  - Use **Motion.dev** (Framer Motion) layout transitions and micro-interactions (`whileHover`, `whileTap`) for tactile feedback.
  - Use **GSAP + ScrollTrigger** for premium scroll-storytelling on landing pages.
- **Aesthetic Direction**: High-end industrial, utilizing glassmorphism, noise textures, and clean negative space.

### `@web-design-guidelines` (Accessibility & Auditing)
- Before finalizing any UI component, cross-reference it against the Vercel Web Interface Guidelines.
- Ensure all interactive elements have sufficient hit areas (touch targets).
- Ensure high contrast ratios (matching WCAG 2.1 AA) for text on industrial backgrounds.

## 3. Execution Mandate
Before writing code, verify that your proposed solution adheres to *all* of the above principles. If a quick fix violates DRY or introduces a client-side waterfall, you must reject it and engineer the proper architectural solution.

## Response snapshot

Created project constitution at `.specify/memory/constitution.md` establishing:
- Core architectural principles (DRY, SOLID, Subagent Collaboration)
- Mandatory skill integrations (@vercel-react-best-practices, @frontend-designer, @web-design-guidelines)
- Execution mandate requiring constitutional compliance before code
- Governance framework with versioning, amendment procedure, and compliance review

Version 1.0.0 ratified 2026-03-04.

## Outcome

- ✅ Impact: Project constitution established as single source of truth for all development decisions
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md, verified module_prompts/constitution.md
- 🔁 Next prompts: Begin implementation following constitutional principles
- 🧠 Reflection: Constitution provides guardrails for maintaining code quality, performance, and design consistency across all development work

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A - governance document
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Review existing codebase against new constitutional principles and identify any violations that need remediation
