# Deployment Guide - Brain Buddy

This guide walks you through deploying the Brain Buddy application with the frontend on **Netlify** and the backend on **Render** (both using free tiers).

## 📋 Prerequisites

- GitHub account with your Brain_tech repository
- [Netlify account](https://netlify.com) (free)
- [Render account](https://render.com) (free)
- Your code pushed to GitHub

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Create Render Web Service

1. Log in to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the `Brain_tech` repository
5. Render will automatically detect the `render.yaml` file

### Step 2: Configure Environment Variables

The `render.yaml` file includes most settings, but you need to update:

1. In the Render dashboard, go to your service's **Environment** tab
2. Update the following variables:
   - **`FRONTEND_URL`**: Set to your Netlify URL (you'll get this after deploying frontend)
     - Initially use: `https://your-app-name.netlify.app`
     - Update after Netlify deployment
   - **`SECRET_KEY`**: Auto-generated (leave as is)
   - **`DATABASE_URL`**: Default is SQLite (good for free tier)

### Step 3: Deploy

1. Click **"Apply"** to create the service
2. Render will start building your backend
3. **Note**: Build may take 5-10 minutes due to ML dependencies
4. Once deployed, copy your backend URL: `https://your-app-name.onrender.com`

### Step 4: Test Backend

Visit your backend URL + `/health`:
```
https://your-app-name.onrender.com/health
```

You should see:
```json
{
  "status": "healthy",
  "database": "connected",
  "ai_models": "loaded"
}
```

---

## 🎨 Part 2: Deploy Frontend to Netlify

### Step 1: Create Netlify Site

1. Log in to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your `Brain_tech` repository

### Step 2: Configure Build Settings

Netlify will automatically detect settings from `netlify.toml`, but verify:

- **Base directory**: (leave empty)
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### Step 3: Add Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Add the following:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://brain-buddy-backend.onrender.com`)

### Step 4: Deploy

1. Click **"Deploy site"**
2. Netlify will build and deploy your frontend
3. Once complete, you'll get a URL like: `https://random-name-123.netlify.app`
4. You can customize this in **Site settings** → **Domain management**

### Step 5: Update Backend CORS

1. Go back to your Render dashboard
2. Update the `FRONTEND_URL` environment variable with your actual Netlify URL
3. Render will automatically redeploy with the new settings

---

## ✅ Verification

### Test the Full Stack

1. Visit your Netlify frontend URL
2. Open browser DevTools (F12) → Console
3. Check for any CORS errors
4. Test API connectivity

### Common Issues

#### ❌ CORS Errors
**Problem**: Frontend can't connect to backend

**Solution**: 
- Verify `FRONTEND_URL` in Render matches your Netlify URL exactly
- Make sure there's no trailing slash
- Check browser console for exact error

#### ❌ Backend Build Fails
**Problem**: Render build times out or fails

**Solution**:
- Free tier has limited resources
- Consider reducing ML dependencies in `requirements.txt`
- Check Render build logs for specific errors

#### ❌ Backend Sleeps (Free Tier)
**Problem**: Render free tier services sleep after 15 minutes of inactivity

**Solution**:
- First request after sleep takes ~30 seconds to wake up
- This is normal for free tier
- Consider upgrading to paid tier for production

#### ❌ Frontend Build Fails
**Problem**: Netlify build fails

**Solution**:
- Check build logs in Netlify dashboard
- Verify all dependencies are in `package.json`
- Ensure Node version is compatible (18+)

---

## 🔧 Optional Enhancements

### Custom Domain (Netlify)
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow DNS configuration instructions

### PostgreSQL Database (Render)
1. Uncomment the database section in `render.yaml`
2. Redeploy the blueprint
3. Update `DATABASE_URL` environment variable

### Environment-Specific Builds
Create different environment variable sets for staging/production in both platforms.

---

## 📝 Maintenance

### Updating Your App

**Frontend**:
- Push changes to GitHub
- Netlify auto-deploys from your main branch

**Backend**:
- Push changes to GitHub
- Render auto-deploys from your main branch

### Monitoring

**Render**:
- View logs in dashboard → Logs tab
- Monitor service health and uptime

**Netlify**:
- View deploy logs in dashboard
- Check analytics for traffic

---

## 🆘 Support Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Render Docs**: https://render.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/

---

## 🎉 Success!

Your Brain Buddy app is now live! 

- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-app.onrender.com`

Remember: Free tier services may have limitations. Monitor performance and upgrade as needed.
