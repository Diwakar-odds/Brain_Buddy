@echo off
REM Quick setup script for Brain Buddy data seeding (Windows)

echo ============================================================
echo Brain Buddy - Quick Setup Script
echo ============================================================

REM Step 1: Check Python
echo.
echo Step 1: Checking Python...
python --version
if errorlevel 1 (
    echo X Python not found. Please install Python 3.9+
    exit /b 1
)
echo √ Python found

REM Step 2: Install dependencies
echo.
echo Step 2: Installing dependencies...
pip install -r requirements.minimal.txt
if errorlevel 1 (
    echo X Failed to install dependencies
    exit /b 1
)
echo √ Dependencies installed

REM Step 3: MongoDB check
echo.
echo Step 3: Checking MongoDB connection...
echo Note: Make sure MongoDB is running!
echo       Local: mongod --dbpath C:\data\db
echo       Or use MongoDB Atlas cloud

REM Step 4: Create .env if it doesn't exist
echo.
echo Step 4: Setting up environment...
if not exist .env (
    echo MONGODB_URL=mongodb://localhost:27017> .env
    echo FRONTEND_URL=http://localhost:5173>> .env
    echo √ Created .env file
) else (
    echo √ .env file exists
)

REM Step 5: Seed data
echo.
echo Step 5: Seeding training data...
echo This will create 500 training sessions...
python database\seed_training_data.py
if errorlevel 1 (
    echo.
    echo X Data seeding failed!
    echo.
    echo Common issues:
    echo   1. MongoDB not running
    echo   2. Connection string incorrect in .env
    echo   3. Database permissions
    echo.
    echo Try:
    echo   - Start MongoDB: mongod --dbpath C:\data\db
    echo   - Check .env file for correct MONGODB_URL
    exit /b 1
)

REM Step 6: Verify data
echo.
echo Step 6: Verifying data...
python database\verify_data.py
if errorlevel 1 (
    echo ! Verification failed, but data might be partially seeded
)

REM Success!
echo.
echo ============================================================
echo √ Setup Complete!
echo ============================================================
echo.
echo Next steps:
echo   1. Start API: python -m api.main
echo   2. Visit: http://localhost:8000/docs
echo   3. Login: demo_user_1@brainbuddy.com / demo_password_123
echo.
echo ============================================================
pause
