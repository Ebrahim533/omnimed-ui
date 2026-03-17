# 🚀 Quick Start: Populate Sanity & Launch

Your frontend is ready to go! All hardcoded data has been removed. Now populate Sanity in 10 minutes.

## 1️⃣ Go to Sanity Console (30 seconds)

**URL**: https://console.sanity.io/project/i7vyc4cx/dataset/production

Click **Create Document**

---

## 2️⃣ Create Site Settings (3 minutes)

Select **Site Settings** and fill in:

```
Title: OmniMed
Logo Alt: OmniMed Logo
Contact Email: info@omnimedhealth.com
Contact Phone: (917) 744-7308
Address: New York, NY 10001
Company Description: Proactive, technology-enabled care management for better health outcomes. OmniMed combines advanced monitoring, data analytics, and compassionate coordination to deliver better outcomes for every patient.
```

**Upload Images**:
- **Logo** (any size)
- **Hero Image** (1920x1080)
- **About Image** (800x600)
- **CEO Portrait** (500x650)
- **CEO Signature** (200x80)

Click **Publish** ✅

---

## 3️⃣ Create 5 Team Members (5-7 minutes)

### CEO (Featured)
**Create Document** → **Person**

```
Name: Dr. James Mitchell
Role: CEO & Founder
Bio: We aren't just managing health — we're predicting a better quality of life. Every patient deserves care that anticipates their needs, not one that merely reacts to crises.
Featured: ✅ ON
Social:
  Platform: linkedin
  URL: https://linkedin.com/in/jamesmitchell
Image: Upload portrait
```
**Publish** ✅

---

### Team Member 1
```
Name: Dr. Sarah Chen
Role: Chief Technology Officer
Bio: 15+ years in health informatics and AI-driven care platforms. Sarah leads our technical vision and oversees platform development, ensuring OmniMed stays at the forefront of healthcare innovation.
Featured: ❌ OFF
Social: linkedin → https://linkedin.com/in/sarahchen
Image: Upload portrait
```
**Publish** ✅

---

### Team Member 2
```
Name: Marcus Rivera
Role: VP of Operations
Bio: Scaled care management for 200+ provider networks nationwide. Marcus ensures seamless implementation and operations across all client partnerships.
Featured: ❌ OFF
Social: linkedin → https://linkedin.com/in/marcusrivera
Image: Upload portrait
```
**Publish** ✅

---

### Team Member 3
```
Name: Dr. Elena Vasquez
Role: Chief Clinical Officer
Bio: Board-certified internist specializing in chronic disease management. Elena brings clinical expertise and patient-centered perspective to all our platform decisions.
Featured: ❌ OFF
Social: linkedin → https://linkedin.com/in/elenavasquez
Image: Upload portrait
```
**Publish** ✅

---

### Team Member 4
```
Name: Arjun Patel
Role: Head of Data Science
Bio: Former Google Health — building predictive models for proactive care. Arjun develops the AI algorithms that power OmniMed's predictive analytics.
Featured: ❌ OFF
Social: linkedin → https://linkedin.com/in/arjunpatel
Image: Upload portrait
```
**Publish** ✅

---

## 4️⃣ Test Your Frontend (2 minutes)

```bash
npm run dev
```

Visit these URLs and verify they show your Sanity data:

- ✅ **http://localhost:5173/** - See CEO info + signature
- ✅ **http://localhost:5173/about** - See all 5 team members
- ✅ **Footer** - See contact info

---

## 5️⃣ You're Done! 🎉

All data now comes from Sanity. To make changes:

1. Go to: https://console.sanity.io/project/i7vyc4cx/dataset/production
2. Edit any document
3. Click **Publish**
4. ✅ Frontend updates automatically!

---

## 📚 Full Documentation

- **How to seed data**: [SANITY_SEED_GUIDE.md](SANITY_SEED_GUIDE.md)
- **What changed**: [HARDCODED_DATA_REMOVAL_SUMMARY.md](HARDCODED_DATA_REMOVAL_SUMMARY.md)
- **Setup overview**: [SANITY_SETUP_GUIDE.md](SANITY_SETUP_GUIDE.md)

---

## ⚡ TL;DR

1. Go to: https://console.sanity.io/project/i7vyc4cx/dataset/production
2. Create 1 **Site Settings** document
3. Create 5 **Person** documents (one marked as featured)
4. Upload images
5. Run `npm run dev` and test
6. Done! ✅

**Estimated time**: 10-15 minutes
