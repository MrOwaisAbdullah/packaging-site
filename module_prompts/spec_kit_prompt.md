# Packaging Website Spec Kit Prompt

You are an expert Frontend Architect and Next.js Developer. We are building a B2B/B2C packaging materials catalog website for the UAE market (packaging.nextlevelmarketerz.com). The site focuses on lead generation via WhatsApp and phone calls, with no traditional e-commerce checkout. 

**MANDATORY**: You must read and strictly follow the project constitution located at `module_prompts/constitution.md`. You must also strictly apply the following skills throughout this initialization:
1. `@vercel-react-best-practices`
2. `@frontend-designer`
3. `@web-design-guidelines`

Your task is to initialize the project and create the core technical foundation exactly based on our comprehensive implementation plan.

## Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Semantic Design Tokens
- **UI Components**: shadcn/ui
- **CMS**: Sanity CMS
- **Animations**: GSAP (scroll storytelling) + Motion.dev (micro-interactions)
- **Deployment**: Vercel

## Key Requirements

### 1. Design System & Premium Aesthetics
- Implement a world-class, premium industrial aesthetic with glassmorphism overlays (avoid generic flat templates).
- **Typography Integration**: 
  - Headings: **Clash Display** or **Outfit**
  - Body: **Plus Jakarta Sans**
- **Semantic Tokens**: Configure Tailwind config using detailed CSS variables for `--bg-base`, `--surface-glass`, `--brand-primary`, and `--accent-whatsapp` as per the spec.

### 2. Next.js & React Best Practices (Vercel Guidelines)
- Utilize `<Suspense>` boundaries around dynamic data fetches (e.g., product grids) to eliminate waterfalls (`async-suspense-boundaries`).
- Lazily load heavy interactive UI components (like GSAP wrappers and the floating WhatsApp widget) using `next/dynamic` (`bundle-dynamic-imports`).
- Enforce strict server-side processing for Sanity fetching, utilizing `React.cache()` and `next/cache` for deduplication.
- Strictly adhere to SSR-safe component patterns, avoiding conditional hooks or direct `localStorage` access during hydration.

### 3. Sanity CMS Schemas
Configure the initial Sanity v3 structure with the following exact schemas:
- **Product**: Covering SKU, name, localized descriptions, specs array, pricing (range/MOQ), category references, and unified SEO metadata fields.
- **Post (Blog)**: Encompassing titles, Portable Text content, author refs, main image, publication date, and mandatory SEO metadata overrides.
- **Settings**: Global configuration for WhatsApp number, phone, physical address, and social links.

### 4. Robust SEO & Content Infrastructure
- Architect the routing structure including `(marketing)`, `blog`, and `products` groups.
- Set up ISR (Incremental Static Regeneration) for the blog and products pages, e.g., `revalidate = 60`.
- Construct dynamic `sitemap.ts` and `robots.ts` configured for the `packaging.nextlevelmarketerz.com` host.
- Provide foundational JSON-LD components (`Article`, `Product`, `Organization`).

### 5. Conversion Workflow
- Develop the core functional `WhatsAppCTA` logic: a module that accepts product context (Name, SKU, MOQ) and formats a URL-encoded redirect to `wa.me` for instant quoting.

## Execution Steps for You
1. Provide the exact terminal commands to scaffold the Next.js 15 environment with Tailwind v4 and TypeScript.
2. Output the `tailwind.config.ts`, `globals.css` (design tokens), and local font loading setup (`layout.tsx`).
3. Output the foundational `sanity.config.ts` and the exact schema definitions (`product.ts`, `post.ts`, `seo.ts` object).
4. Create the core `WhatsAppButton` client component utilizing `next/dynamic`.
5. Scaffold the dynamic `sitemap.ts` with placeholder Sanity fetching logic.

Please focus purely on architectural setup, precise types, and performance boundaries. Do not implement all 60 products; focus on the foundation.
