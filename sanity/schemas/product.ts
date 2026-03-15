import { defineType, defineField } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    // Basic Info
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic (Phase 2)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      description: 'Unique product identifier (e.g., SF-HG-001)',
      validation: (Rule) => Rule.required().uppercase(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show this product on the homepage featured section',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active Product',
      type: 'boolean',
      description: 'Turn off to hide this product from the website',
      initialValue: true,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 5,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic (Phase 2)',
          type: 'text',
          rows: 5,
        }),
      ],
    }),
    // Specifications
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        defineField({
          name: 'spec',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
          ],
        }),
      ],
    }),
    // Images
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        defineField({
          name: 'productImage',
          type: 'object',
          fields: [
            defineField({
              name: 'asset',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'isPrimary',
              title: 'Primary Image',
              type: 'boolean',
              initialValue: false,
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),
    // Pricing
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        defineField({
          name: 'showPrice',
          title: 'Show Price',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'priceFrom',
          title: 'Price From (AED)',
          type: 'number',
        }),
        defineField({
          name: 'priceTo',
          title: 'Price To (AED)',
          type: 'number',
        }),
        defineField({
          name: 'moq',
          title: 'MOQ',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          initialValue: 'pieces',
          options: {
            list: [
              { title: 'Pieces', value: 'pieces' },
              { title: 'Boxes', value: 'boxes' },
              { title: 'Kilograms', value: 'kg' },
              { title: 'Meters', value: 'm' },
              { title: 'Rolls', value: 'rolls' },
            ],
          },
        }),
      ],
    }),
    // Badges
    defineField({
      name: 'badges',
      title: 'Product Badges',
      type: 'array',
      of: [
        defineField({
          name: 'badge',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              options: {
                list: [
                  { title: 'Best Seller', value: 'Best Seller' },
                  { title: 'New', value: 'New' },
                  { title: 'Limited Stock', value: 'Limited Stock' },
                  { title: 'Popular', value: 'Popular' },
                  { title: 'Sale', value: 'Sale' },
                ],
              },
            }),
            defineField({
              name: 'color',
              type: 'string',
              initialValue: '#FF6B35',
            }),
          ],
        }),
      ],
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      sku: 'sku',
      featured: 'featured',
      media: 'images.0.asset',
    },
    prepare(selection) {
      return {
        title: `${selection.featured ? '⭐ ' : ''}${selection.title}`,
        subtitle: `SKU: ${selection.sku}`,
        media: selection.media,
      }
    },
  },
})
