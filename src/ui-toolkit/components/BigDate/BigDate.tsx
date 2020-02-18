import React from "react";
import styled from "styled-components";
import { format, isValid } from "date-fns";

const CLASS_NAME = "big-date";

export default function BigDate({ date = new Date(), className = "", ...rest }) {
  if (!isValid(date)) {
    //console.log("BigDate: Invalid Date");
    return null;
  }
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledBigDate className={cssClass} {...rest}>
      <div className="month">{format(date, "MMM")}</div>
      <div className="date">{format(date, "d")}</div>
    </StyledBigDate>
  );
}

const StyledBigDate = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  color: #fff;
  font-size: 18px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  > * {
    position: relative;
  }
  .month {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 1em;
    line-height: 0.8em;
  }
  .date {
    font-size: 2em;
    line-height: 0.85em;
    font-weight: 600;
  }
`;
