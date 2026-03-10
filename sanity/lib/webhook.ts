import { parseBody } from 'next-sanity/webhook'
import type { NextRequest } from 'next/server'

const secret = process.env.SANITY_WEBHOOK_SECRET || ''

/**
 * Verify Sanity webhook signature and parse body
 * This uses next-sanity's parseBody which properly handles raw body reading
 * and signature verification for Next.js App Router
 *
 * @param request - NextRequest object
 * @param waitForConsistency - Wait for Sanity Content Lake eventual consistency (default: true)
 * @returns Object with isValidSignature and parsed body
 */
export async function verifyWebhookSignature<T = Record<string, unknown>>(
  request: NextRequest,
  waitForConsistency: boolean = true
): Promise<{ isValidSignature: boolean | null; body: T | null }> {
  if (!secret) {
    console.error('SANITY_WEBHOOK_SECRET is not configured')
    return { isValidSignature: false, body: null }
  }

  try {
    // parseBody handles raw body reading and signature verification
    // waitForConsistency ensures queries won't get stale data after revalidation
    const result = await parseBody<T>(request, secret, waitForConsistency)
    return result
  } catch (error) {
    console.error('Error parsing webhook body:', error)
    return { isValidSignature: false, body: null }
  }
}

/**
 * Get signature header name for reference
 */
export const WEBHOOK_SIGNATURE_HEADER = 'x-sanity-webhook-signature'
