import { useEffect, useState } from "react";
import { sanityClient, PERSON_QUERY, FEATURED_PERSON_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity";

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
