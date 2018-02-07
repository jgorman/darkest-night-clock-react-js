import React, { Component } from "react";
import { zeropad } from "./utils";

class ShowDate extends Component {
  formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const day2 = zeropad(day, 2);
    const month2 = zeropad(month, 2);
    return `${year}-${month2}-${day2}`;
  }

  render() {
    if (!this.props.show) { return null; }
    return (
      <div className="clock-date" style={{ color: this.props.color }}>
        {this.formatDate(this.props.date)}
      </div>
    );
  }
}

export default ShowDate;
