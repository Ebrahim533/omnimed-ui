# Seed Sanity CMS with OmniMed Data

This guide shows how to populate your Sanity CMS with all the team member and site settings data so that your React frontend pulls everything from Sanity instead of hardcoded values.

## 📋 Data to Populate

### 1. Site Settings (Global Company Info)
- **Title**: OmniMed
- **Logo Alt**: OmniMed Logo
- **Contact Email**: info@omnimedhealth.com
- **Contact Phone**: (917) 744-7308
- **Address**: New York, NY 10001
- **Company Description**: Proactive, technology-enabled care management for better health outcomes...
- **Images to Upload**:
  - Logo
  - Hero Image
  - About Page Hero Image
  - CEO Portrait
  - CEO Signature

### 2. Team Members (5 Person Documents)

All team members have social links configured. Make sure each has their LinkedIn profile and a professional portrait photo.

---

## 🚀 Option 1: Manual Entry in Sanity Console (Recommended)

### Step 1: Access Sanity Console
Go to: **https://console.sanity.io/project/i7vyc4cx/dataset/production**

### Step 2: Create Site Settings Document

1. Click **Create Document** → Select **Site Settings**
2. Fill in all fields:
   ```
   Title: OmniMed
   Logo Alt: OmniMed Logo
   Contact Email: info@omnimedhealth.com
   Contact Phone: (917) 744-7308
   Address: New York, NY 10001
   Company Description: Proactive, technology-enabled care management for better health outcomes. OmniMed combines advanced monitoring, data analytics, and compassionate coordination to deliver better outcomes for every patient.
   ```
3. Upload images:
   - **Logo**: Your company logo
   - **Hero Image**: Background image (~1920x1080)
   - **About Image**: About section image (~800x600)
   - **CEO Portrait**: Dr. James Mitchell portrait (~500x650)
   - **CEO Signature**: Signature image (~200x80)
4. Click **Publish**

### Step 3: Create Person Documents

Repeat this process for each of the 5 team members:

#### Person 1: CEO & Founder
```
Name: Dr. James Mitchell
Role: CEO & Founder
Bio: We aren't just managing health — we're predicting a better quality of life. Every patient deserves care that anticipates their needs, not one that merely reacts to crises.
Featured: ✅ ON (checked)
Social Link:
  Platform: linkedin
  URL: https://linkedin.com/in/jamesmitchell
Image: Upload professional portrait
```

#### Person 2: CTO
```
Name: Dr. Sarah Chen
Role: Chief Technology Officer
Bio: 15+ years in health informatics and AI-driven care platforms. Sarah leads our technical vision and oversees platform development, ensuring OmniMed stays at the forefront of healthcare innovation.
Featured: OFF
Social Link:
  Platform: linkedin
  URL: https://linkedin.com/in/sarahchen
Image: Upload professional portrait
```

#### Person 3: VP Operations
```
Name: Marcus Rivera
Role: VP of Operations
Bio: Scaled care management for 200+ provider networks nationwide. Marcus ensures seamless implementation and operations across all client partnerships.
Featured: OFF
Social Link:
  Platform: linkedin
  URL: https://linkedin.com/in/marcusrivera
Image: Upload professional portrait
```

#### Person 4: CCO
```
Name: Dr. Elena Vasquez
Role: Chief Clinical Officer
Bio: Board-certified internist specializing in chronic disease management. Elena brings clinical expertise and patient-centered perspective to all our platform decisions.
Featured: OFF
Social Link:
  Platform: linkedin
  URL: https://linkedin.com/in/elenavasquez
Image: Upload professional portrait
```

#### Person 5: Head of Data Science
```
Name: Arjun Patel
Role: Head of Data Science
Bio: Former Google Health — building predictive models for proactive care. Arjun develops the AI algorithms that power OmniMed's predictive analytics.
Featured: OFF
Social Link:
  Platform: linkedin
  URL: https://linkedin.com/in/arjunpatel
Image: Upload professional portrait
```

---

## 🔧 Option 2: Use Sanity CLI (Advanced)

### Step 1: Install Dependencies
```bash
cd studio-omnimed-health
npm install
```

### Step 2: Authenticate with Sanity
```bash
npx sanity login
```

Follow the authentication prompts.

### Step 3: Import Seed Data
```bash
npx sanity dataset import ../sanity-seed.ndjson production
```

Or import with replace:
```bash
npx sanity dataset import ../sanity-seed.ndjson production --replace
```

### Step 4: Add Images
Since images require file uploads and can't be included in the JSON, you'll need to:
1. Open Sanity Studio or Console
2. Go to each document and upload the images manually
3. Ensure all image fields are filled

---

## 🖼️ Image Guidelines

| Image | Recommended Size | Format | Purpose |
|-------|-----------------|--------|---------|
| Logo | 200-300px wide | PNG/SVG | Header and footer |
| Hero Image | 1920x1080 | JPG | Homepage hero background |
| About Image | 800x600 | JPG | About page hero section |
| CEO Portrait | 500x650 | JPG | CEO featured section |
| CEO Signature | 200x80 | PNG | CEO signature display |
| Team Portraits | 400x500 | JPG | Team member cards |

---

## ✅ Verification

After seeding, verify everything is working:

### 1. Check Sanity Console
- Go to console.sanity.io and verify all documents are published
- Ensure all images are uploaded

### 2. Run Your Frontend
```bash
cd /workspaces/omnimed-ui
npm run dev
```

### 3. Test Components
- Visit **http://localhost:5173/about** - Should show team members from Sanity
- Visit **http://localhost:5173/** - Should show CEO info from Sanity
- Check **Footer** - Should show contact info from Sanity

### 4. Check Browser Console
- No errors related to missing data
- Images loading from Sanity CDN (san.sanity.io)

---

## 🔄 Making Updates

Once data is seeded, update it directly in Sanity:

1. Go to: https://console.sanity.io/project/i7vyc4cx/dataset/production
2. Click on any document to edit it
3. Make changes and click **Publish**
4. Your frontend will reflect changes immediately (data is fresh on each page load)

---

## 📞 Need Help?

- **Sanity Docs**: https://www.sanity.io/docs
- **Project Dashboard**: https://manage.sanity.io
- **Vision (Query Tool)**: https://console.sanity.io/project/i7vyc4cx/vision

---

## Summary

✅ All person data removed from React components  
✅ All data now fetchable from Sanity via hooks  
✅ Components show placeholders if data missing  
✅ Ready for content management via Sanity console  

**Next Step**: Seed the data using Option 1 or 2 above!
