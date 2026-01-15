# SAP BTP Application - Adhoc RSU Management

This is a SAP Business Technology Platform (BTP) application for managing Adhoc Restricted Stock Units (RSU) requests, extending SuccessFactors Employee Central functionality.

## Overview

This application provides:
- **Single Process**: Unified workflow for both Employees and Candidates
- **Single Budget**: Centralized budget control for both target groups
- **SuccessFactors Integration**: Seamless integration with Employee Central
- **SmartRecruiters Integration**: Support for candidate data from SmartRecruiters
- **Approval Workflows**: Flexible multi-level approval process
- **Vesting Management**: Support for various vesting schedules

## Architecture

### Technology Stack
- **Backend**: SAP CAP (Cloud Application Programming) - Node.js
- **Frontend**: SAP Fiori Elements/UI5
- **Database**: SAP HANA Cloud
- **Authentication**: XSUAA (SAP Authorization and Trust Management)
- **Integration**: OData APIs for SuccessFactors and SmartRecruiters

### Project Structure
```
RSUbtpapp/
├── backend/              # CAP Backend Service
│   ├── db/              # Data Models (CDS)
│   │   └── schema.cds  # Entity definitions
│   ├── srv/             # Service Layer
│   │   ├── service.cds  # Service definitions
│   │   └── service.js   # Business logic
│   └── package.json    # Backend dependencies
├── frontend/            # SAP Fiori UI
│   └── webapp/          # UI5 Application
│       └── manifest.json
├── mta.yaml             # Multi-Target Application descriptor
├── package.json         # Root package.json
└── README.md            # This file
```

## Prerequisites

1. **SAP BTP Account** with:
   - Cloud Foundry environment enabled
   - SAP HANA Cloud service
   - XSUAA service
   - SuccessFactors instance access

2. **Development Tools**:
   - Node.js (v18 or higher)
   - SAP Business Application Studio (recommended) or VS Code
   - Cloud Foundry CLI
   - SAP BTP CLI

3. **Access**:
   - SuccessFactors OData API access
   - SmartRecruiters API access (for candidate data)

## Setup Instructions

### 1. Create Dev Space in SAP Business Application Studio

1. Log in to SAP Business Application Studio
2. Create a new Dev Space with the following settings:
   - **Name**: `OLTI` (or your preferred name)
   - **Application Type**: **"Full-Stack Cloud Application"** (for CAP) OR **"SAP Fiori"** (if you prefer UI5-only)
   - **Recommended Extensions**:
     - CAP Tools (for CAP development)
     - SAP Fiori Tools (for UI development)
     - MTA Tools (for deployment)

### 2. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/SumitAG008/btplti.git
cd RSUbtpapp

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# SuccessFactors Configuration
SF_BASE_URL=https://your-instance.successfactors.com
SF_USERNAME=your-username
SF_PASSWORD=your-password

# Database Configuration (for local development)
CDS_DB_KIND=sqlite
```

### 4. Build and Run Locally

```bash
# Build the project
npm run build

# Run locally (development mode)
npm run watch
# or
cds watch
```

The application will be available at:
- Backend: `http://localhost:4004`
- Frontend: `http://localhost:4004/webapp`

### 5. Deploy to SAP BTP

```bash
# Login to Cloud Foundry
cf login -a https://api.cf.<region>.hana.ondemand.com

# Build MTA
mbt build

# Deploy
cf deploy mta_archives/rsu-btp-app_1.0.0.mtar
```

## Key Features

### 1. RSU Request Management
- Create RSU requests for Employees and Candidates
- Support for both ACR (Annual Compensation Review) and Adhoc grants
- Automatic validation against SuccessFactors/SmartRecruiters

### 2. Budget Control
- Single budget for both Employees and Candidates
- Flexible sub-budgets based on vesting schedules
- Real-time budget availability checking
- Automatic budget allocation upon approval

### 3. Approval Workflows
- Multi-level approval process
- Role-based approvals (Manager, HR, Board Area Head)
- Configurable approval rules based on amount thresholds
- Approval history tracking

### 4. SuccessFactors Integration
- Fetch employee data from Employee Central
- Publish approved RSU data to SuccessFactors MDF objects
- Integration with Compensation Template
- Data distribution to Payroll/Benefits

### 5. Vesting Schedule Management
- Support for various vesting types (Cliff, Graded, Performance-based)
- Flexible vesting period configuration
- Automatic value calculations

## Data Model

### Main Entities

1. **RSURequests**: Core entity for RSU requests
   - Supports both Employee and Candidate types
   - Links to Budget and Vesting Schedule
   - Tracks approval workflow and status

2. **Budgets**: Budget management
   - Single budget with sub-budget flexibility
   - Real-time tracking of allocated vs remaining budget

3. **ApprovalWorkflows**: Approval process tracking
   - Multi-level approval support
   - Role-based approver assignment

4. **VestingSchedules**: Vesting configuration
   - Various vesting types and periods
   - Percentage-based calculations

## Integration Points

### SuccessFactors
- **OData API**: Fetch employee data, publish to MDF objects
- **MDF Objects**: LTI_ACR, LTI_AdHoc Template
- **Compensation Forms**: Integration with compensation templates

### SmartRecruiters
- **REST API**: Fetch candidate data
- **Candidate Validation**: Verify candidate existence before creating request

### OpenText (Future)
- **Letter Generation**: Generate grant letters for approved RSUs

## Security & Authorization

The application uses XSUAA for authentication and authorization with the following roles:

- **RSU_Viewer**: View RSU requests
- **RSU_Editor**: Create and edit RSU requests
- **RSU_Approver**: Approve RSU requests
- **RSU_Admin**: Full administrative access

## Development Guidelines

### Adding New Features

1. **Data Model**: Add entities to `backend/db/schema.cds`
2. **Service Layer**: Add service definitions to `backend/srv/service.cds`
3. **Business Logic**: Implement in `backend/srv/service.js`
4. **UI**: Extend Fiori Elements annotations or create custom UI5 views

### Testing

```bash
# Run unit tests (when implemented)
npm test

# Run integration tests
npm run test:integration
```

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure HANA Cloud service is provisioned and bound
2. **SuccessFactors Integration**: Verify OData API access and credentials
3. **Authentication**: Check XSUAA service binding and role assignments

## Next Steps

1. **Complete SuccessFactors Integration**: Implement actual OData API calls
2. **SmartRecruiters Integration**: Add candidate data fetching
3. **UI Development**: Build Fiori Elements or custom UI5 application
4. **Testing**: Add unit and integration tests
5. **Documentation**: Add API documentation and user guides

## Support

For issues and questions, please refer to:
- SAP BTP Documentation: https://help.sap.com/btp
- CAP Documentation: https://cap.cloud.sap/docs
- SuccessFactors API Documentation: https://api.sap.com/successfactors

## License

[Add your license information here]
