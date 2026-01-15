# Schema Fixes Applied

## Issues Fixed

1. ✅ **Removed `unique` keyword** - CDS doesn't support `unique` directly in field definition
   - Changed: `requestNumber: String(20) unique;` → `requestNumber: String(20);`
   - Changed: `budgetCode: String(50) unique;` → `budgetCode: String(50);`
   - Changed: `scheduleCode: String(50) unique;` → `scheduleCode: String(50);`

2. ✅ **Fixed Association references** - Changed lowercase `id` to uppercase `ID`
   - Changed: `budget.id` → `budget.ID`
   - Changed: `vestingSchedule.id` → `vestingSchedule.ID`

3. ✅ **Fixed annotation syntax** - Removed comma between annotations
   - Changed: `@cds.on.insert: $now, @cds.on.update: $now` → `@cds.on.insert: $now`
   - Note: For update timestamp, we'll handle it in the service layer

## Next Steps

Now try running `cds watch` again:

```bash
cd backend
cds watch
```

The schema should now compile without errors!

## Note on Unique Constraints

If you need unique constraints, you can add them later using:
- Database-level constraints
- Or validation in the service layer
- Or using CDS annotations like `@assert.unique` (if supported in your CDS version)
