import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/sanity/lib/webhook'
import { rateLimitMiddleware } from '@/lib/rate-limit'

interface SanityWebhookPayload {
  _id: string
  _type: 'product' | 'post' | 'postCategory' | 'category' | 'settings'
  slug?: {
    current: string
  }
  operation: 'create' | 'update' | 'delete'
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (20 requests per minute for webhooks)
    const rateLimitResponse = rateLimitMiddleware(request, {
      limit: 20,
      window: 60 * 1000, // 1 minute
    })

    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Verify signature and parse body in one step
    // parseBody from next-sanity/webhook handles raw body reading internally
    const { isValidSignature, body } = await verifyWebhookSignature<SanityWebhookPayload>(request)

    if (!isValidSignature || !body) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid signature' },
        { status: 401 }
      )
    }

    const payload = body

    console.log('Webhook received:', {
      type: payload._type,
      operation: payload.operation,
      slug: payload.slug?.current,
    })

    // Revalidate based on content type
    const tags: string[] = []

    switch (payload._type) {
      case 'product':
        tags.push('products')
        tags.push('featured') // Featured products section
        if (payload.slug?.current) {
          tags.push(`product:${payload.slug.current}`)
        }
        // Product changes affect categories too
        tags.push('categories')
        break

      case 'post':
        tags.push('posts')
        if (payload.slug?.current) {
          tags.push(`post:${payload.slug.current}`)
        }
        break

      case 'postCategory':
        tags.push('blogCategories')
        // Category changes affect posts
        tags.push('posts')
        if (payload.slug?.current) {
          tags.push(`blogCategory:${payload.slug.current}`)
        }
        break

      case 'category':
        tags.push('categories')
        // Category changes affect products
        tags.push('products')
        tags.push('featured') // Featured products may be affected
        if (payload.slug?.current) {
          tags.push(`category:${payload.slug.current}`)
        }
        break

      case 'settings':
        // Settings affect all pages
        tags.push('products', 'posts', 'categories', 'blogCategories', 'featured')
        break

      default:
        console.warn('Unknown content type in webhook:', payload._type)
    }

    // Perform revalidation
    for (const tag of tags) {
      revalidateTag(tag, {}) // Second arg required in Next.js 15: CacheLifeConfig
      console.log('Revalidated tag:', tag)
    }

    return NextResponse.json(
      {
        success: true,
        revalidated: true,
        tags,
        message: 'Cache invalidated successfully',
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': process.env.SANITY_WEBHOOK_ORIGIN || '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Sanity-Webhook-Signature',
        },
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to process webhook',
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.SANITY_WEBHOOK_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Sanity-Webhook-Signature',
    },
  })
}

// Allow POST requests only
export const dynamic = 'force-dynamic'
