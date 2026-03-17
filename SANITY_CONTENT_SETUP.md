# Sanity Studio Content Setup & Asset Linking Guide

## Table of Contents

1. [Getting Started with Sanity Studio](#getting-started)
2. [Creating Site Settings](#site-settings)
3. [Working with Images and Assets](#images-assets)
4. [Creating Person/Team Documents](#person-documents)
5. [Creating Services](#services)
6. [Creating Landing Page](#landing-page)
7. [Content Verification Checklist](#verification)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started with Sanity Studio {#getting-started}

### Access Sanity Studio

1. **URL**: https://i7vyc4cx.sanity.studio
2. **Login**: Use your Sanity credentials
3. **Project ID**: `i7vyc4cx`
4. **Dataset**: `production`

### Studio Interface Overview

```
Left Sidebar:
├── Desk (Content Management)
├── Vision (GROQ Query Playground)
├── Create New Documents
├── Settings
└── Plugins

Main Area:
├── Document List
├── Document Editor
├── Publishing Controls (Publish, Draft, etc.)
└── Revision History
```

---

## Creating Site Settings {#site-settings}

### Purpose
Site-wide configuration for your OmniMed Health website.

### How to Create

1. **Go to Sanity Studio Dashboard**
2. **Click "New+" or use the Create menu**
3. **Select "Site Settings" from document types**
4. **Fill in the following fields**:

```
Field Name              | Type   | Required | Description
─────────────────────────────────────────────────────────────
title                   | Text   | Yes      | "OmniMed Health" or company name
logo                    | Image  | No       | Your company logo (SVG or PNG)
logoAlt                 | Text   | No       | Alt text for logo
heroImage               | Image  | No       | Default hero background image
aboutImage              | Image  | No       | About page hero image
ceoPortrait             | Image  | No       | Photo of CEO/Founder
ceoSignature            | Image  | No       | Signature image
contactEmail            | Text   | No       | contact@omnimed.com
contactPhone            | Text   | No       | +1 (xxx) xxx-xxxx
address                 | Text   | No       | Full address (multi-line)
companyDescription      | Long Text | No    | About the company (paragraph)
```

### Example Content

**Title**: OmniMed Health

**Company Description**:
```
OmniMed Health combines advanced technology with compassionate care to deliver 
proactive health management solutions that keep patients healthier, longer. 
Our comprehensive care coordination platform enables healthcare providers to 
optimize patient outcomes while reducing costs.
```

**Contact Email**: hello@omnimed.com

**Contact Phone**: +1 (800) OMNIMED

### Publishing

1. **Click "Publish"** button in top-right
2. **Document will be live** (appears on website)

---

## Working with Images and Assets {#images-assets}

### Image Upload Process

When editing ANY image field:

```
1. Hover over the image field
2. Click the upload icon or image area
3. Select file from computer
4. Wait for upload to complete
5. (Optional) Set hotspot for crop area
6. (Optional) Add alt text
7. Save & Publish
```

### Image Best Practices

**Recommended Sizes**:

| Image Type | Width | Height | Format | Notes |
|------------|-------|--------|--------|-------|
| Logo | 200-400 | 100-200 | PNG/SVG | Transparent background |
| Hero Background | 1920 | 1080 | JPG | Optimize for web |
| Avatar/Portrait | 400-600 | 400-600 | JPG | Square aspect ratio |
| Icon/Service | 200-300 | 200-300 | PNG | Transparent background |
| Testimonial Avatar | 100 | 100 | JPG | Circular (CSS) |
| Signature | 400 | 150 | PNG | Transparent background |

### Setting Hotspots

When you see "Set hotspot" option:

1. **Click on image preview**
2. **Drag to select the important area** (center on faces, etc.)
3. **This area will be preserved** when image is cropped

### Supported Formats

- ✅ JPG/JPEG
- ✅ PNG
- ✅ GIF
- ✅ SVG
- ❌ WEBP (auto-converted by Sanity)
- ❌ BMP

---

## Creating Person/Team Documents {#person-documents}

### Purpose
Define team members, executives, and staff.

### How to Create

1. **In Sanity Studio**: Click "New+" → "Person"
2. **Fill in fields**:

```
Field Name    | Type   | Required | Description
──────────────────────────────────────────────────────
name          | Text   | Yes      | Full name
slug          | Slug   | Yes      | Auto-generated from name (e.g., john-smith)
role          | Text   | Yes      | Job title (CEO, Doctor, etc.)
bio           | Text   | No       | Short biography (2-3 sentences)
image         | Image  | No       | Profile photo
social        | Array  | No       | Social links (LinkedIn, Twitter, etc.)
featured      | Toggle | No       | Check this for CEO/Founder
```

### Example Person #1 - CEO/Founder

```
Name: John Smith
Role: CEO & Founder
Bio: John is a healthcare technology pioneer with 20+ years 
     of experience in patient care management systems. 
     He founded OmniMed Health to bring remote monitoring 
     to every patient.
Featured: ✓ (CHECKED - this makes it the featured person)
Social Links:
  - Platform: LinkedIn
    URL: https://linkedin.com/in/johnsmith
  - Platform: Email
    URL: mailto:john@omnimed.com
```

### Example Person #2 - Medical Director

```
Name: Dr. Sarah Johnson
Role: Chief Medical Officer
Bio: Dr. Johnson is board-certified in internal medicine 
     and has led clinical programs for major health systems.
Featured: ☐ (Not featured)
Social Links:
  - Platform: LinkedIn
    URL: https://linkedin.com/in/sarahjohnson
```

### Adding Images to Persons

1. **In the Person editor**, find **image** field
2. **Click the upload area**
3. **Choose a square photo** (400x400 px recommended)
4. **Set hotspot** if needed (center on face)
5. **Click "Publish"**

### Publishing

- Click **"Publish"** to make person visible
- Click **"Unpublish"** to hide person

---

## Creating Services {#services}

### Purpose
Define your service offerings (RPM, CCM, PCM, etc.)

### How to Create

1. **In Sanity Studio**: Click "New+" → "Service"
2. **Fill in fields**:

```
Field Name      | Type   | Required | Notes
────────────────────────────────────────────────────────
title           | Text   | Yes      | "Remote Patient Monitoring"
slug            | Slug   | Yes      | Auto-generated
description     | Text   | No       | Short summary (1 sentence)
fullDescription | Block  | No       | Rich text description
icon            | Image  | No       | Service icon/image
features        | Array  | No       | List of key features
order           | Number | No       | Display order (0, 1, 2...)
```

### Example Service - Remote Patient Monitoring

```
Title: Remote Patient Monitoring
Description: Continuous monitoring of patient vitals and 
             health metrics from home.
Order: 0

Features:
  1. Title: "24/7 Monitoring"
     Description: "Continuous tracking of vital signs and health metrics"
  
  2. Title: "Real-time Alerts"
     Description: "Immediate notification of out-of-range values"
  
  3. Title: "Patient Engagement"
     Description: "Daily check-ins and health coaching"

Icon: [Upload healthcare/monitoring icon image]
```

### Example Service - Care Coordination Management

```
Title: Care Coordination Management
Description: Coordinated care across multiple providers 
             and healthcare settings.
Order: 1

Features:
  1. Title: "Provider Communication"
     Description: "Seamless coordination between all care team members"
  
  2. Title: "Care Plans"
     Description: "Centralized, collaborative care plan management"
  
  3. Title: "Medication Management"
     Description: "Tracking and optimization of medications"

Icon: [Upload coordination/team icon image]
```

---

## Creating Landing Page {#landing-page}

### Purpose
Your main marketing/informational page with hero, stats, services, testimonials.

### How to Create

1. **In Sanity Studio**: Click "New+" → "Landing Page"
2. **Fill in all sections**:

### 2.1 Basic Info

```
Title: "OmniMed Health - Home"
Slug: home
SEO Title: "OmniMed Health | Proactive Care Management"
SEO Description: "Technology-enabled proactive care management 
                  solutions for better patient outcomes"
```

### 2.2 Hero Section

```
Headline: "Proactive Care Management for Better Outcomes"
Subheadline: "OmniMed combines advanced technology with 
              compassionate care to deliver proactive health 
              management that keeps patients healthier, longer."

CTA Button 1:
  Text: "Book Consultation"
  Link: "/appointment"

CTA Button 2:
  Text: "Learn More"
  Link: "/about"

Background Image: [Upload hero image]
```

### 2.3 Stats Section

Add 4 stat cards (click "Add" to add each):

```
Stat 1:
  Value: "10,000+"
  Label: "Patients Managed"
  Icon: "Users"

Stat 2:
  Value: "40%"
  Label: "Reduction in ER Visits"
  Icon: "TrendingUp"

Stat 3:
  Value: "24/7"
  Label: "Monitoring & Support"
  Icon: "Clock"

Stat 4:
  Value: "98%"
  Label: "Patient Satisfaction"
  Icon: "Shield"
```

### 2.4 Featured Services

```
Click "Add reference" → Select Services to feature
Example:
  - Remote Patient Monitoring (from Service docs)
  - Care Coordination Management (from Service docs)
  - Preventive Care Management (from Service docs)
```

### 2.5 Testimonial Section

```
Title: "What Our Patients Say"

Testimonials (add 2-3):

Testimonial 1:
  Quote: "OmniMed has completely transformed how we manage 
         our patient population. The remote monitoring capability 
         has reduced hospital readmissions by 35%."
  Author: "Dr. Michael Chen"
  Role: "Hospital CMO"
  Avatar: [Upload testimonial photo]

Testimonial 2:
  Quote: "As a patient, I feel more connected to my care team. 
         The daily check-ins and real-time alerts give me peace 
         of mind."
  Author: "Patricia Madrid"
  Role: "Patient"
  Avatar: [Upload testimonial photo]
```

### 2.6 Final CTA Section

```
Title: "Ready to Transform Your Care Delivery?"
Description: "Schedule a demo with our team to see how OmniMed 
             can reduce costs and improve outcomes for your organization."
Button Text: "Start Your Free Trial"
Button Link: "/appointment"
```

### Publishing Landing Page

1. **Review all fields** are filled
2. **Check images are uploaded**
3. **Click "Publish"**
4. **You should see it on website** at https://yourdomain.com

---

## Content Verification Checklist {#verification}

Before you consider setup complete:

### ✅ Site Settings Document

```
☐ Document created
☐ Title filled in
☐ Logo uploaded
☐ Hero image uploaded
☐ Contact email filled in
☐ Contact phone filled in
☐ Company description filled in
☐ Document published
```

### ✅ Person Documents (At Least 1)

```
For CEO/Founder:
☐ Person document created
☐ Name filled in
☐ Role filled in
☐ Bio filled in
☐ Profile image uploaded
☐ "Featured" checkbox CHECKED
☐ At least one social link added
☐ Document published

For Additional Team Members (optional):
☐ 2-3 more person documents created
☐ All fields filled
☐ Images uploaded
☐ All published
```

### ✅ Services Documents (At Least 2)

```
For Each Service:
☐ Title filled in
☐ Description filled in
☐ Icon/image uploaded
☐ 3-4 features added
☐ Order number assigned (0, 1, 2...)
☐ Published
```

### ✅ Landing Page Document

```
Basic Info:
☐ Title filled in
☐ SEO Title filled in
☐ SEO Description filled in

Hero Section:
☐ Headline filled in
☐ Subheadline filled in
☐ CTA button texts filled in
☐ CTA button links filled in
☐ Background image uploaded

Stats Section:
☐ 4 stats added with values and labels
☐ Icon names correct

Featured Services:
☐ 2-3 services referenced

Testimonials:
☐ Section title filled in
☐ 2-3 testimonials added
☐ All quotes, authors, roles filled
☐ All avatar images uploaded

Final CTA:
☐ Title filled in
☐ Description filled in
☐ Button text filled in
☐ Button link filled in

Publishing:
☐ Document published
```

### ✅ Test in Browser

```
Navigate to your website:
☐ Hero section displays with image
☐ Stats section shows all 4 stats
☐ Services appear with icons
☐ Team member photos load
☐ Testimonials display with avatars
☐ Contact info is visible in footer
☐ CTA buttons link correctly
☐ No broken image links
☐ No console errors
```

---

## Testing Data Fetching {#testing}

### Method 1: Browser DevTools Console

```javascript
// In browser console, test queries:

// Fetch featured person
const myPerson = await fetch('https://i7vyc4cx.sanity.io/v1/data/query/production?query=*[_type==%22person%22%20%26%26%20featured==%20true][0]')
  .then(r => r.json())
  .then(d => d.result)
console.log(myPerson)

// Should show: { _id: "...", name: "...", featured: true }
```

### Method 2: Sanity Vision Tool

1. Go to: https://i7vyc4cx.sanity.studio/vision
2. Paste this query:
```groq
*[_type == "siteSettings"][0] {
  title,
  contactEmail,
  logo,
}
```
3. Click "Execute Query"
4. Should see your site settings data

### Method 3: Network Tab

1. Open DevTools → Network tab
2. Load your website
3. Look for requests to `i7vyc4cx.sanity.io`
4. Status should be `200 OK`
5. Response should contain your data

---

## Troubleshooting {#troubleshooting}

### Issue: "Document not showing on website"

**Check**:
1. ✅ Is document **Published**? (not Draft)
2. ✅ Required fields all filled in?
3. ✅ Did you refresh the website?
4. ✅ Check browser console for errors

**Solution**:
```
1. In Sanity Studio: Click "Publish" button
2. Wait for "Published successfully" message
3. Refresh website (Ctrl+Shift+R)
```

### Issue: "Images not loading on website"

**Check**:
1. ✅ Image field is filled (not empty)
2. ✅ Image is fully uploaded (check progress)
3. ✅ Image format is supported (JPG, PNG, GIF, SVG)
4. ✅ alt text is filled in

**Solution**:
```
1. Re-upload image
2. Ensure file size < 5MB
3. Check file format
4. Try JPG format if PNG fails
```

### Issue: "Social links not showing"

**Check**:
1. ✅ Using correct platform names: linkedin, twitter, github, email
2. ✅ URL field is filled with correct link
3. ✅ Document person is published

**Solution**:
```
- Platform: "linkedin"
- URL: "https://linkedin.com/in/yourname" ✅
- NOT: "linkedin.com/..." ❌
```

### Issue: "Featured person not showing"

**Check**:
1. ✅ Person document has "featured" checkbox CHECKED
2. ✅ Person document is PUBLISHED
3. ✅ All required fields (name, role) are filled
4. ✅ There's only ONE featured person (system fetches first match)

**Solution**:
```
1. Open Person document
2. Scroll down to "Featured (CEO/Founder)" field
3. Click checkbox to check it ✓
4. Click "Publish"
```

### Issue: "Services not showing in landing page"

**Check**:
1. ✅ At least 1 Service document created and published
2. ✅ Landing Page has services referenced
3. ✅ Each service has "title" and "slug" filled

**Solution**:
```
1. Create Service documents first
2. Then reference them in Landing Page
3. Click "Add reference" in Featured Services
4. Search for and select service by name
```

### Issue: "Testimonial avatars missing"

**Check**:
1. ✅ Avatar image field is filled (not empty)
2. ✅ Image is uploaded successfully
3. ✅ Image format: JPG, PNG, or GIF

**Solution**:
```
1. For each testimonial, click in "avatar" field
2. Upload the testimonial author's photo
3. Use square images (100x100 recommended)
4. Publish document
```

---

## Best Practices

✅ **DO**:
- Upload images before publishing
- Fill in alt text for all images
- Use consistent image sizes
- Publish after making changes
- Test GROQ queries in Vision tool
- Keep content up-to-date

❌ **DON'T**:
- Leave required fields blank
- Upload huge images (>5MB)
- Use unsupported image formats
- Delete referenced documents
- Publish incomplete content

---

## Next Steps

1. **Create Site Settings** - Foundation for your site
2. **Create at least 1 Person** - Your featured person
3. **Create at least 2 Services** - Your offerings
4. **Create Landing Page** - Your homepage
5. **Publish all documents**
6. **Test on website** - Verify everything displays

---

**Support**: For issues, check Sanity docs: https://sanity.io/docs
**Project URL**: https://i7vyc4cx.sanity.studio
