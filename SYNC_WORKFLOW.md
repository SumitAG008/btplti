# Synchronization Workflow - Quick Reference

## Setup Complete ✅

All locations are now connected:
- ✅ **Local Folder (Cursor):** `C:\Users\sumit\Documents\btplti`
- ✅ **GitHub:** `https://github.com/SumitAG008/btplti.git`
- ✅ **SAP Business Application Studio:** `~/projects/btplti`

## Daily Workflow

### Scenario 1: Working in Cursor (Local)

```bash
# 1. Start: Pull latest
cd C:\Users\sumit\Documents\btplti
git pull origin main

# 2. Make changes
# (edit files in Cursor)

# 3. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 4. Sync to Business Application Studio (when needed)
# In BAS terminal:
cd ~/projects/btplti
git pull origin main
```

### Scenario 2: Working in Business Application Studio

```bash
# 1. Start: Pull latest
cd ~/projects/btplti
git pull origin main

# 2. Make changes
# (edit files in BAS)

# 3. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 4. Sync to Cursor (when needed)
# In Cursor terminal:
cd C:\Users\sumit\Documents\btplti
git pull origin main
```

## Always Follow This Order

1. **Pull** before starting work
2. **Make** your changes
3. **Commit** your changes
4. **Push** to GitHub
5. **Pull** in other locations when needed

## Verify Sync

**Check all locations show same commit:**

```bash
# In Cursor
git log --oneline -1

# In Business Application Studio
git log --oneline -1

# On GitHub
# Check: https://github.com/SumitAG008/btplti/commits/main
```

All should show the same latest commit hash!
