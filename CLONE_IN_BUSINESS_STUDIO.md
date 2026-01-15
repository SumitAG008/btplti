# Clone Repository in SAP Business Application Studio

## Current Situation

You're in SAP Business Application Studio, but the repository hasn't been cloned yet. The error `No such file or directory` means you need to clone it first.

## Step-by-Step: Clone the Repository

### Step 1: Click "Clone from Git"

On the "Get Started" page, click the **"Clone from Git"** button.

### Step 2: Enter Repository URL

In the dialog that appears, enter:

```
https://github.com/SumitAG008/btplti.git
```

### Step 3: Select Clone Location

- **Default location:** `~/projects/` (recommended)
- Or choose a custom folder

### Step 4: Authenticate (if needed)

Since you already authorized the device, it should work automatically. If prompted:
- **Username:** `SumitAG008`
- **Password:** Your Personal Access Token (if needed)

### Step 5: Wait for Clone

The terminal will show:
```
Cloning into 'btplti'...
remote: Enumerating objects...
remote: Counting objects...
...
Cloning completed successfully
```

### Step 6: Open the Project

After cloning completes:
1. Click **"Open Folder"** or navigate to the project
2. Or in terminal:
   ```bash
   cd ~/projects/btplti
   ```

## Alternative: Clone via Terminal

If you prefer using the terminal directly:

```bash
# Navigate to projects folder
cd ~/projects

# Clone the repository
git clone https://github.com/SumitAG008/btplti.git

# Navigate into the project
cd btplti

# Verify files
ls -la
```

## After Cloning

Once cloned, you'll need to:

### 1. Install Dependencies

```bash
# From project root (~/projects/btplti)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Development

```bash
# From project root
cds watch
```

This will start the CAP development server.

## Verify Clone Success

```bash
# Check you're in the right place
pwd
# Should show: /home/user/projects/btplti

# Check files exist
ls -la
# Should show: backend/, frontend/, package.json, etc.

# Check git remote
git remote -v
# Should show: https://github.com/SumitAG008/btplti.git
```

## Troubleshooting

### Issue: "Clone from Git" button doesn't work
**Solution:** Use terminal method instead:
```bash
cd ~/projects
git clone https://github.com/SumitAG008/btplti.git
```

### Issue: Authentication fails
**Solution:** 
- You already authorized the device, so it should work
- If not, use Personal Access Token as password

### Issue: Clone hangs
**Solution:**
- Check internet connection
- Try again
- Check terminal for error messages

## Quick Commands Summary

```bash
# Clone repository
cd ~/projects
git clone https://github.com/SumitAG008/btplti.git

# Navigate to project
cd btplti

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Start development
cds watch
```

## Next Steps After Clone

1. ✅ Repository cloned
2. ✅ Dependencies installed
3. ✅ Start `cds watch`
4. ✅ Access at http://localhost:4004
5. ✅ Begin development!
