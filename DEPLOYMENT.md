# Deployment Guide - Brain Buddy

This guide walks you through deploying the Brain Buddy application with the frontend on **Netlify** and the backend on **Render** (both using free tiers).

## 📋 Prerequisites

- GitHub account with your Brain_tech repository
- [Netlify account](https://netlify.com) (free)
- [Render account](https://render.com) (free)
- [MongoDB Atlas account](https://cloud.mongodb.com) (free) - **Required for database**
- Your code pushed to GitHub

---

## 🗄️ Part 1: Setup MongoDB Atlas Database

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### Step 2: Create Free Cluster

1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (512 MB storage, perfect for development)
3. Select cloud provider and region (choose one closest to you)
4. Name your cluster (e.g., "BrainBuddyCluster")
5. Click **"Create"** and wait 3-5 minutes for provisioning

### Step 3: Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username (e.g., "brainbuddy_admin")
5. Click **"Autogenerate Secure Password"** and **SAVE THIS PASSWORD** 
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Configure Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ This is needed for Render to connect
   - For production, you can restrict to specific IPs later
4. Click **"Confirm"**

### Step 5: Get Connection String

1. Go back to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Python"** and version **"3.12 or later"**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Important**: Replace `<username>` and `<password>` with your actual credentials
7. Add `/brain_buddy` before the `?` to specify database name:
   ```
   mongodb+srv://brainbuddy_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/brain_buddy?retryWrites=true&w=majority
   ```

**Save this connection string** - you'll need it for Render deployment!

---

## 🚀 Part 2: Deploy Backend to Render

### Step 1: Create Render Web Service

1. Log in to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the `Brain_tech` repository
5. Render will automatically detect the `render.yaml` file

### Step 2: Configure Environment Variables

The `render.yaml` file includes most settings, but you **must** update:

1. In the Render dashboard, go to your service's **Environment** tab
2. Update the following variables:
   - **`MONGODB_URL`**: ⚠️ **CRITICAL** - Paste your MongoDB Atlas connection string from Part 1
     - Example: `mongodb+srv://brainbuddy_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/brain_buddy?retryWrites=true&w=majority`
   - **`FRONTEND_URL`**: Set to your Netlify URL (you'll get this after deploying frontend)
     - Initially use: `https://your-app-name.netlify.app`
     - Update after Netlify deployment
   - **`SECRET_KEY`**: Auto-generated (leave as is)

### Step 3: Deploy

1. Click **"Apply"** to create the service
2. Render will start building your backend
3. **Note**: Build may take 2-3 minutes (optimized for free tier)
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
If you see `"database": "connected"`, your MongoDB Atlas connection is working! ✅

---

## 🎨 Part 3: Deploy Frontend to Netlify

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

#### ❌ MongoDB Connection Failed
**Problem**: Backend shows "database": "disconnected" or connection timeout

**Solution**: 
- Verify `MONGODB_URL` is correct in Render environment variables
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Ensure database user password is correct (no special characters causing issues)
- Verify database name is included in connection string: `/brain_buddy?`

#### ❌ CORS Errors
**Problem**: Frontend can't connect to backend

**Solution**: 
- Verify `FRONTEND_URL` in Render matches your Netlify URL exactly
- Make sure there's no trailing slash
- Check browser console for exact error

#### ❌ Backend Build Fails
**Problem**: Render build times out or fails

**Solution**:
- Check Render build logs for specific errors
- Verify `requirements.free-tier.txt` exists and is being used
- Free tier build should take 2-3 minutes (not 10+)

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

### MongoDB Atlas Monitoring
1. Go to MongoDB Atlas dashboard
2. View **Metrics** tab for database performance
3. Set up **Alerts** for connection issues
4. Enable **Charts** to visualize your data

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
