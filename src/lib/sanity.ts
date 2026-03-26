import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "i7vyc4cx";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export const PERSON_QUERY = `
  *[_type == "person"] | order(_createdAt asc) {
    _id,
    name,
    slug,
    role,
    bio,
    image,
    social[] {
      platform,
      url,
    },
    featured,
  }
`;

export const FEATURED_PERSON_QUERY = `
  *[_type == "person" && featured == true][0] {
    _id,
    name,
    slug,
    role,
    bio,
    image,
    social[] {
      platform,
      url,
    },
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    title,
    logo,
    logoAlt,
    heroImage,
    aboutImage,
    ceoPortrait,
    ceoSignature,
    contactEmail,
    contactPhone,
    address,
    companyDescription,
  }
`;

export const LANDING_PAGE_QUERY = `
  *[_type == "landingPage"][0] {
    _id,
    title,
    slug,
    heroSection {
      headline,
      subheadline,
      backgroundImage,
      ctaButtonText,
      ctaButtonLink,
      secondaryCtaText,
      secondaryCtaLink,
    },
    statsSection[] {
      value,
      label,
      icon,
    },
    featuredServices[] -> {
      _id,
      title,
      slug,
      description,
      icon,
    },
    testimonialSection {
      title,
      testimonials[] {
        quote,
        author,
        role,
        avatar,
      },
    },
    cta {
      title,
      description,
      buttonText,
      buttonLink,
    },
    seoTitle,
    seoDescription,
  }
`;

export const LANDING_PAGE_BY_SLUG_QUERY = `
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroSection {
      headline,
      subheadline,
      backgroundImage,
      ctaButtonText,
      ctaButtonLink,
      secondaryCtaText,
      secondaryCtaLink,
    },
    statsSection[] { value, label, icon },
    featuredServices[]-> { _id, title, slug, description, icon },
    testimonialSection { title, testimonials[] { quote, author, role, avatar } },
    cta { title, description, buttonText, buttonLink },
    seoTitle,
    seoDescription,
  }
`;

export const ABOUT_PAGE_QUERY = `
  {
    "landing": *[_type == "landingPage" && slug.current == "about"][0] {
      title,
      slug,
      heroSection {
        headline,
        subheadline,
        backgroundImage,
        ctaButtonText,
        ctaButtonLink,
        secondaryCtaText,
        secondaryCtaLink,
      },
      statsSection[] { value, label, icon },
      featuredServices[]-> { _id, title, slug, description, icon },
      testimonialSection { title, testimonials[] { quote, author, role, avatar } },
      cta { title, description, buttonText, buttonLink },
      seoTitle,
      seoDescription,
    },
    "settings": *[_type == "siteSettings"][0] { title, aboutImage, companyDescription, ceoSignature },
    "services": *[_type == "service"] | order(order asc) { _id, title, slug, description, icon, features },
    "featuredPerson": *[_type == "person" && featured == true][0] { _id, name, slug, role, bio, image, social[] { platform, url } }
  }
`;

export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    fullDescription,
    icon,
    features[] {
      title,
      description,
    },
    order,
  }
`;

// Helper function to build image URLs
export function getSanityImageUrl(image: any, width?: number, height?: number) {
  if (!image) return "";
  let url = urlFor(image).auto("format").fit("max");
  if (width) url = url.width(width);
  if (height) url = url.height(height);
  return url.url();
}
