// Sanity CMS Type Definitions
// Auto-generated from sanity schemas
// Source: sanity/schemas/*.ts

export interface SanityImageAsset {
  _id: string;
  url: string;
  originalFilename: string;
  mimeType: string;
  width: number;
  height: number;
}

export interface SanityReference<_T = any> {
  _ref: string;
  _type?: 'reference';
}

export interface PortableTextBlock {
  _type: 'block';
  children: Array<{
    _type: 'span';
    text: string;
  }>;
  markDefs?: Array<{
    _key: string;
    _type?: 'mark';
    [key: string]: unknown;
  }>;
  style?: string;
  listItem?: string;
  level?: number;
}

// Product Schema
export interface Product {
  _id: string;
  _type: 'product';
  name: {
    en: string;
    ar?: string;
  };
  slug: {
    current: string;
    _type: 'slug';
  };
  sku: string;
  category: SanityReference<Category>;
  description: {
    en: string;
    ar?: string;
  };
  specifications: Array<{
    label: string;
    value: string;
  }>;
  images: Array<{
    _key: string;
    asset: SanityReference<SanityImageAsset>;
  }>;
  pricing: {
    showPrice: boolean;
    priceFrom?: number;
    priceTo?: number;
    moq: number;
    unit: string;
  };
  badges: Array<{
    label: string;
    color: string;
  }>;
  seo: SEO;
  _createdAt: string;
  _updatedAt: string;
}

// Category Schema
export interface Category {
  _id: string;
  _type: 'category';
  name: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  description?: string;
  icon?: string;
  order: number;
  _createdAt: string;
  _updatedAt: string;
}

// Post (Blog) Schema
export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  summary: string;
  content: PortableTextBlock[];
  mainImage: {
    asset: SanityReference<SanityImageAsset>;
  };
  mainImageAlt: string;
  publishedAt: string;
  categories?: Array<SanityReference<Category>>;
  featured: boolean;
  seo: SEO;
  _createdAt: string;
  _updatedAt: string;
}

// Settings Schema
export interface Settings {
  _id: string;
  _type: 'settings';
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

// SEO Object (reusable)
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  ogImage?: {
    asset: SanityReference<SanityImageAsset>;
  };
  noIndex?: boolean;
}

// GROQ Query Results
export interface ProductListResult {
  _id: string;
  name: {
    en: string;
  };
  slug: {
    current: string;
  };
  category: {
    name: string;
    slug: {
      current: string;
    };
  };
  mainImage?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  pricing: {
    showPrice: boolean;
    priceFrom?: number;
    priceTo?: number;
    moq: number;
    unit: string;
  };
  badges: Array<{
    label: string;
    color: string;
  }>;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
}

export interface CategoryListResult {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  icon?: string;
  order: number;
}

export interface PostListResult {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  summary: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  mainImageAlt: string;
  publishedAt: string;
  categories?: Array<{
    name: string;
    slug: {
      current: string;
    };
  }>;
  featured: boolean;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
}
