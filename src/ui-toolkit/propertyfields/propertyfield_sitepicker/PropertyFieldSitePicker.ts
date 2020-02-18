import * as React from "react";
import * as ReactDOM from "react-dom";
import SitePicker from "../../components/SitePicker/SitePicker";

import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IPropertyPaneCustomFieldProps,
} from "@microsoft/sp-webpart-base";

export interface PropertyFieldSitePickerProperties {
  value: any;
  onUpdate: (targetProp: string, newValue: any) => void;
  label: string;
}

export interface _PropertyFieldSitePickerProperties
  extends PropertyFieldSitePickerProperties,
    IPropertyPaneCustomFieldProps {}

export default class PropertyFieldSitePicker
  implements IPropertyPaneField<PropertyFieldSitePickerProperties> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: _PropertyFieldSitePickerProperties;
  private elem: HTMLElement;

  constructor(targetProperty: string, properties: PropertyFieldSitePickerProperties) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...{
        key: "SitePicker-key",
        onRender: this.onRender.bind(this),
      },
      ...properties,
    };
  }

  public render() {
    if (!this.elem) return null;
    this.onRender(this.elem);
  }

  private onRender(elem) {
    if (!this.elem) this.elem = elem;
    // import a React component to handle most of the work
    let props = {
      siteUrl: this.properties.value,
      label: this.properties.label,
      onChange: (newValue) => {
        this.properties.onUpdate(this.targetProperty, newValue);
      },
    };
    var reactComponent = React.createElement(SitePicker, props);
    ReactDOM.render(reactComponent, elem);
  }
}
