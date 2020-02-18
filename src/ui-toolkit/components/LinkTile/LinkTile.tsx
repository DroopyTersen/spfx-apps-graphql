import React from "react";
import IconImage, {
  defaultIconImageProps,
  IconImageProps,
  getIconFontSize,
} from "../IconImage/IconImage";
import Link from "../primitives/Link";
import styled from "styled-components";
import { getHexColor } from "../ColorPicker/ThemeColorPicker";

const CLASS_NAME = "link-tile";

function LinkTile(props: LinkTileProps) {
  let cssClass = [CLASS_NAME, props.className, props.showHoverOverlay === false ? "" : "hoverable"]
    .filter(Boolean)
    .join(" ");

  return (
    <StyledLinkContainer {...defaultIconImageProps} {...props} className={cssClass}>
      <IconImage {...props} />
      <StyledCaptionOverlay {...defaultIconImageProps} {...props} className="caption-overlay">
        {props.children}
      </StyledCaptionOverlay>
    </StyledLinkContainer>
  );
}
export default React.memo(LinkTile);

const getCaptionFontSize = function(width, height) {
  let smallerDimension = width < height ? width : height;
  return smallerDimension < 100 ? "12px" : smallerDimension > 175 ? "16px" : "14px";
};

const StyledCaptionOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  background: transparent;
  top: 60%;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${(prop) => getHexColor(prop.iconColor)};
  padding: 10px 5px;
  transition: top 0.2s ease-out, background-color 0.3s ease-out;
  font-size: ${(props) => getCaptionFontSize(props.width, props.height)};
  opacity: 0.8;
  pointer-events: none;
  .hoverable:hover & {
    top: 0;
    opacity: 1;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
    background: ${(props) => getHexColor(props.hoverColor || "themeSecondary")};
  }
`;

const StyledLinkContainer = styled(Link)`
  position: relative;
  .icon-image > i {
    margin-bottom: ${(props) => Math.floor(props.height * 0.2)}px;
    font-size: ${(props) => getIconFontSize(props.width, props.height, 40)};
  }
`;

export interface LinkTileProps extends IconImageProps {
  href: string;
  children: any;
  showHoverOverlay?: boolean;
  hoverColor?: string;
  [key: string]: any;
}
