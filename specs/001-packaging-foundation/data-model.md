# Data Model

**Feature**: Packaging Website Foundation
**Last Updated**: 2026-03-05

---

## Entity Relationships

```
┌─────────────┐
│  Settings   │
│  (single)   │
└──────┬──────┘
       │
       │ references
       ├────────────────┬────────────────┬────────────────┐
       ▼                ▼                ▼                ▼
┌───────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐
│  Product  │     │ Category  │     │   Post    │     │  Product  │
│ (many)    │◄────┤  (many)   │     │  (many)   │     │  (many)   │
└─────┬─────┘     └───────────┘     └─────┬─────┘     └───────────┘
      │                                   │
      │ has 3-5                           │ references
      ▼                                   ▼
┌─────────────┐                     ┌───────────┐
│ SanityImage │                     │ Category  │
│   (asset)   │                     │           │
└─────────────┘                     └───────────┘
```

---

## Entity Definitions

### Product

Represents a packaging material item available for order via WhatsApp.

**Fields**:

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `_id` | string | Auto | Sanity-generated | Unique identifier |
| `name.en` | string | Yes | Max 100 chars | Product name in English |
| `name.ar` | string | No | Max 100 chars | Product name in Arabic (Phase 2) |
| `slug.current` | string | Yes | Unique, URL-safe | Auto-generated from name.en |
| `sku` | string | Yes | Unique, Format: XX-YYYY | Product identifier (e.g., SF-HG-001) |
| `category` | reference | Yes | Must exist | Reference to Category |
| `description.en` | text | Yes | Max 500 chars | Detailed description |
| `description.ar` | text | No | Max 500 chars | Arabic description (Phase 2) |
| `specifications` | array | No | Max 20 items | Array of {label, value} objects |
| `images` | array | Yes | 3-5 items | Array of Sanity image references |
| `pricing.showPrice` | boolean | Yes | - | Whether to display pricing |
| `pricing.priceFrom` | number | No | Min 0 | Lowest price in range |
| `pricing.priceTo` | number | No | Min 0, >= priceFrom | Highest price in range |
| `pricing.moq` | number | Yes | Min 1 | Minimum Order Quantity |
| `pricing.unit` | string | Yes | - | Unit (pieces, boxes, rolls) |
| `badges` | array | No | Max 3 items | Array of {label, color} objects |
| `seo.metaTitle` | string | No | Max 60 chars | SEO title override |
| `seo.metaDescription` | string | No | Max 160 chars | SEO description override |
| `seo.focusKeyword` | string | No | Max 100 chars | Primary SEO keyword |
| `seo.ogImage` | image | No | - | Open Graph image (1200x630) |
| `seo.noIndex` | boolean | No | - | Block search indexing |
| `_createdAt` | datetime | Auto | - | Creation timestamp |
| `_updatedAt` | datetime | Auto | - | Last update timestamp |

**Relationships**:
- Belongs to one `Category`
- Has 3-5 `SanityImage` assets

---

### Category

Represents a product grouping (e.g., "Corrugated Boxes", "Stretch Films").

**Fields**:

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `_id` | string | Auto | Sanity-generated | Unique identifier |
| `name` | string | Yes | Max 50 chars | Category display name |
| `slug.current` | string | Yes | Unique, URL-safe | Auto-generated from name |
| `description` | text | No | Max 300 chars | Category description |
| `icon` | string | No | Emoji or icon name | Visual identifier (e.g., "📦") |
| `order` | number | Yes | Min 0 | Display order in UI |
| `_createdAt` | datetime | Auto | - | Creation timestamp |
| `_updatedAt` | datetime | Auto | - | Last update timestamp |

**Relationships**:
- Has many `Product` entities

---

### Post (Blog)

Represents a blog article for organic traffic and education.

**Fields**:

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `_id` | string | Auto | Sanity-generated | Unique identifier |
| `title` | string | Yes | Max 200 chars | Article title |
| `slug.current` | string | Yes | Unique, URL-safe | Auto-generated from title |
| `summary` | text | Yes | Max 300 chars | Article excerpt |
| `content` | PortableText | Yes | - | Rich text content |
| `mainImage` | image | Yes | - | Featured article image |
| `mainImage.alt` | string | Yes | Max 200 chars | Alt text for accessibility |
| `publishedAt` | datetime | Yes | Must be past | Publication date |
| `categories` | array | No | Max 5 items | References to Category |
| `featured` | boolean | No | Default: false | Featured post flag |
| `seo.metaTitle` | string | No | Max 60 chars | SEO title override |
| `seo.metaDescription` | string | No | Max 160 chars | SEO description override |
| `seo.focusKeyword` | string | No | Max 100 chars | Primary SEO keyword |
| `seo.ogImage` | image | No | - | Open Graph image (1200x630) |
| `seo.noIndex` | boolean | No | - | Block search indexing |
| `_createdAt` | datetime | Auto | - | Creation timestamp |
| `_updatedAt` | datetime | Auto | - | Last update timestamp |

**Relationships**:
- References 0-5 `Category` entities
- Has one `SanityImage` (mainImage)

---

### Settings

Global configuration for contact information and social links.

**Fields**:

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `_id` | string | Auto | Sanity-generated | Should be "settings" |
| `whatsappNumber` | string | Yes | Valid UAE phone | Format: +971XXXXXXXXX |
| `phoneNumber` | string | Yes | Valid UAE phone | Format: +971XXXXXXXXX |
| `email` | email | No | Valid email | Contact email |
| `address` | text | No | Max 500 chars | Physical address |
| `socialLinks.facebook` | url | No | Valid URL | Facebook page URL |
| `socialLinks.instagram` | url | No | Valid URL | Instagram profile URL |
| `socialLinks.linkedin` | url | No | Valid URL | LinkedIn company URL |

**Relationships**:
- Singleton (only one Settings document)

---

## SEO Object (Reusable Field)

Embedded in Product, Post, and other content types.

**Fields**:

| Field | Type | Required | Validation | Notes |
|-------|------|----------|------------|-------|
| `metaTitle` | string | No | Max 60 chars | Override page title |
| `metaDescription` | string | No | Max 160 chars | Meta description |
| `focusKeyword` | string | No | Max 100 chars | Primary keyword |
| `ogImage` | image | No | - | Social sharing image |
| `noIndex` | boolean | No | Default: false | Block indexing |

---

## State Transitions

### Product Lifecycle

```
[Draft] → [Published] → [Out of Stock] → [Discontinued]
   │          │             │              │
   │          │             │              │
   └──────────┴─────────────┴──────────────┘
              (admin controls state via Sanity)
```

**States**:
- **Draft**: Not visible publicly, in CMS only
- **Published**: Visible on website, available for order
- **Out of Stock**: Published but unavailable, shows "Contact for availability"
- **Discontinued**: Published but not available, shows "Discontinued" badge

### Post Lifecycle

```
[Draft] → [Published] → [Archived]
   │          │             │
   │          │             │
   └──────────┴─────────────┘
              (admin controls state via Sanity)
```

**States**:
- **Draft**: Not visible publicly
- **Published**: Visible on website, included in sitemap
- **Archived**: Visible but excluded from sitemap, marked as archived

---

## Validation Rules Summary

1. **Uniqueness**: `slug.current` must be unique across all Products and all Posts
2. **Required Fields**: Product must have category, images (3-5), pricing configuration
3. **SEO Constraints**: `metaTitle` ≤ 60 chars, `metaDescription` ≤ 160 chars
4. **Image Limits**: Product must have 3-5 images (enforced at application level)
5. **Phone Format**: Must be UAE format: +971 followed by 8 digits
6. **MOQ Validation**: `pricing.moq` must be ≥ 1
7. **Price Logic**: If `showPrice=true`, either `priceFrom` or both `priceFrom/priceTo` must be set
8. **Publishing**: Post cannot be published without `publishedAt` date
