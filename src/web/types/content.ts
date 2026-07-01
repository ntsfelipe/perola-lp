export type ContentImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  visible: boolean;
};

export type LinkContent = {
  label: string;
  href: string;
  external?: boolean;
};

export type SectionContent = {
  enabled: boolean;
  eyebrow?: string;
  title: string;
  description?: string;
};

export type Specialty = {
  id: string;
  icon: "baby" | "heart" | "sparkles" | "person" | "nutrition";
  title: string;
  description: string;
};

export type Professional = {
  id: string;
  name: string;
  role: string;
  image: ContentImage;
  detailImage?: ContentImage;
  bio?: string;
};

export type Feature = {
  id: string;
  icon: "heart" | "door" | "science" | "check";
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  initials: string;
  rating: number;
};

export type LandingPageContent = {
  seo: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    tagline: string;
    logoUrl: string;
  };
  navigation: NavigationItem[];
  contact: {
    whatsappNumber: string;
    whatsappMessage: string;
    address: string;
    mapUrl: string;
    instagramUrl?: string;
  };
  hero: SectionContent & {
    titleAccent: string;
    ctaLabel: string;
    image: ContentImage;
  };
  metrics: {
    enabled: boolean;
    items: Array<{
      id: string;
      value: string;
      label: string;
      icon: "badge" | "users" | "award";
    }>;
  };
  specialties: SectionContent & {
    items: Specialty[];
  };
  team: SectionContent & {
    image: ContentImage;
    professionals: Professional[];
    features: string[];
  };
  clinic: SectionContent & {
    features: Feature[];
    gallery: ContentImage[];
  };
  location: SectionContent & {
    ctaLabel: string;
    images: ContentImage[];
  };
  testimonials: SectionContent & {
    items: Testimonial[];
  };
  finalCta: SectionContent & {
    ctaLabel: string;
  };
  footer: {
    description: string;
    serviceLinks: LinkContent[];
    institutionalLinks: LinkContent[];
    copyright: string;
  };
};
