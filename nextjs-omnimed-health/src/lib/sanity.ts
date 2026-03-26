import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "i7vyc4cx",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export default client;
