@echo off
echo Starting MongoDB...
echo.

echo Option 1: Using Docker (Recommended)
echo If you have Docker installed, run:
echo docker-compose up -d
echo.

echo Option 2: Using Local MongoDB Service
echo If MongoDB is installed as a service:
echo net start MongoDB
echo.

echo Option 3: Manual MongoDB Start
echo If MongoDB is installed manually:
echo "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"
echo.

echo Option 4: Download MongoDB Community
echo Download from: https://www.mongodb.com/try/download/community
echo.

echo Press any key to continue...
pause > nul
