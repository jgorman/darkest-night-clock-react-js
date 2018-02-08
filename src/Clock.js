import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShowTime from "./ShowTime";
import ShowDate from "./ShowDate";
import Colors from "./Colors";
import plusCircle from "./plus-circle.svg";
import minusCircle from "./minus-circle.svg";
import colors from "./colors.svg";
import seconds from "./seconds.svg";
import showDate from "./show-date.svg";
import gong from "./gong.svg";
import home from "./home.svg";
import { formatColor } from "./utils";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      brightness: 1.0,
      color: [0, 0, 255],
      showControls: true,
      showColors: false,
      showSeconds: false,
      showDate: false
    };
    this.brighterClick = this.brighterClick.bind(this);
    this.dimmerClick = this.dimmerClick.bind(this);
    this.showControlsClick = this.showControlsClick.bind(this);
    this.showColorClick = this.showColorClick.bind(this);
    this.setColorClick = this.setColorClick.bind(this);
    this.showSecondsClick = this.showSecondsClick.bind(this);
    this.showDateClick = this.showDateClick.bind(this);
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

  showControlsClick() {
    this.setState(prevState => {
      return { showControls: !prevState.showControls };
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

  showDateClick() {
    this.setState(prevState => {
      return { showDate: !prevState.showDate };
    });
  }

  render() {
    const color = formatColor(this.state.color, this.state.brightness);
    let controls = "";
    if (this.state.showControls) {
      controls = (
        <div className="controls">
          <Colors click={this.setColorClick} show={this.state.showColors} />
          <img onClick={this.brighterClick} src={plusCircle} alt="Brighter" />
          <img onClick={this.dimmerClick} src={minusCircle} alt="Dimmer" />
          <img onClick={this.showColorClick} src={colors} alt="Select color" />
          <img
            onClick={this.showSecondsClick}
            src={seconds}
            alt="Show seconds"
          />
          <img onClick={this.showDateClick} src={showDate} alt="Show date" />
          <Link to="/">
            <img src={home} alt="Home" />
          </Link>
          <Link to="/timer">
            <img src={gong} alt="Timer" />
          </Link>
        </div>
      );
    }

    return (
      <div>
        <ShowTime
          date={this.state.date}
          showSeconds={this.state.showSeconds}
          color={color}
          click={this.showControlsClick}
        />
        <ShowDate
          date={this.state.date}
          show={this.state.showDate}
          color={color}
        />
        {controls}
      </div>
    );
  }
}

export default Clock;
