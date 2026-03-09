# Research & Technical Decisions

**Feature**: Packaging Website Foundation
**Date**: 2026-03-05
**Status**: Complete

---

## Research Task 1: Next.js 15 App Router Best Practices

**Question**: What are the best practices for using Next.js 15 App Router for a content-heavy e-commerce catalog site?

**Decision**: Use Server Components by default, Client Components only for interactivity. Implement ISR with appropriate revalidation times. Use `React.cache()` for Sanity query deduplication.

**Rationale**: Server Components reduce bundle size by 40%+ compared to Client Components, improve SEO through server rendering, and enable progressive rendering with Suspense boundaries. ISR provides the benefits of static generation with fresh content without full rebuilds.

**Alternatives Considered**:
- Pages Router: Deprecated for new projects, less performant
- Static Export: Limited ISR support, cannot use on-demand revalidation
- SSG + CSR: Would require separate API routes for content

**Best Practices Applied**:
- All pages are Server Components by default
- Client Components only for interactive features (filters, mobile menu, WhatsApp float)
- `async-suspense-boundaries` rule: Wrap ProductGrid and BlogPost in Suspense with skeleton fallback
- `server-cache-react` rule: Wrap Sanity client in `React.cache()` for deduplication
- `bundle-dynamic-imports` rule: Load FilterBar, MobileNav, WhatsAppFloat via `next/dynamic`

---

## Research Task 2: Sanity CMS vs Contentful vs Strapi

**Question**: Which headless CMS provides the best integration with Next.js 15 and supports real-time content updates?

**Decision**: Sanity CMS v3

**Rationale**: Sanity offers the tightest Next.js integration with `next-sanity` package, embedded studio for in-DM editing, real-time content updates via Live Content API, and superior developer experience with GROQ query language. The embedded studio at `/studio` route eliminates separate CMS hosting costs.

**Alternatives Considered**:
- Contentful: More expensive, no embedded studio, weaker Next.js integration
- Strapi: Self-hosted complexity, requires separate backend deployment, weaker TypeScript support
- Prismic: More rigid content modeling, expensive for growing content needs

**Best Practices Applied**:
- Use GROQ projections (always select specific fields, never `*`)
- Implement `React.cache()` wrapper for query deduplication
- Use ISR with `useCdn: false` for fresh content
- Configure structure.ts for organized Studio navigation

---

## Research Task 3: Typography Strategy

**Question**: Which typography combination provides premium industrial aesthetic while maintaining performance and constitution compliance?

**Decision**: Outfit (headings) + Plus Jakarta Sans (body), both via `next/font/google` for Phase 1. Clash Display local hosting for Phase 2.

**Rationale**: Outfit provides a premium, geometric sans-serif appearance suitable for industrial branding. Plus Jakarta Sans offers excellent readability and extensive language support. Both available via Google Fonts with `next/font` automatic optimization (self-hosting, no FOUT).

**Alternatives Considered**:
- Inter: Banned by constitution (too generic)
- Roboto: Banned by constitution (overused)
- Arial: Banned by constitution (system font fallback only)
- Clash Display local: Requires additional setup, file management

**Best Practices Applied**:
- Load fonts via `next/font/google` with `display: 'swap'`
- Subset fonts to include only needed characters
- Use font-display: swap for immediate rendering
- Apply via CSS variables in `app/layout.tsx`

---

## Research Task 4: Animation Strategy

**Question**: How do we implement premium micro-interactions and scroll storytelling without violating performance constraints?

**Decision**: Motion.dev (Framer Motion) for component transitions, GSAP ScrollTrigger for scroll-linked animations.

**Rationale**: Motion.dev excels at hover states, tap feedback, and layout transitions with minimal bundle impact. GSAP ScrollTrigger is the industry standard for scroll-linked animations and provides superior control for complex sequencing.

**Alternatives Considered**:
- React Spring: Less maintained, smaller community
- Framer-only: Limited scroll capabilities, heavier bundle for advanced features
- CSS-only: Limited animation capabilities, poor cross-browser support

**Best Practices Applied**:
- `bundle-dynamic-imports`: Load GSAP and Motion components via `next/dynamic`
- Use Motion.dev for: whileHover, whileTap, AnimatePresence
- Use GSAP for: ScrollTrigger timelines, parallax effects
- Implement `prefer-reduced-motion` media query for accessibility

---

## Research Task 5: ISR Revalidation Strategy

**Question**: What revalidation strategy balances freshness with performance for products and blog content?

**Decision**: Hybrid approach: Time-based ISR (Products: 3600s, Blog: 60s) + Sanity webhook for instant on-demand updates

**Rationale**: Time-based ISR provides baseline freshness with minimal overhead. Sanity webhook enables instant updates when content is published/edited, eliminating wait time for critical changes. Tag-based revalidation allows granular cache invalidation (e.g., only revalidate a specific product, not the entire product catalog).

**Alternatives Considered**:
- ISR only: Users wait up to 1 hour for product updates
- On-demand only: No fallback if webhook fails
- Live Content API: Requires API token, more complex setup
- Static generation: Would require full rebuilds for content changes

**Best Practices Applied**:
- Use `export const revalidate = 3600` in product pages
- Use `export const revalidate = 60` in blog pages
- Implement webhook at `/api/webhook/sanity` with signature verification
- Use tag-based revalidation: `revalidateTag('products')`, `revalidateTag('product:{slug}')`
- Configure fallback to time-based ISR if webhook fails
- Verify webhook signature using `@sanity/webhook` package

---

## Research Task 6: Image Optimization Approach

**Question**: How do we optimize product and blog images for fast loading while maintaining visual quality?

**Decision**: `next/image` with AVIF/WebP formats, Sanity image CDN with automatic optimization.

**Rationale**: Next.js Image Optimization automatically resizes, optimizes, and serves images in modern formats. Sanity provides a fast CDN with built-in optimization. Together they provide sub-2s LCP even with 3-5 images per product.

**Alternatives Considered**:
- Unoptimized: Too slow, violates performance requirements
- Cloudinary: Additional cost, redundant with Sanity
- Manual optimization: Not scalable for 60+ products with 3-5 images each

**Best Practices Applied**:
- Use `next/image` for all product and blog images
- Configure `sizes` attribute for responsive images
- Use `fill` prop for hero images
- Implement placeholder blur for perceived performance
- Configure `imageSizes` in next.config.ts

---

## Summary of Technical Decisions

| Area | Decision | Impact |
|------|----------|--------|
| Framework | Next.js 15 App Router | SEO, performance, streaming |
| CMS | Sanity CMS v3 | Real-time updates, embedded studio |
| Styling | Tailwind CSS v4 | Rapid development, small bundle |
| Fonts | Outfit + Plus Jakarta Sans | Premium aesthetic, performance |
| Animations | Motion.dev + GSAP | Premium UX without performance hit |
| ISR | Products 1h, Blog 1m | Fresh content without rebuilds |
| Images | next/image + Sanity CDN | Fast loads, optimized formats |

All technical decisions align with constitutional principles and mandatory skill integrations.
