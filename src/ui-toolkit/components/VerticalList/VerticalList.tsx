import React from "react";
import styled from "styled-components";
import Thumbnail from "../primitives/Thumbnail";
import Title from "../primitives/Title";
import Tags, { Tag } from "../primitives/Tags";
import VerticalItemDescription from "./VerticalItemDescription";

import Info from "../primitives/Info";

let StyledFooter = styled.div`
  display: flex;
  margin-top: auto !important;
  justify-content: space-between;
`;

let StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 1 80%;
`;

export interface VerticalListProps<T> {
  items: T;
  renderItem: (item: T) => JSX.Element;
}

const CLASS_NAME = "vertical-item";
export const VerticalItem: React.FC<VerticalItemProps> = function({
  children,
  className = "",
  ...rest
}) {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledVerticalItem {...rest} className={cssClass}>
      {children}
    </StyledVerticalItem>
  );
};

export interface VerticalItemProps {
  className?: string;
  [key: string]: any;
}

let StyledVerticalItem = styled.div`
  &:first-child {
    margin-top: -18px;
  }
  text-align: left;
  padding: 20px 0;
  display: flex;
  align-items: inherit;
  /* flex: 1 1 auto; */
  border-bottom: 1px solid ${(props) => props.theme.semanticColors.bodyDivider};
  > * {
    margin: 0 10px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

export default class VerticalList<T> extends React.PureComponent<VerticalListProps<T>, {}> {
  static Item = VerticalItem;
  static Title = Title;
  static Image = Thumbnail;
  static Tags = Tags;
  static Tag = Tag;
  static Description = VerticalItemDescription;
  static Info = Info;
  static Content = StyledContent;
  static Footer = StyledFooter;
}
