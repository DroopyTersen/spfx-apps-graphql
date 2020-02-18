import React from "react";
import styled from "styled-components";

const CLASS_NAME = "card-footer";

export interface CardFooterProps {
  // props
  className?: string;
  [key: string]: any;
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = "",
  ...additionalProps
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledCardFooter {...additionalProps} className={cssClass}>
      {children}
    </StyledCardFooter>
  );
};

export default CardFooter;

const StyledCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto !important;
`;
