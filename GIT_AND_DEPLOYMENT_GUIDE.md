# Git Repository & Deployment Guide

## ✅ What Was Done

Your complete Fitness & Wellness Portal has been pushed to GitHub!

**Repository**: https://github.com/SakthiPranavS04/Diet-and-Fitness-app

**Initial Commit**: 59 files with complete frontend and backend code

---

## 📋 Important Things to Think About for Git & Deployment

### 1. **What Was Excluded from Git (.gitignore)**

**These files are NOT in the repository (correctly excluded):**

❌ `node_modules/` - Reinstalled with `npm install`
❌ `server/data/` - User data files (file-based database)
❌ `.env` - Sensitive environment variables
❌ `.env.local` - Local configuration
❌ `dist/` - Build output

**Why?** These are either too large, contain secrets, or are generated automatically.

---

### 2. **Environment Variables & Secrets**

Create `.env` file in your project root:

```
VITE_API_BASE_URL=http://localhost:5000
```

Create `server/.env` file:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/fitness-app (when migrating to MongoDB)
```

**⚠️ NEVER commit `.env` files!**

---

### 3. **Setting Up on a New Machine**

When someone clones the repo, they need to:

```bash
# 1. Clone the repository
git clone https://github.com/SakthiPranavS04/Diet-and-Fitness-app.git

# 2. Install frontend dependencies
cd Diet-and-Fitness-app
npm install

# 3. Install backend dependencies
cd server
npm install

# 4. Create .env files (see section 2)
# Create .env in root and server/.env

# 5. Start backend
npm start

# 6. In another terminal, start frontend (from root)
npm run dev
```

---

### 4. **Git Workflow - How to Update the Repository**

#### **Making Changes Locally**

```bash
# 1. Make changes to files
# 2. Check what changed
git status

# 3. Stage specific files
git add src/pages/Dashboard.jsx
git add server/controllers/userController.js

# Or stage all changes
git add .

# 4. Commit with descriptive message
git commit -m "feat: Add BMI calculation feature to dashboard"

# 5. Push to GitHub
git push origin main
```

#### **Good Commit Message Examples**

```
✅ feat: Add workout duration tracking
✅ fix: Resolve CORS error on login endpoint
✅ refactor: Optimize database queries
✅ docs: Update API documentation
❌ "changes"
❌ "fixed bug"
❌ "update"
```

#### **Pulling Latest Changes**

```bash
# Get latest from GitHub
git pull origin main
```

---

### 5. **Branching for Features (Team Development)**

When multiple people work on the project:

```bash
# Create feature branch
git checkout -b feature/user-authentication
git checkout -b feature/workout-analytics
git checkout -b bugfix/login-error

# Work and commit
git add .
git commit -m "feat: Add multi-language support"

# Push the feature branch
git push origin feature/user-authentication

# Create Pull Request (PR) on GitHub
# After review, merge to main
git checkout main
git merge feature/user-authentication
git push origin main
```

---

### 6. **Deployment Checklist**

Before deploying to production:

- [ ] All features tested locally
- [ ] `.env` file created with production values
- [ ] Environment: `NODE_ENV=production`
- [ ] Secrets changed (JWT_SECRET, API keys, etc.)
- [ ] Database migration (MongoDB or PostgreSQL)
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Build tested: `npm run build`
- [ ] Backend tested: `npm start` (from server/)
- [ ] All tests passing (if you add tests)
- [ ] Code reviewed
- [ ] Security scan done
- [ ] Error logging configured
- [ ] Analytics configured (optional)

---

### 7. **MongoDB Migration (From File-Based Database)**

When you're ready to use MongoDB:

#### **Local MongoDB Setup**

```bash
# Install MongoDB Community Edition
# Visit: https://www.mongodb.com/try/download/community

# Or use MongoDB Atlas (Cloud)
# Create account at: https://www.mongodb.com/cloud/atlas
```

#### **Update Backend Code**

```javascript
// server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-app

// server/server.js - Add this instead of file-based db
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));
```

#### **Replace Controllers**

Controllers currently use:
```javascript
const db = require('../db.js'); // File-based
```

Update to use Mongoose models:
```javascript
const User = require('../models/User');
const user = await User.findOne({ email });
```

---

### 8. **Deployment Platforms (Choose One)**

#### **Option 1: Vercel (Frontend)**
- Visit: https://vercel.com
- Connect GitHub repo
- Automatic deploys on push
- Free tier available

#### **Option 2: Render (Backend)**
- Visit: https://render.com
- Connect GitHub repo
- Deploy Node.js app
- Auto-deploys on push
- Free tier available

#### **Option 3: Railway (Full Stack)**
- Visit: https://railway.app
- Deploy frontend + backend together
- Simple configuration
- Pay-as-you-go pricing

#### **Option 4: AWS/Azure (Advanced)**
- More control but complex setup
- Suitable for large-scale apps

---

### 9. **CI/CD Pipeline (Automated Testing & Deployment)**

When you're ready, set up GitHub Actions:

**Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Dependencies
        run: npm install && cd server && npm install
      
      - name: Build Frontend
        run: npm run build
      
      - name: Test Backend
        run: cd server && npm test
      
      - name: Deploy
        run: echo "Deploying to production..."
```

---

### 10. **File Organization Best Practices**

Current structure is good! Keep it organized:

```
fitness-app/
├── server/           # Backend (Node.js)
│   ├── controllers/  # Business logic
│   ├── routes/       # API endpoints
│   ├── middleware/   # Auth, validation
│   ├── models/       # Data models
│   └── db.js         # Database
├── src/              # Frontend (React)
│   ├── pages/        # Full pages
│   ├── components/   # Reusable components
│   ├── services/     # API calls
│   └── context/      # Global state
├── public/           # Static files
├── .gitignore        # Files to exclude
├── package.json      # Dependencies
└── README.md         # Documentation
```

---

### 11. **Important Files to Know**

| File | Purpose |
|------|---------|
| `package.json` | Frontend dependencies & scripts |
| `server/package.json` | Backend dependencies & scripts |
| `.gitignore` | Files excluded from git |
| `README.md` | Project documentation |
| `.env.example` | Template for environment variables |
| `server/.env.example` | Backend environment template |

---

### 12. **Keeping the Repository Clean**

```bash
# Delete a feature branch after merging
git branch -d feature/user-authentication

# See all branches
git branch -a

# See recent commits
git log --oneline -5

# Undo last commit (before push)
git reset HEAD~1

# Completely revert to previous version
git revert <commit-hash>
```

---

### 13. **Production Environment Variables**

**These MUST be different in production:**

```
# Development (.env)
VITE_API_BASE_URL=http://localhost:5000
JWT_SECRET=dev-key-not-secure

# Production (environment variables on hosting platform)
VITE_API_BASE_URL=https://api.fitwell.com
JWT_SECRET=production-super-secret-key-256-characters-long
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/fitness
```

---

### 14. **Security Checklist**

- [ ] Never commit `.env` files
- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS only
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Update dependencies regularly (`npm update`)
- [ ] Check for vulnerabilities (`npm audit`)
- [ ] Use bcryptjs for password hashing ✅ (already done)
- [ ] Add rate limiting to API
- [ ] Enable CORS security headers
- [ ] Use httpOnly cookies for sensitive data

---

### 15. **Common Git Commands Reference**

```bash
# View status
git status

# See changes
git diff

# Stage changes
git add .
git add file.js

# Commit
git commit -m "message"

# Push
git push origin main

# Pull
git pull origin main

# Create branch
git checkout -b feature-name

# Switch branch
git checkout main

# Delete branch
git branch -d feature-name

# View history
git log

# Undo changes
git checkout -- file.js

# Sync with remote
git fetch
git merge origin/main
```

---

## 📊 Your Repository Status

✅ **Repository**: Initialized and pushed to GitHub
✅ **Branch**: main (primary)
✅ **Files**: 59 committed (node_modules, .env, server/data/ excluded)
✅ **Size**: ~12.4 MB
✅ **Last Commit**: "Initial commit: Complete Full-Stack Fitness & Wellness Portal"

---

## 🚀 Recommended Next Steps

### **Immediate (This Week)**
1. ✅ Git repository created
2. 📝 Update README with your changes
3. 🔄 Continue feature development
4. ✅ Test all features thoroughly

### **Short Term (Next 2 Weeks)**
1. Set up MongoDB Atlas account
2. Migrate from file-based to MongoDB
3. Add user email verification
4. Add password reset functionality
5. Deploy backend to Render
6. Deploy frontend to Vercel

### **Medium Term (Month 1)**
1. Add test suite (Jest for backend, Vitest for frontend)
2. Set up CI/CD pipeline with GitHub Actions
3. Add error monitoring (Sentry)
4. Add analytics tracking
5. Set up custom domain
6. Enable CDN for static files

### **Long Term (Production)**
1. Performance optimization
2. Load testing
3. Security audit
4. Mobile app (React Native)
5. Advanced features
6. Scaling infrastructure

---

## 💡 Pro Tips

✅ **Commit often** - Small, focused commits are better
✅ **Write good messages** - Future you will thank you
✅ **Test before pushing** - Avoid broken code in main
✅ **Keep main branch stable** - Only merge tested code
✅ **Use branches** - Don't work directly on main
✅ **Review PRs** - Have someone check your code
✅ **Keep dependencies updated** - Run `npm update`
✅ **Monitor security** - Run `npm audit`

---

## 🆘 If Something Goes Wrong

```bash
# View what you're about to push
git log origin/main..main

# Abort a merge conflict
git merge --abort

# Check git history
git reflog

# See detailed changes
git diff HEAD~1

# Restore a deleted file
git checkout HEAD~1 -- path/to/file
```

---

## 📚 Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

**Your project is now on GitHub and ready to scale! 🎉**

Next time you make changes, just remember:
```
git add .
git commit -m "Your message"
git push origin main
```

**Happy coding! 💻**
