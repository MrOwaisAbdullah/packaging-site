// API Route Contracts
// Defines input/output contracts for all API routes

import { z } from 'zod';

// ============================================================
// Contact Form API
// ============================================================

export const ContactFormInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject must not exceed 200 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must not exceed 2000 characters"),
  productInterest: z.string().optional(),
  quantity: z.number().positive("Quantity must be positive").optional(),
});

export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export interface ContactFormResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

// ============================================================
// WhatsApp Link API (client-side utility, not an API route)
// ============================================================

export interface WhatsAppMessageContext {
  productName: string;
  sku: string;
  quantity?: number;
  customMessage?: string;
}

export interface WhatsAppLinkResult {
  url: string;
  message: string;
}

// ============================================================
// Sanity Fetch API (internal, not exposed)
// ============================================================

export interface SanityFetchOptions {
  revalidate?: number;
  tags?: string[];
}

// ============================================================
// Search API
// ============================================================

export const SearchFiltersSchema = z.object({
  category: z.string().optional(),
  query: z.string().min(2, "Search query must be at least 2 characters").max(100, "Search query too long"),
  priceRange: z.enum(['under-50', '50-100', '100-500', 'over-500']).optional(),
  inStock: z.boolean().optional(),
});

export type SearchFilters = z.infer<typeof SearchFiltersSchema>;

export interface SearchResults {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    category: string;
    categorySlug: string;
    priceRange?: string;
    mainImage: string;
    badges: Array<{
      label: string;
      color: string;
    }>;
  }>;
  total: number;
  suggestions?: Array<{
    id: string;
    name: string;
    slug: string;
    category: string;
  }>;
}

// ============================================================
// Blog Listing API
// ============================================================

export interface BlogListFilters {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface BlogListResult {
  posts: Array<{
    id: string;
    title: string;
    slug: string;
    summary: string;
    mainImage: string;
    publishedAt: string;
    categories: Array<{
      name: string;
      slug: string;
    }>;
    featured: boolean;
  }>;
  total: number;
  hasMore: boolean;
}

// ============================================================
// Product Listing API
// ============================================================

export interface ProductListFilters {
  category?: string;
  featured?: boolean;
  badge?: string;
  limit?: number;
  offset?: number;
}

export interface ProductListResult {
  products: Array<{
    id: string;
    name: string;
    slug: string;
    sku: string;
    category: string;
    categorySlug: string;
    mainImage: string;
    priceRange?: string;
    badges: Array<{
      label: string;
      color: string;
    }>;
  }>;
  total: number;
  hasMore: boolean;
}

// ============================================================
// Settings API
// ============================================================

export interface SettingsResult {
  whatsappNumber: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// ============================================================
// Sanity Webhook API
// ============================================================

export type SanityDocumentType = 'product' | 'post' | 'category' | 'settings';
export type SanityOperation = 'create' | 'update' | 'delete';

export interface SanityWebhookPayload {
  _id: string;
  _type: SanityDocumentType;
  slug?: {
    current: string;
    _type: 'slug';
  };
  operation: SanityOperation;
  createdAt: string;
}

export interface WebhookRevalidationResponse {
  success: boolean;
  revalidated: boolean;
  tags?: string[];
  message?: string;
  timestamp: string;
}

export interface SanityWebhookHeaders {
  'x-sanity-webhook-signature': string;
  'x-sanity-webhook-id': string;
  'content-type': string;
}
