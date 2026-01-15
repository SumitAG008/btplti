using { RSU } from '../db/schema';

service RSUService {
  entity RSURequests as projection on RSU.RSURequests;
  entity Budgets as projection on RSU.Budgets;
  entity ApprovalWorkflows as projection on RSU.ApprovalWorkflows;
  entity VestingSchedules as projection on RSU.VestingSchedules;
  
  // Actions
  function validateRSURequest(requestId: String) returns String;
  function calculateVestingValue(requestId: String) returns Decimal;
  function checkBudgetAvailability(budgetId: String, amount: Decimal) returns Boolean;
  
  // Custom operations
  action submitForApproval(requestId: String);
  action approveRequest(requestId: String, approverId: String);
  action rejectRequest(requestId: String, reason: String);
  action publishToSuccessFactors(requestId: String);
}
