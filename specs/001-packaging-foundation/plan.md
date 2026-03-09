# Implementation Plan: Packaging Website Foundation

**Branch**: `001-packaging-foundation` | **Date**: 2026-03-05 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification for packaging materials catalog website with WhatsApp-based lead generation

---

## Summary

Build a B2B/B2C packaging materials catalog website for the UAE market (packaging.nextlevelmarketerz.com) serving Dubai, Sharjah, and Ajman. The site focuses on lead generation through WhatsApp and phone calls—no checkout or shopping cart. Technical approach uses Next.js 15 (App Router), Sanity CMS, and Vercel deployment with strict adherence to constitutional principles (DRY, SOLID, subagent collaboration) and mandatory skill integrations (@vercel-react-best-practices, @frontend-designer, @web-design-guidelines).

---

## Technical Context

**Language/Version**: TypeScript 5.8+ (Strict mode)
**Primary Dependencies**: Next.js 15.5, React 19, Sanity CMS v3, Tailwind CSS v4, Framer Motion, GSAP 3, @portabletext/react
**Storage**: Sanity CMS (cloud-hosted content delivery)
**Testing**: Vitest (unit), Playwright (E2E), TypeScript strict mode validation
**Target Platform**: Vercel (Edge Functions, ISR, Static Generation)
**Project Type**: Web (single repository)
**Performance Goals**: LCP < 2s, FID < 100ms, CLS < 0.1, WhatsApp CTR > 15%
**Constraints**: No checkout, no cart, WhatsApp Business API required, UAE market mobile-first
**Scale/Scope**: 60+ products, 12 categories, 20+ blog articles, 3-5 images per product

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

### ✅ DRY Compliance
- **WhatsApp link generation**: Single utility in `lib/whatsapp.ts`
- **Sanity fetching wrappers**: `lib/sanity.ts` with `React.cache()` deduplication
- **Design tokens**: All colors from semantic CSS variables

### ✅ SOLID Principles
- **Single Responsibility**: `ProductCard` (display), `WhatsAppCTA` (action), `SanityFetcher` (data)
- **Open/Closed**: Components extensible via props, not modification
- **Dependency Inversion**: UI components use typed query interfaces, not raw GROQ

### ✅ Subagent Collaboration
- UI components: delegated to @frontend-designer guided agent
- Performance: delegated to @vercel-react-best-practices guided agent
- Accessibility: delegated to @web-design-guidelines guided agent

### ✅ Skill Integrations
- **@vercel-react-best-practices**: `async-suspense-boundaries`, `bundle-dynamic-imports`, `server-cache-react` enforced
- **@frontend-designer**: Outfit/Plus Jakarta Sans, semantic tokens, Motion.dev + GSAP enforced
- **@web-design-guidelines**: Vercel guidelines compliance, WCAG 2.1 AA enforced

**Constitution Status**: ✅ PASS - No violations, all gates satisfied

---

## Project Structure

### Documentation (this feature)

```text
specs/001-packaging-foundation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── sanity-schema.ts # Sanity CMS type definitions
│   └── api-routes.ts    # API route contracts
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
app/
├── (marketing)/         # Route group for static pages
│   ├── page.tsx         # Homepage
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── products/            # Product catalog routes
│   ├── page.tsx         # All products listing
│   ├── [category]/
│   │   └── page.tsx     # Category page
│   └── [category]/
│       └── [slug]/
│           └── page.tsx # Product detail
├── blog/                # Blog routes
│   ├── page.tsx         # Blog index
│   ├── [slug]/
│   │   └── page.tsx     # Blog post
│   └── category/
│       └── [category]/
│           └── page.tsx # Blog category
├── layout.tsx           # Root layout with fonts, providers
├── sitemap.ts           # Dynamic sitemap
└── robots.ts            # Robots.txt configuration

components/
├── ui/                  # shadcn/ui base components
├── layout/              # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── MobileNav.tsx
├── product/             # Product-specific components
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── ProductGallery.tsx
├── whatsapp/            # WhatsApp integration
│   ├── WhatsAppButton.tsx
│   └── WhatsAppFloat.tsx
└── seo/                 # SEO components
    ├── ProductJsonLd.tsx
    ├── ArticleJsonLd.tsx
    └── OrganizationJsonLd.tsx

lib/
├── sanity.ts            # Sanity client with React.cache()
├── whatsapp.ts          # WhatsApp URL generation utility
├── gtag.ts              # Google Analytics wrapper
└── utils.ts             # General utilities

sanity/
├── schemas/
│   ├── product.ts       # Product document type
│   ├── category.ts       # Category document type
│   ├── post.ts          # Blog post document type
│   ├── seo.ts           # SEO field object
│   └── settings.ts      # Global settings
├── structure.ts         # Studio structure definition
└── config.ts           # Sanity configuration

public/
├── fonts/               # Local font files (if Clash Display used)
├── images/
│   ├── og-placeholder.png
│   └── logo.png
└── favicon.ico
```

**Structure Decision**: Single Next.js 15 project with App Router, source in `app/`, components in `components/`, shared utilities in `lib/`. Sanity CMS schemas in `sanity/schemas/`. No backend separation—all data fetching via Sanity API with ISR.

---

## Complexity Tracking

> No constitutional violations requiring justification.

---

## Phase 0: Research & Technical Decisions

### Research Tasks Completed

1. **Next.js 15 App Router Best Practices** (2026-03-05)
   - **Decision**: Use Server Components by default, Client Components only for interactivity
   - **Rationale**: Server Components reduce bundle size, improve SEO, enable streaming
   - **Alternatives**: Pages Router (deprecated for new projects), Static Export (limited ISR)

2. **Sanity CMS v3 vs Contentful vs Strapi** (2026-03-05)
   - **Decision**: Sanity CMS v3
   - **Rationale**: Best Next.js integration, real-time content updates, superior editor experience, embedded studio
   - **Alternatives**: Contentful (more expensive), Strapi (self-hosted complexity)

3. **Typography: Clash Display vs Outfit vs Local** (2026-03-05)
   - **Decision**: Outfit via `next/font/google` (Phase 1), Clash Display local (Phase 2)
   - **Rationale**: Outfit available immediately via Google Fonts, Clash Display requires local hosting
   - **Alternatives**: Inter (banned by constitution), Roboto (banned), Arial (banned)

4. **Animation Strategy: Motion.dev vs GSAP** (2026-03-05)
   - **Decision**: Both—Motion.dev for micro-interactions, GSAP ScrollTrigger for scroll storytelling
   - **Rationale**: Motion.dev excels at component transitions, GSAP superior for scroll-linked animations
   - **Alternatives**: React Spring (less maintained), Framer-only (limited scroll capabilities)

5. **ISR Revalidation Strategy** (2026-03-05)
   - **Decision**: Products 3600s (1 hour), Blog 60s (1 minute)
   - **Rationale**: Products change less frequently, blog content needs faster updates
   - **Alternatives**: On-demand (not needed), Static (too slow), Real-time (overkill)

6. **Image Optimization Approach** (2026-03-05)
   - **Decision**: `next/image` with AVIF/WebP fallbacks, Sanity image CDN
   - **Rationale**: Next.js Image optimization integrates seamlessly, Sanity provides fast CDN
   - **Alternatives**: Unoptimized (too slow), Cloudinary (additional cost)

---

## Phase 1: Design & Contracts

### Data Model

#### Entities

**Product**
```typescript
interface Product {
  _id: string;
  name: {
    en: string;
    ar?: string;  // Phase 2
  };
  slug: {
    current: string;
  };
  sku: string;
  category: Reference<Category>;
  description: {
    en: string;
    ar?: string;
  };
  specifications: Array<{
    label: string;
    value: string;
  }>;
  images: Array<{
    _key: string;
    asset: Reference<SanityImageAsset>;
    alt?: string;
  }>;
  pricing: {
    showPrice: boolean;
    priceFrom?: number;
    priceTo?: number;
    moq: number;
    unit: string;
  };
  badges: Array<{
    label: string;
    color: string;
  }>;
  seo: SEO;
  _createdAt: string;
  _updatedAt: string;
}
```

**Category**
```typescript
interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  icon?: string;  // Icon name or emoji
  order: number;
}
```

**Post (Blog)**
```typescript
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  summary: string;
  content: PortableTextBlock[];
  mainImage: {
    asset: Reference<SanityImageAsset>;
    alt?: string;
  };
  publishedAt: string;
  categories: Array<Reference<Category>>;
  featured: boolean;
  seo: SEO;
  _createdAt: string;
  _updatedAt: string;
}
```

**Settings**
```typescript
interface Settings {
  _id: string;
  whatsappNumber: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}
```

**SEO (reusable object)**
```typescript
interface SEO {
  metaTitle?: string;  // Max 60 chars
  metaDescription?: string;  // Max 160 chars
  focusKeyword?: string;
  ogImage?: {
    asset: Reference<SanityImageAsset>;
  };
  noIndex?: boolean;
}
```

### API Contracts

#### Sanity GROQ Query Functions

```typescript
// lib/sanity.ts
export async function getProducts(): Promise<Product[]>
export async function getProductBySlug(slug: string, category: string): Promise<Product | null>
export async function getCategories(): Promise<Category[]>
export async function getProductsByCategory(categorySlug: string): Promise<Product[]>
export async function getPosts(options?: { limit?: number; category?: string }): Promise<Post[]>
export async function getPostBySlug(slug: string): Promise<Post | null>
export async function getSettings(): Promise<Settings>
```

#### WhatsApp URL Generation

```typescript
// lib/whatsapp.ts
export interface WhatsAppMessageContext {
  productName: string;
  sku: string;
  moq?: number;
}

export function generateWhatsAppUrl(context: WhatsAppMessageContext, phoneNumber: string): string
```

#### Sanity Webhook Revalidation

```typescript
// app/api/webhook/sanity/route.ts
export async function POST(request: Request): Promise<Response>

// sanity/lib/webhook.ts
export async function verifySignature(body: any, signature: string): Promise<boolean>
```

**Webhook Implementation Details**:
- **Endpoint**: `/api/webhook/sanity`
- **Signature Verification**: Uses `@sanity/webhook` package with `SANITY_WEBHOOK_SECRET` environment variable
- **Revalidation Strategy**: Tag-based revalidation using `revalidateTag()` from Next.js cache
- **Tags**:
  - `products` - All products listing pages
  - `product:{slug}` - Individual product pages
  - `posts` - All blog listing pages
  - `post:{slug}` - Individual blog post pages
  - `categories` - Category pages
  - `settings` - Global settings (header, footer)
- **Sanity Configuration**: Webhook URL configured in Sanity dashboard at `sanity.io/manage`

**Payload Handling**:
```typescript
interface SanityWebhookPayload {
  _id: string;
  _type: 'product' | 'post' | 'category' | 'settings';
  slug?: { current: string };
  operation: 'create' | 'update' | 'delete';
}
```

---

## Implementation Phases

### Phase 1: Foundation & Scaffolding (Week 1)

**Objective**: Set up project skeleton, design system, and CMS connection

#### 1.1 Project Initialization
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir
npm install next-sanity @sanity/image-url @portabletext/react sanity framer-motion gsap
npm install -D @types/node
```

**Deliverables**:
- `tsconfig.json` with strict mode
- Path aliases configured
- Dependencies installed

#### 1.2 Design System (Tokens & Typography)

**Deliverables**:
- `app/globals.css` with semantic design tokens
- `tailwind.config.ts` with token mapping
- `next/font/google` integration (Outfit, Plus Jakarta Sans)
- `components/ui/` shadcn/ui base components

#### 1.3 Sanity CMS Setup

**Deliverables**:
- Sanity project initialized
- Schemas: `product.ts`, `category.ts`, `post.ts`, `seo.ts`, `settings.ts`
- `sanity/config.ts`
- `sanity/structure.ts`
- Studio accessible at `/studio`
- `npx sanity deploy` succeeds

#### 1.4 Core Layout & Navigation

**Deliverables**:
- `app/layout.tsx` with fonts and providers
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/MobileNav.tsx`
- `components/whatsapp/WhatsAppFloat.tsx` (dynamic import)

---

### Phase 2: Product Catalog (Week 2)

**Objective**: Build complete product browsing and lead generation

#### 2.1 Data Fetching Layer

**Deliverables**:
- `lib/sanity.ts` with `React.cache()` wrapper
- `lib/whatsapp.ts` URL generation utility
- Typed GROQ query functions

#### 2.2 Products Listing Page

**Deliverables**:
- `app/products/page.tsx` (Server Component)
- `components/product/ProductGrid.tsx` with Suspense
- `components/product/ProductFilters.tsx` (dynamic import)
- ISR: `revalidate = 3600`

#### 2.3 Category Page

**Deliverables**:
- `app/products/[category]/page.tsx`
- Breadcrumbs component
- Empty category state handling

#### 2.4 Product Detail Page

**Deliverables**:
- `app/products/[category]/[slug]/page.tsx`
- `components/product/ProductGallery.tsx`
- Specifications table
- WhatsApp + Phone CTAs
- Related products section
- JSON-LD Product schema

#### 2.5 WhatsApp Integration

**Deliverables**:
- `components/whatsapp/WhatsAppButton.tsx`
- `lib/whatsapp.ts` utility
- Pre-filled message formatting

#### 2.6 ProductCard Component

**Deliverables**:
- `components/product/ProductCard.tsx`
- Motion.dev micro-interactions
- Badge rendering
- Dual CTA layout

#### 2.7 Sanity Webhook for Instant Updates

**Deliverables**:
- `app/api/webhook/sanity/route.ts` - Webhook endpoint
- `sanity/lib/webhook.ts` - Signature verification utility
- `@sanity/webhook` package installed
- `SANITY_WEBHOOK_SECRET` environment variable configured
- Tag-based revalidation for products, posts, categories, settings
- Webhook configured in Sanity dashboard (`sanity.io/manage`)

**Implementation Notes**:
- Webhook provides instant on-demand ISR revalidation when content changes
- Signature verification prevents unauthorized revalidation requests
- Tag-based strategy allows granular cache invalidation
- Falls back to time-based ISR if webhook fails

---

### Phase 3: Blog & Content Engine (Week 3)

**Objective**: Build SEO-driven blog system

#### 3.1 Blog Listing Page

**Deliverables**:
- `app/blog/page.tsx`
- Pagination or load-more
- Category filter tabs
- Featured post hero
- ISR: `revalidate = 60`

#### 3.2 Blog Post Page

**Deliverables**:
- `app/blog/[slug]/page.tsx`
- Portable Text rendering
- `generateStaticParams()` implementation
- JSON-LD Article schema
- ISR: `revalidate = 60`

#### 3.3 Blog Category Page

**Deliverables**:
- `app/blog/category/[category]/page.tsx`
- Filtered listing
- Dynamic metadata

---

### Phase 4: SEO Infrastructure (Week 3)

**Objective**: Maximize search visibility

#### 4.1 Dynamic Sitemap

**Deliverables**:
- `app/sitemap.ts` fetching from Sanity
- Products, categories, blog posts included
- `lastModified`, `changeFrequency`, `priority`

#### 4.2 Robots Configuration

**Deliverables**:
- `app/robots.ts`
- Block `/studio/`, `/api/`, `/admin/`
- Block AI crawlers (GPTBot, CCBot, Claude-Web)

#### 4.3 JSON-LD Components

**Deliverables**:
- `components/seo/ProductJsonLd.tsx`
- `components/seo/ArticleJsonLd.tsx`
- `components/seo/OrganizationJsonLd.tsx`

#### 4.4 Metadata Templates

**Deliverables**:
- `generateMetadata()` implementations
- Product page template
- Blog post template
- OG image configuration

---

### Phase 5: Marketing & Static Pages (Week 4)

**Objective**: Build homepage, about, contact pages

#### 5.1 Homepage

**Deliverables**:
- `app/(marketing)/page.tsx`
- Hero section with dual CTA
- Trust signals strip
- Featured products grid
- Category showcase
- Testimonials carousel
- GSAP ScrollTrigger animations

#### 5.2 About Page

**Deliverables**:
- `app/(marketing)/about/page.tsx`
- `export const dynamic = 'force-static'`

#### 5.3 Contact Page

**Deliverables**:
- `app/(marketing)/contact/page.tsx`
- Contact form with Zod validation
- Server Action submission
- Map embed

---

### Phase 6: Analytics & Security (Week 4)

**Objective**: Implement tracking and security

#### 6.1 Google Analytics 4

**Deliverables**:
- `lib/gtag.ts` wrapper
- Page views, WhatsApp clicks, phone calls tracked
- Deferred loading after hydration

#### 6.2 Meta Pixel

**Deliverables**:
- PageView, Contact, Lead events
- Deferred loading

#### 6.3 Security

**Deliverables**:
- Zod input validation
- Rate limiting on API routes
- CORS headers
- Environment variables configured

---

## Verification Checklist (Per Phase)

Before marking any phase complete, verify:

- [ ] `npx tsc --noEmit --strict` passes with zero errors
- [ ] `npm run build` succeeds
- [ ] No hardcoded hex colors in component files
- [ ] All Sanity fetches use `React.cache()` wrapper
- [ ] All interactive components use `next/dynamic`
- [ ] All pages have `generateMetadata()` with proper titles/descriptions
- [ ] Mobile responsive on iPhone SE / Android (smallest viewport)
- [ ] WhatsApp links open correctly with pre-filled messages
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1
- [ ] `@web-design-guidelines` audit passes on all new UI

---

## Subagent Delegation Strategy

| Subagent Scope | Responsibility | Entry Point |
|----------------|----------------|-------------|
| **Sanity Schema Agent** | Define and validate all CMS schemas. Run `npx sanity deploy`. | Start of Phase 1.3 |
| **UI Component Agent** | Build ProductCard, Header, Footer, MobileNav following @frontend-designer rules | Phase 1.4, 2.6 |
| **SEO Agent** | Implement sitemap, robots, JSON-LD, metadata templates | Phase 4 |
| **Performance Agent** | Audit bundle size, verify Core Web Vitals, implement dynamic imports | End of each phase |
| **Blog Agent** | Build blog listing, post pages, Portable Text rendering | Phase 3 |

Each subagent must read `module_prompts/constitution.md` before starting work.
