# Quick Setup: Cursor → GitHub → SAP BTP

## 🚀 5-Minute Setup

### Step 1: Clone Repository in Cursor

Open terminal in Cursor and run:

```bash
cd C:\Users\sumit\Documents
git clone https://github.com/SumitAG008/btplti.git
cd btplti
```

### Step 2: Authenticate with GitHub

If prompted for credentials:
- **Username:** `SumitAG008`
- **Password:** Your GitHub Personal Access Token

**Get Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Check: ✅ `repo`
4. Copy token and use as password

### Step 3: Install Dependencies

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### Step 4: Configure Git (if needed)

```bash
git config user.name "SumitAG008"
git config user.email "your_email@example.com"
```

### Step 5: Start Development!

Now you can:
- ✅ Edit files in Cursor
- ✅ Commit changes: `git commit -m "message"`
- ✅ Push to GitHub: `git push origin main`
- ✅ Deploy to BTP (manually or via GitHub Actions)

## 📝 Daily Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Make changes in Cursor
# (edit files)

# 3. Commit changes
git add .
git commit -m "feat: Add new feature"

# 4. Push to GitHub
git push origin main

# 5. (Optional) Deploy to BTP
# Either manually in Business Application Studio
# Or automatically via GitHub Actions
```

## 🔄 Two Deployment Options

### Option A: Manual Deployment
1. Push to GitHub from Cursor
2. Pull in Business Application Studio
3. Deploy manually

### Option B: Automatic Deployment (GitHub Actions)
1. Push to GitHub from Cursor
2. GitHub Actions automatically deploys to BTP
3. No manual steps needed!

## ⚙️ Setup GitHub Actions (Optional but Recommended)

1. **Add secrets to GitHub:**
   - Go to: https://github.com/SumitAG008/btplti/settings/secrets/actions
   - Add:
     - `CF_API`: Your CF API endpoint
     - `CF_ORG`: Your organization
     - `CF_SPACE`: Your space
     - `CF_USERNAME`: Your BTP username
     - `CF_PASSWORD`: Your BTP password

2. **Workflow file is already created:**
   - `.github/workflows/deploy-to-btp.yml`
   - Just add the secrets and it will work!

## ✅ Verify Setup

```bash
# Check git remote
git remote -v
# Should show: https://github.com/SumitAG008/btplti.git

# Check git status
git status

# Test push (after making a small change)
git add .
git commit -m "test: Verify setup"
git push origin main
```

## 🎯 That's It!

You're now set up to:
- Develop in Cursor
- Push to GitHub
- Deploy to SAP BTP

Happy coding! 🚀
