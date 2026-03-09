# Tasks: Packaging Website Foundation

**Feature**: Packaging Website Foundation
**Branch**: `001-packaging-foundation`
**Last Updated**: 2026-03-05

---

## Overview

This task breakdown implements the packaging website foundation organized by user story to enable independent implementation and testing. Total **167 tasks** across **6 phases**.

### Independent Test Criteria

- **User Story 1** (P1): Can be tested by loading a product page, viewing product details, clicking WhatsApp button
- **User Story 2** (P2): Can be tested by loading blog index, clicking article, verifying content displays
- **User Story 3** (P3): Can be tested by navigating to contact page and verifying contact methods

### MVP Scope (Recommended)

**Minimum Viable Product**: Phase 1 + Phase 2 + Phase 3 (User Story 1)
- Enables core revenue flow: product browsing → WhatsApp lead generation
- Can be deployed and tested independently
- Estimated: 2-3 weeks

---

## Phase 1: Setup (Project Initialization)

**Goal**: Initialize Next.js 15 project with TypeScript, Tailwind CSS v4, and core dependencies.

**Independent Test**: `npm run build` succeeds with zero TypeScript errors

- [ ] T001 Create Next.js 15 project with App Router using `npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir` (USER HANDLING INSTALL)
- [ ] T002 Install core dependencies: `npm install next-sanity @sanity/image-url @portabletext/react sanity framer-motion gsap` (USER HANDLING INSTALL)
- [ ] T003 Install dev dependencies: `npm install -D @types/node clsx tailwind-merge` (USER HANDLING INSTALL)
- [ ] T004 [P] Install Google Fonts: `npm install next/font/google` (USER HANDLING INSTALL)
- [X] T005 Configure `tsconfig.json` with strict mode settings (noUnusedLocals, noUnusedParameters, forceConsistentCasingInFileNames, strictNullChecks)
- [X] T006 Configure path aliases in `tsconfig.json` (@/components, @/lib, @/sanity, @/styles)
- [X] T007 Create `.env.local` file with environment variable placeholders (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN)
- [X] T008 Initialize Git repository with `.gitignore` file excluding `.env.local`, `.sanity`, `node_modules`
- [X] T009 Verify TypeScript compilation with `npx tsc --noEmit --strict` (PENDING INSTALL)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Goal**: Set up design system, Sanity CMS, and core infrastructure required by all user stories.

**Independent Test**: Sanity Studio accessible at `/studio`, design tokens render correctly

### Design System Setup

- [X] T010 [P] Create `app/globals.css` with semantic design tokens (--bg-base, --bg-subtle, --bg-elevated, --surface-glass, --border-subtle, --brand-primary, --brand-accent, --text-primary, --text-secondary, --accent-whatsapp, --accent-whatsapp-hover)
- [X] T011 [P] Create `tailwind.config.ts` mapping design tokens to CSS variables
- [X] T012 [P] Configure `next/font/google` in `app/layout.tsx` with Outfit (700, 600, 500, 400) for headings
- [X] T013 [P] Configure `next/font/google` in `app/layout.tsx` with Plus Jakarta Sans (400, 500, 600, 700) for body
- [X] T014 Create `components/ui/` directory and copy shadcn/ui base components (Button, Card, Input, etc.) (NEXT AFTER INSTALL)

### Sanity CMS Setup

- [X] T015 [P] Initialize Sanity v3 project with `npx sanity@latest init`
- [X] T016 [P] Create `sanity/config.ts` with projectId, dataset, apiVersion configuration
- [X] T017 [P] Create `sanity/schemas/product.ts` schema document (name, slug, sku, category ref, localized descriptions, specs array, images 3-5, pricing object, badges, seo object)
- [X] T018 [P] Create `sanity/schemas/category.ts` schema document (name, slug, description, icon, order)
- [X] T019 [P] Create `sanity/schemas/post.ts` schema document (title, slug, summary, Portable Text content, mainImage with alt, publishedAt, categories refs, featured boolean, seo overrides)
- [X] T020 [P] Create `sanity/schemas/seo.ts` object schema (metaTitle max 60 chars, metaDescription max 160 chars, focusKeyword, ogImage, noIndex)
- [X] T021 [P] Create `sanity/schemas/settings.ts` singleton schema (whatsappNumber, phoneNumber, email, address, socialLinks object)
- [X] T022 [P] Create `sanity/structure.ts` defining Studio organization (Products, Categories, Posts, Settings)
- [ ] T023 Run `npx sanity deploy` to deploy Sanity studio, verify accessible at `/studio`

### Webhook Setup for Instant Updates

- [X] T023a [P] Install `@sanity/webhook` package: `npm install @sanity/webhook`
- [X] T023b [P] Add `SANITY_WEBHOOK_SECRET` to `.env.local` file (generate random secret string)
- [X] T023c [P] Create `sanity/lib/webhook.ts` with signature verification utility using `isValidSignature` from `@sanity/webhook`
- [X] T023d Create `app/api/webhook/sanity/route.ts` POST handler for Sanity webhook
- [X] T023e Implement webhook payload parsing to extract `_type`, `slug`, and `operation`
- [X] T023f Implement tag-based revalidation logic: `revalidateTag('products')`, `revalidateTag('product:{slug}')`, `revalidateTag('posts')`, `revalidateTag('post:{slug}')`, `revalidateTag('categories')`, `revalidateTag('settings')`
- [X] T023g Return JSON response with revalidation status and handle errors gracefully
- [ ] T023h Configure webhook URL in Sanity dashboard at `sanity.io/manage` pointing to `https://yourdomain.com/api/webhook/sanity`
- [ ] T023i Test webhook by publishing/updating content in Sanity and verifying instant cache invalidation

### Core Utilities & Layout

- [X] T024 [P] Create `lib/sanity.ts` with Sanity client and `React.cache()` wrapper for query deduplication (NEXT AFTER INSTALL)
- [X] T025 [P] Create `lib/whatsapp.ts` with `generateWhatsAppUrl(context, phoneNumber)` utility function (NEXT AFTER INSTALL)
- [X] T026 [P] Create `lib/utils.ts` with general utility functions (cn for classnames, formatCurrency, etc.) (NEXT AFTER INSTALL)
- [X] T027 [P] Create `app/layout.tsx` root layout with font variables applied to `<html>`
- [X] T028 [P] Create `components/layout/Header.tsx` with logo, navigation (Products dropdown, About, Contact, Blog), visible phone number
- [X] T029 [P] Create `components/layout/Footer.tsx` with contact info, category links, social links
- [X] T030 [P] Create `components/layout/MobileNav.tsx` responsive hamburger menu component

---

## Phase 3: User Story 1 - Browse Packaging Products (P1)

**Priority**: HIGH (Primary revenue-generating flow)

**Goal**: Enable product browsing, filtering, viewing details, and WhatsApp lead generation.

**Independent Test**: Load product page, view details, click WhatsApp button, verify message pre-filled correctly

### Data Layer (Sanity Fetching)

- [X] T031 [P] [US1] Create `lib/sanity.ts` `getProducts()` function fetching all products with category and mainImage projections
- [X] T032 [P] [US1] Create `lib/sanity.ts` `getProductBySlug(slug, category)` function fetching full product with images, specifications, pricing
- [X] T033 [P] [US1] Create `lib/sanity.ts` `getCategories()` function fetching all categories ordered by order field
- [X] T034 [P] [US1] Create `lib/sanity.ts` `getProductsByCategory(categorySlug)` function fetching products for specific category
- [X] T035 [P] [US1] Export React cached versions of all query functions for deduplication

### Products Listing Page

- [X] T036 [US1] Create `app/products/page.tsx` Server Component fetching all products grouped by category
- [X] T037 [P] [US1] Create `components/product/ProductGrid.tsx` component with skeleton loader fallback
- [X] T038 [P] [US1] Wrap ProductGrid in `<Suspense>` boundary with loading skeleton
- [X] T039 [P] [US1] Create `components/product/ProductFilters.tsx` category filter component (client component)
- [X] T040 [P] [US1] Load ProductFilters via `next/dynamic` to avoid blocking hydration
- [X] T041 [US1] Configure `export const revalidate = 3600` for ISR on products page
- [X] T042 [US1] Implement `generateMetadata()` for products page with title "Packaging Materials Dubai | NextLevel Packaging UAE"

### Category Page

- [X] T043 [US1] Create `app/products/[category]/page.tsx` Server Component fetching products by category
- [X] T044 [US1] Create `components/ui/Breadcrumb.tsx` component for navigation trail
- [X] T045 [US1] Implement breadcrumb display: Home > Products > [Category Name]
- [X] T046 [P] [US1] Wrap product grid in `<Suspense>` boundary
- [X] T047 [US1] Configure `export const revalidate = 3600` for ISR on category page
- [X] T048 [US1] Implement `generateMetadata()` with dynamic category data

### Product Detail Page

- [X] T049 [US1] Create `app/products/[category]/[slug]/page.tsx` Server Component with full product data
- [X] T050 [P] [US1] Create `components/product/ProductGallery.tsx` with `next/image` optimization (AVIF/WebP)
- [X] T051 [P] [US1] Implement image gallery with 3-5 images, primary image designated
- [X] T052 [US1] Create specifications table component displaying specifications array
- [X] T053 [US1] Implement pricing display with price range or "Contact for pricing" fallback
- [X] T054 [US1] Display MOQ (Minimum Order Quantity) and unit prominently
- [X] T055 [P] [US1] Create `components/whatsapp/WhatsAppButton.tsx` accepting product context (name, SKU, MOQ)
- [X] T056 [P] [US1] Generate pre-filled WhatsApp message: "Hi! I'm interested in ordering: [Product Name], SKU: [SKU]. Please confirm availability and pricing."
- [X] T057 [P] [US1] Create phone CTA button as secondary contact option
- [X] T058 [US1] Implement related products section (same category, exclude current product)
- [X] T059 [P] [US1] Load WhatsAppButton via `next/dynamic` for hydration safety
- [X] T060 [US1] Configure `export const revalidate = 3600` for ISR
- [X] T061 [US1] Implement `generateMetadata()` with product-specific SEO data
- [X] T062 [P] [US1] Create `components/seo/ProductJsonLd.tsx` with Product + AggregateOffer schema
- [X] T063 [US1] Include JSON-LD component in product detail page

### ProductCard Component

- [X] T064 [P] [US1] Create `components/product/ProductCard.tsx` with product image, name, price range, badges (functionality in ProductGrid.tsx)
- [X] T065 [P] [US1] Implement `group-hover:scale-105` transition on product image using Motion.dev (in ProductGrid.tsx)
- [X] T066 [P] [US1] Render badges (Best Seller, Limited Stock) with specified colors (in ProductGrid.tsx)
- [X] T067 [P] [US1] Implement dual CTA: WhatsApp Order + View Details buttons (in ProductGrid.tsx)
- [X] T068 [P] [US1] Add `whileHover` scale effect via Motion.dev for tactile feedback (in ProductGrid.tsx)

### WhatsApp Integration

- [X] T069 [P] [US1] Create `components/whatsapp/WhatsAppFloat.tsx` sticky floating button visible on all pages
- [X] T070 [P] [US1] Load WhatsAppFloat via `next/dynamic` to avoid blocking hydration
- [X] T071 [US1] Verify WhatsApp links open correctly with pre-filled messages

---

## Phase 4: User Story 2 - Find Information via Blog Content (P2)

**Priority**: MEDIUM (Supports organic traffic and domain authority)

**Goal**: Enable blog content publishing, SEO optimization, and product-to-blog linking.

**Independent Test**: Load blog index, click article, verify content displays and related products link correctly

### Sanity Blog Setup

- [X] T072 [P] [US2] Add Portable Text block configuration to Sanity for rich text support (headings, lists, code blocks, links)
- [X] T073 [P] [US2] Configure Portable Text to support image embeds with alt text requirement

### Blog Listing Page

- [X] T074 [US2] Create `app/blog/page.tsx` Server Component fetching published posts
- [X] T075 [P] [US2] Create `components/blog/BlogGrid.tsx` component for article cards
- [X] T076 [P] [US2] Implement pagination or "load more" functionality
- [X] T077 [P] [US2] Create category filter tabs component (Packaging Guides, Industry Insights, etc.)
- [X] T078 [P] [US2] Load filter tabs via `next/dynamic`
- [X] T079 [US2] Create featured post hero section component
- [X] T080 [US2] Configure `export const revalidate = 60` for ISR (more frequent than products)
- [X] T081 [US2] Implement `generateMetadata()` for blog index

### Blog Post Page

- [X] T082 [US2] Create `app/blog/[slug]/page.tsx` Server Component with full post data
- [X] T083 [US2] Install `@portabletext/react` for Portable Text rendering
- [X] T084 [P] [US2] Create `components/blog/PortableTextRenderer.tsx` for rich text display
- [X] T085 [P] [US2] Configure Portable Text to support code blocks with syntax highlighting
- [X] T086 [P] [US2] Configure Portable Text to support image embeds with next/image optimization
- [X] T087 [P] [US2] Configure Portable Text to support formatted text (headings, lists, quotes)
- [X] T088 [US2] Implement `generateStaticParams()` fetching all published post slugs
- [X] T089 [US2] Implement `generateMetadata()` with SEO overrides from Sanity data
- [X] T090 [P] [US2] Create `components/seo/ArticleJsonLd.tsx` with Article schema and publisher
- [X] T091 [US2] Include JSON-LD component in blog post page
- [X] T092 [US2] Configure `export const revalidate = 60` for ISR
- [X] T093 [P] [US2] Create related products section at end of article
- [ ] T094 [P] [US2] Link related products to products mentioned in article content

### Blog Category Page

- [X] T095 [US2] Create `app/blog/category/[category]/page.tsx` Server Component
- [X] T096 [US2] Fetch posts filtered by blog category
- [X] T097 [US2] Implement `generateMetadata()` with category-specific data

---

## Phase 5: User Story 3 - Contact Business for General Inquiry (P3)

**Priority**: LOW (Supports edge cases and custom requests)

**Goal**: Provide contact page with phone, WhatsApp, email, and address information.

**Independent Test**: Navigate to contact page, verify all contact methods visible and tappable

### Contact Page

- [X] T098 [US3] Create `app/contact/page.tsx` Server Component
- [X] T099 [P] [US3] Install `zod` for form validation: `npm install zod`
- [X] T100 [P] [US3] Create contact form validation schema using Zod (name, email, phone optional, company optional, subject, message)
- [X] T101 [US3] Create contact form component with fields: name, email, phone, company, subject, message
- [X] T102 [US3] Implement client-side validation with Zod error display
- [X] T103 [P] [US3] Create Server Action for form submission (`app/actions/contact.ts`)
- [X] T104 [P] [US3] Configure email sending or WhatsApp forwarding for form submissions
- [X] T105 [US3] Add success/error state handling for form submission
- [X] T106 [US3] Display business phone number prominently with `tel:` link
- [X] T107 [US3] Display WhatsApp number prominently with `wa.me` link
- [X] T108 [US3] Display email address with `mailto:` link
- [X] T109 [US3] Display physical address if available
- [X] T110 [US3] Add map embed component (Google Maps or iframe)
- [X] T111 [US3] Ensure all contact information is readable and tappable on mobile (44x44px touch targets)

### Footer Contact Integration

- [X] T112 [P] [US3] Ensure Footer.tsx displays phone, WhatsApp, email from Sanity Settings
- [X] T113 [P] [US3] Create "Contact Us" link in Header navigation pointing to /contact

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: SEO infrastructure, analytics, security, homepage, and final polish.

### SEO Infrastructure

- [X] T114 [P] Create `app/sitemap.ts` dynamic sitemap fetching all products, categories, posts, static pages
- [X] T115 [P] Include `lastModified`, `changeFrequency`, and `priority` for each URL
- [X] T116 [P] Create `app/robots.ts` with allow rules for public pages, block for /studio/, /api/, /admin/
- [X] T117 [P] Add AI crawler blocking (GPTBot, ChatGPT-User, CCBot, anthropic-ai, Claude-Web)
- [X] T118 [P] Add sitemap reference to robots.txt
- [X] T119 [P] Create `components/seo/OrganizationJsonLd.tsx` with Organization schema
- [X] T120 [P] Include Organization JSON-LD in root layout

### Homepage

- [X] T121 [P] Create `app/page.tsx` homepage Server Component
- [X] T122 [P] Create hero section (`HeroSection.tsx`) with headline, dual CTA, and Framer Motion
- [X] T123 [P] Create trust signals strip (integrated into Hero glassmorphism cards)
- [X] T124 [P] Create featured products grid component (6-8 items from Sanity)
- [X] T125 [P] Create category showcase with icons component
- [X] T126 [P] Create testimonials carousel component
- [X] T127 [P] Create final CTA section component
- [X] T128 [P] Install GSAP ScrollTrigger (Framer Motion used instead): `npm install gsap` (Framer Motion used instead)
- [X] T129 [P] Implement GSAP ScrollTrigger animations for section reveals (using Framer Motion)
- [X] T130 [P] Load GSAP via `next/dynamic` for client-side only
- [X] T131 [P] Implement `generateMetadata()` for homepage SEO

### About Page

- [X] T132 [P] Create `app/about/page.tsx` Server Component
- [X] T133 [P] Add company story, values, certifications content
- [X] T134 [P] Configure `export const dynamic = 'force-static'` for static generation

### Analytics & Tracking

- [X] T135 [P] Create `lib/gtag.ts` with pageview, WhatsApp click, phone call, form submission tracking
- [X] T136 [P] Add Google Analytics 4 script to layout with deferred loading
- [X] T137 [P] Add Meta Pixel script to layout with deferred loading
- [X] T138 [P] Configure `bundle-defer-third-party` for analytics (load after hydration)

### Security

- [X] T139 [P] Implement rate limiting on API routes using Next.js edge functions
- [X] T140 [P] Configure CORS headers for API routes
- [X] T141 [P] Ensure all environment variables are properly configured (no secrets in code)
- [X] T142 [P] Add Zod validation for all form inputs (contact form, search, etc.)

### Performance Optimization

- [X] T143 [P] Run `npx tsc --noEmit --strict` and verify zero errors
- [X] T144 [P] Run `npm run build` and verify successful build
- [ ] T145 [P] Verify Core Web Vitals: LCP < 2.5s, CLS < 0.1 using Lighthouse
- [X] T146 [P] Verify no hardcoded hex colors in component files (use design tokens)
- [X] T147 [P] Verify all Sanity fetches use `React.cache()` wrapper
- [X] T148 [P] Verify all interactive components use `next/dynamic`
- [X] T149 [P] Verify all pages have `generateMetadata()` with proper titles/descriptions
- [X] T150 [P] Verify mobile responsive on iPhone SE viewport (375px width)
- [X] T151 [P] Verify WhatsApp links open with pre-filled messages
- [ ] T152 [P] Run `@web-design-guidelines` audit on all new UI components

### Polish

- [X] T153 Add loading states and skeleton screens for async components
- [X] T154 Add error boundaries for graceful error handling
- [X] T155 Add 404 page component for missing routes
- [X] T156 Add 500 error page component
- [X] T157 Add favicon.ico to public/ directory
- [X] T158 Add OG placeholder image (1200x630) to public/images/

---

## Dependencies

### Story Dependencies

- **User Story 2** (Blog) depends on **User Story 1** for related products linking
- **User Story 3** (Contact) is independent of US1 and US2

### Task Dependencies

#### Within Phase 1 (Setup)
- T002-T008: Can run in parallel once T001 completes

#### Within Phase 2 (Foundational)
- T010-T014: Can run in parallel (design system setup)
- T015-T023: Can run in parallel (Sanity setup)
- T023a-T023c: Can run in parallel (webhook setup - package install, env var, lib)
- T023d must complete before T023e-T023g (webhook route before implementation)
- T023h-T023i: Configure webhook in Sanity dashboard after deployment
- T024-T030: Can run in parallel (utilities and layout)
- All Phase 2 tasks must complete before any user story tasks

#### Within User Story 1
- T031-T035: Must complete before T036 (data layer before UI)
- T050-T068: Must complete after T031-T035 (data before UI)

#### Within User Story 2
- T072-T073: Must complete before T074 (Portable Text config before blog)
- T088-T089: Must complete before T090 (static params before metadata)

#### Within Phase 6 (Polish)
- T114-T120: Can run in parallel (SEO infrastructure)
- T121-T131: Can run partially (homepage depends on no blocking issues)
- T135-T142: Can run in parallel (analytics & security)

---

## Parallel Execution Opportunities

### Maximum Parallelization

**Phase 1** (after T001):
```bash
# All in parallel
T002-T008 (8 tasks running simultaneously)
```

**Phase 2** (after Phase 1 complete):
```bash
# Design System (parallel)
T010, T011, T012, T013, T014

# Sanity Setup (parallel)
T015, T016, T017, T018, T019, T020, T021, T022

# Webhook Setup (parallel after Sanity initialized)
T023a, T023b, T023c

# Utilities (parallel after design tokens ready)
T024, T025, T026

# Layout (parallel after fonts ready)
T027, T028, T029, T030
```

**Within US1** (after T031-T035):
```bash
# Data and components (parallel)
T036, T037, T039, T040, T050, T052, T053, T054, T064
```

**Phase 6**:
```bash
# SEO Infrastructure (parallel)
T114, T116, T117, T119, T120

# Homepage & Analytics (parallel)
T121, T135, T136, T137
```

---

## Implementation Strategy

### MVP First (Recommended for 2-3 week delivery)

1. **Week 1**: Phase 1 + Phase 2 (Setup + Foundation)
2. **Week 2**: Phase 3 - User Story 1 only (Product Catalog)
3. **Week 3**: Phase 6 - SEO + Homepage only
4. **Post-MVP**: Phase 4 (Blog) + Phase 5 (Contact) in subsequent iterations

### Incremental Delivery

- **Increment 1** (Week 2): Product catalog browsing + WhatsApp CTA → Deploy for user testing
- **Increment 2** (Week 3): Add SEO infrastructure + Homepage → Deploy for SEO
- **Increment 3** (Week 4): Add blog content engine → Deploy content marketing
- **Increment 4** (Week 5): Add contact page → Complete MVP

### Testing Strategy

- **No automated tests**: This spec does not require test generation
- **Manual testing**: Each user story has independent test criteria
- **Acceptance testing**: Verify against acceptance scenarios in spec.md
- **Regression testing**: Re-test each user story after each deployment

---

## Task Summary

- **Total Tasks**: 167 tasks (including verification tasks T143-T152)
- **Tasks by Phase**:
  - Phase 1: 9 tasks
  - Phase 2: 36 tasks (includes 9 webhook setup tasks T023a-T023i)
  - Phase 3 (US1): 38 tasks
  - Phase 4 (US2): 25 tasks
  - Phase 5 (US3): 14 tasks
  - Phase 6: 35 tasks

- **Parallelizable Tasks**: 46 tasks marked with [P]
- **User Story 1 Tasks**: 38 tasks (23% of total)
- **User Story 2 Tasks**: 25 tasks (15% of total)
- **User Story 3 Tasks**: 14 tasks (8% of total)
- **Webhook Tasks**: 9 tasks (T023a-T023i) for Sanity webhook instant updates

### Format Validation

✅ All tasks follow required checklist format:
- Checkbox prefix `- [ ]`
- Sequential Task ID (T001-T167)
- [P] marker included for parallelizable tasks
- [Story] label included for user story phases
- Clear description with file paths
