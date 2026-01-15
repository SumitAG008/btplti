# GitHub Device Authorization Guide for SAP Business Application Studio

## What's Happening

You're seeing GitHub's **Device Authorization** page. This is a secure way to authenticate when cloning repositories.

## How to Complete Authorization

### Step 1: Check Your Terminal in Business Application Studio

1. **Go back to SAP Business Application Studio**
2. **Open the Terminal** (if not already open):
   - Click on "Terminal" in the top menu
   - Or press `Ctrl + ~` (Windows) / `Cmd + ~` (Mac)

3. **Look for a code** in the terminal output
   - It will look like: `XXXX-XXXX` (8 characters, hyphen in the middle)
   - Example: `A1B2-C3D4`

### Step 2: Enter the Code on GitHub Page

1. **On the GitHub authorization page** (the one you're seeing)
2. **Enter the 8-character code** from the terminal into the input fields
3. **Click "Continue"**

### Step 3: Authorize

1. GitHub will ask you to authorize the application
2. Click **"Authorize"** or **"Authorize SAP Business Application Studio"**
3. You'll be redirected back to Business Application Studio

### Step 4: Clone Should Complete

After authorization, the clone process will continue automatically.

## Visual Guide

```
Terminal in Business Application Studio:
┌─────────────────────────────────────┐
│ Please visit:                        │
│ https://github.com/login/device     │
│                                     │
│ And enter code: A1B2-C3D4  ← COPY THIS
└─────────────────────────────────────┘
              ↓
GitHub Page (what you're seeing):
┌─────────────────────────────────────┐
│ Enter code: [A][1][B][2]-[C][3][D][4]│
│            [Continue Button]        │
└─────────────────────────────────────┘
```

## Alternative: Use Personal Access Token Instead

If you prefer not to use device authorization, you can use a Personal Access Token:

### Step 1: Create Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "SAP BAS"
4. Select scope: ✅ `repo`
5. Click "Generate token"
6. **Copy the token** (starts with `ghp_...`)

### Step 2: Use Token When Cloning

When Business Application Studio asks for credentials:
- **Username:** `SumitAG008`
- **Password:** Paste your Personal Access Token (NOT your GitHub password)

## About Cursor and GitHub

**Important:** This GitHub authorization is for **SAP Business Application Studio**, not Cursor.

- **SAP Business Application Studio** = Where you're developing the BTP application
- **Cursor** = Your local IDE (separate tool)

You don't need to connect Cursor to GitHub for this. The clone operation happens in Business Application Studio.

However, if you want to use Cursor locally with the same repository:
- Cursor can connect to GitHub separately
- But it's not required for the Business Application Studio workflow

## Troubleshooting

### Issue: Can't find the code in terminal
- **Solution:** Look for output that says "Enter code:" or "And enter code:"
- The code is usually displayed right after you run the clone command

### Issue: Code expired
- **Solution:** The code expires after a few minutes. Run the clone command again to get a new code.

### Issue: Authorization page doesn't load
- **Solution:** 
  - Check your internet connection
  - Try refreshing the page
  - Make sure you're logged into GitHub in the browser

### Issue: Want to skip device auth
- **Solution:** Use Personal Access Token method instead (see above)

## Quick Steps Summary

1. ✅ Get 8-character code from Business Application Studio terminal
2. ✅ Enter code on GitHub authorization page
3. ✅ Click "Continue"
4. ✅ Authorize the application
5. ✅ Clone completes automatically

## Next Steps After Authorization

Once authorized and cloned:

```bash
# Navigate to project
cd ~/projects/btplti

# Install dependencies
npm install
cd backend && npm install

# Start development
cds watch
```
