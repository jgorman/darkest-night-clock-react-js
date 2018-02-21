// @flow
import React from "react";
import { zeropad } from "./utils";
import PropTypes from "prop-types";

type ShowTimeType = {
  date: Date,
  showSeconds: boolean,
  color: string
};

export const ShowTime = (props: ShowTimeType) => {
  // $FlowFixMe
  const width = document.body.clientWidth;
  const time = formatTime(props.date, props.showSeconds);
  const fontSize = fontFit(time, width) + "px";
  return (
    <div
      className="show-time"
      style={{ color: props.color, fontSize: fontSize }}
    >
      {time}
    </div>
  );
};

ShowTime.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  color: PropTypes.string.isRequired,
  showSeconds: PropTypes.bool.isRequired
};

type ShowDateType = {
  date: Date,
  color: string
};

export const ShowDate = (props: ShowDateType) => {
  // $FlowFixMe
  const width = document.body.clientWidth;
  const date = formatDate(props.date);
  const fontSize = fontFit(date, width, 0.6) + "px";
  return (
    <div
      className="show-date"
      style={{ color: props.color, fontSize: fontSize }}
    >
      {date}
    </div>
  );
};

ShowDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  color: PropTypes.string.isRequired
};

const fontFit = (str, width, fill = 1.0) => {
  const fontScale = 1.8; // 1.9 is too big for iPhone.
  return width / str.length * fontScale * fill;
};

const formatTime = (date, showSeconds) => {
  let str = zeropad(date.getHours(), 2);
  str += ":" + zeropad(date.getMinutes(), 2);
  if (showSeconds) {
    str += ":" + zeropad(date.getSeconds(), 2);
  }
  return str;
};

const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const day2 = zeropad(day, 2);
  const month2 = zeropad(month, 2);
  return `${year}-${month2}-${day2}`;
};
