# Environment Variables Setup

## Required Environment Variables

### `VITE_OPENAI_API_KEY`
Your OpenAI API key for the chat functionality.

**Get your key:**
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-...`)

---

## Setup for Vercel Deployment

### Step 1: Add Environment Variable
1. Go to https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add:
   - **Name:** `VITE_OPENAI_API_KEY`
   - **Value:** Your OpenAI API key
   - **Environments:** Select ALL (Production, Preview, Development)
6. Click **"Save"**

### Step 2: Force Fresh Deployment
**Important:** After adding/updating environment variables, you MUST force a fresh build!

1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **"Redeploy"**
4. **UNCHECK** "Use existing Build Cache" ✅ This is critical!
5. Click **"Redeploy"**

### Why Fresh Build is Required
Vite replaces `import.meta.env.VITE_*` variables at **build time**, not runtime.
If you use cached builds, it won't pick up the new environment variable.

---

## Local Development Setup

### Option 1: Using .env file (Recommended)
1. Create a file named `.env` in the project root
2. Add:
```
VITE_OPENAI_API_KEY=sk-proj-your-key-here
```
3. **Never commit this file!** (It's already in .gitignore)

### Option 2: Using system environment
```bash
export VITE_OPENAI_API_KEY="sk-proj-your-key-here"
npm run dev
```

---

## Troubleshooting

### Chat shows "having trouble connecting"
- **Check browser console** for error messages
- **Look for:** `"🔑 API Key loaded"` or `"❌ NO API KEY FOUND"`
- **If NO API KEY FOUND:**
  - Verify environment variable name is exactly: `VITE_OPENAI_API_KEY`
  - Check it's set for Production environment in Vercel
  - Force a fresh deployment (no cache!)

### After adding env var, still not working
- **Most common issue:** Using cached build
- **Solution:** Redeploy WITHOUT cache (see Step 2 above)
- **Alternative:** Push any code change to force new build

### 401 Unauthorized Error
- Your API key is invalid or expired
- Regenerate a new key at https://platform.openai.com/api-keys
- Update in Vercel and redeploy

---

## Security Best Practices

✅ **DO:**
- Store API keys in Vercel environment variables
- Use `.env` file for local development (gitignored)
- Regenerate keys if exposed

❌ **DON'T:**
- Commit API keys to Git
- Share API keys in chat/messages
- Hardcode keys in source files

---

## Quick Reference

| Variable Name | Required | Where to Get |
|--------------|----------|--------------|
| `VITE_OPENAI_API_KEY` | Yes | https://platform.openai.com/api-keys |

**Last Updated:** 2025-01-26

