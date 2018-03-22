// @flow
import React from "react";
import PropTypes from "prop-types";
import { formatDate, formatTime, viewWidth, fontFit } from "./utils";

type ShowTimeType = {
  date: Date,
  showSeconds: boolean,
  color: string
};

export const ShowTime = (props: ShowTimeType) => {
  const time = formatTime(props.date, props.showSeconds);
  const width = viewWidth();
  const fontSize = fontFit(time, width);
  const box = {
    color: props.color,
    fontSize: fontSize,
    lineHeight: 0.9
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
  const width = viewWidth();
  const date = formatDate(props.date);
  const fontSize = fontFit(date, width, 0.6);
  const box = {
    color: props.color,
    fontSize: fontSize,
    lineHeight: 0.9
  };

  return <div style={box}>{date}</div>;
};

ShowDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  color: PropTypes.string.isRequired
};
