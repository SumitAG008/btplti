# Testing Service Functions - Guide

## Current Status

✅ **Service is running:** `http://localhost:4004`
✅ **Errors fixed:** Null reference errors resolved
✅ **Sample data:** Created for testing

## Understanding the Errors

The errors you're seeing are **expected behavior** when:
1. Functions are called without valid request IDs
2. Database is empty (no test data)

## How to Test Properly

### Step 1: Load Sample Data

```bash
# In Business Application Studio terminal
cd ~/projects/btplti-1/backend

# Stop cds watch (Ctrl+C)

# Deploy with sample data
cds deploy --to sqlite --with data

# Restart watch
cds watch
```

### Step 2: Create Test RSU Request

**Via Service Catalog (Browser):**

1. Go to: `http://localhost:4004`
2. Click on **RSURequests** entity
3. Click **"Create"** or use POST request
4. Fill in required fields:
   ```json
   {
     "requestNumber": "RSU-2026-001",
     "requestType": "EMPLOYEE",
     "employeeId": "EMP001",
     "firstName": "John",
     "lastName": "Doe",
     "email": "john.doe@example.com",
     "position": "Senior Developer",
     "department": "IT",
     "budgetId": "550e8400-e29b-41d4-a716-446655440000",
     "vestingScheduleId": "550e8400-e29b-41d4-a716-446655440001",
     "grantDate": "2026-01-15",
     "grantType": "ADHOC",
     "numberOfShares": 1000,
     "sharePrice": 50.00,
     "status": "DRAFT"
   }
   ```

### Step 3: Test Functions with Valid Data

**After creating a request, test the functions:**

#### Test validateRSURequest

```bash
# Use the request ID from step 2
# Example: validateRSURequest(requestId='your-request-id')
```

#### Test calculateVestingValue

```bash
# Use the request ID from step 2
# Example: calculateVestingValue(requestId='your-request-id')
```

#### Test checkBudgetAvailability

```bash
# Use sample budget ID
# checkBudgetAvailability(budgetId='550e8400-e29b-41d4-a716-446655440000', amount=1000)
```

## Expected Behavior

### ✅ Success Cases

**With valid data:**
- `validateRSURequest` → Returns "Request validated successfully"
- `calculateVestingValue` → Returns calculated value
- `checkBudgetAvailability` → Returns `true` or `false`

### ❌ Error Cases (Now Handled Properly)

**Without valid data:**
- `validateRSURequest` → 404 "RSU Request with ID ... not found"
- `calculateVestingValue` → 404 "RSU Request with ID ... not found"
- `checkBudgetAvailability` → 404 "Budget not found" (if budget doesn't exist)

## Quick Test Commands

### Via Browser

1. **Service Catalog:** `http://localhost:4004`
2. **OData Service:** `http://localhost:4004/odata/v4/rsu`
3. **Metadata:** `http://localhost:4004/odata/v4/rsu/$metadata`

### Via cURL (Terminal)

```bash
# Get all budgets
curl http://localhost:4004/odata/v4/rsu/Budgets

# Get all vesting schedules
curl http://localhost:4004/odata/v4/rsu/VestingSchedules

# Check budget availability (with sample budget ID)
curl -X POST "http://localhost:4004/odata/v4/rsu/checkBudgetAvailability" \
  -H "Content-Type: application/json" \
  -d '{"budgetId":"550e8400-e29b-41d4-a716-446655440000","amount":1000}'
```

## Summary

✅ **Fixes Applied:**
- Added null checks for budget
- Added null checks for vesting schedule
- Added input validation
- Improved error messages

✅ **Next Steps:**
1. Load sample data
2. Create test RSU request
3. Test functions with valid data
4. Verify all errors are resolved

The service is now properly handling errors! 🎉
