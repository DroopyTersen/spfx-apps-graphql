import React from "react";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import styled from "styled-components";
import { getThemeValue } from "../PortalsThemeProvider/PortalsThemeProvider";

import ColorPicker from "./ColorPicker";
const options = [
  { key: "themePrimary", text: "Theme Primary" },
  { key: "themeSecondary", text: "Theme Secondary" },
  { key: "themeTertiary", text: "Theme Tertiary" },
  { key: "white", text: "White (Theme)" },
  { key: "other", text: "Other" },
];

export const getHexColor = function(color: string): string {
  // if (!checkIsThemeColor(color)) return color;
  if (color === "primary") {
    color = "themePrimary";
  }
  if (color === "secondary") {
    color = "themeSecondary";
  }
  if (color === "tertiary") {
    color = "themeTertiary";
  }
  return getThemeValue("palette." + color, color);
};
export const checkIsThemeColor = function(color: ThemeColor | string): boolean {
  if (!color) return false;
  let match = Object.keys(ThemeColor).find((key) => ThemeColor[key] === color);
  return !!match;
};

export default class ThemeColorPicker extends React.PureComponent<ThemeColorPickerProps, {}> {
  static getHexColor = getHexColor;
  static checkIsThemeColor = checkIsThemeColor;

  state = {
    dropdownValue: _getDropdownValue(this.props.value),
    otherColor: _getOtherColorValue(this.props.value),
  };
  onDropdownChange = (option) => {
    this.setState({ dropdownValue: option.key });

    let valueToSurface = option.key === "other" ? this.state.otherColor : option.key;

    this.props.onChange(valueToSurface);
  };
  onOtherColorChange = (color) => {
    this.setState({ otherColor: color });
    this.props.onChange(color);
  };
  render() {
    return (
      <StyledContainer>
        <Dropdown
          label={this.props.label}
          options={options}
          selectedKey={this.state.dropdownValue}
          onChanged={this.onDropdownChange}
          disabled={this.props.disabled}
        />
        {this.state.dropdownValue === "other" && (
          <ColorPicker
            value={this.state.otherColor}
            onChange={this.onOtherColorChange}
            disabled={this.props.disabled}
          />
        )}
      </StyledContainer>
    );
  }
}

export interface ThemeColorPickerProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}
const _getOtherColorValue = function(propValue = "primary") {
  // If the color string is passed in as the value, there will be no option matches
  // If a color string is passed in, use that to set state.otherColor otherwise use a pretty blue
  return options.map((o) => o.key).indexOf(propValue) === -1 ? propValue : "#2D5F9C";
};
const _getDropdownValue = function(propValue = "primary") {
  // check for an option match,
  //if 'other', the value will be like rgba(123,231,133,1) so there won't be a match
  return options.map((o) => o.key).indexOf(propValue) > -1 ? propValue : "other";
};

export enum ThemeColor {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
}

const StyledContainer = styled.div`
  position: relative;
  box-sizing: border-box;
`;
