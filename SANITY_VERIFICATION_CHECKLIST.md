# Sanity CMS - React Frontend Verification Checklist

## 1. Sanity CMS Configuration ✅

### Environment Variables
- [x] **File**: `.env` created with required variables
- [x] **VITE_SANITY_PROJECT_ID**: `i7vyc4cx` ✓
- [x] **VITE_SANITY_DATASET**: `production` ✓
- [x] **Fallback values**: Hardcoded in `src/lib/sanity.ts` as backup

### Client Initialization
**File**: [src/lib/sanity.ts](src/lib/sanity.ts)

```typescript
✅ Import: createClient from "@sanity/client"
✅ Import: imageUrlBuilder from "@sanity/image-url"
✅ Project ID: Loaded from env with fallback
✅ Dataset: Loaded from env with fallback
✅ useCdn: true (optimized for production)
✅ apiVersion: "2024-01-01"
```

**Status**: CONFIGURED ✓

---

## 2. Landing Page Data Fetching Setup ✅

### GROQ Queries Available
**File**: [src/lib/sanity.ts](src/lib/sanity.ts)

| Query | Purpose | Status |
|-------|---------|--------|
| `PERSON_QUERY` | Fetch all team members | ✅ Configured |
| `FEATURED_PERSON_QUERY` | Fetch CEO/Founder | ✅ Configured |
| `SITE_SETTINGS_QUERY` | Fetch site-wide settings | ✅ Configured |

### React Hooks Created
**File**: [src/hooks/useSanity.ts](src/hooks/useSanity.ts)

- [x] `useTeam()` - Fetches all people
- [x] `useFeaturedPerson()` - Fetches featured person
- [x] `useSiteSettings()` - Fetches site settings

**Hook Features**:
- [x] Loading states
- [x] Error handling
- [x] TypeScript interfaces (Person, SiteSettings)
- [x] useEffect cleanup patterns

**Status**: CONFIGURED ✓

---

## 3. Image Asset Handling ✅

### Image URL Builder
**File**: [src/lib/sanity.ts](src/lib/sanity.ts)

```typescript
✅ imageUrlBuilder initialized
✅ urlFor() function exported
✅ getSanityImageUrl() helper with width/height options
```

### Usage in Components

**Current Usage**:
- [x] Index.tsx imports `urlFor`
- [x] About.tsx can use urlFor for images
- [x] Footer.tsx can use urlFor for logos

**Image Fields Available**:
```
siteSettings:
  - logo
  - logoAlt
  - heroImage
  - aboutImage
  - ceoPortrait
  - ceoSignature

person:
  - image (with hotspot support)
```

**Status**: CONFIGURED ✓

---

## 4. Sanity Studio Schema Configuration ✅

### Document Types
**Path**: [studio-omnimed-health/schemaTypes/](studio-omnimed-health/schemaTypes/)

| Type | Fields | Status |
|------|--------|--------|
| **siteSettings** | 11 fields (title, logo, images, contact info) | ✅ Ready |
| **person** | 7 fields (name, role, bio, image, social, featured) | ✅ Ready |
| **socialLink** | 2 fields (platform, url) | ✅ Ready |
| **post** | 5 fields (title, slug, date, image, body) | ✅ Ready |

### Schema Validation
- [x] Person: name, slug, role are required
- [x] Post: title, slug, publishedAt are required
- [x] Image hotspot enabled for Profile Images

**Status**: CONFIGURED ✓

---

## 5. Component Integration ✅

### Updated Components

**File**: [src/pages/Index.tsx](src/pages/Index.tsx)
```typescript
✅ useFeaturedPerson() hook imported
✅ useSiteSettings() hook imported
✅ Loading states handled
✅ Image carousel from local array (ready for Sanity)
✅ Featured person can be displayed
```

### Available for Enhancement

**The following can be Sanity-connected**:
- Landing page hero section
- Service cards
- Testimonials
- Team members
- Contact information

**Status**: PARTIALLY INTEGRATED - Ready for enhancement ⚠️

---

## 6. Missing Pieces & Action Items

### ⚠️ TODO: Create Sanity Documents

Before content appears, you need to:

1. **Go to Sanity Studio**: https://i7vyc4cx.sanity.studio
2. **Create a siteSettings document** with:
   - [ ] Site Title
   - [ ] Logo image
   - [ ] Hero background image
   - [ ] Contact email
   - [ ] Contact phone
   - [ ] Company description

3. **Create Person documents** with:
   - [ ] Name (e.g., "John Doe")
   - [ ] Role (e.g., "CEO & Founder")
   - [ ] Bio
   - [ ] Profile image
   - [ ] Social links
   - [ ] Check "Featured" for CEO/Founder

4. **Upload Images to Sanity**:
   - Logo (SVG or PNG)
   - Hero background image
   - Team member photos
   - Any section images

### ⚠️ TODO: Create Landing Page Schema

A dedicated `landingPage` schema would optimize data structure:

```typescript
// studio/schemaTypes/landingPage.ts
export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'text' },
        { name: 'backgroundImage', type: 'image' },
        { name: 'ctaButton', type: 'object', fields: [...] },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'array',
      of: [{ type: 'object', fields: [...] }],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'array',
      of: [{ type: 'object', fields: [...] }],
    }),
    // ... more sections
  ],
})
```

---

## 7. Verification Steps to Run Locally

### Step 1: Install Dependencies
```bash
cd /workspaces/omnimed-ui
npm install  # or bun install
```

### Step 2: Verify Environment Variables
```bash
cat .env
# Should show:
# VITE_SANITY_PROJECT_ID=i7vyc4cx
# VITE_SANITY_DATASET=production
```

### Step 3: Start Dev Server
```bash
npm run dev
# Server will start at http://localhost:5173
```

### Step 4: Test Data Fetching (Browser Console)
```javascript
// In browser console, if you add this test code:
import { sanityClient, FEATURED_PERSON_QUERY } from '@sanity/lib/sanity'
sanityClient.fetch(FEATURED_PERSON_QUERY).then(console.log)
```

### Step 5: Check Network Requests
- Open DevTools > Network tab
- Look for requests to `https://i7vyc4cx.sanity.io`
- Should see successful responses (200 status)

---

## 8. Configuration Summary

| Component | Status | File |
|-----------|--------|------|
| Sanity Client | ✅ Ready | [src/lib/sanity.ts](src/lib/sanity.ts) |
| Environment Variables | ✅ Ready | [.env](.env) |
| GROQ Queries | ✅ Ready | [src/lib/sanity.ts](src/lib/sanity.ts) |
| React Hooks | ✅ Ready | [src/hooks/useSanity.ts](src/hooks/useSanity.ts) |
| Image Builder | ✅ Ready | [src/lib/sanity.ts](src/lib/sanity.ts) |
| Schemas | ✅ Ready | [studio-omnimed-health/schemaTypes/](studio-omnimed-health/schemaTypes/) |
| React Components | ⚠️ Partial | [src/pages/](src/pages/) |
| Sanity Content | ⛔ Missing | Studio only |

---

## 9. Next Steps for Full Integration

1. ✅ **Environment configured** - Ready
2. ✅ **Client configured** - Ready  
3. ✅ **Queries configured** - Ready
4. ✅ **Hooks configured** - Ready
5. ✅ **Schemas configured** - Ready
6. ⚠️ **Create Sanity content** - USER ACTION NEEDED
7. ⚠️ **Update components to use hooks** - OPTIONAL ENHANCEMENT
8. ⚠️ **Create landingPage schema** - OPTIONAL (for better structure)

---

## 10. Troubleshooting

### Issue: "Failed to fetch featured person" in console
**Solution**: Create a featured Person document in Sanity Studio

### Issue: Images not loading
**Verify**:
- Image field is properly named
- Image asset is uploaded in Sanity
- `urlFor()` is being used to build the URL

### Issue: Environment variables not loading
```bash
# Restart dev server after creating .env
npm run dev
```

### Issue: GROQ query returns empty array
- Check Sanity Studio that documents exist
- Verify document `_type` matches query (e.g., "person", "siteSettings")
- Use Sanity Vision tool to test GROQ queries

---

## Commands Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start Sanity Studio
cd studio-omnimed-health
npm install
npm run dev

# Test GROQ queries in Sanity Vision
# Go to: https://i7vyc4cx.sanity.studio/vision
```

---

**Last Updated**: March 16, 2026
**Status**: ✅ Configuration Complete - Awaiting Content Creation
