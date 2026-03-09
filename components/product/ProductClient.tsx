'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ShieldCheck, Truck, ChevronRight } from 'lucide-react'
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton'
import { urlFor } from '@/sanity/lib/image'

const DEFAULT_SETTINGS = {
  phoneNumber: '+971500000000',
  whatsappNumber: '+971500000000',
  email: 'info@nextlevelpackaging.ae',
  address: 'Dubai, UAE'
}

export default function ProductClient({ product, settings = {}, relatedProducts }: any) {
  const config = { ...DEFAULT_SETTINGS, ...settings }
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="pb-24">
      {/* Main Product Section */}
      <section className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Image Gallery (Sticky) */}
          <div className="relative">
            <div className="sticky top-40 space-y-4">
              {/* Main Image Viewport */}
              <div className="aspect-[4/3] sm:aspect-square bg-bg-subtle rounded-3xl overflow-hidden border border-border-subtle relative group shadow-sm">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {product.images && product.images[activeImage]?.asset ? (
                      <Image
                        src={urlFor(product.images[activeImage].asset).width(800).height(800).url()}
                        alt={product.images[activeImage]?.alt || product.name.en}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-bg-subtle to-bg-base flex items-center justify-center">
                        <Package className="w-24 h-24 text-border-strong" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Badges Floating on Image */}
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                    {product.badges.map((badge: any, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider rounded-full shadow-lg backdrop-blur-md"
                        style={{ backgroundColor: badge.color }}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                        activeImage === index 
                          ? 'border-brand-primary shadow-md scale-95' 
                          : 'border-transparent hover:border-brand-primary/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {product.images[index]?.asset ? (
                        <Image
                          src={urlFor(product.images[index].asset).width(200).height(200).url()}
                          alt={product.images[index]?.alt || `${product.name.en} view ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-bg-subtle to-bg-base flex items-center justify-center">
                          <Package className="w-8 h-8 text-border-strong opacity-50" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            {/* Meta */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-bold text-brand-accent uppercase tracking-wider bg-brand-accent/10 px-3 py-1 rounded-full">
                {product.category?.name || 'Category'}
              </span>
              <span className="text-sm font-medium text-text-tertiary">
                SKU: <span className="text-text-secondary">{product.sku}</span>
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-heading font-black text-brand-primary mb-6 leading-[1.1] tracking-tight">
              {product.name.en}
            </h1>

            {/* Action Card */}
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
              <div className="mb-6">
                <span className="text-2xl font-bold text-brand-primary">Contact us for bulk pricing & MOQ</span>
                <p className="text-text-secondary mt-2">
                  Get a custom quote tailored to your business needs.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <WhatsAppButton
                  product={{
                    productName: product.name.en,
                    sku: product.sku,
                    moq: product.pricing?.moq,
                  }}
                  phoneNumber={config.whatsappNumber}
                  className="flex-1 min-w-[200px] py-4 text-base sm:text-lg shadow-lg shadow-green-500/20 rounded-xl"
                />
                <a
                  href={`tel:${config.phoneNumber}`}
                  className="px-8 py-4 bg-white border-2 border-brand-primary text-brand-primary hover:text-brand-primary rounded-xl hover:bg-bg-subtle transition-colors text-center font-bold flex items-center justify-center gap-2"
                >
                  Request Call
                </a>
              </div>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-bg-subtle/50">
                <ShieldCheck className="w-6 h-6 text-brand-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-primary text-sm">Premium Quality</h4>
                  <p className="text-xs text-text-secondary mt-1">Industrial-grade materials tested for UAE conditions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-bg-subtle/50">
                <Truck className="w-6 h-6 text-brand-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-primary text-sm">Fast Delivery</h4>
                  <p className="text-xs text-text-secondary mt-1">24-48 hour dispatch across Dubai, Sharjah & Ajman.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-brand-primary mb-4 flex items-center gap-2">
                 Product Overview
              </h2>
              <div className="prose prose-lg text-text-secondary leading-relaxed">
                {product.description?.en?.split('\n').map((paragraph: string, i: number) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="bg-white rounded-3xl border border-border-subtle overflow-hidden">
                <div className="bg-bg-subtle px-6 py-4 border-b border-border-subtle">
                  <h2 className="text-lg font-bold text-brand-primary">Technical Specifications</h2>
                </div>
                <div className="divide-y divide-border-subtle">
                  {product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="grid grid-cols-3 sm:grid-cols-4 px-6 py-4 hover:bg-bg-subtle/30 transition-colors">
                      <dt className="col-span-1 text-sm font-semibold text-text-secondary">{spec.label}</dt>
                      <dd className="col-span-2 sm:col-span-3 text-sm font-medium text-brand-primary">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-bg-subtle border-t border-border-subtle py-20 mt-12">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-heading font-bold text-brand-primary">Frequently Bought Together</h2>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-accent transition-colors">
                 View All Catalog <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p: any, i: number) => {
                const imageUrl = p.images?.[0]?.asset
                  ? urlFor(p.images[0].asset).width(200).height(200).url()
                  : null;
                return (
                <Link
                  key={p._id}
                  href={`/products/${p.category?.slug?.current || 'all'}/${p.slug?.current || p.slug}`}
                  className="group block h-full"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-border-subtle hover:border-brand-primary/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex items-center p-4 gap-4 h-full">
                     <div className="w-24 h-24 rounded-xl bg-bg-subtle flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-border-subtle group-hover:border-brand-primary/20 transition-colors">
                        {imageUrl ? (
                          <Image 
                            src={imageUrl}
                            alt={p.name.en}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <Package className="w-10 h-10 text-border-strong" />
                        )}
                     </div>
                     <div className="flex-1">
                       <p className="text-xs text-brand-accent font-bold uppercase tracking-wider mb-1">{p.category?.name}</p>
                       <h3 className="font-bold text-brand-primary group-hover:text-brand-accent transition-colors line-clamp-2 leading-tight mb-2">{p.name.en}</h3>
                     </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
