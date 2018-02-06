import React, { Component } from "react";
import { zeropad } from "./utils";

class ShowDate extends Component {
  formatDate() {
    const date = this.props.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const day2 = zeropad(day, 2);
    const month2 = zeropad(month, 2);
    return `${year}-${month2}-${day2}`;
  }

  render() {
    return (
      <div className="clock-date" style={{ color: this.props.color }}>
        {this.formatDate()}
      </div>
    );
  }
}

export default ShowDate;
