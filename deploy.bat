@echo off
SETLOCAL
ECHO >>> Starting ILoveRead Deployment for Windows...

:: 1. Check Node.js
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error: Node.js is not installed. Please install Node.js (v18+) first.
    PAUSE
    EXIT /B 1
)

:: 2. Setup Server
ECHO >>> Setting up Server...
CD server
IF NOT EXIST "node_modules" (
    ECHO Installing server dependencies...
    call npm install
)

:: 3. Setup Client
ECHO >>> Setting up Client...
CD ..\client
IF NOT EXIST "node_modules" (
    ECHO Installing client dependencies...
    call npm install
)

:: 4. Start Services
ECHO >>> Starting Backend (New Window)...
start "ILoveRead Server" cmd /k "cd ..\server && npm run dev"

ECHO >>> Starting Frontend (New Window)...
start "ILoveRead Client" cmd /k "npm run dev"

ECHO >>> Deployment Launched!
ECHO Backend running on http://localhost:39301
ECHO Frontend running on http://localhost:39302
PAUSE
