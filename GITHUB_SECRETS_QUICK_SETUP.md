# Quick Setup: GitHub Secrets

## Your Values (Copy-Paste Ready)

```
CF_API:      https://api.cf.us10-001.hana.ondemand.com
CF_ORG:      45dc37cbtrial
CF_SPACE:    dev
CF_USERNAME: (enter your BTP username)
CF_PASSWORD: (enter your BTP password)
```

## Steps

1. **Go to:** https://github.com/SumitAG008/btplti/settings/secrets/actions

2. **Click:** "New repository secret"

3. **Add each secret:**
   - Name: `CF_API`
   - Value: `https://api.cf.us10-001.hana.ondemand.com`
   - Click "Add secret"
   
   Repeat for:
   - `CF_ORG` = `45dc37cbtrial`
   - `CF_SPACE` = `dev`
   - `CF_USERNAME` = (your username)
   - `CF_PASSWORD` = (your password)

4. **Done!** Next push will trigger deployment.

## Verify

After adding secrets:
- Go to **Actions** tab
- Re-run the failed workflow
- It should succeed now!
