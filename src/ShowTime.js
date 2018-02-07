import React, { Component } from "react";
import {zeropad} from "./utils";

class ShowTime extends Component {

  formatTime(date, showSeconds) {
    let str = zeropad(date.getHours(), 2)
    str += ':' + zeropad(date.getMinutes(), 2);
    if (showSeconds) {
      str += ':' + zeropad(date.getSeconds(), 2);
    }
    return str;
  }

  render() {
    // https://drafts.csswg.org/css-values/#viewport-relative-lengths
    const fontSize = this.props.showSeconds ? "25vw" : "38vw";
    return (
      <div className="clock-time" style={{ color: this.props.color, fontSize: fontSize }}>
        {this.formatTime(this.props.date, this.props.showSeconds)}
      </div>
    );
  }
}

export default ShowTime;
