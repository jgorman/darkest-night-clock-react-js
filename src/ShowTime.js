import React, { Component } from "react";

class ShowTime extends Component {
  constructor(props) {
    super(props);
  }

  formatNumber(num, len) {
    const str = num.toString();
    return str.padStart(len, "0");
  }

  formatTime() {
    const date = this.props.date;
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const hour2 = this.formatNumber(hour, 2);
    const minute2 = this.formatNumber(minute, 2);
    const second2 = this.formatNumber(second, 2);
    return `${hour2}:${minute2}:${second2}`;
  }

  render() {
    return (
      <div className="clock-time">{this.formatTime()}</div>
    )
  }
}

export default ShowTime;
