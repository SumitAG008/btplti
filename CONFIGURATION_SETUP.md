# Professional Configuration Setup
## Real-World BTP Deployment Configuration

## 📋 Configuration Files Created

I've created the following configuration files for you:

1. **`.env.example`** - Environment variables template
2. **`manifest.yml`** - Cloud Foundry application manifest
3. **`xs-security.json`** - XSUAA security configuration
4. **`PRODUCTION_CONFIGURATION.md`** - Complete deployment guide

## 🔧 Step-by-Step Configuration

### Step 1: Create Environment File

**Create `.env` file in project root:**

```bash
# Copy the example
cp .env.example .env
```

**Edit `.env` with your actual values:**

```env
# Cloud Foundry Configuration
CF_API=https://api.cf.us10-001.hana.ondemand.com
CF_ORG=45dc37cbtrial
CF_SPACE=dev
CF_USERNAME=your-btp-username@example.com
CF_PASSWORD=your-btp-password

# SuccessFactors Configuration
SF_BASE_URL=https://your-instance.successfactors.com/odata/v2
SF_USERNAME=your-sf-username
SF_PASSWORD=your-sf-password
SF_COMPANY_ID=your-company-id

# Database (for local development)
CDS_DB_KIND=sqlite
CDS_PORT=4004
```

### Step 2: Configure SuccessFactors Destination

**In BTP Cockpit:**

1. Go to: **BTP Cockpit → Connectivity → Destinations**
2. Click **"New Destination"**
3. Fill in:

   **Basic Information:**
   - **Name:** `successfactors-destination`
   - **Type:** `HTTP`
   - **URL:** `https://your-instance.successfactors.com`
   - **Proxy Type:** `Internet`
   - **Authentication:** `BasicAuthentication`

   **Authentication Details:**
   - **User:** Your SuccessFactors username
   - **Password:** Your SuccessFactors password

   **Additional Properties:**
   - **Property:** `WebIDEEnabled` → **Value:** `true`
   - **Property:** `WebIDEUsage` → **Value:** `odata_gen`
   - **Property:** `sap-client` → **Value:** Your SAP client (if applicable)

4. Click **"Save"**

### Step 3: Update mta.yaml (Already Configured ✅)

Your `mta.yaml` is already set up with:
- ✅ HANA database service
- ✅ XSUAA service
- ✅ SuccessFactors destination reference

### Step 4: Cloud Foundry Login and Setup

```bash
# 1. Login to Cloud Foundry
cf login -a https://api.cf.us10-001.hana.ondemand.com

# Enter credentials when prompted:
# Email: your-btp-username@example.com
# Password: your-btp-password

# 2. Set target organization and space
cf target -o 45dc37cbtrial -s dev

# 3. Verify
cf target
```

### Step 5: Create Services

```bash
# 1. Create HANA database service
cf create-service hana hdi-shared rsu-db

# 2. Create XSUAA service (uses xs-security.json)
cf create-service xsuaa application rsu-uaa -c xs-security.json

# 3. Verify services
cf services
```

### Step 6: Build and Deploy

```bash
# 1. Install MTA Build Tool (if not installed)
npm install -g mbt

# 2. Build MTA archive
mbt build

# 3. Deploy to BTP
cf deploy mta_archives/rsu-btp-app_1.0.0.mtar

# 4. Monitor deployment
cf apps
cf logs rsu-service --recent
```

## 📍 Where to Find Your Configuration Values

### Cloud Foundry Details

**From BTP Cockpit:**
1. Go to: **BTP Cockpit → Cloud Foundry → Spaces**
2. Click on your space (e.g., `dev`)
3. You'll see:
   - **API Endpoint:** `https://api.cf.us10-001.hana.ondemand.com`
   - **Organization:** `45dc37cbtrial`
   - **Space:** `dev`

### SuccessFactors Details

**From SuccessFactors:**
1. Log into SuccessFactors
2. Go to **Admin Center → Company Settings → Company Information**
3. Note your:
   - **Instance URL:** `https://your-instance.successfactors.com`
   - **Company ID:** (if needed)

### BTP Credentials

**From BTP Cockpit:**
1. Go to: **BTP Cockpit → User Profile**
2. Your username is displayed
3. Use your BTP account password

## 🔐 Security Best Practices

### Never Commit .env File

**Add to `.gitignore`:**
```
.env
.env.local
.env.*.local
```

### Use User-Provided Services for Secrets

For production, use Cloud Foundry user-provided services:

```bash
# Create user-provided service for secrets
cf create-user-provided-service rsu-secrets \
  -p '{"SF_USERNAME":"your-username","SF_PASSWORD":"your-password"}'
```

## 📊 Configuration Summary

| Configuration | Location | Value |
|--------------|----------|-------|
| **CF API** | `.env` | `https://api.cf.us10-001.hana.ondemand.com` |
| **CF Org** | `.env` | `45dc37cbtrial` |
| **CF Space** | `.env` | `dev` |
| **SF URL** | `.env` + Destination | `https://your-instance.successfactors.com` |
| **Database** | `mta.yaml` | HANA Cloud (auto-provisioned) |
| **Security** | `xs-security.json` | XSUAA (auto-configured) |

## ✅ Verification Checklist

- [ ] `.env` file created with all values
- [ ] SuccessFactors destination created in BTP Cockpit
- [ ] Cloud Foundry logged in
- [ ] Target org/space set
- [ ] HANA service created
- [ ] XSUAA service created
- [ ] MTA built successfully
- [ ] Application deployed
- [ ] Services bound correctly
- [ ] Application accessible

## 🚀 Quick Start Commands

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env with your values

# 2. Login to CF
cf login -a https://api.cf.us10-001.hana.ondemand.com
cf target -o 45dc37cbtrial -s dev

# 3. Create services
cf create-service hana hdi-shared rsu-db
cf create-service xsuaa application rsu-uaa -c xs-security.json

# 4. Build and deploy
mbt build
cf deploy mta_archives/rsu-btp-app_1.0.0.mtar
```

## 📝 Next Steps

1. **Fill in `.env`** with your actual values
2. **Create SuccessFactors destination** in BTP Cockpit
3. **Create services** in Cloud Foundry
4. **Build and deploy** your application
5. **Test** the deployed application

Your application is now configured for professional deployment! 🎉
