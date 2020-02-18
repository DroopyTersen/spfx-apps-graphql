import * as React from "react";
import * as ReactDOM from "react-dom";
import ThemeColorPicker from "../../components/ColorPicker/ThemeColorPicker";

import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IPropertyPaneCustomFieldProps,
} from "@microsoft/sp-webpart-base";

export interface PropertyFieldThemeColorProperties {
  onUpdate: (targetProp: string, newValue: any) => void;
  value: string;
  label: string;
}

export interface _PropertyFieldThemeColorProperties
  extends PropertyFieldThemeColorProperties,
    IPropertyPaneCustomFieldProps {}

export default class PropertyFieldThemeColor
  implements IPropertyPaneField<PropertyFieldThemeColorProperties> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: _PropertyFieldThemeColorProperties;
  private elem: HTMLElement;

  constructor(targetProperty: string, properties: PropertyFieldThemeColorProperties) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...{
        key: "ThemeColor-key",
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
      value: this.properties.value,
      label: this.properties.label,
      onChange: (newValue) => {
        this.properties.onUpdate(this.targetProperty, newValue);
      },
    };
    var reactComponent = React.createElement(ThemeColorPicker, props);
    ReactDOM.render(reactComponent, elem);
  }
}
