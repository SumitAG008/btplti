namespace RSU;

// RSU Request Entity - Handles both Employees and Candidates
entity RSURequests {
  key ID: UUID;
  requestNumber: String(20) unique;
  requestType: String(20); // 'EMPLOYEE' or 'CANDIDATE'
  employeeId: String(50); // SuccessFactors Employee ID
  candidateId: String(50); // SmartRecruiters Candidate ID (if applicable)
  firstName: String(100);
  lastName: String(100);
  email: String(255);
  position: String(200);
  department: String(100);
  managerId: String(50);
  boardArea: String(100);
  
  // RSU Details
  grantDate: Date;
  grantType: String(50); // 'ACR' or 'ADHOC'
  numberOfShares: Decimal(15, 2);
  sharePrice: Decimal(15, 4);
  totalValue: Decimal(15, 2);
  currency: String(3) default 'USD';
  
  // Budget Information
  budgetId: UUID;
  budgetAllocated: Decimal(15, 2);
  
  // Vesting Schedule
  vestingScheduleId: UUID;
  vestingStartDate: Date;
  vestingEndDate: Date;
  
  // Status and Workflow
  status: String(20); // 'DRAFT', 'SUBMITTED', 'VALIDATED', 'APPROVED', 'REJECTED', 'COMPLETED'
  currentApproverId: String(50);
  approvalLevel: Integer default 0;
  
  // Integration Flags
  publishedToSF: Boolean default false;
  publishedToSFDate: DateTime;
  publishedToEquatex: Boolean default false;
  publishedToEquatexDate: DateTime;
  
  // Audit Fields
  createdBy: String(100);
  createdAt: DateTime @cds.on.insert: $now;
  changedBy: String(100);
  changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
  
  // Associations
  budget: Association to Budgets on budget.id = budgetId;
  vestingSchedule: Association to VestingSchedules on vestingSchedule.id = vestingScheduleId;
  approvals: Association to many ApprovalWorkflows on approvals.requestId = $self.ID;
}

// Budget Entity - Single budget for both Employees and Candidates
entity Budgets {
  key ID: UUID;
  budgetCode: String(50) unique;
  budgetName: String(200);
  boardArea: String(100);
  fiscalYear: Integer;
  totalBudget: Decimal(15, 2);
  allocatedBudget: Decimal(15, 2);
  remainingBudget: Decimal(15, 2);
  currency: String(3) default 'USD';
  
  // Sub-budgets for different vesting schedules (flexibility)
  employeeBudget: Decimal(15, 2);
  candidateBudget: Decimal(15, 2);
  
  // Status
  isActive: Boolean default true;
  
  // Audit Fields
  createdBy: String(100);
  createdAt: DateTime @cds.on.insert: $now;
  changedBy: String(100);
  changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
  
  // Associations
  requests: Association to many RSURequests on requests.budgetId = $self.ID;
}

// Approval Workflow Entity
entity ApprovalWorkflows {
  key ID: UUID;
  requestId: UUID;
  approvalLevel: Integer;
  approverId: String(50);
  approverName: String(200);
  approverEmail: String(255);
  approvalRole: String(100); // 'MANAGER', 'HR', 'FINANCE', 'BOARD_AREA_HEAD', etc.
  
  status: String(20); // 'PENDING', 'APPROVED', 'REJECTED', 'DELEGATED'
  comments: String(1000);
  actionDate: DateTime;
  
  // Audit Fields
  createdBy: String(100);
  createdAt: DateTime @cds.on.insert: $now;
  changedBy: String(100);
  changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
  
  // Associations
  request: Association to RSURequests on request.ID = requestId;
}

// Vesting Schedule Entity
entity VestingSchedules {
  key ID: UUID;
  scheduleCode: String(50) unique;
  scheduleName: String(200);
  description: String(500);
  
  // Vesting Details
  vestingPeriod: Integer; // in months
  vestingType: String(50); // 'CLIFF', 'GRADED', 'PERFORMANCE'
  cliffPeriod: Integer; // in months
  vestingPercentage: Decimal(5, 2); // percentage per period
  
  // Status
  isActive: Boolean default true;
  
  // Audit Fields
  createdBy: String(100);
  createdAt: DateTime @cds.on.insert: $now;
  changedBy: String(100);
  changedAt: DateTime @cds.on.insert: $now, @cds.on.update: $now;
  
  // Associations
  requests: Association to many RSURequests on requests.vestingScheduleId = $self.ID;
}
