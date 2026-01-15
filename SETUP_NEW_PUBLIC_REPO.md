# Setup New Public GitHub Repository

## Step 1: Create New Public Repository on GitHub

1. Go to: https://github.com/new
2. **Repository name:** `btplti` (or your preferred name)
3. **Visibility:** Select **Public** ✅
4. **DO NOT** initialize with README, .gitignore, or license (you already have files)
5. Click **"Create repository"**

## Step 2: Update Local Repository Remote

### In Cursor (Local)

```bash
# Navigate to your project
cd C:\Users\sumit\Documents\RSUbtpapp

# Remove old remote
git remote remove origin

# Add new public repository
git remote add origin https://github.com/SumitAG008/btplti.git

# Verify
git remote -v
# Should show: https://github.com/SumitAG008/btplti.git
```

## Step 3: Push All Code to New Repository

```bash
# Make sure you're on main branch
git branch -M main

# Push all code to new repository
git push -u origin main
```

If you get authentication prompt:
- **Username:** `SumitAG008`
- **Password:** Your GitHub Personal Access Token (not password)

## Step 4: Setup SAP Business Application Studio

### Remove Old Clone (If Exists)

```bash
# In Business Application Studio terminal
cd ~/projects
rm -rf btplti
```

### Clone New Public Repository

```bash
# Clone the new public repository
git clone https://github.com/SumitAG008/btplti.git

# Navigate into project
cd btplti

# Verify
git remote -v
git status
```

## Step 5: Verify Synchronization

### Check All Locations

**1. Local (Cursor):**
```bash
cd C:\Users\sumit\Documents\RSUbtpapp
git remote -v
git log --oneline -1
```

**2. GitHub:**
- Visit: https://github.com/SumitAG008/btplti
- Check that all files are there

**3. Business Application Studio:**
```bash
cd ~/projects/btplti
git remote -v
git log --oneline -1
```

All should show the same repository URL and commit!

## Step 6: Update GitHub Actions (If Needed)

If you had GitHub Actions configured, update the workflow:

1. Go to: https://github.com/SumitAG008/btplti/settings/secrets/actions
2. Verify secrets are still there (they should be)
3. If not, add them again:
   - `CF_API`
   - `CF_ORG`
   - `CF_SPACE`
   - `CF_USERNAME`
   - `CF_PASSWORD`

## Quick Setup Commands

### Complete Setup (Copy-Paste)

**In Cursor:**
```bash
cd C:\Users\sumit\Documents\RSUbtpapp
git remote remove origin
git remote add origin https://github.com/SumitAG008/btplti.git
git push -u origin main
```

**In Business Application Studio:**
```bash
cd ~/projects
rm -rf btplti
git clone https://github.com/SumitAG008/btplti.git
cd btplti
```

## Summary

✅ **New Public Repository:** `https://github.com/SumitAG008/btplti.git`
✅ **Local (Cursor):** Updated remote, ready to push
✅ **Business Application Studio:** Will clone fresh
✅ **All locations:** Will sync via new public repository

## Next Steps

1. Create the new public repository on GitHub
2. Update remote in local repository
3. Push all code
4. Clone in Business Application Studio
5. Everything will be in sync!
