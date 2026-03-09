# Quickstart Guide

**Feature**: Packaging Website Foundation
**Last Updated**: 2026-03-05

---

## Prerequisites

- Node.js 20+ LTS
- Git
- Sanity CMS account (free tier sufficient)
- Vercel account (free tier sufficient)
- WhatsApp Business account with UAE phone number

---

## Environment Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install next-sanity @sanity/image-url @portabletext/react sanity framer-motion gsap
npm install -D @types/node
```

### 2. Environment Variables

Create `.env.local`:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_token_with_read_access

# Sanity Webhook (generate random secret string)
SANITY_WEBHOOK_SECRET=your_random_secret_string_min_32_chars

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_measurement_id
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id

# WhatsApp (from Settings in Sanity, not hardcoded)
# No env vars - use Sanity Settings document
```

### 2.1 Webhook Secret Generation

Generate a secure webhook secret:

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Use: https://www.random.org/strings/
```

Copy the generated string as `SANITY_WEBHOOK_SECRET` in your `.env.local`.

### 3. Initialize Sanity Studio

```bash
npx sanity@latest init
# Choose: Create new project
# Name: packaging-site
# Dataset: production
# Use default schema configuration (we'll replace it)
```

### 3.1 Configure Sanity Webhook

After deploying your site to Vercel (or running locally with ngrok):

1. **Navigate to Sanity Dashboard**: Go to `https://www.sanity.io/manage`

2. **Select Your Project**: Choose the `packaging-site` project

3. **Go to API > Webhooks**: Click "New webhook"

4. **Configure Webhook**:
   ```
   URL: https://yourdomain.com/api/webhook/sanity
   # For local testing with ngrok: https://your-ngrok-url.ngrok-free.app/api/webhook/sanity

   Secret: [paste your SANITY_WEBHOOK_SECRET value]

   Projection: Leave empty (uses default)

   Filter: _type in ["product", "post", "category", "settings"]
   ```

5. **Save the webhook**

6. **Test the webhook**:
   - Edit any document in Sanity Studio
   - Click "Publish"
   - Check your site for instant updates (should reflect immediately without waiting for ISR revalidation)

**Webhook Revalidation Tags**:
| Content Type | Tags Invalidated |
|--------------|-----------------|
| Product | `products`, `product:{slug}`, `categories` |
| Post | `posts`, `post:{slug}` |
| Category | `categories`, `products` |
| Settings | `settings` |

---

## Development Workflow

### Start Development Server

```bash
npm run dev
# Access at http://localhost:3000
# Sanity Studio at http://localhost:3000/studio
```

### Typical Development Order

1. **Add Product**: Open `/studio`, navigate to Products, add new product
2. **Add Category**: Add category in Studio first, then reference in Product
3. **Update Settings**: Configure WhatsApp/phone numbers in Settings document
4. **View Changes**: Changes appear immediately via ISR after revalidation period

---

## Sanity Studio Quick Reference

### Adding a Product

1. Navigate to Products in Studio
2. Click "New Product"
3. Fill required fields:
   - **Name** (English): Product display name
   - **SKU**: Unique identifier (e.g., SF-HG-001)
   - **Category**: Select from dropdown
   - **Description**: Detailed product information
   - **Images**: Upload 3-5 images
   - **Pricing**: Configure price range, MOQ, unit
   - **SEO**: Add meta title/description (optional)
4. Click "Publish"

### Adding a Blog Post

1. Navigate to Posts in Studio
2. Click "New Post"
3. Fill required fields:
   - **Title**: Article title
   - **Summary**: Short excerpt for listing
   - **Content**: Rich text article body
   - **Main Image**: Featured article image
   - **Published At**: Publication date
   - **Categories**: Select relevant categories
   - **SEO**: Add meta title/description (optional)
4. Click "Publish"

### Updating Settings

1. Navigate to Settings in Studio
2. Edit the single Settings document
3. Update:
   - **WhatsApp Number**: Primary contact number
   - **Phone Number**: Secondary contact number
   - **Email**: Contact email
   - **Address**: Physical address
   - **Social Links**: Facebook, Instagram, LinkedIn URLs
4. Click "Publish"

---

## Key File Locations

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, fonts, providers |
| `lib/sanity.ts` | Sanity client with caching |
| `lib/whatsapp.ts` | WhatsApp URL generation |
| `sanity/schemas/` | CMS type definitions |
| `app/globals.css` | Design tokens and base styles |
| `tailwind.config.ts` | Tailwind configuration |
| `app/api/webhook/sanity/route.ts` | Sanity webhook endpoint for instant updates |
| `sanity/lib/webhook.ts` | Webhook signature verification |

---

## Common Commands

```bash
# Type check
npm run tsc --noEmit

# Build production
npm run build

# Start production locally
npm start

# Deploy to Vercel (first time)
vercel

# Deploy to Vercel (after initial)
git push
```

---

## Troubleshooting

### Studio Not Accessible at `/studio`

**Solution**: Ensure `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID` and dataset is set to "production"

### Images Not Loading

**Solution**: Check that Sanity image CDN is accessible, verify `next.config.ts` has `images.remotePatterns` configured

### WhatsApp Link Not Opening

**Solution**: Verify Settings document has correct phone number format: +971XXXXXXXXX

### Build Fails with Type Errors

**Solution**: Run `npm run tsc --noEmit` to see specific errors, check that all imports resolve correctly

### Content Not Updating Instantly After Publishing

**Solution**:
1. Check webhook is configured in Sanity dashboard (`sanity.io/manage`)
2. Verify `SANITY_WEBHOOK_SECRET` matches in both `.env.local` and Sanity webhook settings
3. Check webhook delivery logs in Sanity dashboard for failed deliveries
4. Test webhook endpoint directly: `curl -X POST https://yourdomain.com/api/webhook/sanity`

### Webhook Returns 401 Unauthorized

**Solution**:
- Verify `x-sanity-webhook-signature` header is being sent by Sanity
- Check signature verification logic in `sanity/lib/webhook.ts`
- Ensure `SANITY_WEBHOOK_SECRET` is set correctly in production environment variables (Vercel dashboard)

### ISR Not Revalidating After Webhook

**Solution**:
- Verify `revalidateTag()` is being called with correct tag names
- Check that fetch calls include `next: { tags: [...] }` matching revalidation tags
- Ensure webhook payload parsing correctly extracts `_type` and `slug`

---

## Next Steps

1. **Initial Setup**: Run environment setup commands
2. **Studio Access**: Verify `/studio` route loads correctly
3. **First Product**: Add a test product to verify data flow
4. **First Blog Post**: Add a test blog post
5. **Verify WhatsApp**: Click WhatsApp button to confirm message formatting
6. **Deploy**: Push to Git to trigger Vercel deployment

---

## Support

- **Next.js**: https://nextjs.org/docs
- **Sanity**: https://www.sanity.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel**: https://vercel.com/docs
