# Complete Fix Guide - Schema Errors & GitHub Actions

## Part 1: Fix Schema Errors in Business Application Studio

### Quick Fix Using Find & Replace

1. **Open** `backend/db/schema.cds` in Business Application Studio
2. **Press** `Ctrl+H` (or `Cmd+H` on Mac) to open Find & Replace
3. **Do these replacements:**

   **Fix 1: Remove `unique` keyword**
   - Find: ` unique;` (with space before)
   - Replace: `;`
   - Click "Replace All"

   **Fix 2: Fix Association references**
   - Find: `budget.id`
   - Replace: `budget.ID`
   - Click "Replace All"

   - Find: `vestingSchedule.id`
   - Replace: `vestingSchedule.ID`
   - Click "Replace All"

   **Fix 3: Fix annotation syntax**
   - Find: `@cds.on.insert: $now, @cds.on.update: $now`
   - Replace: `@cds.on.insert: $now`
   - Click "Replace All"

4. **Save** the file (`Ctrl+S`)
5. **Run** `cds watch` again

## Part 2: Fix GitHub Actions Workflow

### Option A: Add Required Secrets (For Auto-Deployment)

1. Go to: https://github.com/SumitAG008/btplti/settings/secrets/actions
2. Add these secrets:
   - `CF_API`: Your Cloud Foundry API endpoint
   - `CF_ORG`: Your organization name
   - `CF_SPACE`: Your space name
   - `CF_USERNAME`: Your BTP username
   - `CF_PASSWORD`: Your BTP password

### Option B: Disable Auto-Deployment (Temporary)

Edit `.github/workflows/deploy-to-btp.yml`:

Change:
```yaml
on:
  push:
    branches: [ main ]
```

To:
```yaml
on:
  workflow_dispatch:  # Manual trigger only
```

This prevents automatic runs but allows manual triggers.

## Part 3: Verify Everything Works

### In Business Application Studio:

```bash
# Navigate to backend
cd backend

# Run watch
cds watch
```

**Expected output:**
```
[cds] - loaded model from db/schema.cds
[cds] - loaded model from srv/service.cds
[cds] - server listening on http://localhost:4004
```

### In GitHub:

1. Check **Actions** tab - workflow should pass (after adding secrets)
2. Or workflow won't run automatically (if you disabled auto-deployment)

## Summary

✅ **Schema Errors**: Fix using Find & Replace in Business Application Studio
✅ **GitHub Actions**: Add secrets OR disable auto-deployment
✅ **Test**: Run `cds watch` to verify

## Next Steps After Fixes

1. ✅ Schema compiles without errors
2. ✅ `cds watch` runs successfully
3. ✅ GitHub Actions configured (optional)
4. ✅ Ready for development!
