import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    IPropertyPaneField,
    PropertyPaneFieldType,
    IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-webpart-base';

export interface PropertyFieldBlankProperties {
    render: () => React.ReactElement<any>
}

export interface _BlankPropertyPaneFieldProperties extends PropertyFieldBlankProperties, IPropertyPaneCustomFieldProps {}

export default class PropertyFieldBlank implements IPropertyPaneField<PropertyFieldBlankProperties> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: _BlankPropertyPaneFieldProperties;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: PropertyFieldBlankProperties) {
        this.targetProperty = targetProperty;
        this.properties = { 
            ...{ 
                key: "BlankPropertyPaneField-key", 
                onRender: this.onRender.bind(this) 
            }, 
            ...properties
        };
    }

    public render() {
        if (!this.elem) return null;
        this.onRender(this.elem);
    }

    private onRender(elem) {
        if (!this.elem) this.elem = elem;
        ReactDOM.render(this.properties.render(), elem);
    }
}