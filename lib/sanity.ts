import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '@/sanity/env'

// Validate Sanity configuration
if (!projectId) {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    '⚠️  Sanity Project ID not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local\n' +
    'Get your Project ID from: https://www.sanity.io/manage\n' +
    'Using mock data for development.'
  )
}

const config = {
  projectId: projectId || 'mock', // Fallback for development
  dataset,
  apiVersion,
  useCdn: false, // Disable for ISR
  stega: {
    enabled: false,
  },
  token: token || undefined, // Use token for authenticated requests
}

export const client = createClient(config)

/**
 * Check if using mock data (Sanity not configured)
 */
const isUsingMockData = !projectId

/**
 * Helper function to fetch data with caching
 * Uses Next.js 15 fetch caching with tag-based revalidation
 *
 * When tags are provided: use on-demand revalidation via webhook
 * When no tags: use time-based revalidation (default 3600s = 1 hour)
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown> | undefined,
  tags?: string[]
): Promise<T> {
  if (isUsingMockData) {
    return getMockData<T>(query)
  }

  return client.fetch<T>(query, params || {}, {
    cache: 'force-cache', // Required for Next.js 15
    next: {
      revalidate: tags && tags.length > 0 ? false : 3600, // Disable time-based revalidation when using tags
      tags,
    },
  })
}

/**
 * Mock data for development when Sanity is not configured
 */
function getMockData<T>(query: string): T {
  if (query.includes('post') || query.includes('blog')) {
    // Return mock blog posts
    return [
      {
        _id: 'post1',
        _type: 'post',
        title: '5 Essential Packaging Materials Every UAE Business Needs',
        slug: { current: 'essential-packaging-materials-uae-business' },
        summary: 'Discover the top packaging solutions that help UAE businesses protect their products and impress customers.',
        content: [],
        publishedAt: '2025-01-15T08:00:00Z',
        _updatedAt: '2025-01-15T08:00:00Z',
        featured: true,
        mainImage: null,
        categories: [],
        seo: { metaTitle: 'Essential Packaging Materials UAE', metaDescription: 'Top packaging solutions for UAE businesses' }
      },
      {
        _id: 'post2',
        _type: 'post',
        title: 'How to Choose the Right Corrugated Box for Your Products',
        slug: { current: 'choose-right-corrugated-box' },
        summary: 'A complete guide to selecting the perfect corrugated box based on weight, size, and protection needs.',
        content: [],
        publishedAt: '2025-01-10T08:00:00Z',
        _updatedAt: '2025-01-10T08:00:00Z',
        featured: false,
        mainImage: null,
        categories: [],
        seo: {}
      },
      {
        _id: 'post3',
        _type: 'post',
        title: 'Sustainable Packaging: Trends Shaping the UAE Market in 2025',
        slug: { current: 'sustainable-packaging-trends-uae-2025' },
        summary: 'Explore eco-friendly packaging options that are gaining popularity among environmentally conscious businesses.',
        content: [],
        publishedAt: '2025-01-05T08:00:00Z',
        _updatedAt: '2025-01-05T08:00:00Z',
        featured: true,
        mainImage: null,
        categories: [],
        seo: {}
      },
      {
        _id: 'post4',
        _type: 'post',
        title: 'Stretch Film vs Shrink Wrap: Understanding the Differences',
        slug: { current: 'stretch-film-vs-shrink-wrap-differences' },
        summary: 'Learn about the key differences between these two popular packaging materials and when to use each.',
        content: [],
        publishedAt: '2024-12-20T08:00:00Z',
        _updatedAt: '2024-12-20T08:00:00Z',
        featured: false,
        mainImage: null,
        categories: [],
        seo: {}
      },
      ] as T
  }

  if (query.includes('category')) {
    // Return categories array directly - format matches GROQ projection "slug": slug.current
    return [
      { _id: 'cat1', name: 'Corrugated Boxes', slug: 'corrugated-boxes', order: 1 },
      { _id: 'cat2', name: 'Stretch Films', slug: 'stretch-films', order: 2 },
      { _id: 'cat3', name: 'Bubble Wrap', slug: 'bubble-wrap', order: 3 },
      { _id: 'cat4', name: 'Tapes', slug: 'tapes', order: 4 },
      { _id: 'cat5', name: 'Packaging Paper', slug: 'packaging-paper', order: 5 },
      { _id: 'cat6', name: 'Boxes', slug: 'boxes', order: 6 },
    ] as T
  }

  if (query.includes('blogCategory') || query.includes("'postCategory'")) {
    // Return blog categories
    return [
      { _id: 'bc1', name: 'Packaging Guides', slug: 'packaging-guides' },
      { _id: 'bc2', name: 'Industry Insights', slug: 'industry-insights' },
      { _id: 'bc3', name: 'Sustainability', slug: 'sustainability' },
      { _id: 'bc4', name: 'Product Tips', slug: 'product-tips' },
    ] as T
  }

  if (query.includes('settings')) {
    return {
      whatsappNumber: '+971500000000',
      phoneNumber: '+971500000000',
      email: 'info@nextlevelpackaging.ae',
      address: 'Dubai, UAE',
      socialLinks: {},
      name: 'NextLevel Packaging UAE',
      businessHours: 'Sat - Thu: 9:00 AM - 6:00 PM'
    } as T
  }

  return {} as T
}

/**
 * Get all products with basic projections
 */
export async function getProducts() {
  return sanityFetch<any[]>(
    `*[_type == "product"]{
      _id,
      name,
      "slug": slug.current,
      sku,
      category->{name, "slug": slug.current},
      images[]{..., asset->},
      mainImage{..., asset->},
      pricing,
      badges,
      featured,
      seo
    }|order(order asc)`,
    undefined,
    ['products'] // Tag for webhook revalidation
  )
}

/**
 * Get featured products for homepage
 * Falls back to all products if none are marked as featured
 */
export async function getFeaturedProducts() {
  const featured = await sanityFetch<any[]>(
    `*[_type == "product" && featured == true]{
      _id,
      name,
      "slug": slug.current,
      sku,
      category->{name, "slug": slug.current},
      images[]{..., asset->},
      mainImage{..., asset->},
      pricing,
      badges,
      featured
    }|order(order asc)`,
    undefined,
    ['products', 'featured'] // Tags for webhook revalidation
  )

  // Fallback: if no products are marked featured, return first 6 of all products
  if (!featured || featured.length === 0) {
    return getProducts()
  }

  return featured
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string) {
  return sanityFetch<any>(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      sku,
      category->{name, "slug": slug.current},
      description,
      specifications,
      images[]{..., asset->},
      pricing,
      badges,
      seo,
      _createdAt,
      _updatedAt
    }`,
    { slug },
    [`product:${slug}`]
  )
}

/**
 * Get all categories
 */
export async function getCategories() {
  return sanityFetch<any[]>(
    `*[_type == "category"]{
      _id,
      name,
      "slug": slug.current,
      description,
      icon,
      order
    }|order(order asc)`,
    undefined,
    ['categories'] // Tag for webhook revalidation
  )
}

/**
 * Get blog categories
 */
export async function getBlogCategories() {
  return sanityFetch<any[]>(
    `*[_type == "postCategory"]{
      _id,
      name,
      "slug": slug.current
    }|order(name asc)`,
    undefined,
    ['blogCategories'] // Tag for webhook revalidation
  )
}

/**
 * Get products by category slug
 */
export async function getProductsByCategory(categorySlug: string) {
  return sanityFetch<any[]>(
    `*[_type == "product" && category->slug.current == $categorySlug]{
      _id,
      name,
      "slug": slug.current,
      sku,
      category->{name, "slug": slug.current},
      images[]{..., asset->},
      mainImage,
      pricing,
      badges
    }|order(order asc)`,
    { categorySlug },
    ['products', `category:${categorySlug}`]
  )
}

/**
 * Get all blog posts
 */
export async function getPosts(limit = 10) {
  return sanityFetch<any[]>(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit]{
      _id,
      title,
      "slug": slug.current,
      summary,
      mainImage,
      publishedAt,
      categories[]->{name, "slug": slug.current},
      featured,
      seo
    }`,
    { limit },
    ['posts']
  )
}

/**
 * Get post by slug
 */
export async function getPostBySlug(slug: string) {
  return sanityFetch<any>(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      summary,
      content,
      mainImage,
      publishedAt,
      categories[]->{name, "slug": slug.current},
      featured,
      seo,
      _createdAt,
      _updatedAt
    }`,
    { slug },
    [`post:${slug}`]
  )
}

/**
 * Get site settings - STATIC VALUES (not from Sanity)
 * Contact details remain static and can be updated here
 */
export async function getSettings() {
  // Static contact information - update these values directly
  return {
    whatsappNumber: '+971500000000',
    phoneNumber: '+971500000000',
    email: 'info@nextlevelpackaging.ae',
    address: 'Dubai, UAE',
    socialLinks: {
      facebook: 'https://facebook.com/nextlevelpackaging',
      instagram: 'https://instagram.com/nextlevelpackaging',
      linkedin: 'https://linkedin.com/company/nextlevelpackaging',
      twitter: 'https://twitter.com/nextlevelpackaging'
    },
    businessHours: 'Sat - Thu: 9:00 AM - 6:00 PM',
    name: 'NextLevel Packaging UAE'
  }
}
