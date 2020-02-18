import React from "react";
import styled from "styled-components";
import Link from "./Link";

const CLASS_NAME = "title-ui-toolkit";

export interface TitleProps {
  // props
  url?: string;
  as?: string;
  className?: string;
  [key: string]: any;
}

const Title: React.FC<TitleProps> = ({
  url = "",
  as = "h3",
  children,
  className = "",
  ...additionalProps
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");

  return (
    <Link href={url} className={className} {...additionalProps}>
      <StyledTitle {...additionalProps} as={as} className={cssClass}>
        {children}
      </StyledTitle>
    </Link>
  );
};

export default Title;

const StyledTitle = styled.h3`
  margin: 0;
  padding-bottom: 2px;
  color: ${(props) => props.theme.semanticColors.bodyText};
  &:hover {
    color: ${(props) => props.theme.palette.themePrimary};
  }
`;
