import React, { ReactElement } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    CSS: any;
  }
}
let supportsGrid = window.CSS && window.CSS.supports && window.CSS.supports("display", "grid");

const Grid: React.FC<GridProps> = ({
  gap = 20,
  size = "200px",
  children,
  mode = "best",
  shouldFlex = true,
  ...rest
}) => {
  let isFlexbox = !supportsGrid || mode === "flex";
  let GridComponent = isFlexbox ? StyledFlexGrid : StyledGrid;

  return (
    <GridComponent gap={gap} size={size} shouldFlex={shouldFlex} {...rest}>
      {children}
      {isFlexbox && Array.from(new Array(12), () => <div className="flex-grid-blank" />)}
    </GridComponent>
  );
};

export default Grid;

export interface GridProps {
  gap?: number;
  size?: string;
  mode?: "best" | "grid" | "flex";
  shouldFlex?: boolean;
  [key: string]: any;
}

const SharedContainer = styled.div`
  width: 100%;
  > * {
    min-height: 50px;
  }
`;
const StyledGrid = styled(SharedContainer)`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    ${(props) => (props.shouldFlex ? `minmax(${props.size}, 1fr)` : `${props.size}`)}
  );
  grid-gap: ${(props) => props.gap}px;
`;

const StyledFlexGrid = styled(SharedContainer)`
  /* FLEX BOX MODE */
  display: flex;
  flex-wrap: wrap;
  margin-top: -${(props) => props.gap}px;
  margin-right: -${(props) => props.gap}px;

  > * {
    flex: ${(props) => (props.shouldFlex ? "1 1" : "0 0")} ${(props) => props.size};
    margin-top: ${(props) => props.gap}px;
    margin-right: ${(props) => props.gap}px;
  }
  > .flex-grid-blank {
    height: 0;
    margin-top: 0;
    min-height: 0;
  }
`;
