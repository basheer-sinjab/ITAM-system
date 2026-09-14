$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $PSScriptRoot
$module = Join-Path $workspace "itam_floss"
$artifacts = Join-Path $workspace "artifacts"
$stage = Join-Path $artifacts "itam_floss-package-stage"
$stagedModule = Join-Path $stage "itam_floss"

if (-not (Test-Path -LiteralPath $module)) {
    throw "ITAMFloss module folder was not found: $module"
}

$manifest = Get-Content -LiteralPath (Join-Path $module "__manifest__.py") -Raw
if ($manifest -notmatch '"version"\s*:\s*"([^"]+)"') {
    throw "The ITAMFloss version could not be read from __manifest__.py."
}
$archive = Join-Path $artifacts ("itam_floss-{0}.zip" -f $Matches[1])

Push-Location $workspace
try {
    & npm.cmd run build:odoo
    if ($LASTEXITCODE -ne 0) {
        throw "The ITAMFloss frontend build failed."
    }

    New-Item -ItemType Directory -Path $artifacts -Force | Out-Null
    $artifactsPath = [System.IO.Path]::GetFullPath($artifacts)
    $stagePath = [System.IO.Path]::GetFullPath($stage)
    if (-not $stagePath.StartsWith(
        $artifactsPath + [System.IO.Path]::DirectorySeparatorChar,
        [System.StringComparison]::OrdinalIgnoreCase
    )) {
        throw "Unsafe package staging path: $stagePath"
    }

    if (Test-Path -LiteralPath $stage) {
        Remove-Item -LiteralPath $stage -Recurse -Force
    }
    New-Item -ItemType Directory -Path $stage -Force | Out-Null
    Copy-Item -LiteralPath $module -Destination $stagedModule -Recurse
    Get-ChildItem -LiteralPath $stagedModule -Directory -Recurse -Filter "__pycache__" |
        Remove-Item -Recurse -Force
    Get-ChildItem -LiteralPath $stagedModule -File -Recurse |
        Where-Object { $_.Extension -in @(".pyc", ".pyo") } |
        Remove-Item -Force

    if (Test-Path -LiteralPath $archive) {
        Remove-Item -LiteralPath $archive -Force
    }

    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $archiveStream = [System.IO.File]::Open(
        $archive,
        [System.IO.FileMode]::CreateNew,
        [System.IO.FileAccess]::ReadWrite,
        [System.IO.FileShare]::None
    )
    $zipArchive = New-Object System.IO.Compression.ZipArchive(
        $archiveStream,
        [System.IO.Compression.ZipArchiveMode]::Create,
        $false
    )
    try {
        $stagePrefix = $stagePath.TrimEnd("\", "/") + [System.IO.Path]::DirectorySeparatorChar
        Get-ChildItem -LiteralPath $stagedModule -File -Recurse | ForEach-Object {
            $entryName = $_.FullName.Substring($stagePrefix.Length).Replace("\", "/")
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $zipArchive,
                $_.FullName,
                $entryName,
                [System.IO.Compression.CompressionLevel]::Optimal
            ) | Out-Null
        }
    }
    finally {
        $zipArchive.Dispose()
        $archiveStream.Dispose()
    }
    Write-Output $archive
}
finally {
    if ($stage -and (Test-Path -LiteralPath $stage)) {
        Remove-Item -LiteralPath $stage -Recurse -Force
    }
    Pop-Location
}
