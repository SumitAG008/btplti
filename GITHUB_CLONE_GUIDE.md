# How to Clone GitHub Repository in SAP Business Application Studio

## Step-by-Step Guide

### Step 1: Click "Clone from Git"

In the "Get Started" screen, click on **"Clone from Git"** (the option that's highlighted in your screen).

### Step 2: Enter Your GitHub Repository URL

You'll see a dialog asking for the repository URL. You need to provide:

#### Option A: HTTPS URL (Recommended for Public Repos)
```
https://github.com/SumitAG008/btplti.git
```

#### Option B: SSH URL (If you have SSH keys configured)
```
git@github.com:SumitAG008/btplti.git
```

### Step 3: Authentication

#### For Public Repository:
- If your repository is **public**, you can clone directly without authentication
- Just paste the HTTPS URL and click "Clone"

#### For Private Repository:
- If your repository is **private**, you'll need to authenticate
- Options:
  1. **Personal Access Token (PAT)** - Recommended
  2. **SSH Key** - If configured
  3. **Username/Password** - Less secure, not recommended

### Step 4: Select Clone Location

After entering the URL, you'll be asked where to clone:
- **Default**: `~/projects/` (recommended)
- Or choose a custom folder

### Step 5: Open the Project

After cloning completes:
- The project will appear in your workspace
- You can open it from the file explorer
- Or it may open automatically

## Detailed Instructions

### Getting Your Repository URL

1. Go to your GitHub repository: `https://github.com/SumitAG008/btplti`
2. Click the green **"Code"** button
3. Copy the HTTPS URL (it will look like: `https://github.com/SumitAG008/btplti.git`)

### If Your Repository is Private

#### Method 1: Personal Access Token (PAT)

1. **Create a PAT on GitHub:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "SAP BAS")
   - Select scopes: ✅ `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Use PAT in Business Application Studio:**
   - When prompted for credentials:
     - Username: Your GitHub username (`SumitAG008`)
     - Password: Paste your Personal Access Token (NOT your GitHub password)

#### Method 2: SSH Key (Alternative)

1. **Generate SSH Key in Business Application Studio:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Copy Public Key:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

3. **Add to GitHub:**
   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your public key
   - Save

4. **Use SSH URL:**
   ```
   git@github.com:SumitAG008/btplti.git
   ```

## What to Enter in the Clone Dialog

When you click "Clone from Git", you'll see a field asking for:

**Repository URL:**
```
https://github.com/SumitAG008/btplti.git
```

**If Private - Credentials:**
- Username: `SumitAG008`
- Password: Your Personal Access Token (if using HTTPS)

## After Cloning

Once cloned successfully:

1. **Navigate to the project:**
   ```bash
   cd ~/projects/btplti
   # or
   cd ~/projects/RSUbtpapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Start development:**
   ```bash
   cds watch
   ```

## Troubleshooting

### Issue: "Repository not found"
- **Solution**: Check if repository is private and you've provided correct credentials
- Verify the repository URL is correct

### Issue: "Authentication failed"
- **Solution**: 
  - For private repos, use Personal Access Token (not password)
  - Make sure PAT has `repo` scope
  - Try SSH method instead

### Issue: "Permission denied"
- **Solution**: 
  - Check your GitHub account has access to the repository
  - Verify PAT or SSH key is correctly configured

### Issue: Clone hangs or times out
- **Solution**: 
  - Check your internet connection
  - Try using SSH instead of HTTPS
  - Verify repository exists and is accessible

## Quick Reference

```
Repository URL: https://github.com/SumitAG008/btplti.git
Clone Location: ~/projects/ (default)
Authentication: Personal Access Token (for private repos)
```

## Next Steps After Cloning

1. Open the project folder
2. Install dependencies: `npm install`
3. Configure environment: Create `.env` file
4. Start development: `cds watch`
