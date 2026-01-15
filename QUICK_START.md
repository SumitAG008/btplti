# Quick Start Guide - SAP BTP RSU Application

## 🚀 Quick Setup (5 Minutes)

### Step 1: Choose Dev Space Type in SAP Business Application Studio

When creating your dev space, you have two main options:

#### Option A: **Full-Stack Cloud Application** (Recommended for CAP)
- ✅ Best for: Complete backend + frontend development
- ✅ Includes: CAP Tools, Node.js, CDS, MTA Tools
- ✅ Use when: You need full-stack development with CAP backend

#### Option B: **SAP Fiori** (If you only need UI)
- ✅ Best for: Frontend-only development
- ✅ Includes: Fiori Tools, UI5, HTML5 Runner
- ✅ Use when: Backend is already developed or you're only building UI

**For this project, choose: "Full-Stack Cloud Application"**

### Step 2: Essential Extensions to Select

When creating dev space, make sure to select:

- ✅ **CAP Tools** - Required for CAP development
- ✅ **SAP Fiori Tools** - For UI development  
- ✅ **MTA Tools** - For deployment
- ✅ **HTML5 Runner** - For local testing

### Step 3: Clone and Setup

```bash
# In Business Application Studio terminal
cd ~/projects
git clone https://github.com/SumitAG008/btplti.git
cd RSUbtpapp

# Install dependencies
npm install
cd backend && npm install
```

### Step 4: Run Locally

```bash
# From root directory
cds watch
```

Access at: http://localhost:4004

## 📋 What to Choose in SAP Business Application Studio

### Dev Space Configuration

```
Dev Space Name: OLTI (or your choice)
Application Type: Full-Stack Cloud Application
Extensions:
  ✅ CAP Tools
  ✅ SAP Fiori Tools  
  ✅ MTA Tools
  ✅ HTML5 Runner
```

### Why Full-Stack Cloud Application?

Based on your requirements:
- ✅ You need a **backend service** (CAP) for business logic
- ✅ You need **database** (HANA) for budget control
- ✅ You need **integrations** (SuccessFactors, SmartRecruiters)
- ✅ You need **deployment** (MTA) to BTP

This is exactly what "Full-Stack Cloud Application" provides!

## 🎯 Next Steps After Setup

1. **Configure SuccessFactors Connection**
   - Create destination in BTP Cockpit
   - Update `.env` file with credentials

2. **Initialize Database**
   ```bash
   cds deploy --to sqlite  # For local dev
   ```

3. **Test the Service**
   - Open http://localhost:4004
   - Check service catalog
   - Test OData endpoints

4. **Start Development**
   - Edit `backend/db/schema.cds` for data model
   - Edit `backend/srv/service.js` for business logic
   - Build UI in `frontend/webapp/`

## 📚 Key Files to Know

- `mta.yaml` - Deployment configuration
- `backend/db/schema.cds` - Data model
- `backend/srv/service.cds` - Service definition
- `backend/srv/service.js` - Business logic
- `frontend/webapp/manifest.json` - UI configuration

## 🔗 Important Links

- Full Setup Guide: See `SETUP_GUIDE.md`
- Architecture Details: See `ARCHITECTURE.md`
- Main README: See `README.md`

## ❓ Common Questions

**Q: Should I choose "SAP Fiori" or "Full-Stack Cloud Application"?**
A: Choose **"Full-Stack Cloud Application"** because you need CAP backend.

**Q: Do I need all the extensions?**
A: At minimum: CAP Tools, MTA Tools. Fiori Tools recommended for UI.

**Q: Can I change dev space type later?**
A: No, you'll need to create a new dev space. Choose correctly from the start.

**Q: What if I don't see "Full-Stack Cloud Application" option?**
A: Make sure you're using the latest version of Business Application Studio.
