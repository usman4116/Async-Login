Write-Host "Pushing AetherSync Next.js Vercel Auth to https://github.com/usman4116/Async-Login.git ..." -ForegroundColor Cyan
$git = "e:\AAAAA\tools\git\cmd\git.exe"
& $git push -u origin main --force
if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccessfully pushed to GitHub! You can now deploy on Vercel." -ForegroundColor Green
} else {
    Write-Host "`nIf prompted, please sign in to GitHub or provide your GitHub Personal Access Token." -ForegroundColor Yellow
}
