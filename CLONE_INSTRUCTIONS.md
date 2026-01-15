# Quick Clone Instructions

## What You Need to Provide

When you click **"Clone from Git"**, you'll be asked for:

### 1. Repository URL

Enter this exact URL:
```
https://github.com/SumitAG008/btplti.git
```

### 2. Clone Location (Optional)

Leave as default: `~/projects/` or choose your preferred folder

### 3. Authentication (Only if repository is private)

If your repository is **private**, you'll need:

**Username:** `SumitAG008`

**Password:** Your GitHub Personal Access Token (NOT your GitHub password!)

## How to Get Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name it: "SAP BAS"
4. Check ✅ `repo` scope
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as the "password" when cloning

## Step-by-Step in Business Application Studio

1. ✅ Click **"Clone from Git"**
2. ✅ Paste: `https://github.com/SumitAG008/btplti.git`
3. ✅ Click "Clone" or "Next"
4. ✅ If asked for credentials:
   - Username: `SumitAG008`
   - Password: Your Personal Access Token
5. ✅ Wait for clone to complete
6. ✅ Open the project folder

## After Cloning

```bash
# Navigate to project
cd ~/projects/btplti

# Install dependencies
npm install
cd backend && npm install

# Start development
cds watch
```
