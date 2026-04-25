# Deployment Guide - Fitness & Wellness Portal

This guide covers deploying both the frontend and backend to production environments.

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub account
- Frontend code pushed to GitHub

### Steps

#### 1. Connect GitHub Repository to Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account and repository
4. Click "Import"

#### 2. Configure Environment Variables
1. In Vercel dashboard, go to project settings
2. Navigate to "Environment Variables"
3. Add the following:

```
VITE_API_URL=https://your-backend-api.com/api
```

Where `your-backend-api.com` is your backend server URL

#### 3. Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 4. Deploy
1. Click "Deploy"
2. Vercel will automatically build and deploy
3. Your app will be available at `https://your-project.vercel.app`

### Production Optimization
```bash
# Before deploying, build locally to test:
npm run build
npm run preview
```

## 🚀 Backend Deployment (Render)

### Prerequisites
- Render account (free at https://render.com)
- Backend code pushed to GitHub
- MongoDB Atlas account for database

### Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string:
   - Click "Connect"
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials

### Step 2: Deploy Backend on Render

1. Go to https://render.com/dashboard
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repository
5. Fill in the details:
   - **Name**: `fitness-wellness-portal-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: Choose closest to your users

### Step 3: Add Environment Variables on Render

In the Render dashboard, add these environment variables:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-wellness-portal
JWT_SECRET=your_super_secret_production_key_min_32_chars
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically deploy when you push to GitHub
3. Your API will be available at `https://your-api-name.onrender.com`

## 🔐 Production Checklist

### Security
- [ ] Update JWT_SECRET to a long, random string
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS for all communications
- [ ] Set NODE_ENV=production
- [ ] Disable debug mode
- [ ] Enable rate limiting (future enhancement)
- [ ] Set up monitoring/logging

### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Test production build locally
- [ ] Verify VITE_API_URL points to production backend
- [ ] Clear all test/debug code
- [ ] Test all features in production

### Backend
- [ ] Test all API endpoints
- [ ] Verify database connection
- [ ] Check error logging
- [ ] Test authentication flow
- [ ] Monitor server logs
- [ ] Set up automated backups for database

## 📊 Environment Variables Reference

### Frontend (.env)
```env
# Production
VITE_API_URL=https://fitness-api.herokuapp.com/api
```

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fitness-wellness-portal

# Security
JWT_SECRET=YourVerySecureTokenKeyWith32CharactersMinimum
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=https://fitness-wellness-portal.vercel.app
```

## 🔧 Scaling Considerations

### Database
- Use MongoDB Atlas with auto-scaling
- Enable backups
- Set up replica sets for redundancy
- Monitor query performance

### Backend
- Use Render's auto-scaling (if available)
- Implement caching strategies
- Use CDN for static assets
- Monitor API response times

### Frontend
- Implement code splitting
- Optimize images
- Use lazy loading
- Minify CSS and JavaScript

## 📈 Monitoring & Maintenance

### Backend Logs
1. Go to Render dashboard
2. Click on your service
3. View real-time logs
4. Set up email alerts for errors

### Database Monitoring
1. MongoDB Atlas dashboard
2. Monitor:
   - Connection count
   - Query performance
   - Storage usage
   - Document count

### Performance Monitoring
- Set up Google Analytics
- Monitor API response times
- Track error rates
- Monitor user sessions

## 🔄 Continuous Deployment

### Automatic Deployment
Both Vercel and Render support automatic deployment:

1. **Push to main branch** → Automatic deployment
2. **Pull requests** → Preview deployments
3. **Failed builds** → Email notifications

### Manual Deployment

#### Vercel
1. Dashboard → Select Project
2. Click "Deployments"
3. Select deployment
4. Click "Redeploy"

#### Render
1. Dashboard → Select Service
2. Click "Manual Deploy"
3. Select branch
4. Click "Deploy latest commit"

## 🚨 Troubleshooting Deployment

### Frontend Issues

**Page shows 404**
- Check build output
- Verify build command: `npm run build`
- Check that dist folder is created

**API calls failing**
- Verify VITE_API_URL in environment variables
- Check backend is running
- Check CORS configuration

**Build fails**
- Check for TypeScript errors
- Verify all dependencies are in package.json
- Check Node version compatibility

### Backend Issues

**Database connection error**
- Verify MongoDB URI in .env
- Check IP whitelist in MongoDB Atlas
- Verify credentials

**Port binding error**
- Check PORT variable
- Ensure Render assigns correct port

**Deployment fails**
- Check build command succeeds locally
- Verify all dependencies in package.json
- Check Node version (recommended: v16+)

## 💾 Database Backup & Recovery

### MongoDB Atlas Backup
1. Go to MongoDB Atlas dashboard
2. Select cluster
3. Click "Backup"
4. Enable automatic backups
5. Can restore from snapshots if needed

### Manual Backup
```bash
# Export data
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/fitness-wellness-portal" --out ./backup

# Restore data
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net" ./backup
```

## 📱 Custom Domain Setup

### For Frontend (Vercel)
1. Dashboard → Select Project
2. Settings → Domains
3. Add custom domain
4. Update DNS records as instructed

### For Backend (Render)
1. Dashboard → Select Service
2. Settings → Custom Domain
3. Add custom domain
4. Update DNS records

## 🎯 Production URLs Example

```
Frontend: https://fitwell.com
Backend API: https://api.fitwell.com
```

## 📞 Support & Resources

- **Vercel Support**: https://vercel.com/support
- **Render Support**: https://render.com/support
- **MongoDB Atlas Help**: https://docs.mongodb.com
- **GitHub Pages**: https://pages.github.com

## ✅ Final Checklist Before Going Live

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Database set up on MongoDB Atlas
- [ ] Environment variables configured
- [ ] CORS settings correct
- [ ] JWT_SECRET is secure
- [ ] SSL/HTTPS enabled
- [ ] Domain configured
- [ ] User can register and login
- [ ] All features tested
- [ ] Error handling verified
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation updated

---

**Deployment Complete! 🎉**

Your application is now live and ready for users!
