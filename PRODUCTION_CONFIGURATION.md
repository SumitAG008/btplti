# Production Configuration Guide
## Real-World BTP Deployment Setup

## Overview

This guide shows you how to configure your application for production deployment to SAP BTP with all required services, destinations, and environment variables.

## Step 1: Cloud Foundry Configuration

### 1.1 Get Your Cloud Foundry Details

From your BTP Cockpit:
- **CF API Endpoint:** `https://api.cf.us10-001.hana.ondemand.com`
- **Organization:** `45dc37cbtrial`
- **Space:** `dev` (or your space name)

### 1.2 Login to Cloud Foundry

```bash
# Login to Cloud Foundry
cf login -a https://api.cf.us10-001.hana.ondemand.com

# Enter your credentials when prompted
# Username: your-btp-username@example.com
# Password: your-btp-password
```

### 1.3 Set Target Org and Space

```bash
# Set target
cf target -o 45dc37cbtrial -s dev

# Verify
cf target
```

## Step 2: Create Required Services

### 2.1 Create HANA Cloud Database

```bash
# Create HDI container service
cf create-service hana hdi-shared rsu-db

# Check status
cf service rsu-db
```

### 2.2 Create XSUAA Service

```bash
# Create XSUAA service instance
cf create-service xsuaa application rsu-uaa -c xs-security.json

# Check status
cf service rsu-uaa
```

### 2.3 Create SuccessFactors Destination

**Option A: Via BTP Cockpit (Recommended)**

1. Go to BTP Cockpit → Connectivity → Destinations
2. Click "New Destination"
3. Configure:
   - **Name:** `successfactors-destination`
   - **Type:** HTTP
   - **URL:** `https://your-instance.successfactors.com`
   - **Authentication:** Basic Authentication
   - **User:** Your SuccessFactors username
   - **Password:** Your SuccessFactors password
   - **Additional Properties:**
     - `WebIDEEnabled`: `true`
     - `WebIDEUsage`: `odata_gen`

**Option B: Via CF CLI**

```bash
# Create destination service instance
cf create-service destination lite successfactors-destination

# Bind to application (will be done in mta.yaml)
```

## Step 3: Environment Configuration

### 3.1 Create .env File

Create `.env` file in project root (copy from `.env.example`):

```bash
# Copy example file
cp .env.example .env

# Edit with your values
# Use your preferred editor
```

### 3.2 Configure Environment Variables

**For Local Development:**

```env
# .env file
CF_API=https://api.cf.us10-001.hana.ondemand.com
CF_ORG=45dc37cbtrial
CF_SPACE=dev

SF_BASE_URL=https://your-instance.successfactors.com/odata/v2
SF_USERNAME=your-sf-username
SF_PASSWORD=your-sf-password

CDS_DB_KIND=sqlite
CDS_PORT=4004
```

**For BTP Deployment:**

Environment variables are set via:
- `mta.yaml` (service bindings)
- Service instances (auto-injected)
- User-provided services

## Step 4: Update package.json for Production

### 4.1 Backend package.json

Ensure production dependencies:

```json
{
  "dependencies": {
    "@sap/cds": "^9",
    "@cap-js/hana": "^2",
    "@sap/xssec": "^3",
    "express": "^4"
  },
  "engines": {
    "node": "^18"
  }
}
```

## Step 5: Configure MTA Deployment

### 5.1 Verify mta.yaml

Your `mta.yaml` should include:

```yaml
modules:
  - name: rsu-service
    requires:
      - name: rsu-db
      - name: rsu-uaa
      - name: successfactors-destination

resources:
  - name: rsu-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared
      
  - name: rsu-uaa
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      config:
        xsappname: rsu-btp-app
        # ... (from your existing mta.yaml)
```

## Step 6: Build and Deploy

### 6.1 Build MTA Archive

```bash
# Install MTA Build Tool (if not installed)
npm install -g mbt

# Build MTA
mbt build

# This creates: mta_archives/rsu-btp-app_1.0.0.mtar
```

### 6.2 Deploy to BTP

```bash
# Deploy MTA archive
cf deploy mta_archives/rsu-btp-app_1.0.0.mtar

# Monitor deployment
cf apps
cf services
```

### 6.3 Verify Deployment

```bash
# Check application status
cf app rsu-service

# Check logs
cf logs rsu-service --recent

# Get application URL
cf app rsu-service | grep urls
```

## Step 7: Configure SuccessFactors Integration

### 7.1 Update Service Configuration

In `backend/srv/.cdsrc.json`:

```json
{
  "requires": {
    "SuccessFactors": {
      "kind": "rest",
      "base": {
        "url": "${SF_BASE_URL}",
        "credentials": {
          "username": "${SF_USERNAME}",
          "password": "${SF_PASSWORD}"
        }
      }
    }
  }
}
```

### 7.2 Use Destination Service (Production)

For production, use destination service instead of direct credentials:

```javascript
// In service.js
const destination = await cds.connect.to('SuccessFactors')
const sfService = await destination.get('successfactors-destination')
```

## Step 8: Access Your Application

### 8.1 Get Application URL

```bash
# Get URL
cf app rsu-service | grep urls

# Example output:
# urls: rsu-service-dev.cfapps.us10-001.hana.ondemand.com
```

### 8.2 Access Service Endpoints

- **Service Catalog:** `https://rsu-service-dev.cfapps.us10-001.hana.ondemand.com`
- **OData Service:** `https://rsu-service-dev.cfapps.us10-001.hana.ondemand.com/odata/v4/rsu`
- **Metadata:** `https://rsu-service-dev.cfapps.us10-001.hana.ondemand.com/odata/v4/rsu/$metadata`

## Step 9: Post-Deployment Configuration

### 9.1 Assign Roles to Users

1. Go to BTP Cockpit → Security → Roles
2. Assign roles to users:
   - RSU_Viewer
   - RSU_Editor
   - RSU_Approver
   - RSU_Admin

### 9.2 Test Integration

```bash
# Test SuccessFactors connection
curl -u username:password \
  https://rsu-service-dev.cfapps.us10-001.hana.ondemand.com/odata/v4/rsu/RSURequests
```

## Step 10: Monitoring and Logs

### 10.1 View Application Logs

```bash
# Real-time logs
cf logs rsu-service --recent

# Follow logs
cf logs rsu-service
```

### 10.2 Check Service Status

```bash
# Application status
cf app rsu-service

# Service instances
cf services

# Service bindings
cf service rsu-db
cf service rsu-uaa
```

## Configuration Checklist

- [ ] Cloud Foundry logged in
- [ ] Target org/space set
- [ ] HANA database service created
- [ ] XSUAA service created
- [ ] SuccessFactors destination configured
- [ ] .env file created with values
- [ ] mta.yaml configured
- [ ] MTA built successfully
- [ ] Application deployed
- [ ] Services bound
- [ ] Application accessible
- [ ] Roles assigned
- [ ] Integration tested

## Quick Reference Commands

```bash
# Login
cf login -a https://api.cf.us10-001.hana.ondemand.com

# Target
cf target -o 45dc37cbtrial -s dev

# Create services
cf create-service hana hdi-shared rsu-db
cf create-service xsuaa application rsu-uaa -c xs-security.json

# Build and deploy
mbt build
cf deploy mta_archives/rsu-btp-app_1.0.0.mtar

# Monitor
cf apps
cf logs rsu-service --recent
```

## Summary

✅ **CF API:** `https://api.cf.us10-001.hana.ondemand.com`
✅ **Org:** `45dc37cbtrial`
✅ **Space:** `dev`
✅ **Services:** HANA, XSUAA, Destination
✅ **Configuration:** Environment variables, destinations, bindings

Your application is now configured for production deployment! 🚀
