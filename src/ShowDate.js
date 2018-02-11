import React from "react";
import { zeropad } from "./utils";

const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const day2 = zeropad(day, 2);
  const month2 = zeropad(month, 2);
  return `${year}-${month2}-${day2}`;
};

const ShowDate = props => {
  return (
    <div className="show-date" style={{ color: props.color }}>
      {formatDate(props.date)}
    </div>
  );
};

export default ShowDate;
