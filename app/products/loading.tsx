import { ProductCardSkeleton } from '@/components/product/ProductDetailSkeleton'

/**
 * Loading state for products listing page
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header Skeleton */}
      <div className="bg-bg-subtle border-b border-border-subtle pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="h-10 w-64 bg-bg-subtle rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-full bg-bg-subtle rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-bg-subtle rounded animate-pulse mt-2" />
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="container py-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-32 bg-bg-subtle rounded-lg animate-pulse" />
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
