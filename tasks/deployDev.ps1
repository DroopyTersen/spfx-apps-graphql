gulp clean
gulp bundle --ship
gulp package-solution --ship

Connect-PnPOnline https://skylinespark.sharepoint.com/sites/REPLACE_ME!!
Add-PnPApp -Path ./sharepoint/solution/!!!REPLACE_ME!!!.sppkg -Scope Site -Publish -Overwrite -SkipFeatureDeployment