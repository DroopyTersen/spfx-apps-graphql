import React, { useState } from "react";
import styled from "styled-components";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { getPortalsTheme } from "../PortalsThemeProvider/PortalsThemeProvider";
import { TextField } from "office-ui-fabric-react/lib/TextField";
export default function ThemePreview() {
  let [filter, setFilter] = useState("");
  let theme = getPortalsTheme();
  return (
    <StyledContainer>
      <StyledFilter>
        <TextField
          placeholder="Search by label or color value..."
          value={filter}
          name="theme-search"
          onChange={(e, newValue) => setFilter(newValue)}
          iconProps={{ iconName: "Search" }}
        />
      </StyledFilter>
      <Pivot>
        <PivotItem headerText="Palette">
          <StyledSwatches>
            {getThemeColors(theme.palette, filter).map((color) => (
              <ColorPreview key={color.label} {...color} />
            ))}
          </StyledSwatches>
        </PivotItem>
        <PivotItem headerText="Semantic">
          <StyledSwatches>
            {getThemeColors(theme.semanticColors, filter).map((color) => (
              <ColorPreview key={color.label} {...color} />
            ))}
          </StyledSwatches>
        </PivotItem>

        {/* <PivotItem headerText="Global">
          <StyledSwatches>
            {getThemeColors(theme.global, filter).map((color) => (
              <ColorPreview key={color.label} {...color} />
            ))}
          </StyledSwatches>
        </PivotItem> */}
      </Pivot>
    </StyledContainer>
  );
}

export function ColorPreview({ hex = "", label = "" }) {
  return (
    <StyledColorSwatch>
      <div className="color" style={{ background: hex }} />
      <div>
        <div>
          <b>{label}</b>
        </div>
        <div>
          <code>{hex}</code>
        </div>
      </div>
    </StyledColorSwatch>
  );
}

const getThemeColors = function(themeArea, filter = "") {
  if (!themeArea) return [];
  return Object.keys(themeArea)
    .filter((themeParam) => typeof themeArea[themeParam] === "string")
    .map((themeParam) => ({
      hex: themeArea[themeParam],
      label: themeParam,
    }))
    .filter((color) => {
      if (!filter) return true;
      if (!color) return false;
      return (
        color.hex.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        color.label.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );
    });
};

const StyledContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
`;
const StyledFilter = styled.div`
  width: 100%;
`;
const StyledSwatches = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const StyledColorSwatch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 210px;

  padding: 10px;
  border-radius: 5px;
  /* border: 1px solid #ddd; */
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: center;
  .color {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    box-shadow: 1px 1px 5px #0003;
    margin-bottom: 5px;
  }
`;
