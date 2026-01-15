# Step-by-Step Setup Guide for SAP BTP RSU Application

## Phase 1: SAP Business Application Studio Setup

### Step 1: Create Dev Space

1. **Access SAP Business Application Studio**
   - Navigate to your SAP BTP Cockpit
   - Go to Services → SAP Business Application Studio
   - Click "Go to Application"

2. **Create New Dev Space**
   - Click "Create Dev Space"
   - **Dev Space Name**: Enter `OLTI` (or your preferred name)
   
3. **Select Application Type**
   - **Choose: "Full-Stack Cloud Application"** 
     - This provides CAP (Cloud Application Programming) tools
     - Includes Node.js, CDS, and deployment tools
   - **Alternative**: "SAP Fiori" if you only need UI development
   
4. **Select Extensions** (Recommended)
   - ✅ **CAP Tools** - Essential for CAP development
   - ✅ **SAP Fiori Tools** - For UI development
   - ✅ **MTA Tools** - For Multi-Target Application deployment
   - ✅ **HTML5 Runner** - For local testing
   - ✅ **Docker Image Builder** - If you need containerization

5. **Create Dev Space**
   - Click "Create Dev Space"
   - Wait for the dev space to start (2-3 minutes)

### Step 2: Clone Repository

Once your dev space is running:

```bash
# Open terminal in Business Application Studio
cd ~/projects

# Clone your repository
git clone https://github.com/SumitAG008/btplti.git

# Navigate to project
cd RSUbtpapp
```

## Phase 2: Project Configuration

### Step 3: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 4: Configure Environment

Create a `.env` file in the root directory:

```bash
# In Business Application Studio terminal
touch .env
```

Add the following content (update with your values):

```env
# SuccessFactors Configuration
SF_BASE_URL=https://your-instance.successfactors.com/odata/v2
SF_USERNAME=your-sf-username
SF_PASSWORD=your-sf-password

# Local Development Database
CDS_DB_KIND=sqlite

# Application Configuration
CDS_PORT=4004
```

### Step 5: Initialize Database Schema

```bash
# From root directory
cds deploy --to sqlite
# or for HANA Cloud (when connected)
cds deploy --to hana
```

## Phase 3: Local Development

### Step 6: Start Development Server

```bash
# From root directory
npm run watch
# or
cds watch
```

This will:
- Start the CAP server on port 4004
- Watch for file changes
- Auto-reload on changes
- Provide OData service endpoints

### Step 7: Test Backend Services

Open in browser:
- **Service Catalog**: http://localhost:4004
- **OData Service**: http://localhost:4004/rsu-service/
- **Service Metadata**: http://localhost:4004/rsu-service/$metadata

## Phase 4: BTP Deployment Preparation

### Step 8: Configure Cloud Foundry

```bash
# Login to Cloud Foundry
cf login -a https://api.cf.<region>.hana.ondemand.com

# Set target org and space
cf target -o <your-org> -s <your-space>
```

### Step 9: Create Required Services

```bash
# Create HANA Cloud service
cf create-service hana hdi-shared rsu-db

# Create XSUAA service (will be created via mta.yaml)
# Create SuccessFactors destination (configure in BTP Cockpit)
```

### Step 10: Configure SuccessFactors Destination

1. Go to BTP Cockpit → Connectivity → Destinations
2. Create new destination:
   - **Name**: `successfactors-destination`
   - **Type**: HTTP
   - **URL**: `https://your-instance.successfactors.com`
   - **Authentication**: Basic Authentication
   - **User**: Your SuccessFactors username
   - **Password**: Your SuccessFactors password
   - **Additional Properties**:
     - `WebIDEEnabled`: `true`
     - `WebIDEUsage`: `odata_gen`

## Phase 5: Build and Deploy

### Step 11: Build MTA Archive

```bash
# Install MTA Build Tool (if not already installed)
npm install -g mbt

# Build MTA archive
mbt build
```

This creates: `mta_archives/rsu-btp-app_1.0.0.mtar`

### Step 12: Deploy to BTP

```bash
# Deploy MTA archive
cf deploy mta_archives/rsu-btp-app_1.0.0.mtar
```

### Step 13: Verify Deployment

```bash
# Check application status
cf apps

# Check service bindings
cf services

# View application logs
cf logs rsu-service --recent
```

## Phase 6: Post-Deployment Configuration

### Step 14: Configure Roles and Authorizations

1. Go to BTP Cockpit → Security → Roles
2. Assign roles to users:
   - RSU_Viewer
   - RSU_Editor
   - RSU_Approver
   - RSU_Admin

### Step 15: Access Application

1. Get application URL:
   ```bash
   cf app rsu-ui
   ```

2. Access the application URL in browser
3. Login with your BTP credentials

## Development Workflow

### Daily Development

1. **Make Changes**: Edit files in Business Application Studio
2. **Test Locally**: Use `cds watch` for local testing
3. **Commit Changes**: 
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. **Deploy Updates**: Rebuild and deploy when ready

### Testing Integration Points

1. **SuccessFactors Integration**:
   - Test OData API calls
   - Verify employee data fetching
   - Test MDF object publishing

2. **SmartRecruiters Integration**:
   - Test candidate data fetching
   - Verify candidate validation

## Troubleshooting

### Issue: Dev Space won't start
- **Solution**: Check BTP quota and service availability

### Issue: Database connection fails
- **Solution**: Verify HANA Cloud service is provisioned and bound

### Issue: SuccessFactors API errors
- **Solution**: Check destination configuration and credentials

### Issue: Build fails
- **Solution**: Check all dependencies are installed and Node.js version is compatible

## Next Steps After Setup

1. **Implement SuccessFactors OData Integration**
   - Complete the `validateEmployeeInSF` function
   - Implement `publishToSFMDF` function

2. **Implement SmartRecruiters Integration**
   - Add SmartRecruiters API client
   - Implement candidate validation

3. **Develop UI**
   - Create Fiori Elements pages
   - Add custom UI5 views if needed

4. **Add Business Logic**
   - Complete approval workflow logic
   - Add budget validation rules
   - Implement vesting calculations

5. **Testing**
   - Unit tests for business logic
   - Integration tests for APIs
   - End-to-end testing

## Resources

- [SAP CAP Documentation](https://cap.cloud.sap/docs/)
- [SAP Fiori Elements](https://sapui5.hana.ondemand.com/#/topic/03265b0408e2432eb5b1c513309665ff)
- [SAP BTP Documentation](https://help.sap.com/btp)
- [SuccessFactors OData API](https://api.sap.com/successfactors)
