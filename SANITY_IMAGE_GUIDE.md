# Sanity Image Assets - Complete Guide

## 1. Image URL Builder Setup ✅

The `@sanity/image-url` package is already configured in your project.

### File: [src/lib/sanity.ts](src/lib/sanity.ts)

```typescript
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getSanityImageUrl(image: any, width?: number, height?: number) {
  if (!image) return "";
  let url = urlFor(image).auto("format").fit("max");
  if (width) url = url.width(width);
  if (height) url = url.height(height);
  return url.url();
}
```

---

## 2. Image Fields in Your Schemas

### A. SiteSettings Images
**File**: [studio-omnimed-health/schemaTypes/siteSettings.ts](studio-omnimed-health/schemaTypes/siteSettings.ts)

```typescript
// Logo
- logo (image)
- logoAlt (string) - Alternative text

// Page Images
- heroImage (image)
- aboutImage (image)
- ceoPortrait (image)
- ceoSignature (image)
```

### B. Person Images
**File**: [studio-omnimed-health/schemaTypes/person.ts](studio-omnimed-health/schemaTypes/person.ts)

```typescript
// Profile image with hotspot support
- image (image with hotspot: true)
```

### C. Service Images
**File**: [studio-omnimed-health/schemaTypes/service.ts](studio-omnimed-health/schemaTypes/service.ts)

```typescript
- icon (image) - Service icon/image
```

### D. LandingPage Images
**File**: [studio-omnimed-health/schemaTypes/landingPage.ts](studio-omnimed-health/schemaTypes/landingPage.ts)

```typescript
// Hero Section
- backgroundImage (image with hotspot)

// Testimonials
- avatar (image per testimonial)
```

### E. Post/Blog Images
**File**: [studio-omnimed-health/schemaTypes/post.ts](studio-omnimed-health/schemaTypes/post.ts)

```typescript
- image (image) - Post/article cover image
```

---

## 3. Using Images in React Components

### Basic Usage - Image URL String

```typescript
import { urlFor } from "@/lib/sanity";
import { useSiteSettings } from "@/hooks/useSanity";

export function Header() {
  const { settings } = useSiteSettings();
  
  return (
    <img 
      src={urlFor(settings?.logo).width(200).url()} 
      alt={settings?.logoAlt || "Logo"}
    />
  );
}
```

### Advanced Usage - With Image Component

```typescript
interface ImageProps {
  asset: any;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SanityImage({ asset, alt, width, height, className }: ImageProps) {
  if (!asset) return null;
  
  const url = urlFor(asset)
    .auto("format")
    .fit("max")
    .width(width)
    .height(height)
    .url();
  
  return (
    <img 
      src={url} 
      alt={alt} 
      width={width}
      height={height}
      className={className}
    />
  );
}
```

### Using Helper Function

```typescript
import { getSanityImageUrl } from "@/lib/sanity";

// Get responsive image URL
const imageUrl = getSanityImageUrl(person.image, 400, 300);

<img src={imageUrl} alt={person.name} />
```

---

## 4. Landing Page Image Integration Examples

### Example 1: Hero Section with Background Image

```typescript
import { urlFor } from "@/lib/sanity";
import { useLandingPage } from "@/hooks/useSanity";

export function HeroSection() {
  const { landingPage, loading } = useLandingPage();
  
  if (loading) return <div>Loading...</div>;
  
  const bgImage = landingPage?.heroSection?.backgroundImage;
  const bgUrl = bgImage ? urlFor(bgImage).width(1400).fit("crop").url() : "";
  
  return (
    <section 
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
        <h1>{landingPage?.heroSection?.headline}</h1>
        <p>{landingPage?.heroSection?.subheadline}</p>
      </div>
    </section>
  );
}
```

### Example 2: Team Member Cards with Images

```typescript
import { urlFor } from "@/lib/sanity";
import { useTeam } from "@/hooks/useSanity";

export function TeamGrid() {
  const { team, loading } = useTeam();
  
  if (loading) return <div>Loading team...</div>;
  
  return (
    <div className="grid grid-cols-3 gap-6">
      {team.map((person) => (
        <div key={person._id} className="text-center">
          {person.image && (
            <img 
              src={urlFor(person.image).width(300).height(300).url()}
              alt={person.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          <h3 className="mt-4 font-bold">{person.name}</h3>
          <p className="text-sm text-gray-600">{person.role}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Services with Icons

```typescript
import { urlFor } from "@/lib/sanity";
import { useServices } from "@/hooks/useSanity";

export function ServiceCards() {
  const { services, loading } = useServices();
  
  if (loading) return <div>Loading services...</div>;
  
  return (
    <div className="grid grid-cols-2 gap-8">
      {services.map((service) => (
        <div key={service._id}>
          {service.icon && (
            <img 
              src={urlFor(service.icon).width(80).url()}
              alt={service.title}
              className="w-20 h-20"
            />
          )}
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Testimonials with Avatars

```typescript
import { urlFor } from "@/lib/sanity";
import { useLandingPage } from "@/hooks/useSanity";

export function TestimonialSection() {
  const { landingPage, loading } = useLandingPage();
  
  if (loading) return <div>Loading testimonials...</div>;
  
  const testimonials = landingPage?.testimonialSection?.testimonials;
  
  return (
    <div className="space-y-6">
      {testimonials?.map((testimonial, idx) => (
        <div key={idx} className="flex gap-4">
          {testimonial.avatar && (
            <img 
              src={urlFor(testimonial.avatar).width(60).height(60).url()}
              alt={testimonial.author}
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            <p className="italic">"{testimonial.quote}"</p>
            <p className="font-bold mt-2">{testimonial.author}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 5. Image URL Builder API

### Available Methods

```typescript
urlFor(image)
  .width(200)              // Set width in pixels
  .height(600)             // Set height in pixels
  .fit("crop")             // crop, clip, fill, max, scale, fillmax
  .crop("center")          // left, center, right, top, bottom
  .quality(80)             // JPEG quality: 0-100
  .auto("format")          // Optimize format for browser
  .blur(10)                // Blur effect: 1-100
  .sharpen(10)             // Sharpen: 1-50
  .rect(10, 10, 200, 200)  // Manual crop coordinates
  .url()                   // Get final URL string
```

### Examples

```typescript
// Responsive thumbnail
urlFor(image).width(300).height(300).fit("crop").auto("format").url()

// Large hero image
urlFor(image).width(1920).height(1080).fit("crop").quality(90).url()

// Circular avatar
urlFor(image).width(200).height(200).fit("crop").url()

// Blog post
urlFor(image).width(800).fit("scale").auto("format").url()

// With blur fallback
urlFor(image).width(800).blur(50).url() // Blurred version for skeleton
```

---

## 6. Response Format from GROQ Queries

When you fetch data, images come as objects:

```typescript
// GROQ Query Response
{
  _id: "image-asset-123",
  asset: {
    _ref: "image-abc123-metadata",
    _type: "reference"
  }
}

// What urlFor() expects
const image = {
  asset: {
    _ref: "image-abc123-metadata",
    _type: "reference"
  }
}

// Use directly:
urlFor(image).width(300).url()
```

---

## 7. Handling Missing/Null Images

### Pattern 1: Default Image

```typescript
const imageUrl = person?.image 
  ? urlFor(person.image).width(300).url()
  : "/images/default-avatar.png";

<img src={imageUrl} alt={person?.name} />
```

### Pattern 2: Conditional Rendering

```typescript
{person?.image && (
  <img 
    src={urlFor(person.image).width(300).url()}
    alt={person.name}
  />
)}
```

### Pattern 3: Fallback Component

```typescript
function PersonImage({ person }: { person?: Person }) {
  if (!person?.image) {
    return <div className="bg-gray-200 w-[300px] h-[300px]" />;
  }
  
  return (
    <img 
      src={urlFor(person.image).width(300).url()}
      alt={person.name}
    />
  );
}
```

---

## 8. Image Upload Workflow in Sanity Studio

1. **Go to Sanity Studio**: https://i7vyc4cx.sanity.studio
2. **Create or Edit a Document** (Person, Service, LandingPage, etc.)
3. **Click on Image Field**
4. **Click "Upload Image"**
5. **Select File** from your computer
6. **Add Alt Text** (if available)
7. **Set Hotspot** (if needed for cropping)
8. **Publish Document**

---

## 9. Image Optimization Best Practices

### For Web Performance

```typescript
// Always specify width for responsive images
urlFor(image)
  .width(400)  // Prevents oversized downloads
  .auto("format")  // WebP on Chrome, JPEG on Safari, etc.
  .quality(75)  // Balance quality vs file size
  .url()

// Use different widths for different breakpoints
const mobileUrl = urlFor(image).width(400).url();
const desktopUrl = urlFor(image).width(1200).url();
```

### Supported Formats

- JPEG (default)
- PNG
- WebP (auto-selected when supported)
- GIF

```typescript
// Force format
urlFor(image).format("webp").url()
urlFor(image).format("png").url()
```

---

## 10. Sanity Image Metadata in GROQ

To get image metadata (dimensions, file size, etc.):

```typescript
export const PERSON_WITH_IMAGE_METADATA = `
  *[_type == "person"] {
    _id,
    name,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          palette,
          hasAlpha,
          isOpaque,
        }
      }
    }
  }
`;
```

---

## 11. Troubleshooting

### Issue: Images not loading

**Check**:
1. Sanity Studio: Image field is populated (not empty)
2. GROQ Query: image field is included in projection
3. React: urlFor() is being called on the image object

### Issue: Slow image loading

**Solution**:
```typescript
// Add width to reduce transfer size
urlFor(image).width(800).url()  // Good
urlFor(image).url()             // Slower
```

### Issue: Image crops incorrectly

**Solution**:
```typescript
// Set proper fit mode
.fit("crop")   // Crops to size (default)
.fit("scale")  // Scales to fit
.fit("max")    // Smallest dimension scales
```

---

## 12. React Image Component Template

Create `src/components/SanityImage.tsx`:

```typescript
import { CSSProperties } from 'react';
import { urlFor } from '@/lib/sanity';

interface SanityImageProps {
  image?: any;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  quality?: number;
  fit?: 'crop' | 'scale' | 'max' | 'fill' | 'clip' | 'fillmax';
  sizes?: string;
}

export function SanityImage({
  image,
  alt,
  width = 400,
  height,
  className = '',
  style,
  priority = false,
  quality = 80,
  fit = 'crop',
  sizes,
}: SanityImageProps) {
  if (!image) return null;

  let builder = urlFor(image).auto('format').quality(quality).fit(fit);
  
  if (width) builder = builder.width(width);
  if (height) builder = builder.height(height);
  
  const src = builder.url();

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      sizes={sizes}
    />
  );
}
```

**Usage**:
```typescript
<SanityImage 
  image={person.image} 
  alt={person.name}
  width={300}
  height={300}
  className="rounded-lg"
  fit="crop"
/>
```

---

**Summary**: Your Sanity project is fully configured for image handling. All schemas have image fields, the URL builder is set up, and you have GROQ queries ready. Just upload images in Sanity Studio and reference them in your components using `urlFor()`.
