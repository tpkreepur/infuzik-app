// lib/site-info.ts

interface BrandColors {
  gold: string;
  gray: string;
  charcoal: string;
  ivory: string;
}

interface BrandInfo {
  name: string;
  logo: string; // relative or absolute URL to your logo asset
  colors: BrandColors;
}

interface ContactInfo {
  email: string;
  phone: string;
}

interface SocialLinks {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  [key: string]: string | undefined;
}

interface SiteInfo {
  title: string;
  description: string;
  brand: BrandInfo;
  contact: ContactInfo;
  social: SocialLinks;
}

// Define your site's metadata and branding details
export const siteInfo: SiteInfo = {
  title: 'Infuzik',
  description: 'Empower your cognitive performance with Infuzik.',
  brand: {
    name: 'Infuzik',
    logo: '/static/images/logo.svg', // update the path to your logo asset
    colors: {
      gold: '#D4AF37',
      gray: '#808080',
      charcoal: '#36454F',
      ivory: '#FFFFF0',
    },
  },
  contact: {
    email: 'contact@infuzik.com',
    phone: '123-456-7890',
  },
  social: {
    twitter: 'https://twitter.com/infuzik',
    facebook: 'https://facebook.com/infuzik',
    instagram: 'https://instagram.com/infuzik',
    linkedin: 'https://linkedin.com/company/infuzik',
  },
};
