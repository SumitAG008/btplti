# Architecture Overview - RSU BTP Application

## Solution Architecture

Based on the requirements analysis, this application implements the **BTP Build Solution** approach, which provides:

### Key Design Decisions

1. **Single Process & Budget**: Unified workflow for both Employees and Candidates
2. **BTP Application**: Built on SAP Cloud Application Programming (CAP) model
3. **SuccessFactors Integration**: OData API integration for employee data and MDF publishing
4. **SmartRecruiters Integration**: REST API for candidate data validation
5. **Flexible Budget Control**: Single budget with sub-budget flexibility based on vesting schedules

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SAP BTP Application                       │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   Frontend (UI5) │────────▶│  Backend (CAP)   │         │
│  │   Fiori Elements │         │  Node.js Service │         │
│  └──────────────────┘         └──────────────────┘         │
│                                      │                       │
│                                      ▼                       │
│                              ┌──────────────┐                │
│                              │ HANA Cloud   │                │
│                              │   Database   │                │
│                              └──────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│SuccessFactors│    │SmartRecruiters│    │   OpenText   │
│ Employee     │    │   Candidate   │    │   Letters    │
│   Central    │    │     Data     │    │  Generation  │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Data Flow

### 1. RSU Request Creation Flow

```
User (UI) 
  → CAP Service (Validation)
    → SuccessFactors (Employee Validation) OR SmartRecruiters (Candidate Validation)
    → Budget Check (HANA Database)
    → Create RSU Request
    → Initialize Approval Workflow
```

### 2. Approval Flow

```
RSU Request (SUBMITTED)
  → Level 1: Manager Approval
    → Level 2: HR Approval (if threshold exceeded)
      → Level 3: Board Area Head Approval
        → Status: APPROVED
          → Budget Allocation
          → Publish to SuccessFactors
```

### 3. SuccessFactors Integration Flow

```
Approved RSU Request
  → CAP Service (Transform Data)
    → SuccessFactors OData API
      → MDF Object (LTI_ACR or LTI_AdHoc)
        → Compensation Template
          → Data Distribution
            → Payroll/Benefits
```

## Component Details

### Backend (CAP Service)

**Technology**: SAP Cloud Application Programming (CAP) - Node.js

**Key Components**:
- **Data Model** (`db/schema.cds`): CDS entities for RSU requests, budgets, approvals, vesting schedules
- **Service Layer** (`srv/service.cds`): OData service definitions
- **Business Logic** (`srv/service.js`): Implementation of business rules and validations

**Key Features**:
- OData v4 API
- Automatic CRUD operations
- Custom actions and functions
- Integration with external systems

### Frontend (SAP Fiori)

**Technology**: SAP UI5 / Fiori Elements

**Key Components**:
- **List Report**: Display RSU requests with filters
- **Object Page**: Create/Edit RSU request details
- **Approval Workflow UI**: Approve/Reject requests
- **Budget Dashboard**: View budget utilization

### Database (SAP HANA Cloud)

**Schema**: Managed via CDS (Cloud Data Services)

**Key Tables**:
- `RSU.RSURequests`: Core request data
- `RSU.Budgets`: Budget management
- `RSU.ApprovalWorkflows`: Approval tracking
- `RSU.VestingSchedules`: Vesting configuration

### Integration Points

#### SuccessFactors Integration

**Method**: OData API

**Operations**:
1. **Read Employee Data**: 
   - Entity: `PerPerson`
   - Purpose: Validate employee and fetch details
   
2. **Publish to MDF**:
   - Object: `LTI_ACR` or `LTI_AdHoc`
   - Purpose: Store approved RSU data in SuccessFactors
   - Method: OData POST/PATCH

**Authentication**: OAuth 2.0 or Basic Auth (via destination)

#### SmartRecruiters Integration

**Method**: REST API

**Operations**:
1. **Validate Candidate**:
   - Endpoint: `/candidates/{candidateId}`
   - Purpose: Verify candidate exists
   
2. **Fetch Candidate Data**:
   - Endpoint: `/candidates/{candidateId}`
   - Purpose: Get candidate details for RSU request

**Authentication**: API Key (configured in destination)

## Security Architecture

### Authentication & Authorization

**XSUAA (SAP Authorization and Trust Management Service)**

**Roles**:
- `RSU_Viewer`: Read-only access
- `RSU_Editor`: Create and edit requests
- `RSU_Approver`: Approve/reject requests
- `RSU_Admin`: Full administrative access

**Scopes**:
- `Display`: View RSU requests
- `Edit`: Create/edit requests
- `Approve`: Approve requests
- `Admin`: Administrative functions

### Data Security

- **Row-Level Security**: Based on user roles and organizational hierarchy
- **Field-Level Security**: Sensitive data (e.g., salary) restricted by role
- **Audit Logging**: All changes tracked with user and timestamp

## Deployment Architecture

### Multi-Target Application (MTA)

**Modules**:
1. **rsu-service**: Backend CAP service
2. **rsu-ui**: Frontend UI5 application

**Services**:
1. **rsu-db**: HANA Cloud database (HDI container)
2. **rsu-uaa**: XSUAA service for authentication
3. **successfactors-destination**: HTTP destination for SuccessFactors

### Deployment Flow

```
Local Development
  → Build MTA Archive (mbt build)
    → Deploy to BTP (cf deploy)
      → Provision Services
        → Bind Services
          → Start Applications
```

## Scalability & Performance

### Design Considerations

1. **Database**: HANA Cloud provides high-performance queries
2. **Caching**: Consider caching for frequently accessed data (employee hierarchies)
3. **Async Processing**: Approval notifications sent asynchronously
4. **Batch Operations**: Bulk operations for budget updates

### Monitoring

- **Application Logs**: Via Cloud Foundry logs
- **Performance Metrics**: Application Performance Monitoring (APM)
- **Error Tracking**: Centralized error logging

## Future Enhancements

1. **OpenText Integration**: Letter generation for approved RSUs
2. **Equatex Integration**: Publish vesting details to Equatex
3. **People Profile Integration**: Embed RSU data in SuccessFactors People Profile
4. **Analytics**: Budget utilization dashboards
5. **Mobile Support**: SAP Mobile Cards for approvals

## Compliance & Governance

- **Audit Trail**: Complete history of all changes
- **Data Retention**: Configurable retention policies
- **GDPR Compliance**: Personal data handling per regulations
- **Approval Policies**: Configurable based on organizational guidelines
