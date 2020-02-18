import React from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { initializeIcons } from "@uifabric/icons";
import { HyperLink } from "../primitives/Link";
import styled from "styled-components";

initializeIcons();

const getPanelSize = (size) => {
  if (size === "small") {
    return PanelType.smallFixedFar;
  }
  if (size === "medium") {
    return PanelType.medium;
  }
  if (size === "large") {
    return PanelType.large;
  }
  return PanelType.medium;
};

const renderNavigation = (panelTitle: string, onDismiss: () => void) => {
  return (
    <div className="panel-navigation">
      <span className="panel-title">{panelTitle}</span>
      <IconButton iconProps={{ iconName: "ChromeClose" }} onClick={onDismiss} />
    </div>
  );
};

const renderContent = (url) => {
  return (
    <div className="iframe-wrapper">
      <iframe src={url} frameBorder="0"></iframe>
    </div>
  );
};

function PanelLink({
  href,
  title,
  children,
  panelSize = "medium",
  ...additionalProps
}: PanelLinkProps) {
  let [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
    if (additionalProps.onClick) {
      additionalProps.onClick(e);
    }
  };
  const closePanel = () => setIsOpen(false);
  return (
    <>
      {/* <StyledLink onClick={handleLinkClick}>{children}</StyledLink> */}
      <HyperLink {...additionalProps} href={href} onClick={handleLinkClick}>
        {children}
      </HyperLink>
      <StyledPanel
        isOpen={isOpen}
        onDismiss={closePanel}
        isLightDismiss
        type={getPanelSize(panelSize)}
        onRenderNavigation={() => renderNavigation(title, closePanel)}
        onRenderBody={() => renderContent(href)}
      ></StyledPanel>
    </>
  );
}
export default React.memo(PanelLink);

export interface PanelLinkProps {
  href: string;
  title?: string;
  panelSize?: "small" | "medium" | "large";
  children?: any;
  [key: string]: any;
}

const StyledPanel = styled(Panel)`
  .panel-navigation {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    max-height: 52px;
    background: ${(props) => props.theme.palette.themePrimary};
    color: white;
    .panel-title {
      font-size: 24px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-right: 15px;
    }
    button {
      color: white;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .iframe-wrapper {
    position: absolute;
    top: 52px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  iframe {
    height: 100%;
    width: 100%;
  }
`;
