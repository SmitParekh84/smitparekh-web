<#
.SYNOPSIS
  Push pending Supabase migrations from supabase/migrations to the linked project.

.DESCRIPTION
  - Reads SUPABASE_ACCESS_TOKEN and SUPABASE_DB_PASSWORD from environment OR
    .env.local (in that order).
  - Downloads the Supabase CLI to .supabase-cli/ on first run if not present.
  - Runs `supabase db push` which auto-applies any new migration files.
  - The CLI compares local file names in supabase/migrations/ to the remote
    schema_migrations table, so you don't need to track which is "latest" —
    just drop a new .sql file and re-run this script.

.USAGE
  pwsh ./scripts/db-push.ps1
  pwsh ./scripts/db-push.ps1 -DryRun     # preview only, don't apply
  pwsh ./scripts/db-push.ps1 -Force      # skip confirmation

.NOTES
  Migration filename convention: NNNN_short_name.sql (zero-padded sequential)
  e.g. 0001_tools_phase2.sql, 0002_tools_ip_hash.sql, 0003_xxx.sql
#>

[CmdletBinding()]
param(
  [switch]$DryRun,
  [switch]$Force
)

$ErrorActionPreference = "Stop"

# --- Resolve project root (script lives in <repo>/scripts/) ---
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot
Write-Host "→ Repo root: $repoRoot" -ForegroundColor DarkGray

# --- Load secrets from env or .env.local ---
function Get-EnvFromFile([string]$path, [string]$key) {
  if (-not (Test-Path $path)) { return $null }
  $line = (Get-Content $path) | Where-Object { $_ -match "^\s*$key\s*=" } | Select-Object -First 1
  if (-not $line) { return $null }
  return ($line -replace "^\s*$key\s*=\s*", "").Trim().Trim('"').Trim("'")
}

$envFile = Join-Path $repoRoot ".env.local"
$accessToken = $env:SUPABASE_ACCESS_TOKEN
if (-not $accessToken) { $accessToken = Get-EnvFromFile $envFile "SUPABASE_ACCESS_TOKEN" }
$dbPassword = $env:SUPABASE_DB_PASSWORD
if (-not $dbPassword) { $dbPassword = Get-EnvFromFile $envFile "SUPABASE_DB_PASSWORD" }

if (-not $accessToken) {
  Write-Host "✗ SUPABASE_ACCESS_TOKEN missing." -ForegroundColor Red
  Write-Host "  Generate one at https://supabase.com/dashboard/account/tokens"
  Write-Host "  Then add to .env.local:  SUPABASE_ACCESS_TOKEN=sbp_..."
  exit 1
}
if (-not $dbPassword) {
  Write-Host "✗ SUPABASE_DB_PASSWORD missing." -ForegroundColor Red
  Write-Host "  Find/reset at: Supabase Project Settings → Database"
  Write-Host "  Then add to .env.local:  SUPABASE_DB_PASSWORD=..."
  exit 1
}

# --- Locate or download the CLI ---
$cliDir = Join-Path $repoRoot ".supabase-cli"
$cliExe = Join-Path $cliDir "supabase.exe"

if (-not (Test-Path $cliExe)) {
  Write-Host "→ Supabase CLI not found locally. Downloading…" -ForegroundColor Cyan
  if (-not (Test-Path $cliDir)) { New-Item -ItemType Directory -Path $cliDir -Force | Out-Null }
  $url = "https://github.com/supabase/cli/releases/latest/download/supabase_windows_amd64.tar.gz"
  $tarPath = Join-Path $cliDir "supabase.tar.gz"
  Invoke-WebRequest -Uri $url -OutFile $tarPath -UseBasicParsing
  tar -xzf $tarPath -C $cliDir
  Remove-Item $tarPath -Force
  if (-not (Test-Path $cliExe)) {
    Write-Host "✗ Download succeeded but supabase.exe not found in archive." -ForegroundColor Red
    exit 1
  }
}

$version = & $cliExe --version
Write-Host "→ Supabase CLI: v$version" -ForegroundColor DarkGray

# --- Set CLI auth ---
$env:SUPABASE_ACCESS_TOKEN = $accessToken
$env:SUPABASE_DB_PASSWORD = $dbPassword

# --- Resolve project ref from .env.local ---
$projectUrl = $env:NEXT_PUBLIC_SUPABASE_URL
if (-not $projectUrl) { $projectUrl = Get-EnvFromFile $envFile "NEXT_PUBLIC_SUPABASE_URL" }
if (-not $projectUrl) {
  Write-Host "✗ NEXT_PUBLIC_SUPABASE_URL missing in .env.local." -ForegroundColor Red
  exit 1
}
if ($projectUrl -match "https://([^.]+)\.supabase\.co") {
  $projectRef = $matches[1]
} else {
  Write-Host "✗ Could not parse project ref from URL: $projectUrl" -ForegroundColor Red
  exit 1
}
Write-Host "→ Project ref: $projectRef" -ForegroundColor DarkGray

# --- Ensure linked (idempotent) ---
$linkFile = Join-Path $repoRoot "supabase\.temp\project-ref"
$alreadyLinked = (Test-Path $linkFile) -and ((Get-Content $linkFile -Raw).Trim() -eq $projectRef)
if (-not $alreadyLinked) {
  Write-Host "→ Linking project…" -ForegroundColor Cyan
  & $cliExe link --project-ref $projectRef | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Link failed." -ForegroundColor Red
    exit $LASTEXITCODE
  }
}

# --- Show pending migrations ---
Write-Host ""
Write-Host "→ Migration status:" -ForegroundColor Cyan
& $cliExe migration list
Write-Host ""

# --- Count pending local migrations ---
$migrationsDir = Join-Path $repoRoot "supabase\migrations"
$localFiles = @(Get-ChildItem $migrationsDir -Filter "*.sql" -ErrorAction SilentlyContinue | Sort-Object Name)
if ($localFiles.Count -eq 0) {
  Write-Host "→ No migration files in $migrationsDir — nothing to do." -ForegroundColor Yellow
  exit 0
}
Write-Host "→ Latest local migration: $($localFiles[-1].Name)" -ForegroundColor DarkGray

# --- Push ---
if ($DryRun) {
  Write-Host "→ Dry run — not applying. Use without -DryRun to push." -ForegroundColor Yellow
  exit 0
}

Write-Host "→ Pushing migrations…" -ForegroundColor Cyan
if ($Force) {
  "y`n" | & $cliExe db push
} else {
  & $cliExe db push
}
$code = $LASTEXITCODE

if ($code -eq 0) {
  Write-Host ""
  Write-Host "✓ Migrations applied successfully." -ForegroundColor Green
} else {
  Write-Host ""
  Write-Host "✗ db push exited with code $code." -ForegroundColor Red
}
exit $code
