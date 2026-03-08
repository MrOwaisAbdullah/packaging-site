import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: any) => {
  // Handle mock data or null sources
  if (!source || !projectId || projectId === 'mock') {
    // Return a mock URL builder that works with placeholder sources
    return {
      url: () => {
        // Generate a placeholder gradient image URL
        const encoded = encodeURIComponent('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14">Image Coming Soon</text></svg>')
        return `data:image/svg+xml,${encoded}`
      },
    } as any
  }
  return builder.image(source)
}

// Helper for Open Graph images (1200x630)
export const ogImage = (source: any) => {
  return urlFor(source).width(1200).height(630).fit('crop').quality(85).url()
}

// Helper for responsive images
export const responsiveImage = (source: any, width: number) => {
  return urlFor(source).width(width).quality(80).auto('format').url()
}
