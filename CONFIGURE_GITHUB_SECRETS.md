# Configure GitHub Actions Secrets

## Your Cloud Foundry Details

Based on your screenshot, here's what you have:

- **CF_API**: `https://api.cf.us10-001.hana.ondemand.com`
- **CF_ORG**: `45dc37cbtrial`
- **CF_SPACE**: `dev`

## Step-by-Step: Add Secrets to GitHub

### Step 1: Go to Secrets Page

1. Open: https://github.com/SumitAG008/btplti
2. Click **Settings** (top navigation bar)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret** button

### Step 2: Add Each Secret

Add these 5 secrets one by one:

#### Secret 1: CF_API
- **Name:** `CF_API`
- **Value:** `https://api.cf.us10-001.hana.ondemand.com`
- Click **Add secret**

#### Secret 2: CF_ORG
- **Name:** `CF_ORG`
- **Value:** `45dc37cbtrial`
- Click **Add secret**

#### Secret 3: CF_SPACE
- **Name:** `CF_SPACE`
- **Value:** `dev`
- Click **Add secret**

#### Secret 4: CF_USERNAME
- **Name:** `CF_USERNAME`
- **Value:** Your BTP username (the one you use to log into SAP BTP)
- Click **Add secret**

#### Secret 5: CF_PASSWORD
- **Name:** `CF_PASSWORD`
- **Value:** Your BTP password (the one you use to log into SAP BTP)
- Click **Add secret**

## Quick Reference

After adding, you should have these 5 secrets:

```
CF_API      = https://api.cf.us10-001.hana.ondemand.com
CF_ORG      = 45dc37cbtrial
CF_SPACE    = dev
CF_USERNAME = (your BTP username)
CF_PASSWORD = (your BTP password)
```

## After Adding Secrets

1. Go to **Actions** tab
2. Find the failed workflow run
3. Click **Re-run all jobs**
4. The workflow should now succeed!

## Security Note

- Secrets are encrypted and only visible to GitHub Actions
- Never commit secrets to your code
- You can update secrets anytime in Settings

## Test the Workflow

After adding secrets, the next time you push to GitHub:

```bash
git add .
git commit -m "Test deployment"
git push origin main
```

The workflow will automatically:
1. Build the MTA
2. Deploy to your BTP space (`dev`)
3. Show success/failure in Actions tab

## Troubleshooting

### If workflow still fails:

1. **Check logs** in Actions tab → Click failed run → Check error messages
2. **Verify credentials**: Make sure CF_USERNAME and CF_PASSWORD are correct
3. **Check space exists**: Verify `dev` space exists in your org
4. **Permissions**: Ensure your user has deploy permissions

### Common Errors:

- **Authentication failed**: Check CF_USERNAME and CF_PASSWORD
- **Space not found**: Verify CF_SPACE name is correct (`dev`)
- **Build failed**: Check MTA build errors in logs
