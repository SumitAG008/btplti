# Cursor → GitHub → SAP BTP Workflow Setup

## Overview

This guide sets up a workflow where you can:
1. **Develop locally in Cursor** (your preferred IDE)
2. **Push changes to GitHub** (version control)
3. **Deploy to SAP BTP** (automatically or manually)

## Step 1: Connect Cursor to GitHub

### Option A: Using GitHub CLI (Recommended)

1. **Install GitHub CLI** (if not already installed):
   ```bash
   # Windows (using winget or chocolatey)
   winget install GitHub.cli
   
   # Or download from: https://cli.github.com/
   ```

2. **Authenticate with GitHub**:
   ```bash
   gh auth login
   ```
   - Choose: GitHub.com
   - Choose: HTTPS
   - Authenticate: Yes
   - Login via web browser: Yes
   - Follow the prompts

3. **Verify connection**:
   ```bash
   gh auth status
   ```

### Option B: Using Git Credentials

1. **Clone repository in Cursor**:
   ```bash
   git clone https://github.com/SumitAG008/btplti.git
   ```

2. **When prompted for credentials**:
   - Username: `SumitAG008`
   - Password: Your GitHub Personal Access Token (not password!)

3. **Create Personal Access Token** (if needed):
   - Go to: https://github.com/settings/tokens
   - Generate new token (classic)
   - Scopes: ✅ `repo` (full control)
   - Copy the token

### Option C: Using SSH Keys

1. **Generate SSH key** (if not exists):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add to GitHub**:
   ```bash
   # Copy public key
   cat ~/.ssh/id_ed25519.pub
   ```
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste the key
   - Save

3. **Clone using SSH**:
   ```bash
   git clone git@github.com:SumitAG008/btplti.git
   ```

## Step 2: Setup Local Development Environment

### Clone Repository in Cursor

```bash
# Navigate to your workspace
cd C:\Users\sumit\Documents\RSUbtpapp

# Clone if not already cloned
git clone https://github.com/SumitAG008/btplti.git

# Or if you want to work in the existing folder
cd RSUbtpapp
git remote add origin https://github.com/SumitAG008/btplti.git
git branch -M main
git push -u origin main
```

### Install Dependencies

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

## Step 3: Configure Git in Cursor

### Set Git User (if not already set)

```bash
git config --global user.name "SumitAG008"
git config --global user.email "your_email@example.com"
```

### Verify Remote

```bash
git remote -v
# Should show:
# origin  https://github.com/SumitAG008/btplti.git (fetch)
# origin  https://github.com/SumitAG008/btplti.git (push)
```

## Step 4: Development Workflow

### Daily Development Process

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **Make changes in Cursor**
   - Edit files
   - Test locally (if possible)

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Push to GitHub**:
   ```bash
   git push origin main
   ```

5. **Deploy to BTP** (see Step 5)

## Step 5: Deploy to SAP BTP

### Option A: Manual Deployment (Current Setup)

After pushing to GitHub, deploy manually from Business Application Studio:

```bash
# In SAP Business Application Studio terminal
cd ~/projects/btplti
git pull origin main

# Build and deploy
mbt build
cf deploy mta_archives/rsu-btp-app_1.0.0.mtar
```

### Option B: GitHub Actions (Automated CI/CD)

Create automated deployment pipeline:

1. **Create GitHub Actions workflow**:
   Create file: `.github/workflows/deploy-to-btp.yml`

2. **Configure workflow** (see next section)

## Step 6: Setup GitHub Actions for Auto-Deployment

### Create GitHub Actions Workflow

Create the file: `.github/workflows/deploy-to-btp.yml`

```yaml
name: Deploy to SAP BTP

on:
  push:
    branches: [ main ]
  workflow_dispatch: # Allows manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        npm install
        cd backend && npm install
        cd ../frontend && npm install
        
    - name: Install MTA Build Tool
      run: npm install -g mbt
      
    - name: Build MTA
      run: mbt build
      
    - name: Setup Cloud Foundry CLI
      run: |
        wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | sudo apt-key add -
        echo "deb https://packages.cloudfoundry.org/debian stable main" | sudo tee /etc/apt/sources.list.d/cloudfoundry-cli.list
        sudo apt-get update
        sudo apt-get install cf-cli
        
    - name: Deploy to BTP
      env:
        CF_API: ${{ secrets.CF_API }}
        CF_ORG: ${{ secrets.CF_ORG }}
        CF_SPACE: ${{ secrets.CF_SPACE }}
        CF_USERNAME: ${{ secrets.CF_USERNAME }}
        CF_PASSWORD: ${{ secrets.CF_PASSWORD }}
      run: |
        cf login -a $CF_API -u $CF_USERNAME -p $CF_PASSWORD -o $CF_ORG -s $CF_SPACE
        cf deploy mta_archives/rsu-btp-app_1.0.0.mtar
```

### Configure GitHub Secrets

1. Go to your repository: https://github.com/SumitAG008/btplti
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:
   - `CF_API`: Your Cloud Foundry API endpoint (e.g., `https://api.cf.us10.hana.ondemand.com`)
   - `CF_ORG`: Your Cloud Foundry organization
   - `CF_SPACE`: Your Cloud Foundry space
   - `CF_USERNAME`: Your BTP username
   - `CF_PASSWORD`: Your BTP password (or use service key)

## Step 7: Workflow Summary

### Complete Workflow

```
Cursor (Local Development)
    ↓
    Make changes
    ↓
    git add .
    git commit -m "message"
    ↓
    git push origin main
    ↓
GitHub Repository
    ↓
    (Automatic via GitHub Actions)
    ↓
SAP BTP Deployment
```

### Manual Workflow (Current)

```
Cursor → GitHub → (Manual) → SAP Business Application Studio → BTP
```

### Automated Workflow (Recommended)

```
Cursor → GitHub → (Auto) → SAP BTP
```

## Step 8: Best Practices

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Commit and push
git push origin feature/new-feature

# Create Pull Request on GitHub
# Merge to main after review
```

### Commit Messages

Use clear, descriptive commit messages:
```bash
git commit -m "feat: Add budget validation logic"
git commit -m "fix: Resolve SuccessFactors integration issue"
git commit -m "docs: Update setup guide"
```

### .gitignore

Make sure `.gitignore` includes:
```
node_modules/
.env
*.mtar
dist/
*.log
```

## Troubleshooting

### Issue: Can't push to GitHub
- **Solution**: Check authentication (PAT or SSH key)
- Verify: `git remote -v` shows correct URL

### Issue: GitHub Actions fails
- **Solution**: Check secrets are configured correctly
- Verify: Cloud Foundry credentials are valid

### Issue: Changes not syncing
- **Solution**: 
  ```bash
  git pull origin main
  git push origin main
  ```

## Quick Reference Commands

```bash
# Clone repository
git clone https://github.com/SumitAG008/btplti.git

# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest
git pull origin main

# Check remote
git remote -v
```

## Next Steps

1. ✅ Connect Cursor to GitHub
2. ✅ Clone repository locally
3. ✅ Setup GitHub Actions (optional but recommended)
4. ✅ Configure secrets for deployment
5. ✅ Start developing and pushing changes!
