import React, { Component } from "react";
import ShowTime from "./ShowTime";
import ShowDate from "./ShowDate";
import Colors from "./Colors";
import plusCircle from "./plus-circle.svg";
import minusCircle from "./minus-circle.svg";
import colors from "./colors.svg";
import seconds from "./seconds.svg";
import {formatColor} from "./utils";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      brightness: 1.0,
      color: [0, 0, 255],
      showColors: false,
      showSeconds: true,
    };
    this.brighterClick = this.brighterClick.bind(this);
    this.dimmerClick = this.dimmerClick.bind(this);
    this.setColorClick = this.setColorClick.bind(this);
    this.showColorClick = this.showColorClick.bind(this);
    this.showSecondsClick = this.showSecondsClick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(prevState => {
      return { date: new Date() };
    });
  }

  brighterClick() {
    this.setState(prevState => {
      let newBrightness = prevState.brightness * 1.5;
      if (newBrightness > 1.0) {
        // Alert the user that this is maximum brightness?
        newBrightness = 1.0;
      }
      return { brightness: newBrightness };
    });
  }

  dimmerClick() {
    this.setState(prevState => {
      let newBrightness = prevState.brightness * 0.66;
      if (newBrightness < 0.05) {
        // Alert the user that this is minimum brightness?
        newBrightness = 0.05;
      }
      return { brightness: newBrightness };
    });
  }

  showColorClick() {
    this.setState(prevState => {
      return { showColors: !prevState.showColors };
    });
  }

  setColorClick(newColor) {
    this.setState(prevState => {
      return { color: newColor, showColors: false };
    });
  }

  showSecondsClick() {
    this.setState(prevState => {
      return { showSeconds: !prevState.showSeconds };
    });
  }

  render() {
    const color = formatColor(this.state.color, this.state.brightness);
    return (
      <div>
        <ShowTime date={this.state.date} showSeconds={this.state.showSeconds} color={color}></ShowTime>
        <ShowDate date={this.state.date} color={color}></ShowDate>
        <div>
          <img onClick={this.brighterClick} src={plusCircle} alt="Brighter" />
          <img onClick={this.dimmerClick} src={minusCircle} alt="Dimmer" />
          <img onClick={this.showColorClick} src={colors} alt="Select color" />
          <img onClick={this.showSecondsClick} src={seconds} alt="Show seconds" />
          <Colors show={this.state.showColors} click={this.setColorClick}></Colors>
        </div>
      </div>
    )
  }
}

export default Clock;
