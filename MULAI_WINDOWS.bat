@echo off
cd /d "%~dp0"
where node >nul 2>nul
if %errorlevel% neq 0 (
 echo Node.js belum terpasang. Gunakan VS Code Live Server atau pasang Node.js.
 pause
 exit /b 1
)
start "Secretary Quest - Server" cmd /k node tools/serve.mjs
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8080"
