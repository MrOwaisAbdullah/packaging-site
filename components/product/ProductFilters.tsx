'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, LayoutGrid } from 'lucide-react'

interface ProductFiltersProps {
  categories: Array<{
    _id: string
    name: string
    slug: string
  }>
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const pathname = usePathname()

  return (
    <div className="bg-white border border-border-subtle rounded-2xl p-4 lg:p-6 sticky top-24 shadow-sm overflow-hidden">
      <div className="hidden lg:flex items-center gap-3 mb-6 pb-6 border-b border-border-subtle">
        <div className="w-10 h-10 bg-brand-primary/5 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <h3 className="font-heading font-bold text-xl text-brand-primary">Categories</h3>
      </div>
      
      <ul className="flex overflow-x-auto lg:flex-col gap-2 lg:gap-0 lg:space-y-2 pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] -mx-2 px-2 lg:mx-0 lg:px-0">
        <li className="shrink-0">
          <Link
            href="/products"
            className={`flex items-center justify-between px-5 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap ${
              pathname === '/products' || pathname === '/products/all'
                ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                : 'bg-bg-subtle lg:bg-transparent text-text-secondary hover:bg-bg-subtle hover:text-brand-primary border border-border-subtle/50 lg:border-transparent'
            }`}
          >
            All Products
            {(pathname === '/products' || pathname === '/products/all') && (
              <ChevronRight className="hidden lg:block w-4 h-4 ml-2 opacity-70" />
            )}
          </Link>
        </li>
        {categories.map((category) => {
          const isActive = pathname.includes(`/products/${category.slug}`)
          return (
            <li key={category._id} className="shrink-0">
              <Link
                href={`/products/${category.slug}`}
                className={`flex items-center justify-between px-5 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all duration-300 font-medium whitespace-nowrap group ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                    : 'bg-bg-subtle lg:bg-transparent text-text-secondary hover:bg-bg-subtle hover:text-brand-primary border border-border-subtle/50 lg:border-transparent'
                }`}
              >
                {category.name}
                <ChevronRight className={`hidden lg:block w-4 h-4 ml-2 transition-transform ${isActive ? 'opacity-70' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
