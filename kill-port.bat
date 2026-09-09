@echo off
setlocal enabledelayedexpansion

echo.
echo =========================================
echo Fixing Port 3000 Conflict
echo =========================================
echo.

set PORT=3000

REM Find process using port 3000
echo Searching for processes using port %PORT%...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%PORT%') do (
    set PID=%%a
    echo Found PID: !PID!
    echo Killing process !PID!...
    taskkill /PID !PID! /F >nul 2>&1
    if !errorlevel! equ 0 (
        echo ✓ Process !PID! terminated successfully
    ) else (
        echo ✗ Could not terminate process !PID!
    )
)

echo.
echo =========================================
echo Port 3000 cleanup complete!
echo =========================================
echo.
echo Starting server...
echo.

cd Backend
npm run dev

pause
