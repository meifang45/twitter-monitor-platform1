#!/bin/bash
echo "Starting Next.js development server..."
export NO_PROXY=localhost,127.0.0.1
# Use NEXTAUTH_SECRET (do not commit real secrets)
export NEXTAUTH_SECRET="replace-with-a-random-secret"
export NEXTAUTH_URL=http://localhost:3000
export MOCK_DATA_ENABLED=true
export NODE_ENV=development

npx next dev --port 3000
