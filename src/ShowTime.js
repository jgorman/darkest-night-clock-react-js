import React from "react";
import { zeropad } from "./utils";

const ShowTime = props => {
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

const ShowDate = props => {
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

const fontFit = (str, width, fill = 1.0) => {
  const fontScale = 1.9; // Font size / char width pixels.
  return width / str.length * fontScale * fill;
};

const formatTime = (date, showSeconds) => {
  let str = zeropad(date.getHours(), 2);
  str += ":" + zeropad(date.getMinutes(), 2);
  if (showSeconds) {
    str += ":" + zeropad(date.getSeconds(), 2);
    // Eventually debug the shifting time. Perhaps a fixed font?
    // str += ":" + (((date.getSeconds() % 2) === 1) ? "11" : "00");
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

export { ShowTime, ShowDate };
