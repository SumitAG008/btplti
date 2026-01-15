# Fix cds watch Issues

## Problems Identified

1. **Version Mismatch**: `@sap/cds` v7.9 vs `@sap/cds-dk` v9
2. **Models Not Found**: `cds watch` can't find CDS files because they're in `backend/` folder

## Solutions

### Solution 1: Run from Backend Directory (Recommended)

Since your CAP files are in `backend/`, run `cds watch` from there:

```bash
# Make sure you're in backend directory
cd backend

# Update @sap/cds to latest version
npm install @sap/cds@latest

# Run watch from backend
cds watch
```

### Solution 2: Move Files to Root (Alternative)

If you want to run from root, move the files:

```bash
# From project root
mv backend/db db
mv backend/srv srv
mv backend/server.js server.js

# Then run from root
cds watch
```

### Solution 3: Fix Version and Run from Backend

```bash
# Go to backend
cd backend

# Update package.json to use compatible versions
# Install latest compatible versions
npm install @sap/cds@latest @sap/cds-dk@8

# Run watch
cds watch
```

## Quick Fix Commands

Run these in order:

```bash
# 1. Go to backend directory
cd backend

# 2. Update @sap/cds to latest version
npm install @sap/cds@latest

# 3. Make sure @sap/cds-dk is version 8
npm install @sap/cds-dk@8 --save-dev

# 4. Run watch
cds watch
```

## Expected Output After Fix

You should see:
```
[cds] - loaded model from db/schema.cds
[cds] - loaded model from srv/service.cds
[cds] - server listening on http://localhost:4004
```

## If Still Not Working

Check file locations:
```bash
# From backend directory
ls db/
# Should show: schema.cds

ls srv/
# Should show: service.cds, service.js
```

If files are missing, they might need to be copied or the structure adjusted.
