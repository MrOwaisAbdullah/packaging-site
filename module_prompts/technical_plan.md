# Technical Plan Prompt — Spec-Driven Development

## Preamble & Constitutional Mandate

You are an expert Full-Stack Architect executing under **Spec-Driven Development (SDD)**. Before writing any code or making any architectural decision, you **MUST** read and internalize the following project documents in order of priority:

1. **Constitution**: `module_prompts/constitution.md` — DRY, SOLID, subagent delegation rules.
2. **Master Plan**: `plan.md` — The complete business, product, SEO, and technical specification.
3. **Spec Kit Prompt**: `module_prompts/spec_kit_prompt.md` — The project initialization specification.

You **MUST** also actively apply these skills throughout every phase of development:

| Skill | Path | When to Apply |
|-------|------|---------------|
| `@vercel-react-best-practices` | `.claude/skills/vercel-react-best-practices/` | Every React component, data fetch, and bundle decision. |
| `@frontend-designer` | `.claude/skills/frontend-designer/` | Every UI component, animation, typography, and color choice. |
| `@web-design-guidelines` | `.claude/skills/web-design-guidelines/` | Every accessibility audit and UI review checkpoint. |

---

## Project Overview

**Product**: `packaging.nextlevelmarketerz.com` — A B2B/B2C packaging materials catalog for the UAE market.
**Business Model**: Lead generation via WhatsApp & Phone. No checkout. No cart.
**Tech Stack**: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Sanity CMS · GSAP · Motion.dev · Vercel.

---

## Phase 1: Foundation & Scaffolding

**Objective**: Set up the project skeleton, design system, and CMS connection.

### Tasks

#### 1.1 Project Initialization
- Scaffold Next.js 15 with App Router, TypeScript, and Tailwind CSS v4.
- Configure `tsconfig.json` with **strict mode** enabled (`noUnusedLocals`, `noUnusedParameters`, `forceConsistentCasingInFileNames`).
- Set up path aliases (`@/components`, `@/lib`, `@/sanity`).

#### 1.2 Design System (Tokens & Typography)
- **Read `@frontend-designer` SKILL.md first.**
- Create `globals.css` with the full semantic design token system:
  - `--bg-base`, `--bg-subtle`, `--bg-elevated`, `--surface-glass`, `--border-subtle`
  - `--brand-primary`, `--brand-accent`, `--text-primary`, `--text-secondary`
  - `--accent-whatsapp`, `--accent-whatsapp-hover`
- Map tokens into `tailwind.config.ts` `theme.extend`.
- Integrate fonts via `next/font/google`:
  - Headings: **Outfit** (or Clash Display via local font).
  - Body: **Plus Jakarta Sans**.
- **Acceptance**: No hardcoded hex values anywhere in component files. All colors come from tokens.

#### 1.3 Sanity CMS Setup
- Initialize Sanity v3 project with embedded studio (`/studio` route).
- Create schemas:
  - `product.ts` (name, slug, category ref, localized descriptions, specs array, images, pricing object with MOQ, badges, SEO object).
  - `category.ts` (name, slug, description, icon, order).
  - `post.ts` (title, slug, summary, Portable Text content, mainImage, publishedAt, author ref, category refs, featured boolean, SEO overrides).
  - `seo.ts` (reusable object: metaTitle, metaDescription, focusKeyword, ogImage, noIndex).
  - `settings.ts` (WhatsApp number, phone, email, address, social links).
- **Acceptance**: `npx sanity deploy` succeeds. Studio is accessible at `/studio`.

#### 1.4 Core Layout & Navigation
- Build `app/layout.tsx` with:
  - Font variables applied to `<html>`.
  - `<Header>` with logo, navigation (Products dropdown with 12 categories, About, Contact, Blog), and visible phone number.
  - `<Footer>` with contact info, category links, and social links.
  - `<WhatsAppFloat>` — sticky floating WhatsApp button (dynamically imported via `next/dynamic`).
- Build `MobileNav.tsx` — responsive hamburger menu.
- **Acceptance**: Layout renders correctly on mobile and desktop. WhatsApp float is visible on all pages.

---

## Phase 2: Product Catalog (Core Revenue Driver)

**Objective**: Build the complete product browsing and lead-generation experience.

### Tasks

#### 2.1 Data Fetching Layer (`lib/`)
- **Read `@vercel-react-best-practices` rules: `async-parallel`, `server-cache-react`, `async-suspense-boundaries`.**
- Create `lib/sanity.ts` with a configured Sanity client using `React.cache()` wrapper for deduplication.
- Create typed GROQ query functions: `getProducts()`, `getProductBySlug()`, `getCategories()`, `getProductsByCategory()`.
- **DRY Principle**: All Sanity fetch logic lives in `lib/`. Components never call `client.fetch()` directly.

#### 2.2 Products Listing Page (`/products`)
- Server Component fetching all products grouped by category.
- `<Suspense>` boundary wrapping the `<ProductGrid>` with a skeleton loader fallback.
- Filter bar (by category) — dynamically imported (`next/dynamic`) since it's interactive.
- ISR: `revalidate = 3600`.
- **SEO**: Dynamic `generateMetadata()` with title "Packaging Materials Dubai | NextLevel Packaging UAE".

#### 2.3 Category Page (`/products/[category]`)
- Server Component fetching products for the specific category.
- Breadcrumbs: Home > Products > [Category Name].
- `<Suspense>` boundary around product grid.
- ISR: `revalidate = 3600`.
- **SEO**: Dynamic metadata from Sanity category data.

#### 2.4 Product Detail Page (`/products/[category]/[slug]`)
- Server Component with full product data from Sanity.
- Image gallery (optimized with `next/image`, AVIF/WebP).
- Specifications table.
- Pricing display with MOQ.
- **WhatsApp CTA** (primary) + **Phone CTA** (secondary) — pre-filled message with product name, SKU, and quantity.
- Related products section.
- JSON-LD `Product` schema.
- ISR: `revalidate = 3600`.

#### 2.5 WhatsApp Integration (`components/whatsapp/`)
- `WhatsAppButton.tsx` — Accepts product context, generates `wa.me` URL with encoded message.
- `WhatsAppFloat.tsx` — Sticky floating button visible on all pages. Loaded via `next/dynamic` to avoid blocking hydration.
- **SOLID (Single Responsibility)**: WhatsApp URL generation logic is a pure utility in `lib/whatsapp.ts`. Components import and call it.

#### 2.6 ProductCard Component
- **Read `@frontend-designer` SKILL.md** for micro-interaction rules.
- Image with `group-hover:scale-105` transition.
- Badge rendering (Best Seller, Limited Stock).
- Price range display.
- Dual CTA: WhatsApp Order + View Details.
- `whileHover` scale via Motion.dev for tactile feedback.

---

## Phase 3: Blog & Content Engine

**Objective**: Build an SEO-driven blog system for organic traffic acquisition.

### Tasks

#### 3.1 Blog Listing Page (`/blog`)
- Server Component fetching published posts from Sanity.
- Pagination (load more or numbered pages).
- Category filter tabs (Packaging Guides, Industry Insights, etc.).
- Featured post hero section.
- ISR: `revalidate = 60`.

#### 3.2 Blog Post Page (`/blog/[slug]`)
- Server Component with Portable Text rendering via `@portabletext/react`.
- `generateStaticParams()` for build-time generation.
- `generateMetadata()` with SEO overrides from Sanity.
- JSON-LD `Article` schema component.
- ISR: `revalidate = 60`.
- Related posts / CTA to products mentioned in article.

#### 3.3 Blog Category Page (`/blog/category/[category]`)
- Filtered listing by blog category.
- Dynamic metadata.

---

## Phase 4: SEO Infrastructure

**Objective**: Maximize search engine visibility and structured data coverage.

### Tasks

#### 4.1 Dynamic Sitemap (`app/sitemap.ts`)
- Fetch all products, categories, and blog posts from Sanity.
- Return combined URL list with `lastModified`, `changeFrequency`, and `priority`.

#### 4.2 Robots Configuration (`app/robots.ts`)
- Allow all crawlers on public pages.
- Block `/studio/`, `/api/`, `/admin/`.
- Block AI crawlers (GPTBot, ChatGPT-User, CCBot, anthropic-ai, Claude-Web).

#### 4.3 JSON-LD Components (`components/seo/`)
- `ProductJsonLd.tsx` — Product + AggregateOffer schema.
- `ArticleJsonLd.tsx` — Article schema with publisher.
- `OrganizationJsonLd.tsx` — Organization schema (injected in root layout).
- **DRY**: Each is a reusable server component accepting typed props.

#### 4.4 Metadata Templates
- Product pages: `[Product Name] | [Category] | NextLevel Packaging UAE` (60 chars max).
- Blog posts: `[Blog Title] | NextLevel Packaging Blog` (60 chars max).
- Open Graph images: 1200x630, configured per content type.

---

## Phase 5: Marketing & Static Pages

### Tasks

#### 5.1 Homepage (`app/page.tsx`)
- Hero section (`HeroSection.tsx`) with Framer Motion animations, glassmorphism trust signals, and animated shimmer CTA.
- Trust signals strip (UAE registered, 500+ customers, same-day delivery).
- Featured products grid (6-8 items from Sanity).
- Category showcase with icons.
- Testimonials carousel.
- Final CTA section.
- **Motion**: Framer Motion for hero entrance; GSAP ScrollTrigger for deeper scroll-storytelling reveal of sections.
- **Static**: Not fully static if it fetches live products, use ISR.

#### 5.2 About Page (`app/about/page.tsx`)
- Company story, values, certifications.
- **Static**: `export const dynamic = 'force-static'`.

#### 5.3 Contact Page (`app/contact/page.tsx`)
- Contact form (validated with Zod, submitted via Server Action).
- Map embed, phone, WhatsApp, email.
- Business hours.

---

## Phase 6: Analytics, Tracking & Security

### Tasks

#### 6.1 Google Analytics 4
- `lib/gtag.ts` — page views, WhatsApp clicks, phone calls, form submissions.
- Deferred loading after hydration (`bundle-defer-third-party`).

#### 6.2 Meta Pixel
- Track PageView, Contact (WhatsApp), Lead (form submit).
- Deferred loading.

#### 6.3 Security
- HTTPS (Vercel automatic).
- Input validation with Zod.
- Rate limiting on API routes.
- CORS headers.
- Environment variables for all secrets (`.env.local`).

---

## Subagent Delegation Strategy

When implementing this plan, delegate specialized work to focused subagents:

| Subagent Scope | Responsibility |
|----------------|----------------|
| **Sanity Schema Agent** | Define and validate all CMS schemas. Run `npx sanity deploy`. |
| **UI Component Agent** | Build individual components (ProductCard, Header, Footer) following `@frontend-designer` rules. |
| **SEO Agent** | Implement sitemap, robots, JSON-LD, and metadata templates. Validate with Google Rich Results Test. |
| **Performance Agent** | Audit bundle size, implement dynamic imports, verify Core Web Vitals targets. |
| **Blog Agent** | Build blog listing, post pages, Portable Text rendering, and blog-to-product linking. |

Each subagent must read the `constitution.md` before starting work.

---

## Verification Checklist (Per Phase)

Before marking any phase complete, verify:

- [ ] `npx tsc --noEmit --strict` passes with zero errors.
- [ ] `npm run build` succeeds.
- [ ] No hardcoded hex colors in component files.
- [ ] All Sanity fetches use the `React.cache()` wrapper.
- [ ] All interactive components use `next/dynamic`.
- [ ] All pages have `generateMetadata()` with proper titles and descriptions.
- [ ] Mobile responsive on iPhone SE / Android (smallest viewport).
- [ ] WhatsApp links open correctly with pre-filled messages.
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1.
- [ ] `@web-design-guidelines` audit passes on all new UI.
