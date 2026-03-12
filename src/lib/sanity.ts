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

// Helper function to build image URLs
export function getSanityImageUrl(image: any, width?: number, height?: number) {
  if (!image) return "";
  let url = urlFor(image).auto("format").fit("max");
  if (width) url = url.width(width);
  if (height) url = url.height(height);
  return url.url();
}
