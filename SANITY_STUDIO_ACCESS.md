# How to Access Sanity Studio - Two Options

## 🚀 Option 1: Run Studio Locally (Development) - EASY & FAST

This is the fastest way to test and create content during development.

### Step 1: Start Local Studio Dev Server

```bash
cd /workspaces/omnimed-ui/studio-omnimed-health
npm run dev
```

### Step 2: Login with Your Sanity Account

When the server starts, you'll see:
```
✔ Sanity Studio is running on http://localhost:3333
```

Visit: **http://localhost:3333**

You'll be prompted to login with your Sanity account.

### Step 3: Create Content

- Document types (Person, Service, LandingPage, etc.) will be available
- Create and publish documents
- Upload images
- Test GROQ queries in the Vision tool

---

## ☁️ Option 2: Deploy to Sanity Hosted Studio (Production)

This makes the studio publicly accessible at `https://i7vyc4cx.sanity.studio`

### Requirements

1. **Sanity Account** - Create at https://sanity.io
2. **Sanity CLI Authentication** - Run once per project

### Step 1: Authenticate with Sanity

```bash
cd /workspaces/omnimed-ui/studio-omnimed-health
npm run build
npx sanity deploy
```

You'll be prompted to:
- Login to your Sanity account
- Choose a unique studio hostname (e.g., `omnimed-health`)

### Step 2: Studio is Live!

After deployment, your studio will be at:
```
https://i7vyc4cx.sanity.studio
```

You can bookmark this and access it anytime.

---

## 🎯 Recommended Workflow

### For Development/Testing:
1. ✅ **Use Local Studio** → `npm run dev` in studio folder
2. Local is fast and doesn't require internet
3. No "Studio not found" errors

### For Team Collaboration:
1. ✅ **Deploy to Sanity** → `npm run build` then `npx sanity deploy`
2. Everyone can access from same URL
3. Content is persisted to Sanity's servers

---

## Quick Start: Local Studio

```bash
# Terminal 1: Start main dev server
cd /workspaces/omnimed-ui
npm run dev
# Visit http://localhost:5173

# Terminal 2: Start studio (in another terminal)
cd /workspaces/omnimed-ui/studio-omnimed-health
npm run dev
# Visit http://localhost:3333
```

Now you have both:
- ✅ **React app** at http://localhost:5173
- ✅ **Sanity Studio** at http://localhost:3333

---

## Fix "Studio not found" Error

If you see "Studio not found" at `https://i7vyc4cx.sanity.studio`:

**You need to either**:

### Option A: Run Locally (Quick fix)
```bash
cd studio-omnimed-health
npm run dev
# Access at http://localhost:3333
```

### Option B: Deploy to Sanity (Permanent fix)
```bash
cd studio-omnimed-health
npm run build
npx sanity deploy
```

---

## What's the Difference?

| Feature | Local Dev | Sanity Hosted |
|---------|-----------|---------------|
| Access URL | http://localhost:3333 | https://i7vyc4cx.sanity.studio |
| Available | While server running | Always (24/7) |
| Login Required | Yes, each session | Yes |
| Speed | Very fast | Depends on internet |
| Cost | Free | Free (with paid tiers) |
| Sharing | Local only (not shareable) | Shareable with team |
| Best for | Development | Production/Team |

---

## Configure Studio Name (Optional)

To customize your studio hostname when deploying:

**File**: `studio-omnimed-health/sanity.config.ts`

```typescript
export default defineConfig({
  name: 'omnimed-health-studio',  // ← Change this
  title: 'OmniMed Health - Studio',  // ← And/or this
  projectId: 'i7vyc4cx',
  dataset: 'production',
  // ... rest of config
})
```

---

## Troubleshooting

### "Studio not found" at sanity.studio URL
→ **Solution**: Run `npm run dev` locally instead

### "Cannot find module" errors
→ **Solution**: Run `npm install` in studio-omnimed-health folder

### Port 3333 already in use (local)
→ **Solution**: Change port
```bash
npm run dev -- --port 3334
```

### Login issues
→ **Solution**: Clear browser cookies and try again, or use incognito mode

---

## Next Steps

1. **Choose your approach**: Local or Hosted
2. **Start the studio**: `npm run dev` (local) or `npx sanity deploy` (hosted)
3. **Login with Sanity account**
4. **Create content** as per [SANITY_CONTENT_SETUP.md](../SANITY_CONTENT_SETUP.md)
5. **Test on React app**: http://localhost:5173

---

**Need help?** See [SANITY_CONTENT_SETUP.md](../SANITY_CONTENT_SETUP.md) for step-by-step content creation instructions.
