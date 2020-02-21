import {
  PropertyPaneTextField,
  IPropertyPaneField,
  IPropertyPaneTextFieldProps,
} from "@microsoft/sp-webpart-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import "../../graphql/graphql";
export interface WebPartProperties {
  title: string;
}

export let getPropertyPane = function(
  properties: WebPartProperties,
  context: WebPartContext,
  onUpdate: Function
) {
  return {
    pages: [
      {
        header: {
          description: "Configure your webpart",
        },
        groups: [
          {
            groupName: "General",
            groupFields: [
              PropertyPaneTextField("title", {
                label: "Web Part Title",
              }),
            ],
          },
        ],
      },
    ],
  };
};
