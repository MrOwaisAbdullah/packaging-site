'use client'

import { motion } from 'framer-motion'

interface BlogCategoryFiltersProps {
  categories: Array<{ name: string; slug: string }>
  activeCategory?: string
  onCategoryChange: (category: string | null) => void
}

const categoryColors: Record<string, string> = {
  'All': 'bg-brand-primary text-white',
  'default': 'bg-bg-subtle text-brand-primary hover:bg-brand-primary/10',
}

export default function BlogCategoryFilters({ categories, activeCategory, onCategoryChange }: BlogCategoryFiltersProps) {
  // Create array with 'All' option and categories, using unique keys
  const categoryOptions = [
    { name: 'All', slug: 'all' },
    ...categories
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categoryOptions.map((category) => {
        const isActive = activeCategory === category.slug || (category.slug === 'all' && !activeCategory)

        return (
          <motion.button
            key={category.slug} // Use slug as unique key
            onClick={() => onCategoryChange(category.slug === 'all' ? null : category.slug)}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
              isActive
                ? categoryColors[category.name] || categoryColors.default
                : categoryColors.default
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        )
      })}
    </div>
  )
}
