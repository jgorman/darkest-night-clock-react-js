import React from "react";

const ShowTime = props => {
  // https://drafts.csswg.org/css-values/#viewport-relative-lengths
  const fontSize = props.showSeconds ? "24vw" : "38vw";
  return (
    <div
      className="show-time"
      style={{ color: props.color, fontSize: fontSize }}
    >
      {formatTime(props.date, props.showSeconds)}
    </div>
  );
};

const ShowDate = props => {
  return (
    <div className="show-date" style={{ color: props.color }}>
      {formatDate(props.date)}
    </div>
  );
};

const zeropad = (num, len) => {
  const str = num.toString();
  return str.padStart(len, "0");
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
