import React from "react";
import styled from "styled-components";
import BackgroundImage from "../primitives/BackgroundImage";

const CLASS_NAME = "card-image";
const DEFAULT_SIZE = 160;
export default function CardImage({ size = DEFAULT_SIZE, ...props }) {
  let cssClass = [CLASS_NAME, props.className].filter(Boolean).join(" ");
  return <StyledCardImage {...props} size={size} className={cssClass} />;
}

const StyledCardImage = styled(BackgroundImage)`
  height: ${(props) => (props.size || DEFAULT_SIZE) + "px"};
`;
