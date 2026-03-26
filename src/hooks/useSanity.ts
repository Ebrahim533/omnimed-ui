import { useEffect, useState } from "react";
import { sanityClient, PERSON_QUERY, FEATURED_PERSON_QUERY, SITE_SETTINGS_QUERY, LANDING_PAGE_QUERY, LANDING_PAGE_BY_SLUG_QUERY, SERVICES_QUERY, ABOUT_PAGE_QUERY } from "@/lib/sanity";

export interface SocialLink {
  platform: "linkedin" | "twitter" | "github" | "email";
  url: string;
}

export interface Person {
  _id: string;
  name: string;
  slug: { current: string };
  role: string;
  bio?: string;
  image?: any;
  social?: SocialLink[];
  featured?: boolean;
}

export interface SiteSettings {
  title?: string;
  logo?: any;
  logoAlt?: string;
  heroImage?: any;
  aboutImage?: any;
  ceoPortrait?: any;
  ceoSignature?: any;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  companyDescription?: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  fullDescription?: any[];
  icon?: any;
  features?: Array<{ title: string; description: string }>;
  order?: number;
}

export interface LandingPage {
  _id: string;
  title: string;
  slug: { current: string };
  heroSection?: {
    headline: string;
    subheadline?: string;
    backgroundImage?: any;
    ctaButtonText?: string;
    ctaButtonLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
  };
  statsSection?: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
  featuredServices?: Service[];
  testimonialSection?: {
    title?: string;
    testimonials?: Array<{
      quote: string;
      author: string;
      role: string;
      avatar?: any;
    }>;
  };
  cta?: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  seoTitle?: string;
  seoDescription?: string;
}

export interface AboutPageData {
  landing?: LandingPage | null;
  settings?: SiteSettings | null;
  services?: Service[];
  featuredPerson?: Person | null;
}

// Hook to fetch all people
export function useTeam() {
  const [team, setTeam] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        setLoading(true);
        const data = await sanityClient.fetch<Person[]>(PERSON_QUERY);
        setTeam(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch team");
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, []);

  return { team, loading, error };
}

// Hook to fetch featured person (CEO/Founder)
export function useFeaturedPerson() {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedPerson() {
      try {
        setLoading(true);
        const data = await sanityClient.fetch<Person>(FEATURED_PERSON_QUERY);
        setPerson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch featured person");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedPerson();
  }, []);

  return { person, loading, error };
}

// Hook to fetch site settings
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const data = await sanityClient.fetch<SiteSettings>(SITE_SETTINGS_QUERY);
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch settings");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

// Hook to fetch landing page content
export function useLandingPage(slug?: string) {
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLandingPage() {
      try {
        setLoading(true);
        let data: LandingPage | null = null;
        if (slug) {
          data = await sanityClient.fetch<LandingPage>(LANDING_PAGE_BY_SLUG_QUERY, { slug });
        } else {
          data = await sanityClient.fetch<LandingPage>(LANDING_PAGE_QUERY as any);
        }
        setLandingPage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch landing page");
      } finally {
        setLoading(false);
      }
    }

    fetchLandingPage();
  }, [slug]);

  return { landingPage, loading, error };
}

// Hook to fetch About page aggregated data (landing:about + site settings + services + featured person)
export function useAboutPage() {
  const [about, setAbout] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        setLoading(true);
        const data = await sanityClient.fetch<AboutPageData>(ABOUT_PAGE_QUERY as any);
        setAbout(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch about page data");
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, []);

  return { about, loading, error };
}

// Hook to fetch all services
export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const data = await sanityClient.fetch<Service[]>(SERVICES_QUERY);
        setServices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return { services, loading, error };
}
