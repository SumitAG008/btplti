# Solution: Fix "No models found" Error

## The Problem

You're running `cds watch` from the **root directory** (`btplti`), but your CAP models are in the **`backend/`** directory.

`cds watch` looks for `db/` and `srv/` folders in the current directory, but yours are in `backend/db/` and `backend/srv/`.

## Solution: Run from Backend Directory

### Step 1: Navigate to Backend

```bash
cd backend
```

### Step 2: Update Dependencies (Fix Version Mismatch)

```bash
# Update @sap/cds to version 8 (compatible with cds-dk v9)
npm install @sap/cds@8

# Install cds-dk version 8 (or keep v9 if cds is updated)
npm install @sap/cds-dk@8 --save-dev

# Install sqlite for local development
npm install @cap-js/sqlite --save-dev
```

### Step 3: Run cds watch from Backend

```bash
cds watch
```

## Expected Output

You should now see:

```
[cds] - loaded model from db/schema.cds
[cds] - loaded model from srv/service.cds
[cds] - server listening on http://localhost:4004
[cds] - connect to http://localhost:4004
```

## Alternative: Run from Root Using npm Script

If you want to run from root, add this to root `package.json`:

```json
"scripts": {
  "watch": "cd backend && cds watch"
}
```

Then run: `npm run watch` from root.

## Quick Fix Commands (Copy-Paste)

Run these in order:

```bash
# 1. Go to backend
cd backend

# 2. Update dependencies
npm install @sap/cds@8 @sap/cds-dk@8 @cap-js/sqlite --save-dev

# 3. Run watch
cds watch
```

## Why This Works

- `cds watch` looks for `db/` and `srv/` in the **current directory**
- Your files are in `backend/db/` and `backend/srv/`
- Running from `backend/` makes it find the files
- Version 8 of both packages are compatible

## Verify Files Exist

Before running, verify:

```bash
# From backend directory
ls db/
# Should show: schema.cds

ls srv/
# Should show: service.cds, service.js
```
