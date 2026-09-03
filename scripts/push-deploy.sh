#!/bin/sh
# Push and deploy to Vercel production
# Usage: git push-deploy [remote] [branch]
# Example: git push-deploy origin main

REMOTE="${1:-origin}"
BRANCH="${2:-HEAD}"

echo "Pushing to $REMOTE $BRANCH..."
git push "$REMOTE" "$BRANCH"

if [ $? -eq 0 ]; then
  echo "Push successful. Deploying to Vercel production..."
  vercel --prod
else
  echo "Push failed. Skipping deployment."
  exit 1
fi
