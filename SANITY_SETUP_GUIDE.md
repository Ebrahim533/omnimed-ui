# Sanity CMS Integration Guide for OmniMed UI

## Overview

This guide walks you through setting up and using Sanity CMS with your OmniMed React frontend. The integration allows you to manage "Person" profiles (team members, CEO) and global site settings through a dedicated CMS instead of hardcoding values.

---

## What Was Integrated

### ✅ Completed Setup

1. **Sanity Project Created**
   - Project ID: `i7vyc4cx`
   - Dataset: `production`
   - Organization ID: `oujKVIiEi`

2. **Schemas Defined**
   - `Person` - Team member/leader profiles
   - `SiteSettings` - Global company information and images
   - `SocialLink` - Reusable social media links

3. **React Integration**
   - `@sanity/client` - Installed for querying Sanity
   - `@sanity/image-url` - Installed for responsive image handling
   - Custom hooks for data fetching
   - `urlFor()` helper for image transformation

4. **Updated Components**
   - **About.tsx** - Now fetches team members from Sanity
   - **Footer.tsx** - Now fetches contact info from Sanity
   - **Index.tsx** - Now fetches featured person (CEO) from Sanity

---

## Quick Start

### 1. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_SANITY_PROJECT_ID=i7vyc4cx
VITE_SANITY_DATASET=production
```

Or copy from the example file:

```bash
cp .env.example .env.local
```

### 2. Access Sanity Studio

Visit: **https://i7vyc4cx.sanity.studio**

Sign in with your Sanity account credentials.

### 3. Create Your First Documents

#### Create a Site Settings Document

1. Go to Sanity Studio
2. Click **+ Create** and select **Site Settings**
3. Fill in:
   - **title**: "OmniMed"
   - **logo**: Upload company logo
   - **contactEmail**: "info@omnimedhealth.com"
   - **contactPhone**: "(917) 744-7308"
   - **address**: "New York, NY 10001"
   - **companyDescription**: "Proactive, technology-enabled care management..."
   - **aboutImage**: Upload about page hero image
   - **ceoPortrait**: Upload CEO/founder photo
   - **ceoSignature**: Upload CEO signature image
4. Save the document

#### Create Person Documents

For each team member:

1. Click **+ Create** and select **Person**
2. Fill in:
   - **name**: "Dr. Sarah Chen"
   - **slug**: Will auto-generate from name
   - **role**: "Chief Technology Officer"
   - **bio**: "15+ years in health informatics..."
   - **image**: Upload profile photo
   - **featured**: Toggle ON for CEO/Founder only
   - **social**: Add LinkedIn, Twitter, etc.
3. Save each document

---

## File Structure

```
omnimed-ui/
├── studio/                          # Sanity Studio configuration
│   ├── sanity.config.ts             # Sanity client config
│   ├── schemaTypes/
│   │   ├── index.ts                 # Schema exports
│   │   ├── person.ts                # Person document type
│   │   ├── siteSettings.ts          # Site settings document type
│   │   └── socialLink.ts            # Social link object type
│   └── README.md                    # Studio setup guide
│
├── src/
│   ├── lib/
│   │   ├── sanity.ts                # Sanity client & GROQ queries
│   │   └── ...
│   ├── hooks/
│   │   ├── useSanity.ts             # React hooks for data fetching
│   │   └── ...
│   ├── components/
│   │   ├── Footer.tsx               # ✅ Updated to use Sanity
│   │   └── ...
│   ├── pages/
│   │   ├── About.tsx                # ✅ Updated to use Sanity
│   │   ├── Index.tsx                # ✅ Updated to use Sanity
│   │   └── ...
│   └── ...
│
├── .env.example                     # Environment variable template
├── package.json                     # Dependencies
└── ...
```

---

## Available React Hooks

### `useTeam()`
Fetches all non-featured team members.

```typescript
import { useTeam } from "@/hooks/useSanity";

function TeamSection() {
  const { team, loading, error } = useTeam();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {team.map((member) => (
        <div key={member._id}>{member.name}</div>
      ))}
    </div>
  );
}
```

### `useFeaturedPerson()`
Fetches the featured person (CEO/Founder).

```typescript
import { useFeaturedPerson } from "@/hooks/useSanity";

function FounderBanner() {
  const { person, loading } = useFeaturedPerson();
  
  if (!person) return null;
  
  return (
    <div>
      <h2>{person.name}</h2>
      <p>{person.role}</p>
      <p>{person.bio}</p>
    </div>
  );
}
```

### `useSiteSettings()`
Fetches global site settings.

```typescript
import { useSiteSettings } from "@/hooks/useSanity";

function SiteFooter() {
  const { settings } = useSiteSettings();
  
  return (
    <footer>
      <p>Email: {settings?.contactEmail}</p>
      <p>Phone: {settings?.contactPhone}</p>
    </footer>
  );
}
```

---

## Image Handling

### Using `urlFor()` Helper

Transform responsive images from Sanity CDN:

```typescript
import { urlFor } from "@/lib/sanity";

// Basic usage
<img 
  src={urlFor(image).url()} 
  alt="description"
/>

// With dimensions
<img 
  src={urlFor(image).width(400).height(300).auto("format").url()}
  alt="description"
/>

// Different sizes for different breakpoints
const mobileUrl = urlFor(image).width(300).url();
const desktopUrl = urlFor(image).width(800).url();

// Using srcSet for responsive images
<img 
  srcSet={`
    ${urlFor(image).width(300).url()} 300w,
    ${urlFor(image).width(600).url()} 600w,
    ${urlFor(image).width(1200).url()} 1200w
  `}
  src={urlFor(image).width(600).url()}
  alt="Responsive image"
/>
```

---

## GROQ Queries

All queries are in `src/lib/sanity.ts`:

### PERSON_QUERY
```groq
*[_type == "person"] | order(_createdAt asc) {
  _id,
  name,
  slug,
  role,
  bio,
  image,
  social[] { platform, url },
  featured,
}
```

### FEATURED_PERSON_QUERY
```groq
*[_type == "person" && featured == true][0] {
  _id,
  name,
  slug,
  role,
  bio,
  image,
  social[] { platform, url },
}
```

### SITE_SETTINGS_QUERY
```groq
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
```

---

## Migration Checklist

Use this checklist to migrate all hardcoded data to Sanity:

- [ ] Create Site Settings document in Sanity
- [ ] Create Person documents for all team members
- [ ] Mark CEO/Founder as featured
- [ ] Add social links to all team members
- [ ] Test About.tsx loads team correctly
- [ ] Test Footer.tsx loads contact info
- [ ] Test Index.tsx loads featured person
- [ ] Verify responsive images display correctly
- [ ] Test on mobile/tablet breakpoints

---

## Troubleshooting

### "No results from my queries"
- Check that documents exist in Sanity Studio
- Verify `featured` flag is set correctly for CEO
- Ensure document type names match exactly (case-sensitive)
- Check that the dataset is `production`

### "Images not loading"
- Verify `VITE_SANITY_PROJECT_ID` is correct (i7vyc4cx)
- Check image alt text in console for any 404 errors
- Try using `urlFor(image).auto("format").url()`
- Images must be published in Sanity

### "CORS errors in console"
- Your Sanity project is publicly readable by default
- If you see CORS issues, check Sanity project settings
- Ensure the dataset is set to `production`

### Fallback Images Still Appearing
The component imports (like `ceoPortrait`) are fallbacks. They're used when:
- Sanity data hasn't loaded yet
- Sanity document doesn't exist
- Image upload failed

To force Sanity usage, remove fallback imports after confirming Sanity setup works.

---

## Advanced: Real-time Updates

To enable real-time content updates without page refresh:

1. Modify `src/lib/sanity.ts`:

```typescript
export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false,  // Disable CDN for real-time updates
  apiVersion: "2024-01-01",
});
```

2. Add a listener in your hooks:

```typescript
useEffect(() => {
  const subscription = sanityClient
    .listen('*[_type == "person"]')
    .subscribe((update) => {
      // Handle real-time updates
      setTeam(update.result);
    });
  
  return () => subscription.unsubscribe();
}, []);
```

---

## Deployment

### Vercel/Netlify

1. Add environment variables to your hosting:
   ```
   VITE_SANITY_PROJECT_ID=i7vyc4cx
   VITE_SANITY_DATASET=production
   ```

2. Redeploy your site

3. Test that images load from Sanity CDN

### The Sanity CMS is always available at:
**https://i7vyc4cx.sanity.studio**

---

## Support & Resources

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Query Reference**: https://www.sanity.io/docs/groq
- **Image URL Builder**: https://www.sanity.io/docs/image-url
- **Project Dashboard**: https://manage.sanity.io

---

## Summary of Changes

| File | Changes | Status |
|------|---------|--------|
| `src/pages/About.tsx` | Fetch team from Sanity | ✅ Complete |
| `src/pages/Index.tsx` | Fetch featured person from Sanity | ✅ Complete |
| `src/components/Footer.tsx` | Fetch contact info from Sanity | ✅ Complete |
| `src/lib/sanity.ts` | Client config & GROQ queries | ✅ Created |
| `src/hooks/useSanity.ts` | React hooks for data fetching | ✅ Created |
| `studio/` | Sanity Studio config & schemas | ✅ Created |
| `.env.example` | Environment variable template | ✅ Created |

---

**Next Steps**: 
1. Visit https://i7vyc4cx.sanity.studio
2. Create your Site Settings document
3. Create Person documents for your team
4. Run your dev server and verify data loads
5. Deploy and enjoy automated content management!
