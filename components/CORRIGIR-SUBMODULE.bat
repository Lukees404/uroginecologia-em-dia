@echo off
echo ============================================
echo  Corrigindo submodule components no Git...
echo ============================================

:: Remove components do index do git (submodule)
git rm --cached components 2>nul

:: Remove metadata de submodule
rmdir /s /q .git\modules\components 2>nul

:: Remove .gitmodules se existir
del /f /q .gitmodules 2>nul

:: Cria .gitmodules vazio para garantir
type nul > .gitmodules

:: Adiciona tudo
git add .
git commit -m "fix: remove submodule components, converte para pasta normal"
git push origin main --force

echo.
echo ============================================
echo  Pronto! Acesse o Netlify e clique em:
echo  Trigger deploy > Clear cache and deploy
echo ============================================
pause
