# Fix Schema Errors - Step by Step

## The Problem

The errors indicate that Business Application Studio might be using a cached or different version of the file. The fixes I made need to be applied in Business Application Studio.

## Solution: Manual Fix in Business Application Studio

### Step 1: Open the File

In Business Application Studio, open: `backend/db/schema.cds`

### Step 2: Fix Each Error

#### Error 1: Line 6 - Remove any `unique` keyword
**Find:**
```cds
requestNumber: String(20) unique;
```
**Replace with:**
```cds
requestNumber: String(20);
```

#### Error 2: Line 50 - Fix annotation (remove comma if present)
**Find:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**Replace with:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

#### Error 3: Line 53 - Fix Association (use uppercase ID)
**Find:**
```cds
budget: Association to Budgets on budget.id = budgetId;
```
**Replace with:**
```cds
budget: Association to Budgets on budget.ID = budgetId;
```

#### Error 4: Line 54 - Fix Association (use uppercase ID)
**Find:**
```cds
vestingSchedule: Association to VestingSchedules on vestingSchedule.id = vestingScheduleId;
```
**Replace with:**
```cds
vestingSchedule: Association to VestingSchedules on vestingSchedule.ID = vestingScheduleId;
```

#### Error 5: Line 61 - Remove `unique` keyword
**Find:**
```cds
budgetCode: String(50) unique;
```
**Replace with:**
```cds
budgetCode: String(50);
```

#### Error 6: Line 81 - Fix annotation (remove comma if present)
**Find:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**Replace with:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

#### Error 7: Line 105 - Fix annotation (remove comma if present)
**Find:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**Replace with:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

#### Error 8: Line 114 - Remove `unique` keyword
**Find:**
```cds
scheduleCode: String(50) unique;
```
**Replace with:**
```cds
scheduleCode: String(50);
```

#### Error 9: Line 131 - Fix annotation (remove comma if present)
**Find:**
```cds
changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
```
**Replace with:**
```cds
changedAt: DateTime @cds.on.insert: $now;
```

### Step 3: Save the File

Press `Ctrl+S` (or `Cmd+S` on Mac) to save.

### Step 4: Run cds watch Again

```bash
cd backend
cds watch
```

## Alternative: Pull Latest from GitHub

If the fixes are already in GitHub, pull them:

```bash
cd backend
git pull origin main
cds watch
```

## Quick Find & Replace

In Business Application Studio, use Find & Replace (`Ctrl+H`):

1. **Find:** ` unique;` (with space before)
   **Replace:** `;`

2. **Find:** `budget.id`
   **Replace:** `budget.ID`

3. **Find:** `vestingSchedule.id`
   **Replace:** `vestingSchedule.ID`

4. **Find:** `@cds.on.insert: $now, @cds.on.update: $now`
   **Replace:** `@cds.on.insert: $now`

This will fix all instances at once!
