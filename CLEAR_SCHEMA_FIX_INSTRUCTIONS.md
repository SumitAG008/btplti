# Clear Instructions: Fix Schema Errors

## Step-by-Step Fix in Business Application Studio

### Step 1: Open the File

1. In Business Application Studio, open: `backend/db/schema.cds`
2. Make sure the file is visible in the editor

### Step 2: Use Find & Replace (Easiest Method)

Press `Ctrl+H` (or `Cmd+H` on Mac) to open Find & Replace.

#### Fix 1: Remove `unique` Keywords

1. **Find:** ` unique;` (space before "unique")
2. **Replace:** `;`
3. Click **"Replace All"** (or press `Alt+Enter`)
4. This will fix lines 6, 61, and 114

#### Fix 2: Fix Association References (lowercase `id` to uppercase `ID`)

1. **Find:** `budget.id`
2. **Replace:** `budget.ID`
3. Click **"Replace All"**
4. This fixes line 53

1. **Find:** `vestingSchedule.id`
2. **Replace:** `vestingSchedule.ID`
3. Click **"Replace All"**
4. This fixes line 54

#### Fix 3: Fix Annotation Syntax (Remove Commas)

1. **Find:** `@cds.on.insert: $now, @cds.on.update: $now`
2. **Replace:** `@cds.on.insert: $now`
3. Click **"Replace All"**
4. This fixes lines 50, 81, 105, and 131

### Step 3: Save the File

Press `Ctrl+S` (or `Cmd+S` on Mac) to save.

### Step 4: Verify the Fixes

Check these specific lines in the file:

- **Line 6:** Should be `requestNumber: String(20);` (NO `unique`)
- **Line 50:** Should be `changedAt: DateTime @cds.on.insert: $now;` (NO comma, NO update annotation)
- **Line 53:** Should be `budget: Association to Budgets on budget.ID = budgetId;` (uppercase `ID`)
- **Line 54:** Should be `vestingSchedule: Association to VestingSchedules on vestingSchedule.ID = vestingScheduleId;` (uppercase `ID`)
- **Line 61:** Should be `budgetCode: String(50);` (NO `unique`)
- **Line 81:** Should be `changedAt: DateTime @cds.on.insert: $now;` (NO comma)
- **Line 105:** Should be `changedAt: DateTime @cds.on.insert: $now;` (NO comma)
- **Line 114:** Should be `scheduleCode: String(50);` (NO `unique`)
- **Line 131:** Should be `changedAt: DateTime @cds.on.insert: $now;` (NO comma)

### Step 5: Test

Run in terminal:

```bash
cd backend
cds watch
```

You should see:
```
[cds] - loaded model from db/schema.cds
[cds] - loaded model from srv/service.cds
[cds] - server listening on http://localhost:4004
```

## Alternative: Manual Fix (If Find & Replace Doesn't Work)

If Find & Replace doesn't work, manually edit these lines:

### Line 6:
**Change from:**
```cds
requestNumber: String(20) unique;
```
**To:**
```cds
requestNumber: String(20);
```

### Line 50:
**Change from:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**To:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

### Line 53:
**Change from:**
```cds
budget: Association to Budgets on budget.id = budgetId;
```
**To:**
```cds
budget: Association to Budgets on budget.ID = budgetId;
```

### Line 54:
**Change from:**
```cds
vestingSchedule: Association to VestingSchedules on vestingSchedule.id = vestingScheduleId;
```
**To:**
```cds
vestingSchedule: Association to VestingSchedules on vestingSchedule.ID = vestingScheduleId;
```

### Line 61:
**Change from:**
```cds
budgetCode: String(50) unique;
```
**To:**
```cds
budgetCode: String(50);
```

### Line 81:
**Change from:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**To:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

### Line 105:
**Change from:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**To:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

### Line 114:
**Change from:**
```cds
scheduleCode: String(50) unique;
```
**To:**
```cds
scheduleCode: String(50);
```

### Line 131:
**Change from:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**To:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

## Quick Copy-Paste: All Find & Replace Operations

Do these in order (press `Ctrl+H` for each):

1. Find: ` unique;` → Replace: `;` → Replace All
2. Find: `budget.id` → Replace: `budget.ID` → Replace All
3. Find: `vestingSchedule.id` → Replace: `vestingSchedule.ID` → Replace All
4. Find: `@cds.on.insert: $now, @cds.on.update: $now` → Replace: `@cds.on.insert: $now` → Replace All

Then save (`Ctrl+S`) and run `cds watch`!
