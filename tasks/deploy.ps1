Param(
    $Url = "https://skylinespark.sharepoint.com/sites/devshowcase",
    [switch] $SkipBuild,
    [ValidateSet("Site", "Tenant")]
    $Scope = "Site"
)

if (!$SkipBuild) {
    Write-Host "Building Packing"
    npm run package
}

Write-Host "Connecting to " $Url
Connect-PnPOnline -Url $Url
Write-Host "Deploying to " $Url
$file = Get-Item .\sharepoint\solution\*.sppkg
Add-PnPApp -Path $file.FullName -Scope $Scope -Publish -Overwrite -SkipFeatureDeployment