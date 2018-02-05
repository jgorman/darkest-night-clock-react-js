import React, { Component } from "react";

class ShowDate extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  formatNumber(num, len) {
    const str = num.toString();
    return str.padStart(len, "0");
  }

  formatDate() {
    const date = this.state.date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const day2 = this.formatNumber(day, 2);
    const month2 = this.formatNumber(month, 2);
    return `${year}-${month2}-${day2}`;
  }

  render() {
    return (
      <div className="clock-date">{this.formatDate()}</div>
    )
  }
}

export default ShowDate;
