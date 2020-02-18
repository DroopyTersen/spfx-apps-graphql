# PropertyFieldSitePicker
Custom control for an SPFx Web Part Property Pane. Allows you to connect to either the current site, or choose "Other" and enter a site path. If if the "Other" site path that was entered is invalid, it will set the Web Part property to `null`.

## Example Usage
``` typescript
{
    groupName: "Connection",
    groupFields: [
        new PropertyFieldSitePicker("siteUrl", {
            label: "Employee Info Site",
            value: properties.siteUrl,
            onUpdate
        })
    ]
},
```

## Properties
| Name              | Type                      | Required  | Description |
|----               |----                       |----       |----         |
|**value**          | `string`                  | Required  | The absolute url of a SharePoint site on the tenant (`this.properties.siteUrl`)
|**label**          |`string`                   | Required  | The label
|**onUpdate**       |`(targetProp:string, newValue:any) => void` | Required | The onUpdate function for the Web Part