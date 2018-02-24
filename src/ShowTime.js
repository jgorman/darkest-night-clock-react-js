// @flow
import React from "react";
import PropTypes from "prop-types";
import { formatDate, formatTime } from "./utils";

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
  const box = {
    color: props.color,
    fontSize: fontSize,
    lineHeight: 0.8
  };

  return <div style={box}> {time} </div>;
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
  const box = {
    color: props.color,
    fontSize: fontSize,
    lineHeight: 0.8
  };

  return <div style={box}>{date}</div>;
};

ShowDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  color: PropTypes.string.isRequired
};

const fontFit = (str: string, width: number, fill = 1.0): number => {
  const fontScale = 1.8; // 1.9 is too big for iPhone 5s.
  return width / str.length * fontScale * fill;
};
