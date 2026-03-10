'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  Box,
  Film,
  Shield,
  FileText,
  Package,
  ShoppingCart,
} from 'lucide-react'

interface Category {
  _id: string
  name: string
  slug: string
  icon?: string
  description?: string
}

interface CategoryShowcaseSectionProps {
  categories: Category[]
}

// Icon mapping for categories
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'corrugated-boxes': Package,
  'boxes': Box,
  'stretch-films': Film,
  'bubble-wrap': Shield,
  'tapes': Package, // Use Package for tapes
  'packaging-paper': FileText,
  'default': ShoppingCart,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
}

export default function CategoryShowcaseSection({ categories }: CategoryShowcaseSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/5 text-brand-primary text-sm font-semibold tracking-wider uppercase mb-4 border border-brand-primary/10">
            Product Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-brand-primary tracking-tight">
            Browse by Solution
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Comprehensive packaging materials for every industry requirement.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories?.slice(0, 6).map((category) => {
            const IconComponent = categoryIcons[category.slug] || categoryIcons.default

            return (
              <motion.div key={category._id} variants={item} className="h-full">
                <Link
                  href={`/products/${category.slug}`}
                  className="group block h-full"
                >
                  <div className="relative bg-white rounded-2xl p-6 border border-border-subtle hover:border-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 h-full flex items-center overflow-hidden z-10 group/category">
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/[0.02] to-transparent opacity-0 group-hover/category:opacity-100 transition-opacity duration-500 z-0" />
                    
                    {/* Icon */}
                    <div className="relative w-16 h-16 shrink-0 bg-bg-subtle rounded-2xl flex items-center justify-center mr-6 group-hover/category:bg-brand-primary group-hover/category:shadow-lg transition-all duration-500 z-10">
                      <IconComponent className="w-8 h-8 text-brand-primary group-hover/category:text-white group-hover/category:scale-110 transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <div className="relative flex-1 text-left z-10">
                      <h3 className="font-bold text-brand-primary mb-1 text-lg group-hover/category:text-brand-accent transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-sm font-medium text-text-secondary group-hover/category:text-brand-primary transition-colors duration-300">
                        <span>Explore range</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover/category:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* See All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-primary border-2 border-brand-primary rounded-xl font-semibold hover:bg-brand-primary hover:text-white transition-all duration-300"
          >
            See All Range
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

CategoryShowcaseSection.Skeleton = function Skeleton() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <div className="h-6 bg-bg-subtle rounded w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-12 bg-bg-subtle rounded w-96 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-bg-subtle rounded w-64 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-bg-base rounded-2xl p-6 h-48" />
          ))}
        </div>
      </div>
    </section>
  )
}
