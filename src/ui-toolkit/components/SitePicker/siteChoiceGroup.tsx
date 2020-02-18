import * as React from "react";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";

export default class SiteChoiceGroup extends React.PureComponent<SiteChoiceGroupProps, {}> {
  onChange = (event, chosenOption) => {
    if (this.props.onChange) this.props.onChange(chosenOption.key);
  };
  render() {
    return (
      <div>
        <ChoiceGroup
          selectedKey={this.props.value || SiteChoiceType.ThisSite}
          options={[
            {
              key: SiteChoiceType.ThisSite,
              text: "This Site",
            },
            {
              key: SiteChoiceType.Other,
              text: "Other",
            },
          ]}
          onChange={this.onChange}
          label={this.props.label}
          required={true}
        />
      </div>
    );
  }
}

export interface SiteChoiceGroupProps {
  //props
  value: SiteChoiceType;
  onChange: (choiceKey) => void;
  label: string;
}

export enum SiteChoiceType {
  ThisSite = "this-site",
  Other = "other",
}
