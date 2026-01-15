# Complete Git Synchronization Setup
## GitHub ↔ SAP BTP ↔ Cursor ↔ Local Folder

## Overview

This setup ensures all four locations stay in sync:
1. **GitHub** (remote repository)
2. **SAP Business Application Studio** (cloud dev environment)
3. **Cursor** (local IDE)
4. **Local Folder** (your local workspace)

## Prerequisites

- GitHub repository: `https://github.com/SumitAG008/btplti.git`
- SAP Business Application Studio access
- Cursor installed
- Git installed locally

## Step 1: Setup Local Folder (Cursor Workspace)

### 1.1 Clone Repository Locally

```bash
# Navigate to your desired location
cd C:\Users\sumit\Documents

# Clone the repository
git clone https://github.com/SumitAG008/btplti.git

# Navigate into the project
cd btplti
```

### 1.2 Configure Git (If Not Already Done)

```bash
# Set your identity
git config user.name "SumitAG008"
git config user.email "your_email@example.com"

# Verify remote
git remote -v
# Should show: https://github.com/SumitAG008/btplti.git
```

### 1.3 Open in Cursor

1. Open Cursor
2. File → Open Folder
3. Select: `C:\Users\sumit\Documents\btplti`

## Step 2: Setup SAP Business Application Studio

### 2.1 Clone Repository in BAS

```bash
# In Business Application Studio terminal
cd ~/projects

# Clone the repository
git clone https://github.com/SumitAG008/btplti.git

# Navigate into the project
cd btplti
```

### 2.2 Verify Remote

```bash
git remote -v
# Should show: https://github.com/SumitAG008/btplti.git
```

### 2.3 Configure Git (If Needed)

```bash
git config user.name "SumitAG008"
git config user.email "your_email@example.com"
```

## Step 3: Setup Synchronization Workflow

### Workflow: Local (Cursor) → GitHub → SAP BTP

**Primary Development Location:** Cursor (Local)

**Sync Flow:**
```
Cursor (Local) 
    ↓ git push
GitHub 
    ↓ git pull
SAP Business Application Studio
```

## Step 4: Daily Workflow

### 4.1 Start Working in Cursor

```bash
# In Cursor terminal (local)
cd C:\Users\sumit\Documents\btplti

# Pull latest changes from GitHub
git pull origin main

# Make your changes
# (edit files in Cursor)
```

### 4.2 Commit and Push from Cursor

```bash
# Stage changes
git add .

# Commit
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

### 4.3 Sync to SAP Business Application Studio

```bash
# In Business Application Studio terminal
cd ~/projects/btplti

# Pull latest changes from GitHub
git pull origin main

# Your changes are now in BAS!
```

## Step 5: Working in SAP Business Application Studio

### 5.1 Make Changes in BAS

```bash
# In Business Application Studio
# Make your changes
# (edit files)
```

### 5.2 Commit and Push from BAS

```bash
# Stage changes
git add .

# Commit
git commit -m "Changes from Business Application Studio"

# Push to GitHub
git push origin main
```

### 5.3 Sync to Cursor (Local)

```bash
# In Cursor terminal (local)
cd C:\Users\sumit\Documents\btplti

# Pull latest changes
git pull origin main

# Your changes are now in Cursor!
```

## Step 6: Verify Synchronization

### Check All Locations Are in Sync

**In Cursor (Local):**
```bash
cd C:\Users\sumit\Documents\btplti
git status
git log --oneline -5
```

**In SAP Business Application Studio:**
```bash
cd ~/projects/btplti
git status
git log --oneline -5
```

**On GitHub:**
- Go to: https://github.com/SumitAG008/btplti/commits/main
- Check latest commit matches

All three should show the same latest commit!

## Step 7: Handle Conflicts (If They Occur)

### If You Have Uncommitted Changes

**Before pulling, commit or stash:**

```bash
# Option 1: Commit your changes first
git add .
git commit -m "WIP: Work in progress"
git pull origin main

# Option 2: Stash your changes
git stash
git pull origin main
git stash pop  # Reapply your changes
```

## Step 8: Setup Git Credentials (One-Time)

### For HTTPS (Recommended)

**In Cursor (Local):**
- Use Personal Access Token when prompted
- Or configure credential helper:
  ```bash
  git config --global credential.helper wincred  # Windows
  ```

**In SAP Business Application Studio:**
- Already authenticated via device authorization
- Should work automatically

## Step 9: Create Sync Scripts (Optional but Helpful)

### 9.1 Sync Script for Cursor

Create `sync-to-github.bat` (Windows) or `sync-to-github.sh` (Mac/Linux):

**Windows (`sync-to-github.bat`):**
```batch
@echo off
cd C:\Users\sumit\Documents\btplti
git add .
git commit -m "Auto-sync from Cursor"
git push origin main
echo Synced to GitHub!
```

**Usage:**
```bash
.\sync-to-github.bat
```

### 9.2 Sync Script for SAP Business Application Studio

Create `sync-from-github.sh`:

```bash
#!/bin/bash
cd ~/projects/btplti
git pull origin main
echo Synced from GitHub!
```

**Make executable:**
```bash
chmod +x sync-from-github.sh
```

**Usage:**
```bash
./sync-from-github.sh
```

## Step 10: Best Practices

### 10.1 Always Pull Before Starting Work

```bash
# In Cursor
git pull origin main

# In Business Application Studio
git pull origin main
```

### 10.2 Commit Frequently

```bash
# Small, frequent commits are better than large ones
git add .
git commit -m "feat: Add new feature"
git push origin main
```

### 10.3 Use Meaningful Commit Messages

```bash
git commit -m "feat: Add budget validation"
git commit -m "fix: Resolve schema errors"
git commit -m "docs: Update README"
```

### 10.4 Check Status Before Pushing

```bash
git status
git log --oneline -5
```

## Troubleshooting

### Issue: "Your branch is ahead of origin/main"

**Solution:**
```bash
git push origin main
```

### Issue: "Your branch is behind origin/main"

**Solution:**
```bash
git pull origin main
```

### Issue: Merge conflicts

**Solution:**
1. Open conflicted files
2. Resolve conflicts manually
3. `git add .`
4. `git commit -m "Merge conflicts resolved"`
5. `git push origin main`

### Issue: Authentication failed

**Solution:**
- Use Personal Access Token (not password)
- Or setup SSH keys

## Summary

✅ **Local Folder (Cursor):** `C:\Users\sumit\Documents\btplti`
✅ **GitHub:** `https://github.com/SumitAG008/btplti.git`
✅ **SAP Business Application Studio:** `~/projects/btplti`

**Workflow:**
1. Work in Cursor (local)
2. Commit and push to GitHub
3. Pull in Business Application Studio when needed
4. All locations stay in sync!

## Quick Reference Commands

```bash
# Pull latest (do this first)
git pull origin main

# Make changes
# (edit files)

# Commit and push
git add .
git commit -m "Your message"
git push origin main

# Check status
git status
git log --oneline -5
```

Everything is now properly synchronized! 🚀
