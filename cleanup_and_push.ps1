# cleanup_and_push.ps1
# 1) Analyses which files are actually used by the site (follows every import from the Next.js entry files)
# 2) Lists unused files / assets / dependencies
# 3) Deletes them (after you confirm), verifies the build, commits and pushes
#
# Run from the PROJECT ROOT (folder with package.json):
#   .\cleanup_and_push.ps1            -> analyse, then ask before each destructive step
#   .\cleanup_and_push.ps1 -DryRun    -> analyse only, change nothing
param([switch]$DryRun)

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".\package.json") -or -not (Test-Path ".\src\app")) {
  Write-Host "Run this from the project root (the folder with package.json and src\app)." -ForegroundColor Red
  exit 1
}

$root = $PWD.Path

# Runs pnpm if installed; otherwise falls back to "npx pnpm" (no global install needed)
function Invoke-PM {
  param([string[]]$PmArgs)
  if (Get-Command pnpm -ErrorAction SilentlyContinue) { & pnpm @PmArgs }
  elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "(pnpm not found - using 'npx pnpm' instead)" -ForegroundColor DarkYellow
    & npx --yes pnpm @PmArgs
  }
  else {
    Write-Host "Neither pnpm nor npx found. Install Node.js from nodejs.org, then run: npm install -g pnpm" -ForegroundColor Red
    $global:LASTEXITCODE = 1
  }
}
function Get-Rel([string]$full) { return $full.Substring($root.Length + 1).Replace('\', '/') }
function Read-Text([string]$rel) { return [System.IO.File]::ReadAllText((Join-Path $root $rel)) }

# ── 1. Collect source files ──────────────────────────────────────────
$codeExt = @('.js', '.jsx', '.ts', '.tsx', '.mjs', '.css')
$allSrc = @(Get-ChildItem -Path ".\src" -Recurse -File | ForEach-Object { Get-Rel $_.FullName })
$srcSet = @{}
foreach ($f in $allSrc) { $srcSet[$f] = $true }

$resolveExts = @('', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.css')

function Resolve-Import([string]$from, [string]$spec) {
  if ($spec.StartsWith('@/')) {
    $base = 'src/' + $spec.Substring(2)
  }
  elseif ($spec.StartsWith('.')) {
    $dir = $from.Substring(0, $from.LastIndexOf('/'))
    $parts = New-Object System.Collections.Generic.List[string]
    foreach ($seg in ($dir + '/' + $spec).Split('/')) {
      if ($seg -eq '' -or $seg -eq '.') { continue }
      if ($seg -eq '..') { if ($parts.Count -gt 0) { $parts.RemoveAt($parts.Count - 1) } }
      else { $parts.Add($seg) }
    }
    $base = $parts -join '/'
  }
  else { return $null }   # npm package, not a local file

  foreach ($e in $resolveExts) { if ($srcSet.ContainsKey($base + $e)) { return $base + $e } }
  foreach ($e in @('.js', '.jsx', '.ts', '.tsx')) { if ($srcSet.ContainsKey("$base/index$e")) { return "$base/index$e" } }
  return $null
}

$importRx = [regex]'(?:from\s*|import\s*\(?\s*|require\(\s*)[''"]([^''"]+)[''"]'

# ── 2. Walk the import graph from the Next.js entry files ────────────
$entries = @($allSrc | Where-Object { $_ -match '^src/app/(.*/)?(page|layout|loading|error|not-found|template|route|default)\.(js|jsx|ts|tsx)$' })
if ($srcSet.ContainsKey('src/app/globals.css')) { $entries += 'src/app/globals.css' }

$seen = @{}
$stack = New-Object System.Collections.Generic.Stack[string]
foreach ($e in $entries) { $stack.Push($e) }
while ($stack.Count -gt 0) {
  $cur = $stack.Pop()
  if ($seen.ContainsKey($cur) -or -not $srcSet.ContainsKey($cur)) { continue }
  $seen[$cur] = $true
  if ($cur -match '\.(js|jsx|ts|tsx|mjs)$') {
    foreach ($m in $importRx.Matches((Read-Text $cur))) {
      $target = Resolve-Import $cur $m.Groups[1].Value
      if ($target) { $stack.Push($target) }
    }
  }
}

$unusedCode = @($allSrc | Where-Object {
    $ext = [System.IO.Path]::GetExtension($_).ToLower()
    ($codeExt -contains $ext) -and (-not $seen.ContainsKey($_))
  })

# ── 3. Unused public assets ──────────────────────────────────────────
$usedText = ""
foreach ($f in $seen.Keys) { if ($f -match '\.(js|jsx|ts|tsx|mjs|css)$') { $usedText += (Read-Text $f) + "`n" } }
foreach ($cfg in @('next.config.mjs', 'next.config.js', 'postcss.config.mjs', 'eslint.config.mjs')) {
  if (Test-Path $cfg) { $usedText += (Read-Text $cfg) + "`n" }
}

$unusedPublic = @()
if (Test-Path ".\public") {
  foreach ($f in (Get-ChildItem ".\public" -Recurse -File)) {
    if (-not $usedText.Contains($f.Name)) { $unusedPublic += (Get-Rel $f.FullName) }
  }
}

# ── 4. Outdated docs ─────────────────────────────────────────────────
$staleDocs = @()
if (Test-Path ".\PROJECT_STRUCTURE.md") { $staleDocs += "PROJECT_STRUCTURE.md" }

# ── 5. Report ────────────────────────────────────────────────────────
Write-Host ""
Write-Host "=== ANALYSIS ===" -ForegroundColor Cyan
Write-Host ("Source files used by the site : {0}" -f $seen.Count) -ForegroundColor Green
Write-Host ("Source files NOT used          : {0}" -f $unusedCode.Count) -ForegroundColor Yellow
$unusedCode | ForEach-Object { Write-Host "   - $_" -ForegroundColor Yellow }
Write-Host ("Unused public assets           : {0}" -f $unusedPublic.Count) -ForegroundColor Yellow
$unusedPublic | ForEach-Object { Write-Host "   - $_" -ForegroundColor Yellow }
Write-Host ("Outdated docs                  : {0}" -f $staleDocs.Count) -ForegroundColor Yellow
$staleDocs | ForEach-Object { Write-Host "   - $_" -ForegroundColor Yellow }

# Unused npm dependencies (checked against the files that remain in use)
$keepAlways = @('react', 'react-dom', 'next', 'tailwindcss', '@tailwindcss/postcss', 'tw-animate-css', 'eslint', 'eslint-config-next', 'postcss')
$pkg = Get-Content ".\package.json" -Raw | ConvertFrom-Json
$unusedDeps = @()
foreach ($section in @('dependencies', 'devDependencies')) {
  if ($pkg.PSObject.Properties.Name -contains $section) {
    foreach ($d in $pkg.$section.PSObject.Properties.Name) {
      if ($keepAlways -contains $d) { continue }
      if (-not $usedText.Contains($d)) { $unusedDeps += $d }
    }
  }
}
Write-Host ("Unused npm packages            : {0}" -f $unusedDeps.Count) -ForegroundColor Yellow
$unusedDeps | ForEach-Object { Write-Host "   - $_" -ForegroundColor Yellow }
Write-Host ""

$toDelete = @($unusedCode) + @($unusedPublic) + @($staleDocs)

if ($DryRun) { Write-Host "Dry run: nothing was changed." -ForegroundColor Cyan; exit 0 }
if ($toDelete.Count -eq 0 -and $unusedDeps.Count -eq 0) { Write-Host "Nothing to clean up. 🎉" -ForegroundColor Green; exit 0 }

# ── 6. Delete (with confirmation) ────────────────────────────────────
if ($toDelete.Count -gt 0) {
  $ans = Read-Host ("Delete these {0} files? (y/N)" -f $toDelete.Count)
  if ($ans -match '^(y|yes)$') {
    foreach ($f in $toDelete) {
      Remove-Item -LiteralPath (Join-Path $root $f) -Force
      Write-Host "  deleted $f" -ForegroundColor Red
    }
    # remove folders left empty
    Get-ChildItem ".\src" -Recurse -Directory | Sort-Object { $_.FullName.Length } -Descending | ForEach-Object {
      if (-not (Get-ChildItem $_.FullName -Force)) { Remove-Item $_.FullName -Force; Write-Host "  removed empty folder $(Get-Rel $_.FullName)" -ForegroundColor Red }
    }
  }
  else { Write-Host "Skipped file deletion." }
}

# ── 7. Remove unused npm packages (with confirmation) ────────────────
if ($unusedDeps.Count -gt 0) {
  $ans = Read-Host ("Remove these packages with pnpm ({0})? (y/N)" -f ($unusedDeps -join ' '))
  if ($ans -match '^(y|yes)$') {
    Invoke-PM (@('remove') + $unusedDeps)
    if ($LASTEXITCODE -ne 0) {
      # pnpm can exit non-zero (e.g. "ignored build scripts") even though the packages were removed - check package.json
      $after = Get-Content ".\package.json" -Raw | ConvertFrom-Json
      $names = @()
      foreach ($section in @('dependencies', 'devDependencies')) {
        if ($after.PSObject.Properties.Name -contains $section) { $names += $after.$section.PSObject.Properties.Name }
      }
      $stillThere = @($unusedDeps | Where-Object { $names -contains $_ })
      if ($stillThere.Count -gt 0) {
        Write-Host "Removing packages failed - stopping. (Files were already deleted; re-run to retry.)" -ForegroundColor Red
        exit 1
      }
      Write-Host "Packages were removed from package.json (pnpm printed a warning, it is safe to ignore)." -ForegroundColor DarkYellow
    }
  }
}

# ── 8. Verify the site still builds ──────────────────────────────────
$ans = Read-Host "Run a build to verify nothing broke? (Y/n)"
if ($ans -notmatch '^(n|no)$') {
  Invoke-PM @('build')
  if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "BUILD FAILED - nothing was committed or pushed." -ForegroundColor Red
    Write-Host "To undo the cleanup:  git checkout -- .   and   git clean -fd" -ForegroundColor Yellow
    exit 1
  }
  Write-Host "Build OK." -ForegroundColor Green
}

# ── 9. Commit + push ─────────────────────────────────────────────────
$inRepo = (& git rev-parse --is-inside-work-tree 2>$null)
if ($LASTEXITCODE -ne 0 -or "$inRepo".Trim() -ne 'true') {
  Write-Host "This folder is not a git repository - skipping commit/push." -ForegroundColor Yellow
  exit 0
}

# keep the update-script backups out of git
if (Test-Path ".\.gitignore") {
  if (-not (Select-String -Path ".\.gitignore" -Pattern '_backup_before_update_' -Quiet)) {
    Add-Content ".\.gitignore" "`n# local backups from the update script`n_backup_before_update_*/"
  }
}

$branch = (& git rev-parse --abbrev-ref HEAD).Trim()
& git add -A
Write-Host ""
Write-Host "=== GIT STATUS ===" -ForegroundColor Cyan
& git status --short
Write-Host ""

$ans = Read-Host "Commit and push to branch '$branch'? (y/N)"
if ($ans -notmatch '^(y|yes)$') { Write-Host "Not pushed. Your changes are staged locally."; exit 0 }

if ($branch -eq 'main' -or $branch -eq 'master') {
  $ans = Read-Host "'$branch' is your main branch (may auto-deploy). Really push to it? (y/N)"
  if ($ans -notmatch '^(y|yes)$') { Write-Host "Cancelled. Tip: git checkout -b portfolio-cleanup  then run this again."; exit 0 }
}

& git commit -m "Clean up: remove unused components, assets and dependencies"
if ($LASTEXITCODE -ne 0) { Write-Host "Nothing to commit or commit failed." -ForegroundColor Yellow; exit 0 }
& git push -u origin $branch
if ($LASTEXITCODE -eq 0) { Write-Host "Pushed to origin/$branch" -ForegroundColor Green }
else { Write-Host "Push failed - check your git login / remote, then run: git push -u origin $branch" -ForegroundColor Red }
