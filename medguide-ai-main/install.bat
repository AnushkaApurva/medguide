@echo off
echo ========================================
echo MedGuideAI Installation Script
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed!
echo.

echo Step 2: Installing Frontend Dependencies...
cd ../medguide-ai-main
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed!
echo.

echo Step 3: Testing Backend Setup...
cd ../backend
call node quick-test.js
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Set up MongoDB Atlas (see MONGODB_SETUP.md)
echo 2. Update backend/.env with your MongoDB connection string
echo 3. Start backend: cd backend && npm run dev
echo 4. Start frontend: cd medguide-ai-main && npm run dev
echo.
echo For detailed setup instructions, see COMPLETE_SETUP.md
echo.
pause