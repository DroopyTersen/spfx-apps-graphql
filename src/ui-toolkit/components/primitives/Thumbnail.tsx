import React from "react";
import styled from "styled-components";
import BackgroundImage from "./BackgroundImage";

export interface ThumbnailProps {
  shape?: "circle" | "rectangle" | "square";
  width?: string;
  height?: string;
  className?: string;
  [key: string]: any;
}

const CLASS_NAME = "thumbnail-ui-toolkit";

const Thumbnail: React.FC<ThumbnailProps> = function({
  children,
  shape = "rectangle",
  width,
  height,
  className = "",
  ...rest
}) {
  let cssClass = [CLASS_NAME, className, shape].filter(Boolean).join(" ");
  let size = getSize(width, height, shape);

  return (
    <StyledThumbnail {...rest} height={size.height} width={size.width} className={cssClass}>
      {children}
    </StyledThumbnail>
  );
};

const getSize = (
  width: string,
  height: string,
  shape: string,
  defaultSize = "100px"
): { width: string; height: string } => {
  let size = { width, height };

  // They they passed one, but not the other, make it a square
  if (!width && !height) {
    size = { width: defaultSize, height: defaultSize };
  } else if (width && !height) {
    size.height = width;
  } else if (height && !width) {
    size.width = height;
  }

  // If it's a square or circle width and height should be equal
  if (shape === "circle" || shape === "square") {
    size.height = size.width;
  }

  return size;
};
export default Thumbnail;

let StyledThumbnail = styled(BackgroundImage)`
    /* flex: 1 1 ${(props) => props.width}; */
    flex-grow: 0;
    flex-shrink: 0;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    color: ${(props) => props.theme.palette.white};
    &.circle {
        border-radius: 50%;

    }
  `;
