# How to Access Your Sanity Studio - QUICK START

## ⚡ IMMEDIATE ACCESS (What to do right now)

### Your Studio is Running at:
```
http://localhost:3333
```

**Click this link or paste into your browser:**
```
http://localhost:3333
```

---

## 🔑 Inside the Studio

1. **Login** with your Sanity credentials
2. You'll see the content editor
3. Start creating documents:
   - Site Settings
   - Person (team member)
   - Service
   - Landing Page

---

## ⚠️ Why "https://i7vyc4cx.sanity.studio" Shows 404

That URL is for the **hosted version** on Sanity's servers, which requires deployment.

**You have 2 choices:**

### Option A: Use Local Studio (NOW) ✅ **Recommended for Development**
- **Access**: http://localhost:3333
- **Status**: Already running
- **Speed**: Instant
- **When it works**: While dev server is running

### Option B: Deploy to Sanity (Takes 5 minutes) ⭐ **For Team/Production**
```bash
cd /workspaces/omnimed-ui/studio-omnimed-health
npm run build
npx sanity deploy
```

Then visit: `https://i7vyc4cx.sanity.studio` (after deployment)

---

## 📋 Two Terminal Setup (Recommended)

### Terminal 1: Your React App
```bash
cd /workspaces/omnimed-ui
npm run dev
# Visit: http://localhost:5173
```

### Terminal 2: Sanity Studio
```bash
cd /workspaces/omnimed-ui/studio-omnimed-health
npm run dev
# Visit: http://localhost:3333
```

Now you have both running simultaneously!

---

## 🎯 What Next?

1. ✅ **Go to http://localhost:3333**
2. ✅ **Login with Sanity account**
3. ✅ **Create Site Settings document**
4. ✅ **Create Person document (CEO/Founder)**
5. ✅ **Create Service documents**
6. ✅ **Create Landing Page document**
7. ✅ **Upload images**
8. ✅ **Publish all documents**
9. ✅ **Check http://localhost:5173 to see data appear**

---

## 🚀 Ready to Deploy? (Optional - for production)

When you're ready to make the studio publicly available:

```bash
cd /workspaces/omnimed-ui/studio-omnimed-health
npm run build
npx sanity deploy
```

This will:
- Build the studio
- Deploy to Sanity servers
- Give you a public URL: `https://i7vyc4cx.sanity.studio`

---

## ✨ Key Points

| What | Where | Status |
|------|-------|--------|
| **Local Studio** | http://localhost:3333 | ✅ Running Now |
| **React App** | http://localhost:5173 | Start with `npm run dev` |
| **Hosted Studio** | https://i7vyc4cx.sanity.studio | ⏳ Requires deployment |

---

**📌 TL;DR: Go to http://localhost:3333 and start creating content!**
