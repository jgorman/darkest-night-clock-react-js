import React, { Component } from "react";
import {zeropad} from "./utils";

class ShowTime extends Component {

  formatTime() {
    const date = this.props.date;
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const hour2 = zeropad(hour, 2);
    const minute2 = zeropad(minute, 2);
    const second2 = zeropad(second, 2);
    return `${hour2}:${minute2}:${second2}`;
  }

  render() {
    return (
      <div className="clock-time" style={{ color: this.props.color }}>
        {this.formatTime()}
      </div>
    );
  }
}

export default ShowTime;
