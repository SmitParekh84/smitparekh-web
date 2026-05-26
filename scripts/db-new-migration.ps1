<#
.SYNOPSIS
  Create a new SQL migration file with the next sequential number.

.USAGE
  pwsh ./scripts/db-new-migration.ps1 add_user_avatars
  → creates supabase/migrations/0003_add_user_avatars.sql
#>

param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Name
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$migrationsDir = Join-Path $repoRoot "supabase\migrations"
if (-not (Test-Path $migrationsDir)) {
  New-Item -ItemType Directory -Path $migrationsDir -Force | Out-Null
}

$existing = @(Get-ChildItem $migrationsDir -Filter "*.sql" | Sort-Object Name)
$nextNum = 1
if ($existing.Count -gt 0) {
  $last = $existing[-1].Name
  if ($last -match "^(\d{4})_") {
    $nextNum = [int]$matches[1] + 1
  }
}

$slug = ($Name -replace '[^a-zA-Z0-9]+', '_').Trim('_').ToLower()
$num = "{0:D4}" -f $nextNum
$file = Join-Path $migrationsDir "${num}_${slug}.sql"

@"
-- =====================================================================
-- $num — $slug
-- Apply with: pwsh ./scripts/db-push.ps1
-- =====================================================================

-- Write your migration here.
"@ | Set-Content -Path $file -Encoding UTF8

Write-Host "✓ Created $file" -ForegroundColor Green
