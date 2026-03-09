export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface SiteSettings {
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  businessHours: string;
  name: string;
}
