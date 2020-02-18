import React from "react";
import styled from "styled-components";
import Shave from "../Shave/Shave";

const CLASS_NAME = "card-description";
export default function CardDescription({ children, className = "", as = "p", shave = 100 }) {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <Shave
      enabled={shave > 0}
      maxHeight={shave}
      el={as}
      className={cssClass}
      style={{ padding: "10px 0" }}
    >
      {children}
    </Shave>
  );
}

const StyledDescription = styled.p`
  /* font-weight: 200; */
  padding: 10px 0;
`;
