'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, WrapText, Shield, Sparkles, Box } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

interface FeaturedEssentialsBentoProps {
  bentoProducts?: any[]
}

const essentials = [
  {
    id: 'stretch-films',
    title: 'Stretch Films & Stitch Rolls',
    subtitle: 'Industrial grade wrapping for pallet stability',
    href: '/products/stretch-films',
    icon: WrapText,
    color: 'bg-blue-500/10 text-blue-600',
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-2',
    gradient: 'from-blue-500/5 to-transparent',
  },
  {
    id: 'bubble-wrap',
    title: 'Bubble Sheets',
    subtitle: 'Maximized impact protection',
    href: '/products/bubble-wrap',
    icon: Shield,
    color: 'bg-purple-500/10 text-purple-600',
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1',
    gradient: 'from-purple-500/5 to-transparent',
  },
  {
    id: 'cotton-rolls',
    title: 'Cotton Rolls',
    subtitle: 'Soft, non-abrasive surface protection',
    href: '/products/cotton-rolls', // Assuming this slug exists or will exist
    icon: Sparkles,
    color: 'bg-emerald-500/10 text-emerald-600',
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1',
    gradient: 'from-emerald-500/5 to-transparent',
  },
  {
    id: 'boxes',
    title: 'Heavy Duty Boxes',
    subtitle: 'Engineered for logistics & e-commerce',
    href: '/products/boxes',
    icon: Box,
    color: 'bg-brand-primary/10 text-brand-primary',
    colSpan: 'md:col-span-3 lg:col-span-2',
    rowSpan: 'md:row-span-1',
    gradient: 'from-brand-primary/5 to-transparent',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
}

export default function FeaturedEssentialsBento({ bentoProducts = [] }: FeaturedEssentialsBentoProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden" suppressHydrationWarning>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" suppressHydrationWarning>
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary/[0.03] blur-3xl opacity-50 mix-blend-multiply" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-accent/[0.03] blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="container relative z-10" suppressHydrationWarning>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
          suppressHydrationWarning
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/5 text-brand-primary text-sm font-semibold tracking-wider uppercase mb-4 border border-brand-primary/10">
            High-Volume Essentials
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-text-primary tracking-tight">
            Industry Standard Supplies
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Our most requested packaging materials, engineered for maximum protection and logistical efficiency. Available in wholesale quantities.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6"
          suppressHydrationWarning
        >
          {essentials.map((card) => {
            const Icon = card.icon
            // Match our bento categories to actual Sanity products securely
            let product = null;
            if (card.id === 'stretch-films') {
              product = bentoProducts.find(p => p.category?.slug === 'films-wraps' || p.name.toLowerCase().includes('stretch'));
            } else if (card.id === 'bubble-wrap') {
              product = bentoProducts.find(p => p.category?.slug === 'foams-boards' && p.name.toLowerCase().includes('bubble')) || bentoProducts.find(p => p.category?.slug === 'foams-boards');
            } else if (card.id === 'cotton-rolls') {
              product = bentoProducts.find(p => (p.category?.slug === 'foams-boards' || p.category?.slug === 'tapes') && p.name.toLowerCase().includes('cotton')) || bentoProducts.find(p => p.category?.slug === 'tapes');
            } else if (card.id === 'boxes') {
              product = bentoProducts.find(p => p.category?.slug === 'boxes-cartons');
            }
            
            // Stable fallback: use index to avoid hydration mismatch, ensuring it always has a background product
            const index = essentials.findIndex(c => c.id === card.id);
            if (!product && bentoProducts.length > index) {
               product = bentoProducts[index];
            } else if (!product && bentoProducts.length > 0) {
               product = bentoProducts[0];
            }

            const mainImage = product?.images?.[0]?.asset || product?.mainImage?.asset
            const imageUrl = mainImage ? urlFor(mainImage).width(600).url() : null

            return (
              <motion.div
                key={card.id}
                variants={item}
                className={`relative group ${card.colSpan} ${card.rowSpan}`}
                suppressHydrationWarning
              >
                <Link href={card.href} className="block w-full h-full">
                  <div className={`w-full h-full rounded-3xl p-8 border border-border-subtle bg-white hover:border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 overflow-hidden relative flex flex-col`}>
                    
                    {/* Background Image (if exists) */}
                    {imageUrl && (
                      <div className="absolute inset-0 w-full h-full z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-multiply">
                        <Image
                          src={imageUrl}
                          alt={product.name || card.title}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Gradient overlay to ensure text is readable */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                      </div>
                    )}

                    {/* Hover Gradient Background (always applies) */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
                    
                    {/* Top Section: Icon & Arrow */}
                    <div className="flex justify-between items-start relative z-10 mb-auto">
                      <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm border border-black/5 bg-white`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 shadow-md">
                        <ArrowUpRight className="w-5 h-5 text-brand-primary" />
                      </div>
                    </div>

                    {/* Bottom Section: Text */}
                    <div className="relative z-10 mt-8">
                      <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-brand-primary transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-text-secondary font-medium">
                        {card.subtitle}
                      </p>
                    </div>

                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
