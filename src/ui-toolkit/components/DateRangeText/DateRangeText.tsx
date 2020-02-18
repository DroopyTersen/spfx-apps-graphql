import React from "react";
import { format, startOfDay, isEqual, getMinutes, isValid } from "date-fns";

const DATE_FORMAT = "EEE, MMM do";

const getTimeFormat = (date: Date) => (getMinutes(date) === 0 ? "haaaa" : "h:mmaaaa");

export default function DateRangeText(event: DateRangeTextProps) {
  if (!isValid(event.start)) return null;

  let singleDay =
    (event.start && !event.end) ||
    format(event.start, DATE_FORMAT) === format(event.end || event.start, DATE_FORMAT);

  if (singleDay) {
    // If its a single day and the time is set to 12am, its an all day event?
    return isEqual(startOfDay(event.start), event.start)
      ? renderSingleDayAllDay(event)
      : renderSingleDay(event);
  } else {
    return isEqual(startOfDay(event.start), event.start) &&
      isEqual(startOfDay(event.end), event.end)
      ? renderMultiDayAllDay(event)
      : renderMultiDay(event);
  }
}
const renderSingleDayAllDay = (event) => <span>{format(event.start, DATE_FORMAT)}, All day</span>;
// Single day (not all day) - DATE, STARTTIME - ENDTIME
const renderSingleDay = (event) => (
  <span>
    <span>
      {format(event.start, DATE_FORMAT)}, {format(event.start, getTimeFormat(event.start))}
    </span>
    {isValid(event.end) && (
      <>
        <span> - </span>
        <span>{format(event.end, getTimeFormat(event.end))} </span>
      </>
    )}
  </span>
);
// Multi day all day event, render both dates
const renderMultiDayAllDay = (event) => (
  <span>
    {format(event.start, DATE_FORMAT)} - {format(event.end, DATE_FORMAT)}
  </span>
);
// Multi day event render StartDateTime - EndDateTime
const renderMultiDay = (event) => (
  <span>
    {format(event.start, DATE_FORMAT + ", " + getTimeFormat(event.start))} {" \u2192 "}
    {format(event.end, DATE_FORMAT + ", " + getTimeFormat(event.end))}
  </span>
);

export interface DateRangeTextProps {
  start: Date;
  end: Date;
}
