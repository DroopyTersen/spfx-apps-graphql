import React, { ReactElement } from "react";
import styled from "styled-components";
import Shave from "../Shave/Shave";

const CLASS_NAME = "vertical-item-description";

export interface VerticalItemDescriptionProps {
  // props
  className?: string;
  shave?: number;
  [key: string]: any;
}

const VerticalItemDescription: React.FC<VerticalItemDescriptionProps> = ({
  children,
  className = "",
  shave = 100,
  ...additionalProps
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <Shave
      {...additionalProps}
      enabled={shave > 0}
      maxHeight={shave}
      el={StyledDescription}
      className={cssClass}
    >
      {children}
    </Shave>
  );
};

export default VerticalItemDescription;

let StyledDescription = styled.p`
  margin: 0 0;
  color: ${(props) => props.theme.semanticColors.bodyText};
`;
