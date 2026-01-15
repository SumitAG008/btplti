# Business Application Studio Setup - Next Steps

## ✅ Repository Cloned Successfully!

I can see your repository `btplti-1` is cloned in Business Application Studio.

## Step 1: Handle Migration Dialog

**For the SAP Fiori Tools Migration dialog:**

**Click "Cancel"** or **"Don't Ask Again"**

**Why?**
- Migration is optional
- Your project is already set up
- You can migrate later if needed
- Focus on getting the backend working first

## Step 2: Verify Repository Setup

### Check Git Remote

```bash
# Open terminal in Business Application Studio
cd ~/projects/btplti-1

# Verify remote
git remote -v
# Should show: https://github.com/SumitAG008/btplti.git

# Check status
git status

# Check latest commit
git log --oneline -1
# Should match your local: "docs: Add complete synchronization setup guide"
```

### If Remote is Missing or Wrong

```bash
cd ~/projects/btplti-1
git remote remove origin  # If exists
git remote add origin https://github.com/SumitAG008/btplti.git
git remote -v
```

## Step 3: Install Dependencies

```bash
# From project root
cd ~/projects/btplti-1

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 4: Fix Schema Errors (If Not Done)

The schema.cds file needs fixes. Use Find & Replace:

1. Open `backend/db/schema.cds`
2. Press `Ctrl+H` (Find & Replace)
3. Do these replacements:

   - Find: ` unique;` → Replace: `;` (Replace All)
   - Find: `budget.id` → Replace: `budget.ID` (Replace All)
   - Find: `vestingSchedule.id` → Replace: `vestingSchedule.ID` (Replace All)
   - Find: `@cds.on.insert: $now, @cds.on.update: $now` → Replace: `@cds.on.insert: $now` (Replace All)

4. Save (`Ctrl+S`)

## Step 5: Test Backend

```bash
# Navigate to backend
cd ~/projects/btplti-1/backend

# Run watch
cds watch
```

**Expected output:**
```
[cds] - loaded model from db/schema.cds
[cds] - loaded model from srv/service.cds
[cds] - server listening on http://localhost:4004
```

## Step 6: Verify Synchronization

### Check All Locations Match

**Local (Cursor):**
```bash
cd C:\Users\sumit\Documents\RSUbtpapp
git log --oneline -1
```

**Business Application Studio:**
```bash
cd ~/projects/btplti-1
git log --oneline -1
```

**GitHub:**
- Visit: https://github.com/SumitAG008/btplti/commits/main

All should show the same commit hash!

## Step 7: Daily Sync Workflow

### From Cursor to BAS

```bash
# 1. In Cursor: Commit and push
cd C:\Users\sumit\Documents\RSUbtpapp
git add .
git commit -m "Your changes"
git push origin main

# 2. In Business Application Studio: Pull
cd ~/projects/btplti-1
git pull origin main
```

### From BAS to Cursor

```bash
# 1. In Business Application Studio: Commit and push
cd ~/projects/btplti-1
git add .
git commit -m "Changes from BAS"
git push origin main

# 2. In Cursor: Pull
cd C:\Users\sumit\Documents\RSUbtpapp
git pull origin main
```

## Summary

✅ **Repository Cloned:** `btplti-1` in Business Application Studio  
⏳ **Next Steps:**
1. Cancel migration dialog
2. Verify git remote
3. Install dependencies
4. Fix schema errors
5. Test with `cds watch`

Everything is now set up for synchronization! 🎉
