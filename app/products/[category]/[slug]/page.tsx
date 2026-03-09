import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProductClient from '@/components/product/ProductClient'
import { getProductBySlug, getProductsByCategory, getSettings } from '@/lib/sanity'

export const revalidate = 3600

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.name.en} | NextLevel Packaging UAE`,
    description: product.description?.en
      ? product.description.en.substring(0, 160)
      : `Buy premium ${product.name.en} in Dubai, Sharjah, and Ajman. Best wholesale packaging materials for businesses.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params

  // Fetch product, settings and related products in parallel
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSettings(),
  ])

  if (!product) {
    notFound()
  }

  // Fetch related products from the same category (exclude current product)
  const categoryProducts = await getProductsByCategory(category)
  let relatedProducts = categoryProducts
    .filter((p: any) => p.slug !== slug) 
    .slice(0, 3)

  // Fallback: If less than 3 related products, fetch from other categories
  if (relatedProducts.length < 3) {
    const { getProducts } = await import('@/lib/sanity')
    const allProducts = await getProducts()
    const fallbackProducts = allProducts
      .filter((p: any) => 
        p.slug !== slug && 
        !relatedProducts.some((rp: any) => rp.slug === p.slug)
      )
      .slice(0, 3 - relatedProducts.length)
    
    relatedProducts = [...relatedProducts, ...fallbackProducts]
  }

  return (
    <main className="min-h-screen bg-bg-base">
      {/* Header & Breadcrumbs */}
      <section className="bg-white border-b border-border-subtle pt-20 pb-4 lg:pt-24 lg:pb-6 relative z-10 shadow-sm">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { 
                label: product.category?.name || (category !== 'all' ? category : 'All Products'), 
                href: `/products/${product.category?.slug || (category !== 'all' ? category : '')}` 
              },
              { label: product.name.en, current: true },
            ]}
          />
        </div>
      </section>

      {/* Main Product Layout (Client Component for Interactivity) */}
      <ProductClient 
        product={product} 
        settings={settings} 
        relatedProducts={relatedProducts} 
      />
    </main>
  )
}
