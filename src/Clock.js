import React, { Component } from "react";
import ShowTime from "./ShowTime";
import ShowDate from "./ShowDate";
import Colors from "./Colors";
import Alert from "./Alert";
import plusCircle from "./plus-circle.svg";
import minusCircle from "./minus-circle.svg";
import colors from "./colors.svg";
import {formatColor} from "./utils";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      brightness: 1.0,
      alert: '',
      color: [0, 0, 255],
      showColors: false,
    };
    this.brighterClick = this.brighterClick.bind(this);
    this.dimmerClick = this.dimmerClick.bind(this);
    this.setColorClick = this.setColorClick.bind(this);
    this.showColorClick = this.showColorClick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
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
      // alert(prevState.showColors);
      return { showColors: !prevState.showColors };
    });
  }

  setColorClick(newColor) {
    this.setState(prevState => {
      return { color: newColor, showColors: false };
    });
  }

  render() {
    const color = formatColor(this.state.color, this.state.brightness);
    return (
      <div>
        <ShowTime date={this.state.date} color={color}></ShowTime>
        <ShowDate date={this.state.date} color={color}></ShowDate>
        <div>
          <img onClick={this.brighterClick} src={plusCircle} className="controls" alt="Brighter" />
          <img onClick={this.dimmerClick} src={minusCircle} className="controls" alt="Dimmer" />
          <img onClick={this.showColorClick} src={colors} className="controls" alt="Colors" />
          <Colors show={this.state.showColors} click={this.setColorClick}></Colors>
          <Alert>{color}</Alert>
        </div>
      </div>
    )
  }
}

export default Clock;
