#!/bin/bash

# One-Click Deployment Script for Debian/Linux
# Checks environment, installs dependencies, builds, and starts the services.

set -e

echo ">>> Starting ILoveRead Deployment..."

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js (v18+) first."
    exit 1
fi

echo ">>> Node.js version: $(node -v)"

# 2. Setup Server
echo ">>> Setting up Server..."
cd server
if [ ! -d "node_modules" ]; then
    echo "Installing server dependencies..."
    npm install
fi

# Build server if needed (it's using ts-node for dev, but for prod we should build)
# For this script we will run using ts-node/npm run dev for simplicity as requested,
# or we can build. Let's stick to the 'npm run dev' pattern from README but background it.
# Ideally, we should use PM2.

# 3. Setup Client
echo ">>> Setting up Client..."
cd ../client
if [ ! -d "node_modules" ]; then
    echo "Installing client dependencies..."
    npm install
fi

echo ">>> Building Client..."
npm run build

# 4. Start Services
echo ">>> Starting Services..."

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2 globally..."
    npm install -g pm2
fi

cd ..

# Start Server
echo "Starting Backend on port 39301..."
cd server
pm2 start npm --name "iloveread-server" -- run dev

# Serve Client
# Typically we need a static server for the built client.
# For simplicity in this script, we will run 'npm run preview' or 'vite preview'
# mapped to the port, OR use 'serve'.
echo "Starting Frontend on port 39302..."
cd ../client
pm2 start npm --name "iloveread-client" -- run dev -- --port 39302 --host

echo ">>> Deployment Complete!"
echo "Backend: http://localhost:39301"
echo "Frontend: http://localhost:39302"
pm2 save
