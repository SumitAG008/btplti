# Fix Service Errors - 404 and Null Reference Errors

## Issues Found

1. **404 Errors:** Functions are being called but entities don't exist in database
2. **Null Reference Error:** `checkBudgetAvailability` tries to access `budget.remainingBudget` when budget is null

## Fixes Applied

### Fix 1: Added Budget Null Check in validateRSURequest

**Before:**
```javascript
const budget = await SELECT.one.from(Budgets).where({ ID: request.budgetId })
if (budget.remainingBudget < request.totalValue) {
```

**After:**
```javascript
const budget = await SELECT.one.from(Budgets).where({ ID: request.budgetId })
if (!budget) {
  return req.error(404, 'Budget not found')
}
if (budget.remainingBudget < request.totalValue) {
```

### Fix 2: Added VestingSchedule Null Check in calculateVestingValue

**Before:**
```javascript
const vestingSchedule = await SELECT.one.from(VestingSchedules).where({ ID: request.vestingScheduleId })
const totalValue = request.numberOfShares * request.sharePrice
```

**After:**
```javascript
const vestingSchedule = await SELECT.one.from(VestingSchedules).where({ ID: request.vestingScheduleId })
if (!vestingSchedule) {
  return req.error(404, 'Vesting schedule not found')
}
const totalValue = request.numberOfShares * request.sharePrice
```

### Fix 3: Fixed checkBudgetAvailability Null Error

**Before:**
```javascript
const budget = await SELECT.one.from(Budgets).where({ ID: budgetId })
return budget.remainingBudget >= amount
```

**After:**
```javascript
if (!budgetId) {
  return req.error(400, 'Budget ID is required')
}

const budget = await SELECT.one.from(Budgets).where({ ID: budgetId })

if (!budget) {
  return req.error(404, 'Budget not found')
}

return budget.remainingBudget >= amount
```

## Add Sample Data

I've created sample data file: `backend/db/data/sample-data.json`

### Load Sample Data

```bash
# In Business Application Studio terminal
cd ~/projects/btplti-1/backend

# Deploy sample data
cds deploy --to sqlite --with data
```

Or manually insert via service:

```bash
# Access service catalog
# http://localhost:4004

# Create budget and vesting schedule via OData API
```

## Testing the Fixes

### Test 1: Check Budget Availability (Should Work Now)

```bash
# Use a valid budget ID from sample data
# Budget ID: 550e8400-e29b-41d4-a716-446655440000

# Call: /odata/v4/rsu/checkBudgetAvailability(budgetId='550e8400-e29b-41d4-a716-446655440000', amount=1000)
```

### Test 2: Validate RSU Request (Need to Create Request First)

```bash
# First create an RSU request via POST to /odata/v4/rsu/RSURequests
# Then validate it
```

### Test 3: Calculate Vesting Value (Need to Create Request First)

```bash
# First create an RSU request with vesting schedule
# Then calculate value
```

## Next Steps

1. **Load sample data** to have test data available
2. **Create test RSU requests** via OData API
3. **Test the functions** with valid data
4. **Verify all errors are resolved**

## Summary

✅ **Fixed:** Null reference errors
✅ **Fixed:** Missing null checks
✅ **Added:** Sample data file
✅ **Improved:** Error messages

The service should now handle missing entities properly!
