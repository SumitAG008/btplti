# Fix Dependency Conflict

## The Problem

- `@cap-js/sqlite@2.1.2` requires `@sap/cds@>=9`
- But we were trying to install `@sap/cds@8`
- This causes a dependency conflict

## Solution: Use Compatible Versions

Use the latest versions that work together:
- `@sap/cds@9` (latest)
- `@sap/cds-dk@9` (latest)
- `@cap-js/sqlite@2` (compatible with cds@9)

## Quick Fix Commands

Run these in the backend directory:

```bash
# Make sure you're in backend
cd backend

# Install compatible versions
npm install @sap/cds@latest @sap/cds-dk@latest @cap-js/sqlite@latest --save-dev

# Or use the updated package.json
npm install
```

## Alternative: Use Legacy Peer Deps (If Needed)

If you still get conflicts, use:

```bash
npm install --legacy-peer-deps
```

## After Installation

Once dependencies are installed:

```bash
# Run watch
cds watch
```

## Updated package.json

I've updated `backend/package.json` to use:
- `@sap/cds@^9`
- `@sap/cds-dk@^9`
- `@cap-js/sqlite@^2`

These versions are compatible with each other.
