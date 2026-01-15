# Fix @sap/cds-hana Compatibility Error

## The Problem

With `@sap/cds@9`, the package `@sap/cds-hana` is **incompatible**. You need to use `@cap-js/hana` instead.

Error message:
```
@sap/cds-hana is incompatible with @sap/cds version 9 and higher. 
Please remove it from your dependencies and add @cap-js/hana instead!
```

## Solution

### Step 1: Remove Old Package and Install New One

Run these commands in the backend directory:

```bash
# Make sure you're in backend
cd backend

# Remove old package
npm uninstall @sap/cds-hana

# Install new compatible package
npm install @cap-js/hana --save
```

### Step 2: Update package.json

I've already updated `backend/package.json` to use `@cap-js/hana` instead of `@sap/cds-hana`.

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run cds watch

```bash
cds watch
```

## Quick Fix (Copy-Paste)

```bash
cd backend
npm uninstall @sap/cds-hana
npm install @cap-js/hana --save
npm install
cds watch
```

## What Changed

- ❌ Removed: `@sap/cds-hana@^2` (incompatible with CDS v9)
- ✅ Added: `@cap-js/hana@^2` (compatible with CDS v9)

## After Fix

You should see:
```
[cds] - loaded model from db/schema.cds
[cds] - loaded model from srv/service.cds
[cds] - server listening on http://localhost:4004
```

## Note

The `@cap-js/hana` package provides the same HANA database adapter functionality as `@sap/cds-hana`, but is compatible with CDS version 9+.
