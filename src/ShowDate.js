import React, { Component } from "react";
import {zeropad, formatColor} from "./utils";

class ShowDate extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  formatDate() {
    const date = this.state.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const day2 = zeropad(day, 2);
    const month2 = zeropad(month, 2);
    return `${year}-${month2}-${day2}`;
  }

  render() {
    return (
      <div className="clock-date">{this.formatDate()}</div>
    )
  }
}

export default ShowDate;
