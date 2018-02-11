import React from "react";
import { zeropad } from "./utils";

const formatTime = (date, showSeconds) => {
  let str = zeropad(date.getHours(), 2);
  str += ":" + zeropad(date.getMinutes(), 2);
  if (showSeconds) {
    str += ":" + zeropad(date.getSeconds(), 2);
  }
  return str;
};

const ShowTime = props => {
  // https://drafts.csswg.org/css-values/#viewport-relative-lengths
  const fontSize = props.showSeconds ? "25vw" : "38vw";
  return (
    <div
      className="show-time"
      style={{ color: props.color, fontSize: fontSize }}
    >
      {formatTime(props.date, props.showSeconds)}
    </div>
  );
};

export default ShowTime;
