import { Suspense } from 'react'
import { getFeaturedProducts, getBentoCategories, getCategories } from '@/lib/sanity'
import { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import dynamic from 'next/dynamic'

// Dynamically import sections to avoid hydration issues
const DynamicFeaturedEssentials = dynamic<{ bentoCategories: any[] }>(
  () => import('@/components/home/FeaturedEssentialsBento'),
  { ssr: true }
)
const DynamicFeaturedProducts = dynamic(
  () => import('@/components/home/FeaturedProductsSection').then(mod => ({ default: mod.default })),
  { ssr: true }
)
const DynamicCategoryShowcase = dynamic(
  () => import('@/components/home/CategoryShowcaseSection').then(mod => ({ default: mod.default })),
  { ssr: true }
)
const DynamicTestimonials = dynamic(
  () => import('@/components/home/TestimonialsSection').then(mod => ({ default: mod.default })),
  { ssr: true }
)
const DynamicFinalCTA = dynamic(
  () => import('@/components/home/FinalCTASection').then(mod => ({ default: mod.default })),
  { ssr: true }
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Packaging Materials UAE | Wholesale Packaging Supplier Dubai',
    description:
      'Leading packaging materials supplier in Dubai, UAE. Corrugated boxes, stretch films, bubble wrap, and more. Wholesale prices with same-day delivery across UAE.',
    keywords: [
      'packaging materials UAE',
      'wholesale packaging Dubai',
      'corrugated boxes supplier',
      'stretch films UAE',
      'bubble wrap wholesale',
    ],
  }
}

export default async function HomePage() {
  // Fetch data for homepage sections
  const [products, bentoCategories, categories] = await Promise.all([
    getFeaturedProducts(),
    getBentoCategories(),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-bg-base selection:bg-brand-accent selection:text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* High Volume Essentials Bento */}
      <Suspense fallback={<div className="container py-20 text-center">Loading essentials...</div>}>
        <DynamicFeaturedEssentials bentoCategories={bentoCategories} />
      </Suspense>

      {/* Featured Products */}
      <Suspense fallback={<div className="container py-20 text-center">Loading products...</div>}>
        <DynamicFeaturedProducts products={products} />
      </Suspense>

      {/* Category Showcase */}
      <Suspense fallback={<div className="container py-20 text-center">Loading categories...</div>}>
        <DynamicCategoryShowcase categories={categories} />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<div className="container py-20 text-center">Loading testimonials...</div>}>
        <DynamicTestimonials />
      </Suspense>

      {/* Final CTA */}
      <Suspense fallback={<div className="container py-20 text-center">Loading...</div>}>
        <DynamicFinalCTA />
      </Suspense>
    </main>
  )
}
