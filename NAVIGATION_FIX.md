# Navigation Fix - Backend npm install

## The Issue

You're in the `frontend` directory and need to go to `backend`. The command `cd..` (without space) doesn't work.

## Correct Commands

### Option 1: Go up, then into backend

```bash
# Go up one level (note the SPACE between cd and ..)
cd ..

# Now you're in the project root (btplti)
# Then go into backend
cd backend

# Install backend dependencies
npm install
```

### Option 2: One command to go directly

```bash
# From frontend directory, go up and into backend in one command
cd ../backend

# Then install
npm install
```

## Complete Sequence

If you're currently in `frontend` directory:

```bash
# Go to project root
cd ..

# Verify you're in the right place (should show backend/, frontend/, package.json)
ls

# Go into backend
cd backend

# Install dependencies
npm install
```

## Quick Copy-Paste Solution

Run this single line:

```bash
cd ../backend && npm install
```

This will:
1. Go up one directory (`..`)
2. Enter backend directory (`backend`)
3. Install dependencies (`npm install`)

## Verify Your Location

After navigation, verify you're in the right place:

```bash
# Check current directory
pwd
# Should show: /home/user/projects/btplti/backend

# Check files
ls
# Should show: package.json, server.js, db/, srv/, etc.
```

## After Backend Install

Once backend dependencies are installed, you can:

```bash
# Go back to project root
cd ..

# Start the development server
cds watch
```

## Common Navigation Commands

```bash
cd ..          # Go up one directory (note the SPACE!)
cd ../..       # Go up two directories
cd ~           # Go to home directory
cd ~/projects  # Go to projects directory
pwd            # Show current directory path
ls             # List files in current directory
```
