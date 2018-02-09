import React, { Component } from "react";
import ShowTime from "./ShowTime";
import ShowDate from "./ShowDate";
import Colors from "./Colors";
import { formatColor, saveState, getOldState } from "./utils";
import plusCircle from "./plus-circle.svg";
import minusCircle from "./minus-circle.svg";
import colors from "./colors.svg";
import seconds from "./seconds.svg";
import showDate from "./show-date.svg";

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      brightness: 1.0,
      color: [0, 0, 255],
      showSeconds: false,
      showDate: false,
      showControls: true,
      showColors: false
    };
    const old = getOldState();
    if (old !== null) {
      try {
        if (typeof old.brightness === "number" && old.brightness >= 0.1) {
          this.state.brightness = old.brightness;
        }

        // Check old color values!
        let okay = true;
        let lumins = 0;
        for (let i = 0; i < 3; i++) {
          let oc = old.color[i];
          if (typeof oc === "number" && 0 <= oc && oc <= 255) {
            lumins += oc;
          } else {
            okay = false;
          }
        }
        if (okay && lumins > 100 && old.color.length === 3) {
          this.state.color = old.color;
        }

        if (old.showControls === true || old.showControls === false) {
          this.state.showControls = old.showControls;
        }
        if (old.showSeconds === true || old.showSeconds === false) {
          this.state.showSeconds = old.showSeconds;
        }
        if (old.showDate === true || old.showDate === false) {
          this.state.showDate = old.showDate;
        }
      } catch (err) {
        console.error("Bad saved state:", err.message);
      }
    }

    // Bind the event functions to this.
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
    saveState(this.state);
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
    return (
      <div>
        <div onClick={this.showControlsClick}>
          <ShowTime
            date={this.state.date}
            showSeconds={this.state.showSeconds}
            color={color}
          />

          {this.state.showDate ? (
            <ShowDate date={this.state.date} color={color} />
          ) : (
            ""
          )}
        </div>

        {this.state.showControls ? (
          <div className="controls">
            <Colors click={this.setColorClick} show={this.state.showColors} />
            <img onClick={this.brighterClick} src={plusCircle} alt="Brighter" />
            <img onClick={this.dimmerClick} src={minusCircle} alt="Dimmer" />
            <img
              onClick={this.showColorClick}
              src={colors}
              alt="Select color"
            />
            <img
              onClick={this.showSecondsClick}
              src={seconds}
              alt="Show seconds"
            />
            <img onClick={this.showDateClick} src={showDate} alt="Show date" />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Clock;
