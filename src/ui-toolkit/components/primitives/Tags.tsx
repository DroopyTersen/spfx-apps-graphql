import React from "react";
import styled from "styled-components";
import Link from "./Link";

const CLASS_NAME = "tags";

export default function Tags({ children, className = "", tags = [] }: TagProps) {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");

  return (
    <StyledTags className={cssClass}>
      {children ? children : tags.map((tag) => <Tag url={tag.url}>{tag.label}</Tag>)}
    </StyledTags>
  );
}

export interface TagProps {
  className?: string;
  tags?: { label: string; url?: string }[];
  children?: any;
}
const TAG_CLASS_NAME = "tag";

export function Tag({ url = "", className = "", children, ...additionalProps }) {
  let cssClass = [TAG_CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledTag className={cssClass}>
      <Link href={url} {...additionalProps}>
        {children}
      </Link>
    </StyledTag>
  );
}
const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
`;

const StyledTag = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.palette.accent};
  margin-right: 15px;
  a {
    color: ${(props) => props.theme.palette.accent};
  }
`;
